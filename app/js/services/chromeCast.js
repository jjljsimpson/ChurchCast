'use strict';

angular.module('churchCast').service('ChromeCast', function($http, $rootScope, $location, $log, PlaylistManager, $window) {
    console.log(" !!!!!!!!!!!!!!!!!   enter into chromecast !!!!!!");

    var self = this;
    var appConfig = null;
    var castReceiverManager = null;
    var castMessageBus = null;


    this.startChromecast = function()
    {
        console.log("---- Starting chromecast ----");

        //Create app config
        self.appConfig = new cast.receiver.CastReceiverManager.Config();
        self.appConfig.statusText = 'Ready to play';
        self.appConfig.maxInactivity = 6000;

        //Create cast manager
        self.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

        //Setup event listener
        self.castMessageBus = self.castReceiverManager.getCastMessageBus('urn:x-cast:com.jjsimpson.churchcast');
        self.castMessageBus.onMessage = self.onMessage;

        //Start chromecast
        console.log("--- chromecast.start ----");
        self.castReceiverManager.start(self.appConfig);

    }


    this.onMessage = function(event)
    {
        console.log("---- Got message");
        console.log(event);
    }


//    self.startChromecast();


});
