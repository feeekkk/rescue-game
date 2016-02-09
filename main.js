var GAME_WIDTH = 1080;
var GAME_HEIGHT = 720;

var gameCanvas = document.getElementById('mount-point');

gameCanvas.style.width = GAME_WIDTH;
gameCanvas.style.height = GAME_HEIGHT;

var Game = new Juicy.Game(gameCanvas, GAME_WIDTH, GAME_HEIGHT);

Game.setInput(new Juicy.Input(document, {
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	SPACE: 32,
}));

Game.setState(new TitleScreen()).run();
//Game.setState(new Level()).run();
