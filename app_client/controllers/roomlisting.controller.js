(function() {
	angular
		.module('TuneBox')
		.controller("roomlistingCtrl", roomlistingCtrl);

	roomlistingCtrl.$inject = ['$scope', 'authentication', '$location', 'roomService'];

	function roomlistingCtrl($scope, authentication, $location, roomService) {
		if (!authentication.isLoggedIn()) {
			$location.path('/');
		}
		var userMail = authentication.getUserInfo().email;
		roomService.getUserRooms(userMail).success(function (data){
			console.log(data);
			$scope.adminRooms = data;
		});

		roomService.getPublicRooms().success(function (data){
			$scope.publicRooms = data;
		});
		//console.log(userRooms);
		


	}


})();