var GUI = Juicy.Entity.extend({

	init: function() {
		this.player = this.scene.player;
		this.scoreText = new Juicy.Text('Score: 0', '14pt Arial');
		this.timerText = new Juicy.Text('Time: 0', '14pt Arial');
		this.levelText = new Juicy.Text('Level: ' + this.scene.level, '14pt Arial');

		this.timerStarted = false;
		this.time = 0;

		this.startTimer();
	},

	render: function(context) {
		this.scoreText.draw(context, 10, 10);
		this.timerText.draw(context, 10, 30);
		this.levelText.draw(context, 10, 50);
	},

	startTimer: function() {
		this.trackTime = true;
		this.time = 0;
	},

	stopTimer: function() {
		this.trackTime = false;
	},

	update: function(dt) {
		if (this.trackTime) {
			this.time += dt * 10; // make time increase 10x faster
				this.timerText.set({
					text: 'Time: ' + Math.floor(this.time) // no decimals
				});
		}
	}
});
