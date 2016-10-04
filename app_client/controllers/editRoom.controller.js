(function() {
	angular
		.module('TuneBox')
		.controller('editRoomCtrl', editRoomCtrl);

	editRoomCtrl.$inject = ['authentication', '$location', '$routeParams', 'roomService', '$scope', '$timeout'];

	function editRoomCtrl(authentication, $location, $routeParams, roomService, $scope, $timeout) {
		if (!authentication.isLoggedIn()) $location.path('/');

		roomService.getRoom($routeParams.roomId).success(function(room) {
			$scope.room = room;
			$scope.original = angular.copy(room);
			$scope.edited = true;
			$scope.$watch('room', function() {
				if (!angular.equals($scope.room, $scope.original)) {
					$scope.edited = false;
				} else {
					$scope.edited = true;	
				}
			}, true);
		}).error(function(err) {
			console.log(err);
		});

		// scope functions
		$scope.save = function() {
			var tags = roomService.filterDublicateTags($scope.room.tags);
			$scope.room.tags = tags; // parempi tapa tehdä tämä?
			roomService.editRoom($scope.room).success(function(room) {
				$scope.room = room;
				$scope.showError = false;
				$scope.showSuccess = true;
				$timeout(function() { $scope.showSuccess= false; }, 3000);
			}).error(function(err) {
				$scope.error = err.message;
				$scope.showError = true;
			});
		}

		$scope.cancel = function() {
			$location.path('/');
		}
	}
})();