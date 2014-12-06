angular.module('app').controller('PlayerCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $http.get('/api/v1/movies?movieid=' + $routeParams.movieid).success(function(movie) {
        var url = movie.link;
        var context = new Dash.di.DashContext();
        var player = new MediaPlayer(context);
        player.startup();
        player.attachView(document.querySelector("#video-player"));
        player.attachSource(url); 
    });
}]);