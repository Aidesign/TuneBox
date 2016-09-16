var mongoose = require("mongoose");


var roomSchema = new mongoose.Schema({
	roomName : {
		type: String,
		unique: true,
		required: true

	},
	admins : {
		type: [String],
		required: true
	},
	public: Boolean,
	userLimit: {
		type: Number,
		required: true,
		default: 10
	}


});

mongoose.model('Room', roomSchema);