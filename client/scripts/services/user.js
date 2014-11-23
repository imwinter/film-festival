angular.module('appServices').factory('UserService', function($rootScope, $http, $location, $window) {
    var userServices = {
        login: function(email, password) {
            return $http.post('http://localhost:8080/login', { email: email, password: password });
        },
        register: function(email, password, passwordConfirmation) {
            return $http.post('http://localhost:8080/register', { email: email, password: password, passwordConfirmation: passwordConfirmation });
        },
        logout: function() {
            return $http.post('http://localhost:8080/logout').success(function(status) {
                $rootScope.isLoggedIn = false;
                $location.url('/login');
            });
        },
        loginForm: function(isValid, email, password) {
            if (isValid) {
                if (email != null && password != null) {
                    userServices.login(email, password)
                    .success(function(user) {
                        $rootScope.isLoggedIn = true;
                        $location.path("/gallery");
                    }).error(function(status, data) {
                        console.log(status);
                        console.log(data);
                        $location.url('/login');
                    });
                }
            }
        },
        registerForm: function(isValid, email, password, passwordConfirm) {
            if (isValid) {
                if ($rootScope.isLoggedIn) {
                    $location.path("/gallery");
                }
                else {
                    userServices.register(email, password, passwordConfirm)
                    .success(function(data) {
                        $location.path("/login");
                    }).error(function(status, data) {
                        console.log(status);
                        console.log(data);
                    });
                }
            }
        }
    };

    return userServices;
});