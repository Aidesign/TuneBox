(function() {
	angular
		.module('TuneBox')
		.controller('registerCtrl', registerCtrl);

	registerCtrl.$inject = ['$scope', 'authentication', '$location', 'checkLogin'];

	function registerCtrl($scope, authentication, $location, checkLogin) {
		if (authentication.isLoggedIn()) {
			$location.path('/');
		}

		$scope.register = function() {
			authentication.register($scope.user).success(function(res) {
				checkLogin.setShowLogin(false);
				checkLogin.setShowRegister(false);
				checkLogin.setShowLogout(true);
				$location.path('/');
			}).error(function(res) {
				$scope.error = res;
			});
		}
	}

})();