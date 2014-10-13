//Global socket used to communicate client to server
var socket = io(); 
var load_state = {  
    preload: function() {
    this.game.load.image('player', 'assets/diamond.png');
    this.game.load.image('wall', 'assets/test_wall.png');
    this.game.load.image('grid', 'assets/background_grid.png');
    this.game.load.image('overlay', 'assets/overlay.png');
    this.game.load.image('start_button', 'assets/start-button.png');

},

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }
};