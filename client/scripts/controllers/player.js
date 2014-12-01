angular.module('app').controller('PlayerCtrl', ['$scope', function ($scope) {
    var url = "http://dash.edgesuite.net/dash264/TestCases/1b/thomson-networks/1/manifest.mpd";
    var context = new Dash.di.DashContext();
    var player = new MediaPlayer(context);
    player.startup();
    player.attachView(document.querySelector("#video-player"));
    player.attachSource(url);
}]);