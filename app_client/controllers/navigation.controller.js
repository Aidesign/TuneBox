(function() {
	angular
	.module('TuneBox')
	.controller('navigationCtrl', navigationCtrl);

	navigationCtrl.$inject = ['$scope', 'authentication', 'checkLogin'];

	function navigationCtrl($scope, authentication, checkLogin) {

		if(!authentication.isLoggedIn()){
			$scope.loginData = checkLogin.getAll();
		} else {
			$scope.loginData = checkLogin.getAll();
			checkLogin.setShowLogin(false);
			checkLogin.setShowRegister(false);
			checkLogin.setShowLogout(true);
			checkLogin.setShowName(true);
		}

		$scope.logout_function = function(){
			console.log("logout function");
			authentication.logout();
			checkLogin.setShowLogin(true);
			checkLogin.setShowRegister(true);
			checkLogin.setShowLogout(false);
			checkLogin.setShowName(false);
			$location.path('/');
		}
	}
})();