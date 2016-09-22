var app = angular.module('TuneBox', ['ngResource', 'ngRoute', 'onsen']);

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
		.otherwise({
			redirectTo: '/'
		});
}]);


