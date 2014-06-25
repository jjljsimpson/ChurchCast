'use strict';

angular.module('churchCast.directives', [])
    .directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }])

    .directive('songContainer', [function()
    {
        return {
            restrict: 'A',
            scope:
            {
                song: '=',
                page: '='
            },
            templateUrl: 'js/directives/SongContainer.html',
            link: function (scope, element, attrs)
            {

            }
        };
    }]);