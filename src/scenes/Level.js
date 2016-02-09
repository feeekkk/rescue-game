var Level = Juicy.Scene.extend({
	tileSize: 40,

	constructor: function(level, player) {
		this.level = level || 1;
		this.player = player || new Player(this);
		this.diamonds = [];
		this.saws = [];
		this.flash = false;
		this.slowTime = false; // called from Portal
		this.complete = false;
		this.portal = new Portal(this);
		this.collisionDetector = new CollisionDetector(this);

		this.bg = new Juicy.Entity(this, ['Image']);
		this.bg.getComponent('Image').setImage('/img/space.jpg');

		this.GUI = new GUI(this);

		this.tileManager = new Juicy.Entity(this, ['LevelTiles']);
		this.levelTiles = this.tileManager.getComponent('LevelTiles');
		this.levelTiles.build(this.level); // which level to build the tiles for

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
					this.flag = new Flag(this);
					this.flag.transform.position.x = spawn.x;
					this.flag.transform.position.y = spawn.y;
					break;
				case 'diamond':
					var d = new Diamond();
					d.transform.position.x = spawn.x;
					d.transform.position.y = spawn.y;
					this.diamonds.push(d);
					break;
				case 'portal':
					this.portal.transform.position.x = spawn.x;
					this.portal.transform.position.y = spawn.y;
					break;
				case 'saw':
					var saw = new Saw(this);
					saw.transform.position.x = spawn.x;
					saw.transform.position.y = spawn.y;
					this.saws.push(saw);
					break;
			}
		}
	},

	update: function(dt) {
		if (this.slowTime) {
			dt = dt / 10;
		}
		this.player.update(dt);

		if (this.flag) {
			this.flag.update(dt);
		}

		this.updateFlash(dt);
		this.updateCamera(dt);
		this.updateSaws(dt);
		if (!this.complete) {
			// don't worry about updating collsisions such as spikes if the level is complete
			this.collisionDetector.update(dt);
		}
		this.GUI.update(dt);
	},

	updateSaws: function(dt) {
		for (var i = 0; i < this.saws.length; i++) {
			this.saws[i].update(dt);
		}
	},

	updateFlash: function(dt) {
		if (this.flash !== false) {
			if (this.flash < 0.35) {
				this.startNextLevel();
			}
			this.flash -= dt * 5;
		}
	},

	startNextLevel: function() {
		Game.setState(new Level(this.level + 1));
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

		var bounds = {
			position: {
				x: this.camera.x,
				y: this.camera.y
			},
			width: GAME_WIDTH / this.tileSize,
			height: GAME_HEIGHT / this.tileSize
		};

		var sc = this.tileSize;
		context.scale(sc, sc);
		context.translate(-this.camera.x, -this.camera.y);

		this.bg.render(context, bounds.position.x, bounds.position.y, bounds.width, bounds.height);

		this.tileManager.render(context, bounds.position.x, bounds.position.y, bounds.width, bounds.height);

		this.player.render(context);

		if (this.flag) {
			this.flag.render(context);
		}

		for (var i = 0; i < this.diamonds.length; i++) {
			this.diamonds[i].render(context);
		}

		for (var i = 0; i < this.saws.length; i++) {
			this.saws[i].render(context);
		}

		this.portal.render(context);

		context.restore();

		this.GUI.render(context);

		if (this.flash !== false) {
			this.renderFlash(context);
		}
	},

	renderFlash: function(context) {
		context.fillStyle = 'rgba(0, 200, 255, ' + this.flash + ')';
		context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
	}
});
