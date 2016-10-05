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

		var getRoom = function(_id){
			return $http.get('api/room/'+_id).success(function(data){
			});
		}

		var editRoom = function(room) {
			var url = '/api/room/' + room._id;
			return $http.put(url, room);
		}

		var filterDublicateTags = function(tags) {
			var cleanedTags = [];
			tags.forEach(function(string) {
				var found = false;
				if (cleanedTags.length == 0) cleanedTags.push(string);

				cleanedTags.forEach(function(str) {
					if (string === str) {
						found = true;
					}
				});
				if (!found) {
					cleanedTags.push(string);
				}
			});
			return cleanedTags;
		}

		var saveMessage = function(message){
			return $http.post('api/saveMessage', message).success(function(data){
				console.log(data);
			});
		}

		return {
			createRoom : createRoom,
			getUserRooms: getUserRooms,
			getPublicRooms: getPublicRooms,
			getRoom: getRoom,
			editRoom: editRoom,
			filterDublicateTags: filterDublicateTags
		};
	}
})();