var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port     = process.env.PORT || 3000;


var rooms_queue = [];
var room_count = 1;



app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.use(express.static(__dirname + "/public"));

io.on('connection', function(socket) {
  console.log('a user connected');
  //console.log(socket.id);
  //clients.push(socket);

  var top_wall = [];

  for (var i = 300; i < 2700; i  += 100) {
    top_wall.push(i);
    top_wall.push(300);

    top_wall.push(300);
    top_wall.push(i);

    top_wall.push(2600);
    top_wall.push(i);

    top_wall.push(i);
    top_wall.push(2600);
  }
  //console.log(top_wall);
  var walls_array = [100, 0, 100, 100, 100, 200, 100, 300, 300, 100, 300, 200, 300, 300, 300, 400];
  var maze = [500,600,500,700,500,800,500,900,500,1000,500, 1100,500,1200,500,1400, 500, 1500, 500, 1600, 500, 1700, 500, 1800, 500, 1900, 500, 2000, 500,2100,500,2400,600, 1200,700, 500, 700, 600, 700, 800, 700, 900, 700,1000,700,1200,700,1900, 700, 2000, 700, 2100, 700, 2200, 700, 2300,700, 2500,800, 500,800, 1000,800, 1200, 800, 1300, 800, 1400, 800, 1500, 800, 1600, 800, 1700,800, 2300,900, 500, 900, 600, 900, 700, 900, 800,900,1000,900, 1700,900,1900,1000, 2300,1000, 1900,1000, 1700,1000,1000,1000, 800,1100, 800,1100, 1000, 1100, 1100, 1100, 1200, 1100, 1300, 1100, 1400, 1100, 1500,1100, 1700,1100, 1900, 1100, 2000, 1100, 2100, 1100, 2200,1100, 2300,1200, 500, 1200, 600, 1200, 700, 1200, 800,1300, 1700,1400, 500, 1400, 600,1400, 1700, 1400, 1800, 1400, 1900, 1400, 2000, 1400, 2100, 1400, 2200,1500, 600,1500, 800, 1500, 900, 1500, 1000, 1500, 1100,1500, 1300, 1500, 1400, 1500, 1500, 1500, 1600, 1500, 1700,1500, 2200,1600, 600,1600, 1700,1600, 2200,1700, 600, 1700, 700, 1700, 800, 1700, 900, 1700, 1000, 1700, 1100, 1700, 1200, 1700, 1300,1700, 1500,1700, 1900,1700, 2000, 1700, 2100, 1700, 2200,1800, 1500, 1900, 1500, 1900, 1600, 1900, 1700, 1900, 2000, 1900, 2100, 1900, 2200, 1900, 2300, 1900, 2400,2000, 1300,2000, 1500,2100, 1300,2100, 1500, 2100, 1600, 2100, 1700, 2100, 1800,2100, 2000, 2100, 2100, 2200,2100, 2400, 2100, 2500,2200, 500, 2200, 600, 2220, 700, 2200, 800, 2200, 1000, 2200, 1100, 2200, 1200, 2200, 1300,2200, 1500,2300, 500,2300,1300,2300, 1500,2300, 2000, 2300, 2100, 2300, 2200, 2300, 2300, 2300, 2400, 2500,2400, 500, 2400, 600, 2400, 700,2400, 1300,2400, 1700, 2400, 1800, 2400, 1900, 2400, 2000,2500, 1300]
  var final_maze = maze.concat(top_wall);

  socket.on('join room', function(msg) {
    var room = rooms_queue.shift();
    if (room) {
      socket.join(room);
      var startGameData_1 = {
          wall_coords:final_maze,
          player_coords:[500,500],
          opponent_coords:[2000,500],
          player_id: '',
          room_number:room
      };
      var startGameData_2 = {
          wall_coords:final_maze,
          player_coords:[2000,500],
          opponent_coords:[500,500],
          player_id: '',
          room_number:room
      };
      var room_data = io.sockets.adapter.rooms[room];
      var room_clients = [];
      for (var id in room_data) {
        room_clients.push(io.sockets.adapter.nsp.connected[id]);
      }
      startGameData_1.player_id = room_clients[0].id;
      startGameData_2.player_id = room_clients[1].id;
      room_clients[0].emit('start game', startGameData_1);
      room_clients[1].emit('start game', startGameData_2);
    } else {
      var temp_room = 'room' + room_count.toString();
      rooms_queue.push(temp_room)
      socket.join(temp_room);
      room_count += 1;
    }
  });

  socket.on('player moved', function(msg) {
    var room_name = msg.room_number;
    var room_data = io.sockets.adapter.rooms[room_name];
    for (var id in room_data) {
      if (id !== msg.player_id) {
       var temp_socket = io.sockets.adapter.nsp.connected[id];
        temp_socket.emit('update coords', msg);
      }
    }    
  });

  socket.on('game over', function(msg) {
    var room_name = msg;
    var room_data = io.sockets.adapter.rooms[room_name];
    //console.log()
    for (var id in room_data) {
      if (id !== msg.player_id) {
       var temp_socket = io.sockets.adapter.nsp.connected[id];
        temp_socket.emit('end game', msg);
      }
    }    
  });

  socket.on('disconnect', function(msg) {
    console.log(msg);
  });
});

http.listen(port);
console.log('Listening on ' + port);