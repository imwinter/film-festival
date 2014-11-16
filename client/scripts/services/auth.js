angular.module('appServices').factory('AuthService', function() {
    var auth = {
        isAuthenticated: false
    };

    return auth;
});