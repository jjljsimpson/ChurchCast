'use strict';

angular.module('churchCast').service('PlaylistManager', function($http, $rootScope, $location, $log) {

    var self = this;
    $rootScope.globals.playlist = {"title":"empty", "songs":[], "currentSong":-1, "currentPage":-1};    //same as reset, but that is declared later
    var external = $rootScope.globals.playlist;

    $log.debug(" !!!!!!!!!!!!!!!!!   enter into PlaylistManager !!!!!!");


    //---------------------------
    //Gets the playlist information
    this.getPlaylist = function()
    {
        return external;
    };


    //---------------------------
    //Clear the playlist
    this.reset = function()
    {
        external.title = "empty";
        external.songs = [];
        external.currentSong = -1;
        external.currentPage = -1;
    }


    //---------------------------
    this.reloadSong = function(index)
    {
        var song = external.songs[index];
        self.loadSong(song.url, index);
    }

    //---------------------------
    this.loadPlaylist = function(url)
    {
        $http.get(url).success(self.onLoadPlaylist);
    }


    //---------------------------
    //Load a song from a url
    this.loadSong = function(url, index)
    {
        $http.get(url).success(
            function(data)
            {
                var parsedJSON = data;
                self.addSong(parsedJSON, url, index);
            }
        );
    }


    //---------------------------
    this.onLoadSong = function(data)
    {
        var parsedJSON = data;

        self.addSong(parsedJSON);
    }


    //---------------------------
    this.onLoadPlaylist = function(data)
    {
        var parsedJSON = data;

        //clear the playlist
        self.reset();

        //set the title
        external.title = data.title;
        external.currentSong = -1;
        external.currentPage = -1;

        //Loop through and add songs
        for(var i=0; i<data.songs.length; i++)
        {
            self.loadSong(data.songs[i], i);
        }

    }






    this.addSong = function(newSong, url, songIndex)
    {
        if(songIndex == undefined)
            songIndex = -1;

        //If songs is null, reset
        if(external == null)
            self.reset();

        newSong.url = url;
        newSong.songIndex = songIndex;

        //First validate the song
        if(self.validateSong(newSong))
        {
            if(songIndex < 0)
                external.songs.push(newSong);
            else
                external.songs[songIndex] = newSong;

            if(external.currentSong < 0)
                external.currentSong = 0;

            if(external.currentPage < 0)
                external.currentPage = 0;
        }
    }


    this.setSong = function(index, page)
    {
        //Make sure we aren't past the end
        if(index >= external.songs.length || index < 0)
            return;

        //Validate the page, and then go to it.
        var song = external.songs[index];

        if(self.validateSong(song))
        {
            //Make sure the page exists
            var sng = external.songs[index];

            if(page >= 0 && page <sng.pages.length)
            {
                external.currentSong = index;
                external.currentPage = page;
            }
        }

    }


    this.validatePage = function(page, defaultBackground)
    {
        //A page has a title and some lines
        if(page != null && page.title != null && page.lines != null && page.lines.length >= 0) {
            if(page.background == null || page.background == undefined || page.background.length == 0)
                page.background = defaultBackground;
            return true;
        }
        else
            return false;
    }


    this.validateSong = function(song)
    {
        var result = true;

        //First validate the song.
        // A song has a title and an array of pages

        //Song isn't null
        if(song != null)
        {
            //Song has a title and pages
            if(song.title != null && song.pages != null)
            {
                //Make sure pages isn't empty
                if(song.pages.length != null && song.pages.length > 0)
                {
                    //Loop through and validate the pages
                    for(var i=0; i<song.pages.length; i++)
                    {
                        result = result && self.validatePage(song.pages[i], song.defaultBackground);
                    }
                    return result;
                }
                else
                {
                    result = false;
                }
            }
            else
            {
                result = false;
            }
        }
        else
        {
            result = false;
        }

        return result;
    }

});
