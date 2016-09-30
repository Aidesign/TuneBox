(function() {
	angular
		.module('TuneBox')
		.service('profileService', profileService);

	profileService.$inject = ['$http'];

	function profileService($http) {
		var saveProfile = function(user) {
			var url = '/api/users/' + user._id;
			return $http.put(url, user);
		}

		return {
			saveProfile: saveProfile
		};	
	}
})();