angular.module('app').config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: './views/home.html',
    controller: 'HomeCtrl'
  }).
  when('/login', {
    templateUrl: './../views/login.html',
    controller: 'LoginCtrl'
  }).
  when('/register', {
    templateUrl: './../views/register.html',
    controller: 'RegisterCtrl'
  }).
  when('/gallery', {
    templateUrl: './../views/gallery.html',
    controller: 'GalleryCtrl'
  }).
  when('/player', {
    templateUrl: './../views/player.html',
    controller: 'PlayerCtrl'
  }).
  when('/account', {
    templateUrl: './../views/account.html',
    controller: 'AccountCtrl'
  }).
  otherwise({
    redirectTo: '/'
  })
}]);