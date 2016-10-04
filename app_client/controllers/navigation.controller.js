(function() {
	angular
		.module('TuneBox')
		.controller('navigationCtrl', navigationCtrl);

	navigationCtrl.$inject = ['$scope', 'authentication', '$location'];

	function navigationCtrl($scope, authentication, $location) {
		if (info = authentication.getUserInfo()) {
			$scope.showLogin = false;
			$scope.test = 'Current user: ' + info.email;
		} else {
			$scope.showLogin = true;
		}

		$scope.logout = function() {
			authentication.logout();
			$scope.test = 'logged out!';
			$scope.showLogin = true;
			$location.path('/');
		}
	}
})();