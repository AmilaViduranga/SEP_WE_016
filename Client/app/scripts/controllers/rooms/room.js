'use strict';

/**
 * @ngdoc function
 * @name armsAngularApp.controller:RoomsRoomCtrl
 * @description
 * # RoomsRoomCtrl
 * Controller of the armsAngularApp
 */
angular.module('armsAngularApp')
    .controller('RoomsRoomCtrl',['$scope', 'facultyService', 'RoomService',function ($scope, facultyService, RoomService) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.faculties = null;
        $scope.availableRooms = null;
        /*
         * create room
         */
        $scope.submitRoomForm = function() {
            if(!$scope.RoomName || !$scope.roomFaculty) {
                alert("please fill the empty fields before submiting");
            } else {
                var roomInstance = {
                    roomName : $scope.RoomName,
                    FacultyId : $scope.roomFaculty
                }
                return RoomService.createRoom(roomInstance).then(function(response) {
                    if (response.status === 200) {
                        swal('success', "insert new room", 'success');
                        getAllRooms();
                    } else {
                        swal('Error', 'Not inserted record', 'error');
                    }
                })
            }
        }

        /*
         * delete rooms
         * @id : - id of the room
         */
        $scope.deleteRoom = function(roomId) {
            swal({
                title: "Are You sure to delete this room ",
                text: "After you delete this you have to add it again if you want",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: true
            },function() {
                return RoomService.deleteRoom(roomId).then(function(response) {
                    if (response.status === 200) {
                        swal('success', "delete room", 'success');
                        getAllRooms();
                    } else {
                        swal('Error', 'Not inserted record', 'error');
                    }
                })
            })
        }

        /*
         * get all the faculties
         */
        function getAllFaculties() {
            facultyService.getAllFacultyDetails().then(function(response) {
                $scope.faculties = response.data;
            });
        }

        function getAllRooms() {
            RoomService.getAllRooms().then(function(response) {
                $scope.availableRooms = response.data;
            })
        }

        getAllFaculties();
        getAllRooms();
    }]);
