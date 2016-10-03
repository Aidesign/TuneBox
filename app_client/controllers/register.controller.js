(function() {
	angular
		.module('TuneBox')
		.controller('registerCtrl', registerCtrl);

	registerCtrl.$inject = ['$scope', 'authentication', '$location'];

	function registerCtrl($scope, authentication, $location) {
		if (authentication.isLoggedIn()) {
			$location.path('/');
		}

		$scope.register = function() {
			authentication.register($scope.user).success(function(res) {
				$location.path('/');
			}).error(function(res) {
				$scope.showError = true;
				$scope.error = res.message;
			});
		}
	}
})();