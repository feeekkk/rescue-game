var GAME_WIDTH = 1080;
var GAME_HEIGHT = 720;

var gameCanvas = document.getElementById('mount-point');

/*
gameCanvas.style.width = GAME_WIDTH;
gameCanvas.style.height = GAME_HEIGHT;
gameCanvas.width = 1280;
gameCanvas.height = 720;
*/

var Game = new Juicy.Game(gameCanvas, GAME_WIDTH, GAME_HEIGHT);

Game.setInput(new Juicy.Input(document, {
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	SPACE: 32,
}));


Game.setState(new TitleScreen()).run();
//Game.setState(new Level(7)).run();
var player = new Player();
player.diamonds = 100;
//Game.setState(new GameOverScreen('game over message harrrrrrr', player)).run();

window.game_audio = new Audio('./music/heroes.mp3');
window.game_audio.loop = true;
window.game_audio.play();

var el = document.getElementById('stop-audio');
el.onclick = function() {
	window.game_audio.pause();
}
