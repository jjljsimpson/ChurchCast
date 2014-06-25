'use strict';


// Declare app level module which depends on filters, and services
angular.module('churchCast', [
  'ngRoute',
  'churchCast.filters',
  'churchCast.directives'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/blank', {templateUrl: 'views/blank.html', controller: 'blankController'});
  $routeProvider.when('/playlist', {templateUrl: 'views/playlist.html', controller: 'playlistController'});
  $routeProvider.when('/song', {templateUrl: 'views/song.html', controller: 'songController'});
  $routeProvider.otherwise({redirectTo: '/blank'});
}]);


angular.module('churchCast').run(['$rootScope','$http', function($rootScope,$http) {
    //Create a 3 songs to test
    $rootScope.globals = {};
    $rootScope.globals.playlist = {"title":"empty", "songs":null, "currentSong":-1, "currentPage":-1};
}]);

/*

- Host on github
- Create message events from chromecast
- Debug

Playlist
    - title
    - currentSong (index into songs)
    - currentPage (index into page for song)
    - songs (an array of song objects)

Song
    - title
    - defaultBackground (image used for background, each page can override)
    - url
    - songIndex
    - pages (an array of page objects)

Page
    - title
    - background (image used for background)
    - lines (array of strings. There is a page break between each item)


 */