(function() {
	angular
		.module('TuneBox')
		.service('authentication', authentication);

	authentication.$inject = ['$window', '$http'];

	function authentication($window, $http) {
		var saveToken = function(token) {
			$window.localStorage['tunebox-token'] = token;
		};

		var getToken = function() {
			return $window.localStorage['tunebox-token'];
		};

		var logout = function() {
			$window.localStorage.removeItem('tunebox-token');
		};

		var login = function(user) {
			return $http.post('api/login', user).success(function(data) {
				saveToken(data.token);
			});
		};

		var register = function(user) {
			return $http.post('api/register', user).success(function(data) {
				saveToken(data.token);
			});
		};

		var isLoggedIn = function() {
			var token = getToken();
			if (token) {
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload.exp > Date.now() / 1000;
			} else {
				return null;
			}
		};

		var getUserInfo = function() {
			if (isLoggedIn()) {
				var token = getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));
				return payload;
			} else {
				return false;
			}
		}

		return {
			saveToken: saveToken,
			getToken: getToken,
			logout: logout,
			login: login,
			register: register,
			isLoggedIn: isLoggedIn,
			getUserInfo: getUserInfo
		};
	}

})();