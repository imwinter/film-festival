angular.module('app').controller('NavCtrl', ['$scope', '$rootScope', 'UserService', function ($scope, $rootScope, UserService) {
    $scope.isLoggedIn = $rootScope.isLoggedIn;

    $scope.logout = function() {
        UserService.logout();
    }
}]);