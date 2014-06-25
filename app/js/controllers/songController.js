'use strict';

angular.module('churchCast')
    .controller('songController', ['$scope','$rootScope','$log', 'PlaylistManager', 'ChromeCast', function ($scope,$rootScope, $log, PlaylistManager, ChromeCast) {

        $log.debug(" !!!!!!!!!!!!!!!!! Enter songController !!!!!!");

        //Put logic here which creates a song, then passes it into the song container

        $scope.getCurrentSong = function()
        {
            var result = null;

            var play = PlaylistManager.getPlaylist();

            if(play != null && play.songs != null && play.songs.length != null)
            {
                if(play.currentSong >= 0 && play.currentSong < play.songs.length)
                {
                    result = play.songs[play.currentSong];
                }
            }

            return result;
        }


        $scope.getCurrentPage = function()
        {
            return PlaylistManager.getPlaylist().currentPage;
        }

    }]);