var mongoose = require('mongoose');
var Room = mongoose.model('Room');

var sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.createRoom = function(req, res){
	Room.create({
		roomName: req.body.name,
		description: req.body.description,
		
	})
}