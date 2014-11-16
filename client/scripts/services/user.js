angular.module('appServices').factory('UserService', function($http, $location, $window, AuthService) {
    var userServices = {
        login: function(email, password) {
            return $http.post('http://localhost:8080/user/login', { email: email, password: password });
        },
        register: function(email, password, passwordConfirmation) {
            return $http.post('http://localhost:8080/user/register', { email: email, password: password, passwordConfirmation: passwordConfirmation });
        },
        loginForm: function(isValid, email, password) {
            if (isValid) {
                if (email != null && password != null) {
                    userServices.login(email, password).success(function(data) {
                    AuthService.isAuthenticated = true;
                    $window.sessionStorage.token = data.token;
                    $location.path("/gallery");
                    }).error(function(status, data) {
                        console.log(status);
                        console.log(data);
                    });
                }
            }
        },
        registerForm: function(isValid, email, password, passwordConfirm) {
            if (isValid) {
                if (AuthService.isAuthenticated) {
                    $location.path("/gallery");
                }
                else {
                    userServices.register(email, password, passwordConfirm).success(function(data) {
                        $location.path("/login");
                    }).error(function(status, data) {
                        console.log(status);
                        console.log(data);
                    });
                }
            }
        },
        logout: function() {
            return $http.get('http://localhost:8080/user/logout');
        }
    };

    return userServices;
});