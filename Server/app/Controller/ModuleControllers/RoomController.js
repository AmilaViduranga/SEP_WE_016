var Modules = require('../../models/Models');
var Helper = require('../../models/Helper');
var Sequelize = require('sequelize');
var Appointment = Modules.Appointment;
var TimeSlot = Modules.TimeSlot;
var Room = Modules.Room;
var Faculty = Modules.Faculty;

RoomController = function(){
    /*
     * create room
     */
    this.createRoom = function(roomInstance, res) {
        return Room.create(roomInstance).then(function(response) {
            return res.send(response);
        });
    }

    /*
     * get all the available rooms
     */
    this.getAllRooms = function(res) {
        return Room.findAll({
            include: [{
                model: Faculty
            }]
        }).then(function(response) {
            return res.send(response);
        })
    }

    /*
     * delete the rooms
     * @roomid :- id of the room
     */
    this.deleteRoom = function(roomid, res) {
        return Room.find({
            where: {
                id: roomid
            }
        }).then(function(room) {
            return room.destroy().then(function(response) {
                return res.send(response);
            })
        })
    }
};
module.exports = new RoomController();
