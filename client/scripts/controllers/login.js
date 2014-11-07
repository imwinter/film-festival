angular.module('app').controller('LoginCtrl', ['$scope', '$window', '$location', 'UserService', 'AuthService', function ($scope, $window, $location, UserService, AuthService) {
    $scope.submitForm = function(isValid) {
        if (isValid) {
            if ($scope.email != null && $scope.password != null) {
                UserService.login($scope.email, $scope.password).success(function(data) {
                    AuthService.isAuthenticated = true;
                    $window.sessionStorage.token = data.token;
                    $location.path("/gallery");
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
            }
        }
    }
}]);