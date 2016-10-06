(function() {
	angular
		.module('TuneBox')
		.controller('homeCtrl', homeCtrl);

	homeCtrl.$inject = ['$scope', 'authentication', 'checkLogin'];

	function homeCtrl($scope, authentication, checkLogin) {
		/*if (authentication.isLoggedIn()) {
			checkLogin.showLoginUI();
		} else {
			checkLogin.showLogoutUI();
		}*/

	}
})();