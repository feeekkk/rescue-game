var Player = Juicy.Entity.extend({
	components: ['Box', 'PlayerMovement', 'Physics', 'Particles'],

	init: function() {
		this.transform.height = 1.4;
		this.transform.width = 0.8;
		this.getComponent('Box').fillStyle = 'lawngreen';

		this.hasFlag = false;
		this.lives = 3;
		this.maxLives = this.lives;
		this.diamonds = 0;
		this.diamondsThisLevel = 0;
	},

	render: function(context) {
		this.getComponent('Box').render(context, this.transform.position.x, this.transform.position.y, this.transform.width, this.transform.height);
		this.getComponent('Particles').render(context);
	},

	die: function() {
		if (this.lives > 0) {
			this.lives--;
			this.hasFlag = false;
			this.diamondsThisLevel = 0;
			Game.setState(new Level(this.scene.level, this));
		} else {
			// game over, no lives
			Game.setState(new GameOverScreen(this));
		}
	}
});
