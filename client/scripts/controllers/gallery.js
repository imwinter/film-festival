angular.module('app').controller('GalleryCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.message = 'Gallery';

    // TODO

    $scope.users = [];
    // Fill the array to display it in the page
    $http.get('/api/v1/users').success(function(users){
        for (var i in users) {
          $scope.users.push(users[i]);
      }
    });
}]);