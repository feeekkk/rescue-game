var Level = Juicy.Scene.extend({
	tileSize: 40,
	diamonds: [],

	constructor: function() {
		this.player = new Player(this);
		this.flag = new Flag(this);
		this.collisionDetector = new CollisionDetector(this);

		this.bg = new Juicy.Entity(this, ['Image']);
		this.bg.getComponent('Image').setImage('/img/space.jpg');

		this.tileManager = new Juicy.Entity(this, ['LevelTiles']);
		this.levelTiles = this.tileManager.getComponent('LevelTiles');

		// Positive = move down or right
		this.camera = {
			x: this.player.transform.position.x,
			y: this.player.transform.position.y,
			give_x: 4,
			give_y: 0,
			dx: 0,
			dy: 0
		};

		this.spawnEntities();
	},

	/**
	 * Loops through all of the spawns found in level tiles and spawns the appropriate entity
	 */
	spawnEntities: function() {
		for (var i = 0; i < this.levelTiles.spawns.length; i++) {
			var spawn = this.levelTiles.spawns[i];
			switch(spawn.type) {
				case 'player':
					this.player.transform.position.x = spawn.x;
					this.player.transform.position.y = spawn.y;
					break;
				case 'flag':
					this.flag.transform.position.x = spawn.x;
					this.flag.transform.position.y = spawn.y;
					break;
				case 'diamond':
					var d = new Diamond();
					d.transform.position.x = spawn.x;
					d.transform.position.y = spawn.y;
					this.diamonds.push(d);
					break;
				case 'spike':
					var s = new Spike();
					s.transform.position.x = spawn.x;
					s.transform.position.y = spawn.y;
					break;
			}
		}
	},

	update: function(dt) {
		this.player.update(dt);
		this.flag.update(dt);
		this.updateCamera(dt);
		this.collisionDetector.update(dt);
	},

	updateCamera: function(dt) {
		var player_input = this.player.getComponent('PlayerMovement');

		var screen_w = Game.width / this.tileSize;
		var screen_h = Game.height / this.tileSize;
		var dx = (this.player.transform.position.x + player_input.direction * this.camera.give_x - screen_w / 2) - this.camera.x;
		var dy = (this.player.transform.position.y - screen_h / 2) - this.camera.y;

		this.camera.x += dx * 4 * dt;
		this.camera.y += dy * 4 * dt;

		if (this.camera.x < 0) {
			this.camera.dx = this.camera.x = 0;
		}

		if (this.camera.x * this.tileSize + GAME_WIDTH > this.levelTiles.width * this.tileSize) {
			this.camera.dx = 0;
			this.camera.x = this.levelTiles.width - GAME_WIDTH / this.tileSize;
		}

		if (this.camera.y < 0) {
			this.camera.dy = this.camera.y = 0;
		}

		if (this.camera.y * this.tileSize + GAME_HEIGHT > this.levelTiles.height * this.tileSize) {
			this.camera.dy = 0;
			this.camera.y = this.levelTiles.height - GAME_HEIGHT / this.tileSize;
		}
	},

	render: function(context) {
		context.save();
		this.bg.render(context);
		var sc = this.tileSize;
		context.scale(sc, sc);
		context.translate(-this.camera.x, -this.camera.y);

		var bounds = {
			position: {
				x: this.camera.x,
				y: this.camera.y
			},
			width: GAME_WIDTH / this.tileSize,
			height: GAME_HEIGHT / this.tileSize
		};

		this.tileManager.render(context, bounds.position.x, bounds.position.y, bounds.width, bounds.height);

		this.player.render(context);
		this.flag.render(context);

		for (var i = 0; i < this.diamonds.length; i++) {
			this.diamonds[i].render(context);
		}

		context.restore();
	}
});
