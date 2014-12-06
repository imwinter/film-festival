angular.module('app').controller('MovieCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $http.get('/api/v1/movies?movieid=' + $routeParams.movieid).success(function(movie) {
        $scope.movie = movie;
    });
}]);