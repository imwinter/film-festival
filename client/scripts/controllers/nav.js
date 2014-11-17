angular.module('app').controller('NavCtrl', ['$scope', 'UserService', function ($scope, UserService) {
    $scope.logout = function() {
        UserService.logout();
    }
}]);