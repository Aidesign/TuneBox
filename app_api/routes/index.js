var express = require('express');
var router = express.Router();
var ctrlAuth = require('../controllers/authentication');
var ctrlUsers = require('../controllers/users.controller');
var roomFunctions = require('../controllers/roomFunk');

// Users
router.get('/users', ctrlUsers.getAllUsers);
router.get('/users/:id', ctrlUsers.getUser);
router.put('/users/:id', ctrlUsers.editUser);

// Auth
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// Rooms
router.get('/rooms', roomFunctions.getPublicRooms);
router.get('/rooms/:userMail', roomFunctions.getUserRooms);
router.post('/createRoom', roomFunctions.createRoom);
router.get('/room/:roomid/', roomFunctions.getRoom);
router.put('/room/:roomId', roomFunctions.editRoom);

module.exports = router;