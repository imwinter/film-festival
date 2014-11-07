angular.module('app').controller('RegisterCtrl', ['$scope', '$http', '$location', 'AuthService', 'UserService', function ($scope, $http, $location, AuthService, UserService) {
    $scope.submitForm = function(isValid) {
        if (isValid) {
            if (AuthService.isAuthenticated) {
                $location.path("/gallery");
            }
            else {
                UserService.register($scope.email, $scope.password, $scope.passwordConfirm).success(function(data) {
                    $location.path("/login");
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
            
            }
        }
    }
}]);