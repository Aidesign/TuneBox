(function() {
	angular
		.module('TuneBox')
		.controller("roomCtrl", roomCtrl);

	roomCtrl.$inject = ['$scope', 'authentication', '$location', '$routeParams', 'roomService',
		'$http', '$log', 'youtubeService', '$window', 'profileService'
	];

	function roomCtrl($scope, authentication, $location, $routeParams, roomService, $http, $log, youtubeService, $window, profileService) {

		if (!authentication.isLoggedIn()) {
			$location.path('/');
		}

		$scope.isAdmin = false;

		var sukka = io('http://localhost:3000/');

		sukka.on('msg', function(msg) {
			if (msg === $routeParams.roomid) {
				getMessages();
			}
		});

		sukka.on('changeVideo', function(msg) {
			if (msg === $routeParams.roomid) {
				changePlaying();
			}
		});

		init();



		$window.onPlayerReady = function() {
			console.log($routeParams.roomid);
			var vRoom;
			roomService.getRoom($routeParams.roomid).success(function(data) {
				console.log(data);
				vRoom = data;
				$scope.room = vRoom;
				console.log($scope.room.roomName);
				profileService.getProfile(vRoom.admin).success(function(data) {
					$scope.admin = data;

					if (authentication.getUserObject()._id == $scope.room.admin) {
						console.log("admin");
						$scope.isAdmin = true;
					} else {
						console.log("not admin");
						$scope.isAdmin = false;
					}
				});
				launchVideo(vRoom.currentVideo, true);
				getMessages();

			});

		};

		$window.onPlayerStateChange = function(event) {
			if (event.data == YT.PlayerState.ENDED) {

				randomizedVideo();
			}
		};

		$window.onError = function(event) {
			console.log(event);
			randomizedVideo();
		};



		//console.log(Room);
		function init() {
			$scope.youtube = youtubeService.getYoutube();
			$scope.results = youtubeService.getResults();
			$scope.history = youtubeService.getHistory();
			$scope.classHidden = "hidden";
			$scope.classShown = "shown";
			$scope.video_button = false;
			$scope.search_button = false;

			// UI Strings ---- Fetch From Database
			//$scope.room_name = "Room Name";
			//$scope.room_description = "Room Description"
			//$scope.genre = "Genre";
			//$scope.artists = "Artists";
			$scope.current_song = "Current Song";
			//$scope.song_title = "Song Title";
			// $scope.artist = "Artist";
			$scope.room_recommendations = "Room Recommendations";
			//$scope.currentVideo.title = "Choose a video";


		}

		function getMessages() {
			roomService.getMessages($routeParams.roomid).success(function(data) {
				$scope.messages = data;
			});
		}

		function changeDBVideo(video) {
			roomService.changeVideo($routeParams.roomid, video).success(function(data) {
				sukka.emit('changeVideo', $routeParams.roomid);
			});
		}

		function changePlaying() {
			roomService.getRoom($routeParams.roomid).success(function(data) {
				console.log(data);
				vRoom = data;
				launchVideo(vRoom.currentVideo, true);
			});
		}

		function launchVideo(video, archive) {
			show_search_button();
			$scope.classHidden = "shown";
			$scope.classShown = "hidden";
			youtubeService.launchPlayer(video.id, video.title);
			if (archive) {
				youtubeService.archiveVideo(video);
			}
			$scope.currentVideo = video;
			$log.info('Launched id:' + video.id + ' and title:' + video.title);
		}

		function randomizedVideo() {
			if (authentication.getUserObject()._id == $scope.admin._id) {

				var ranNum = Math.floor((Math.random() * $scope.room.tags.length) + 1);
				var searchString = $scope.room.tags[ranNum - 1];
				console.log(searchString);

				var pubAfter = new Date();
				var currentYear = pubAfter.getFullYear();
				pubAfter.setFullYear(currentYear - 2);
				console.log(pubAfter);

				var results = [];

				$http.get('https://www.googleapis.com/youtube/v3/search', {
						params: {
							key: 'AIzaSyBJmqwVRUJUXd2QZD1agSvI0B5DzYbiKuc',
							type: 'video',
							publishedAfter: pubAfter,
							maxResults: '50',
							part: 'id,snippet',
							q: "'" + searchString + "' song -'the best' -'vs'"
						}
					})
					.success(function(data) {
						if (data.items.length === 0) {
							console.log("No results");
							return;
						}
						console.log(data);
						var videoNum = Math.floor((Math.random() * data.items.length) + 0);
						var video = {};
						video.id = data.items[videoNum].id.videoId;
						video.title = data.items[videoNum].snippet.title;
						$scope.launch(video, true);

					})
					.error(function() {
						$log.info('Search error');
					});
			} else {
				console.log("BACK OFF YO");
			}

		}

		$scope.launch = function(video, archive) {
			console.log(video);
			show_search_button();
			$scope.classHidden = "shown";
			$scope.classShown = "hidden";
			youtubeService.launchPlayer(video.id, video.title);
			if (archive) {
				youtubeService.archiveVideo(video);
			}
			$scope.currentVideo = video;
			changeDBVideo(video);
			$log.info('Launched id:' + video.id + ' and title:' + video.title);
		};

		$scope.nextPageToken = '';
		$scope.label = 'You haven\'t searched for any video yet!';
		$scope.loading = false;

		$scope.search = function(isNewQuery) {
			show_video_button();
			$scope.classHidden = "hidden";
			$scope.classShown = "shown";
			$scope.loading = true;
			$http.get('https://www.googleapis.com/youtube/v3/search', {
					params: {
						key: 'AIzaSyBJmqwVRUJUXd2QZD1agSvI0B5DzYbiKuc',
						type: 'video',
						maxResults: '10',
						pageToken: isNewQuery ? '' : $scope.nextPageToken,
						part: 'id,snippet',
						fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle,nextPageToken',
						q: this.query
					}
				})
				.success(function(data) {
					if (data.items.length === 0) {
						$scope.label = 'No results were found!';
					}
					youtubeService.listResults(data, $scope.nextPageToken && !isNewQuery);
					$scope.nextPageToken = data.nextPageToken;
					$log.info(data);
				})
				.error(function() {
					$log.info('Search error');
				})
				.finally(function() {
					$scope.loadMoreButton.stopSpin();
					$scope.loadMoreButton.setDisabled(false);
					$scope.loading = false;
				});
		};

		$scope.show_video = function() {
			show_search_button();
			console.log("show_video function called");
			$scope.classHidden = "shown";
			$scope.classShown = "hidden";
		}

		$scope.show_search = function() {
			show_video_button();
			console.log("show_search function called");
			$scope.classHidden = "hidden";
			$scope.classShown = "shown";
		}

		function show_video_button() {
			$scope.search_button = false;
			$scope.video_button = true;
		}

		function show_search_button() {
			$scope.search_button = true;
			$scope.video_button = false;
		}

		$scope.sendMessage = function() {
			if ($scope.message.message == null) {
				console.log("No message");
			} else {
				//console.log($scope.message.message);
				$scope.message.sender = authentication.getUserObject().name;
				$scope.message.room = $routeParams.roomid;
				//console.log($scope.message);
				roomService.saveMessage($scope.message).success(function(data) {
					console.log(data);
					$scope.message.message = null;

					sukka.emit('msg', $routeParams.roomid);
				});
			}

		};

		$scope.isAdmin = function() {
			if (authentication.getUserObject()._id == $scope.room.admin) {
				console.log("admin");
				return true;
			} else {
				console.log("not admin");
				return false;
			}
		};

	}


})();