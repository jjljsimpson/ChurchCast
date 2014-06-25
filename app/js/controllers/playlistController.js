'use strict';

angular.module('churchCast')
    .controller('playlistController', ['$scope','$rootScope','PlaylistManager', '$log', 'ChromeCast',function ($scope,$rootScope, PlaylistManager, $log, ChromeCast) {

        $log.debug(" !!!!!!!!!!!!!!!!! Enter playlistController !!!!!!");

        $scope.pages = function()
        {
            return PlaylistManager.getPlaylist().songs.length;
        }

        $scope.currentSong = function()
        {
            var play = PlaylistManager.getPlaylist();

            var index = play.currentSong;
            var result = "(" + index + ")";

            if(index >= 0)
                result = play.songs[index].title + " " + result;

            return result
        }

        $scope.currentPage = function()
        {
            var play = PlaylistManager.getPlaylist();
            var result = "(" + play.currentPage + ")";

            var songIndex = play.currentSong;

            if(songIndex >= 0)
            {
                var sng = play.songs[songIndex];
                var pageIndex = play.currentPage;

                if(pageIndex >= 0)
                    result = sng.pages[pageIndex].title + " " + result;
            }
            return result;
        }


        $scope.moveSongForward = function()
        {
            var songNum = PlaylistManager.getPlaylist().currentSong;

            PlaylistManager.setSong(songNum+1, 0);
        }

        $scope.moveSongBackward = function()
        {
            var songNum = PlaylistManager.getPlaylist().currentSong;

            PlaylistManager.setSong(songNum-1, 0);
        }

        $scope.movePageForward = function()
        {
            var playlist = PlaylistManager.getPlaylist();
            var songNum = playlist.currentSong;
            var pageNum = playlist.currentPage;

            PlaylistManager.setSong(songNum, pageNum + 1);
        }

        $scope.movePageBackward = function()
        {
            var playlist = PlaylistManager.getPlaylist();
            var songNum = playlist.currentSong;
            var pageNum = playlist.currentPage;

            PlaylistManager.setSong(songNum, pageNum - 1);
        }


        $scope.loadPlaylist = function()
        {
            PlaylistManager.loadPlaylist("js/test/playlist_three.json");
        }


        $scope.addFakeSong = function()
        {
            PlaylistManager.loadSong("js/test/song_fake.json");
        }
        $scope.addLoveSong = function()
        {
            PlaylistManager.loadSong("js/test/song_loves_me.json");
        }
        $scope.addNeverSong = function()
        {
            PlaylistManager.loadSong("js/test/song_never_ends.json");
        }


    }]);
