angular.module('appServices').factory('UserService', function($http) {
    return {
        login: function(email, password) {
            return $http.post('http://localhost:8080/user/login', {email: email, password: password});
        },
        logout: function() {
            return $http.get('http://localhost:8080/user/logout');
        },
        register: function(email, password, passwordConfirmation) {
            return $http.post('http://localhost:8080/user/register', { email: email, password: password, passwordConfirmation: passwordConfirmation });
        }
    }
});