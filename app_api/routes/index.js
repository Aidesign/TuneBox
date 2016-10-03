var express = require('express');
var router = express.Router();
//var ctrlVideos = require('../controllers/videos');
var ctrlAuth = require('../controllers/authentication');
var roomFunctions = require('../controllers/roomFunk');

// videos
/*router.post('/videos', ctrlVideos.videosCreate);
router.get('/videos', ctrlVideos.videosReadAll);
router.get('/videos/:videoid', ctrlVideos.videosReadOne);
router.put('/videos/:videoid', ctrlVideos.videosUpdateOne);
router.delete('/videos/:videoid', ctrlVideos.videosDeleteOne);
*/

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.get('/rooms', roomFunctions.getPublicRooms);
router.get('/rooms/:userMail', roomFunctions.getUserRooms);
router.post('/createRoom', roomFunctions.createRoom);
router.get('/room/:roomid/', roomFunctions.getRoom);

module.exports = router;