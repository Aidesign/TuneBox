(function() {
	angular
		.module('TuneBox')
		.controller("roomCtrl", roomCtrl);

	roomCtrl.$inject = ['$scope', 'authentication', '$location', '$routeParams', 'roomService',
		'$http', '$log', 'youtubeService', '$window'
	];

	function roomCtrl($scope, authentication, $location, $routeParams, roomService, $http, $log, youtubeService, $window) {

		if (!authentication.isLoggedIn()) {
			$location.path('/');
		}

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
				launchVideo(vRoom.currentVideo, true);
				getMessages();

			});

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

		function changeDBVideo(video){
			roomService.changeVideo($routeParams.roomid, video).success(function(data){
				sukka.emit('changeVideo', $routeParams.roomid);
			});
		}

		function changePlaying(){
			roomService.getRoom($routeParams.roomid).success(function(data) {
				console.log(data);
				vRoom = data;
				launchVideo(vRoom.currentVideo, true);
			});
		}

		function launchVideo(video, archive){
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

		}

	}


})();