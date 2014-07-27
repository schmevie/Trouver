var load_state = {  
    preload: function() {

    this.game.load.image('overlay', 'assets/overlay.png');
    this.game.load.image('player', 'assets/man.png');
    this.game.load.image('test', 'assets/diamond.png');
    this.game.load.image('background', 'assets/bg.png');

},

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }
};