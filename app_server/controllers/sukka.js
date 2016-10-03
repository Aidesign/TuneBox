var express = require('express');
var router = express.Router();
var http = require('http');
var app = express();
var server = http.Server(app);

module.exports = function(io) {
	io.on('connection', function(socket) {
		console.log('a user connected');
	});


	console.log("Täällä");

};