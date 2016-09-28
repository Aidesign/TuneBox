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

		return {
			createRoom : createRoom
		};

	}

})();