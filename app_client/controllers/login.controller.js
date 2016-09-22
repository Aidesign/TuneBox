(function() {
	angular
		.module('TuneBox')
		.controller('loginCtrl', loginCtrl);

	loginCtrl.$inject = ['$scope', 'authentication', '$location'];

	function loginCtrl($scope, authentication, $location) {
		if (authentication.isLoggedIn()) {
			$location.path('/');
		}

		$scope.error = '';

		$scope.login = function() {
			authentication.login($scope.user).success(function(res) {
				$location.path('/');
			}).error(function(res) {
				$scope.error = res.message;
			});
		}
	}
})();