(function() {
	angular
		.module('TuneBox')
		.service('checkLogin', checkLogin);

	checkLogin.$inject = [];

	function checkLogin() {
		
		this.loginData = {
			showLogin: true,
			showRegister: true,
			showLogout: false
		};

		this.getAll = function() {
			return this.loginData;
		};

		this.setShowLogin = function(val){
			this.loginData.showLogin = val;
		};

		this.setShowRegister = function(val){
			this.loginData.showRegister = val;
		};

		this.setShowLogout = function(val){
			this.loginData.showLogout = val;
		};

	}

})();