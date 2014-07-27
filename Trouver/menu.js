
var globalHack = false;
var globalHack2 = false;
var level2 = true;
var test = true;
var menu_state = {
    create: function() {
        // Defining variables
        var style = { font: "30px Amatic SC", fill: "#ffffff" };
        var x = game.world.width/2, y = game.world.height/2;

        this.game.stage.backgroundColor = '#FFFFFFFF';
        var title_style = { font: "50px Amatic SC", fill: "#ffffff" };
        // Adding a text centered on the screen
        var title = this.game.add.text(x - 45, y - 90, "Meteroar!", title_style);
        title.anchor.setTo(.5, .5);
        var text = this.game.add.text(x - 45, y - 50, "Press space to start", style);
        text.anchor.setTo(0.5, 0.5);
       

        if (!globalHack) {
            globalHack = true;
            game.add.tween(title).from( { y: -200 }, 1500, Phaser.Easing.Bounce.Out, true);
            game.add.tween(text).from( { y: -200 }, 1500, Phaser.Easing.Bounce.Out, true);
            game.add.tween(title).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 1020, 2000, true);
            game.add.tween(text).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 1020, 2000, true);
        }
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.start, this);
    },
    // Start the actual game
    start: function() { 
       //if (!globalHack2) {
        this.game.state.start('play');
        globalHack2 = true;
       // }
    }
};