(function() {
	angular
		.module('TuneBox')
		.controller('profileCtrl', profileCtrl);

	profileCtrl.$inject = ['$scope', 'authentication', '$location', 'profileService', '$timeout'];

	function profileCtrl($scope, authentication, $location, profileService, $timeout) {
		if (!authentication.isLoggedIn()) {
			$location.path('/');
		}

		$scope.user = authentication.getUserObject()

		// scope functions
		$scope.edit = function(form) {
			hideAndResetForms();
			switch(form) {
				case 'personalInfo':
					$scope.editPersonalInfo = true;
					break;

				case 'organizationInfo':
					$scope.editOrganizationInfo = true;
					break;
			}
		}

		$scope.save = function(form) {
			profileService.saveProfile($scope.user).success(function(data) {
				authentication.saveToken(data.token);
				$scope.showSuccess = true;
				hideAndResetForms();
				$timeout(function() { $scope.showSuccess= false; }, 4000);
			}).error(function(data) {
				$scope.showError = true;
				$scope.error = data.message;
			});
		}

		$scope.cancel = function() {
			hideAndResetForms();
		}

		// other functions
		var hideAndResetForms = function() {
			$scope.showError = false;
			$scope.editPersonalInfo = false;
			$scope.editOrganizationInfo = false;
			$scope.user = authentication.getUserObject();
		}	
	}
})();