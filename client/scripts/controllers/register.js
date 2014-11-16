angular.module('app').controller('RegisterCtrl', ['$scope', 'UserService', function ($scope, UserService) {
    $scope.submitForm = UserService.registerForm;
}]);