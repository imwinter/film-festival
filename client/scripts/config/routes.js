angular.module('app').config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider) {
  // Check if user is logged in.
  var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
    // Initialize a new promise.
    var deferred = $q.defer();

    // Make an AJAX call to check if the user is logged in.
    $http.get('/loggedin').success(function(user){
      if (user !== '0') { // Authenticated.
        $rootScope.isLoggedIn = true;
        $timeout(deferred.resolve, 0);
      }
      else { // Not Authenticated.
        $timeout(function(){
          deferred.reject();
        }, 0);
        $rootScope.isLoggedIn = false;
        $location.url('/login');
      }
    });

    return deferred.promise;
  }

  $httpProvider.interceptors.push('httpInterceptor');

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
    resolve: {
      loggedin: checkLoggedin
    }
  }).
  when('/player', {
    templateUrl: './../views/player.html',
    controller: 'PlayerCtrl',
    resolve: {
      loggedin: checkLoggedin
    }
  }).
  when('/account', {
    templateUrl: './../views/account.html',
    controller: 'AccountCtrl',
    resolve: {
      loggedin: checkLoggedin
    }
  }).
  when('/movie', {
    templateUrl: './../views/movie.html',
    controller: 'MovieCtrl',
    resolve: {
      loggedin: checkLoggedin
    }
  }).
  otherwise({
    redirectTo: '/'
  })
}]);