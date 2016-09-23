var app = angular.module('TuneBox', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html'
				//controller: ''
		})
		.when('/room', {
			templateUrl: 'partials/room.html',
			//controller: 'RoomCtrl'
		})
		.when('/create-room', {
			templateUrl: 'partials/create-room.html',
			//controller: 'RoomCreationCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);