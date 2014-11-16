angular.module('app').controller('LoginCtrl', ['$scope', 'UserService', function ($scope, UserService) {
    $scope.submitForm = UserService.loginForm;

    // TODO
}]);