angular.module('app').controller('NavCtrl', ['$scope', 'UserService', 'AuthService', function ($scope, UserService, AuthService) {
    $scope.isLoggedIn = AuthService.isAuthenticated;

    $scope.logout = function() {
        UserService.logout();
    }
}]);