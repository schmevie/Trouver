var player;
var overlay;
var cursors;
var play_state = {
    create: function() {
        //Enabling the physics for the rest of the game
        this.game.physics.startSystem(Phaser.Physics.Arcade);
        //  A simple background for our game

        //  Modify the world and camera bounds
        game.world.setBounds(-200, -200, 1200, 1100);

        //IMPORTANT TO NOTE WHERE THESE ARE BEING ADDED, AFTER THE BOUNDS HAVE BEEN SET
        for (var i = 0; i < 200; i++)
        {
            game.add.sprite(game.world.randomX, game.world.randomY, 'test');
        }
        
        this.game.add.sprite(-200, -200, 'background');

        // The overlay that obstructs the view for the player
        overlay = this.game.add.sprite(0, 0, 'overlay');

        overlay.fixedToCamera = true;

        /**** PLAYER *****/
        // The player that goes through the maze
        player = this.game.add.sprite((this.game.height/2), (this.game.width/2)- 100, 'player');

        player.scale.setTo(2.5, 2.5);

        player.fixedToCamera = true;
        
        this.game.stage.backgroundColor = '#2D01DD';

        //Our controls
        cursors = game.input.keyboard.createCursorKeys();

    },

    update: function() {
        if (cursors.up.isDown) {
            game.camera.y -= 4;
        }
        else if (cursors.down.isDown) {
            game.camera.y += 4;
        }
        if (cursors.left.isDown) {
            game.camera.x -= 4;
        }
        else if (cursors.right.isDown) {
            game.camera.x += 4;
        }
    }

};