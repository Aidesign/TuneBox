var express = require('express');
var router = express.Router();
//var ctrlVideos = require('../controllers/videos');
var ctrlAuth = require('../controllers/authentication');
var ctrlUsers = require('../controllers/users.controller');

// videos
/*router.post('/videos', ctrlVideos.videosCreate);
router.get('/videos', ctrlVideos.videosReadAll);
router.get('/videos/:videoid', ctrlVideos.videosReadOne);
router.put('/videos/:videoid', ctrlVideos.videosUpdateOne);
router.delete('/videos/:videoid', ctrlVideos.videosDeleteOne);
*/
router.get('/users', ctrlUsers.getAllUsers);
router.get('/users/:id', ctrlUsers.getUser);
router.put('/users/:id', ctrlUsers.editUser);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;