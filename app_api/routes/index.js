var express = require('express');
var router = express.Router();
var ctrlAuth = require('../controllers/authentication');
var roomFunctions = require('../controllers/roomFunk');

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.get('/rooms', roomFunctions.getPublicRooms);
router.get('/rooms/:userid', roomFunctions.getUserRooms);
router.post('/createRoom', roomFunctions.createRoom);

module.exports = router;