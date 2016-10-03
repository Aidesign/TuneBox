(function() {
	angular
		.module('TuneBox')
		.controller("roomCtrl", roomCtrl);

	roomCtrl.$inject = ['$scope', 'authentication', '$location', '$routeParams', 'roomService'];

	function roomCtrl($scope, authentication, $location, $routeParams, roomService) {
		console.log("tsek");
		if (!authentication.isLoggedIn()) {			
			$location.path('/');
		}
		console.log($routeParams.roomid);
		var vRoom;
		roomService.getRoom($routeParams.roomid).success(function (data){
			console.log(data);
			vRoom = data;
			$scope.room = vRoom;
			console.log($scope.room.roomName);

		});



		//console.log(Room);

	}


})();