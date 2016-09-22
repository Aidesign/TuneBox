var app = angular.module('TuneBox', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.view.html',
      controller: 'homeCtrl'
    })
    .when('/register', {
      templateUrl: 'partials/register.view.html',
      controller: 'registerCtrl'
    })
    .when('/login', {
      templateUrl: 'partials/login.view.html',
      controller: 'loginCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);