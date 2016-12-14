'use strict';

/**
 * @ngdoc service
 * @name armsAngularApp.Rooms/room
 * @description
 * # Rooms/room
 * Factory in the armsAngularApp.
 */
angular.module('armsAngularApp')
    .factory('RoomService', ['$http','CONFIG',function ($http, CONFIG) {
        // Service logic
        // ...
        var baseUrl = CONFIG.BASE_URL;
        var meaningOfLife = 42;

        // Public API here
        var RoomService = {};

        /*
         * create rooms
         * @roomInstance:- the new created rooms
         */
        RoomService.createRoom = function(roomInstance) {
            return $http({
                method:'post',
                url: baseUrl + 'room',
                data: roomInstance
            }).then(function(response) {
                return response;
            });
        }

        /*
         * get all the available rooms
         */
        RoomService.getAllRooms = function() {
            return $http({
                method: 'get',
                url: baseUrl + 'room'
            }).then(function(data) {
                return data;
            })
        }

        /*
         * delete the room
         * @id :- id of the room
         */
        RoomService.deleteRoom = function(roomid) {
            return $http({
                method: 'delete',
                url: baseUrl + 'room/'+roomid
            }).then(function(data) {
                return data;
            })
        }

        return RoomService;
    }]);
