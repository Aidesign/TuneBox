var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	name: {
		type: String,
		unique: true,
		required: true
	},
	organization: {
		type: String
	},
	homePage: {
		type: String
	},
	premium: {
		type: Boolean,
		default: false
	},
	privateLimit: {
		type: Number,
		required: true,
		default: 5
	},
	publicLimit: {
		type: Number,
		required: true,
		default: 5
	},
	joined: {
		type: Date,
		required: true
	},
	hash: String,
	salt: String
});

userSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);
	return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		organization: this.organization,
		homePage: this.homePage,
		premium: this.premium,
		privateLimit: this.privateLimit,
		publicLimit: this.publicLimit,
		joined: this.joined,
		exp: parseInt(expiry.getTime() / 1000),
	}, process.env.JWT_SECRET);
};

mongoose.model('User', userSchema);