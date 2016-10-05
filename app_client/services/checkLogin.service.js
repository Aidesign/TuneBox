(function() {
	angular
		.module('TuneBox')
		.service('checkLogin', checkLogin);

	checkLogin.$inject = [];

	function checkLogin() {
		
		this.loginData = {
			showLogin: true,
			showRegister: true,
			showLogout: false,
			showName : false,
			showBrowse : false,
			showCreateRoom : false
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

		this.setShowName = function(val){
			this.loginData.showName = val;
		};

		this.setShowBrowse = function(val){
			this.loginData.showBrowse = val;
		};

		this.setShowCreateRoom = function(val){
			this.loginData.showCreateRoom = val;
		};

		this.showLogoutUI = function(){
			this.setShowLogin(true);
			this.setShowRegister(true);
			this.setShowLogout(false);
			this.setShowName(false);
			this.setShowBrowse(false);
			this.setShowCreateRoom(false);
		}

		this.showLoginUI = function(){
			this.setShowLogin(false);
			this.setShowRegister(false);
			this.setShowLogout(true);
			this.setShowName(true);
			this.setShowBrowse(true);
			this.setShowCreateRoom(true);
		}

	}

})();