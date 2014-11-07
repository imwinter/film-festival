angular.module('app').config(['$locationProvider', '$routeProvider', function($location, $routeProvider) {
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
    controller: 'GalleryCtrl',
    access: { requiredAuthentication: true }
  }).
  when('/player', {
    templateUrl: './../views/player.html',
    controller: 'PlayerCtrl',
    access: { requiredAuthentication: true }
  }).
  when('/account', {
    templateUrl: './../views/account.html',
    controller: 'AccountCtrl',
    access: { requiredAuthentication: true }
  }).
  otherwise({
    redirectTo: '/'
  })
}]);

angular.module('app').config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('TokenInterceptor');
}]);