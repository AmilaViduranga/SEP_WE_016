/**
 * Created by User on 12/14/2016.
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');
var Room = ControllerMap.RoomController;

router.post('/', function(req, res, next) {
    Room.createRoom(req.body, res);
})

router.get('/', function(req, res, next) {
    Room.getAllRooms(res);
});

router.delete('/:id', function(req, res, next) {
    Room.deleteRoom(req.params.id, res);
})
module.exports = router;