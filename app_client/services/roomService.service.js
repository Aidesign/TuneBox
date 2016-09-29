(function() {
	angular
		.module('TuneBox')
		.service('roomService', roomService);

	roomService.$inject = ['$window', '$http'];

	function roomService($window, $http) {
		
		var createRoom = function(room){
			return $http.post('api/createRoom', room).success(function(data){
				console.log(data);
			});
		};

		var getUserRooms = function(userMail){
			console.log(userMail);
			return $http.get('api/rooms/'+userMail).success(function(data){
				//console.log(data);		
			});
		}

		var getPublicRooms = function(){
			return $http.get('api/rooms').success(function(data){

			});
		}

		return {
			createRoom : createRoom,
			getUserRooms: getUserRooms,
			getPublicRooms: getPublicRooms
		};

	}

})();