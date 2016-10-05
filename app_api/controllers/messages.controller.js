var mongoose = require('mongoose');
var Message = mongoose.model('Message');

var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.saveMessage = function(req, res) {
	if (!req.body.sender || !req.body.message || !req.body.room) {
		sendJSONresponse(res, 400, {
			"message": "Invalid message"
		});
		return;
	}

	var msg = new Message();

	msg.sender = req.body.sender;
	msg.message = req.body.message;
	msg.time = Date.now();
	msg.room = req.body.room;

	msg.save(function(err) {
		if (err) {
			sendJSONresponse(res, 400, {
				"message": err //"Room name already in use, please select another name."
			});
		} else {
			sendJSONresponse(res, 200, {
				"message": ("Sent message: " + req.body.message)
			});
		}
	});


}