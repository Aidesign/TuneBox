(function() {
	angular
	.module('TuneBox')
	.controller('navigationCtrl', navigationCtrl);

	navigationCtrl.$inject = ['$scope', 'authentication', 'checkLogin'];

	function navigationCtrl($scope, authentication, checkLogin) {
		/*if (info = authentication.getUserInfo()) {
			$scope.showLogin = false;
			$scope.test = 'Current user: ' + info.email;
		} else {
			$scope.showLogin = true;
		}

		$scope.logout = function() {
			authentication.logout();
			$scope.test = 'logged out!';
			$scope.showLogin = true;
		}*/

		if(!authentication.isLoggedIn()){
			$scope.loginData = checkLogin.getAll();
		} else {
			$scope.loginData = checkLogin.getAll();
			checkLogin.setShowLogin(false);
			checkLogin.setShowRegister(false);
			checkLogin.setShowLogout(true);
		}

		$scope.logout_function = function(){
			console.log("logout function");
			authentication.logout();
			checkLogin.setShowLogin(true);
			checkLogin.setShowRegister(true);
			checkLogin.setShowLogout(false);
			$location.path('/');
		}
	}
})();