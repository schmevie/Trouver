
var start_button;
var globalGameState;
var menu_state = {
    create: function() {
        start_button = game.add.button(0, 0, 'start_button', actionOnClick, this);
    }
};

function actionOnClick() {
	start_button.destroy();
	socket.emit('join room');
};

socket.on('start game', function(msg) {
	globalGameState = msg;
	game.state.start('play');

});