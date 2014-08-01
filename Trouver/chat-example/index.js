var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var count = 0;

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.use(express.static(__dirname + "/public"));

io.on('connection', function(socket) {
	console.log('a user connected');
	count++;

	io.emit('amount of users', count);
	
	if (count === 2) {
	io.emit('player logged');		
	}
	
	socket.on('disconnect', function() {
		count--;
		io.emit('disconnected user', "A user has disconnected")
	});
  		
  	socket.on('playercoords', function(msg) {
  		socket.broadcast.emit('player moved', msg);
  	});

});

http.listen(3000, '192.168.1.244', function(){
  console.log('listening on *:3000');
});