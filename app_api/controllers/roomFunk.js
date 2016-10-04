var mongoose = require('mongoose');
var Room = mongoose.model('Room');

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.getUserRooms = function(req, res) {

};

module.exports.getPublicRooms = function(req, res) {
	Room
		.find({
			public: true
		})
		.exec(function(err, room) {
			if (!room) {
				sendJSONresponse(res, 404, {
					"message": "No public rooms."
				});
				return;
			} else if (err) {
				sendJSONresponse(res, 404, err);
				return
			}
			sendJSONresponse(res, 200, room);
		});
};

module.exports.createRoom = function(req, res) {
	if (!req.body.name || !req.body.description || !req.body.tags) {
		sendJSONresponse(res, 400, {
			"message": "All fields required"
		});
		return;
	}

	var room = new Room();

	room.roomName = req.body.name;
	room.description = req.body.description;
	room.admin = req.body.admin;
	room.tags = req.body.tags;

	if (req.body.public){
		room.public = req.body.public;
	} else {
		room.public = false;
	}

	room.save(function(err) {
		if (err) {
			sendJSONresponse(res, 400, {
				"message": err //"Room name already in use, please select another name."
			});
		} else {
			sendJSONresponse(res, 200, {
				"message": ("Created room " + req.body.name)
			});
		}
	});
};