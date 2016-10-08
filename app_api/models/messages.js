var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
	sender: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	color: {
		type: String
	},
	time: {
		type: Date,
		required: true
	},
	room: {
		type: String,
		required: true
	}
});

mongoose.model('Message', messageSchema);