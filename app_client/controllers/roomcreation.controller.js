(function() {
	angular
		.module('TuneBox')
		.controller("roomcreationCtrl", roomcreationCtrl);

	roomcreationCtrl.$inject = ['$scope', 'authentication', '$location', 'roomService'];

	function roomcreationCtrl($scope, authentication, $location, roomService) {
		if (!authentication.isLoggedIn()) {
			$location.path('/');
		}

		$scope.createRoom = function() {
			
			var mail = authentication.getUserInfo().email;
			/*$scope.room = $scope.room.concat([{
				admin: userName
			}]);*/
			$scope.room.admin = mail;

			var tags = $scope.room.tags;
			var cleanedTags = [];

		
			tags.forEach(function (string){
				console.log(string);
				var found = false;

				if (cleanedTags.length == 0){
					cleanedTags.push(string);
				}

				cleanedTags.forEach(function(str){
					console.log("toka");
					if (string === str){
						console.log("found");
						found = true;
					}
				});

				if (!found){
					cleanedTags.push(string);
				}
			});

			console.log(cleanedTags);

			$scope.room.tags = cleanedTags;

			roomService.createRoom($scope.room).success(function(res) {
				$location.path('/');

			}).error(function(res) {
				console.log(res);
			});
		}

	}


})();