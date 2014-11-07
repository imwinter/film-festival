angular.module('app').controller('RegisterCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.submitForm = function(isValid) {
        if (isValid) {
            $http.put('http://localhost:8080/register', { email:$scope.email, password:$scope.password }).
            success(function(data, status, headers, config) {
                console.log('Success!');
            }).
            error(function(data, status, headers, config) {
                console.log('Fail!');
            });
        }
    }
}]);