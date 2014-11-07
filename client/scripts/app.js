angular.module('app', ['ngRoute', 'appServices']);
angular.module('appServices', []);

angular.module('app').run(['$rootScope', '$location', '$window', 'AuthService', function($rootScope, $location, $window, AuthService) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        // Redirect only if both isAuthenticated is false and no token is set.
        if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication && !AuthService.isAuthenticated && !$window.sessionStorage.token) {
            $location.path("/login");
        }
    });
}]);