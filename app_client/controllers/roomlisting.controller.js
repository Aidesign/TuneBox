(function() {
	angular
		.module('TuneBox')
		.controller("roomlistingCtrl", roomlistingCtrl);

	roomlistingCtrl.$inject = ['$scope', 'authentication', '$location', 'roomService', '$window'];

	function roomlistingCtrl($scope, authentication, $location, roomService, $window) {
		if (!authentication.isLoggedIn()) {
			$location.path('/');
		}
		var userMail = authentication.getUserInfo().email;
		roomService.getUserRooms(userMail).success(function (data){
			console.log(data);
			$scope.adminRooms = data;
		});

		$scope.goToRoom = function(_id){
			console.log('Tääl');
			$location.path("/room/"+_id);
			$window.location.reload();
		}

		roomService.getPublicRooms().success(function (data){
			$scope.publicRooms = data;
		});
		//console.log(userRooms);
	}
})();