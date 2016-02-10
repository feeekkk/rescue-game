var GUI = Juicy.Entity.extend({

	init: function() {
		this.player = this.scene.player;

		this.liveImages = [];
		this.lifeImage = new Image();
		this.lifeImage.src = 'img/life.png';
		this.emptyLifeImage = new Image();
		this.emptyLifeImage.src = 'img/life_empty.png';

		this.diamond = new Diamond();
		this.diamond.transform.width = 20;
		this.diamond.transform.height = 20;

		this.diamondText = new Juicy.Text('x 0', '36pt Poplar Std', 'white', 'left');
		this.timerText = new Juicy.Text('0', '72pt Poplar Std', 'white', 'center');
		this.levelText = new Juicy.Text('Level: ' + this.scene.level, '36pt Poplar Std', 'white', 'center');
		this.instructionText = new Juicy.Text(this.scene.instructionText, '24pt Poplar Std', 'yellow', 'center');

		this.timerStarted = false;
		this.time = 0;

		for (var i = 0; i < this.player.maxLives; i++) {
			if (i < this.player.lives) {
				this.liveImages.push(this.lifeImage);
			}
			else {
				this.liveImages.push(this.emptyLifeImage);
			}
		}

		this.startTimer();
	},

	render: function(context) {
		var middle = Game.width / 2;
		var bottom = Game.height;
		var right = Game.width;

		this.instructionText.draw(context, middle + 50, bottom - 200);
		this.timerText.draw(context, middle + 50, bottom - 150);
		this.levelText.draw(context, middle + 50, bottom - 50);
		this.diamondText.draw(context, right - 105, bottom - 60);

		var padding = 25;

		for (var i = 0; i < this.liveImages.length; i++) {
			context.drawImage(this.liveImages[i], padding, bottom - 75);
			padding += 75;
		}

		this.diamond.transform.position.x = right - 150;
		this.diamond.transform.position.y = bottom - 50;
		this.diamond.render(context);
	},

/**
	decrementLife: function() {
		// loop through array from the end and switch the first life image to be empty life image
		for (var i = this.liveImages.length -1; i >= 0; i--) {
			if (this.liveImages[i] == this.lifeImage) {
				this.liveImages[i] = this.emptyLifeImage;
				break;
			}
		}
	},
	*/

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
				text: Math.floor(this.time) // no decimals
			});
		}

		var diamonds = this.player.diamonds + this.player.diamondsThisLevel;

		this.diamondText.set({
			text: 'x ' + diamonds
		})
	}
});
