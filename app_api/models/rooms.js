var mongoose = require("mongoose");


var roomSchema = new mongoose.Schema({
	roomName: {
		type: String,
		unique: true,
		required: true
	},
	description: {
		type:String,
		default: "This is your room's description."
	}, 
	admin : {
		type: String,
		required: true,
		default: ["test"]
	},
	public: {
		type: Boolean,
		required: true,
		default: false
	},
	playlist: Boolean,
	currentUsers: {
		type: Number,
		required: true,
		default: 0
	},
	userLimit: {
		type: Number,
		required: true,
		default: 10
	},
	tags: {
		type: [String]
	},
	thumbnail: {
		type: String
	},
	nowPlayingID: Number
});

mongoose.model('Room', roomSchema);