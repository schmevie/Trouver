var overlay;

var player;
var opponent;

var walls;

var cursors;




var play_state = {
    create: function() {
        //Enabling the physics for the rest of the game
        this.game.physics.startSystem(Phaser.Physics.Arcade);

        //  Modify the world and camera bounds
        this.game.world.setBounds(0, 0, 3000, 3000);  

        this.game.stage.backgroundColor = '#FFFFFF';         

        /**** MAP *****/
        walls = game.add.group();
        walls.enableBody = true;
        walls.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < globalGameState.wall_coords.length; i+=2) {
            var wall = walls.create(globalGameState.wall_coords[i], globalGameState.wall_coords[i + 1], 'wall');
            wall.body.immovable = true;
        }


        /**** PLAYERS *****/
        // The player that goes through the maze
        // 
        player = this.game.add.sprite(globalGameState.player_coords[0], globalGameState.player_coords[1], 'player');
        this.game.camera.follow(player);
        opponent = this.game.add.sprite(globalGameState.opponent_coords[0], globalGameState.opponent_coords[1], 'player');
        /**** OVERLAY *****/
        // The overlay that obstructs the view for the player
        overlay = this.game.add.sprite(0, 0, 'overlay');

        overlay.fixedToCamera = true;

        game.physics.enable([player, opponent, walls], Phaser.Physics.ARCADE);       
        opponent.body.immovable = true;
        cursors = game.input.keyboard.createCursorKeys();
    },

    update: function() {
        game.physics.arcade.collide(walls, player);

        game.physics.arcade.collide(player, opponent, gameOver, null, this);

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.left.isDown) {
            player.body.velocity.x = -200;
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 200;
        }
        if (cursors.up.isDown) {
            player.body.velocity.y = -200;
        } else if (cursors.down.isDown) {
            player.body.velocity.y = 200;
        }
        var temp_data = {
            player_x: player.x,
            player_y: player.y,
            room_number:globalGameState.room_number,
            player_id: globalGameState.player_id
        };
        socket.emit('player moved', temp_data);
    }

};

socket.on('update coords', function(msg) {
    opponent.x = msg.player_x;
    opponent.y = msg.player_y;
});

socket.on('end game', function() {
    console.log("dudebroooo");
    player.kill();
    opponent.kill();
    game.state.start('menu');
});

function gameOver() {
    console.log('here')
    socket.emit('game over', globalGameState.room_number);
}










