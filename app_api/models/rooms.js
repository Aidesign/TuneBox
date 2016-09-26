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
	playlist: Boolean,

	userLimit: {
		type: Number,
		required: true,
		default: 10
	}, 

	nowPlayingID: Number

});

mongoose.model('Room', roomSchema);