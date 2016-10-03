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

			roomService.createRoom($scope.room).success(function(res) {
				$location.path('/browse');

			}).error(function(res) {
				console.log(res);
			});
		}

	}


})();