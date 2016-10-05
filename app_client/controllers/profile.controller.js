(function() {
	angular
		.module('TuneBox')
		.controller('profileCtrl', profileCtrl);

	profileCtrl.$inject = ['$scope', 'authentication', '$location', 'profileService', '$timeout'];

	function profileCtrl($scope, authentication, $location, profileService, $timeout) {
		if (!authentication.isLoggedIn()) $location.path('/');

		$scope.user = authentication.getUserObject();
		$scope.original = angular.copy(authentication.getUserObject());

		$scope.$watch('user', function(){
			if (!angular.equals($scope.original, $scope.user)) {
				$scope.edited = true;
			} else {
				$scope.edited = false;
			}
		}, true);

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
			}).error(function(err) {
				$scope.showError = true;
				$scope.error = err.message;
			});
		}

		$scope.cancel = function() {
			hideAndResetForms();
		}

		$scope.hideMessages = function() {
			$scope.showError = false;
			$scope.showSuccess = false;
		}

		// other functions
		var hideAndResetForms = function() {
			$scope.showError = false;
			$scope.editPersonalInfo = false;
			$scope.editOrganizationInfo = false;
			$scope.edited = false;
			$scope.user = authentication.getUserObject();
			$scope.original = angular.copy(authentication.getUserObject());
		}	
	}
})();