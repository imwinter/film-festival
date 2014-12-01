angular.module('app').factory('httpInterceptor', function($q, $location) {
    return {
      'response': function(response) {
        return response;
      },
     'responseError': function(rejection) {
        if (rejection.status === 401) {
          $location.url('/login');
        }
        return $q.reject(rejection);
      }
    }
});