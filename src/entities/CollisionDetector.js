var CollisionDetector = Juicy.Entity.extend({

	init: function() {
		this.player = this.scene.player;
		this.flag = this.scene.flag;
		this.portal = this.scene.portal;
		this.diamonds = this.scene.diamonds;
		this.saws = this.scene.saws;
	},

	update: function() {
		if (this.flag && !this.player.hasFlag) {
			this.testCollisionWithFlag();
		}
		this.testCollisionWithPortal();
		this.testCollisionWithDiamond();
		this.testCollisionWithSpike();

		if (this.saws) {
			this.testCollisionWithSaw();
		}
	},

	testCollisionWithSaw: function() {
		for (var i = 0; i < this.saws.length; i++) {
			if (this.player.transform.testCollision(this.saws[i].transform)) {
				// ded
				this.player.die();
			}
		}
	},

	testCollisionWithPortal: function() {
		if (this.player.transform.testCollision(this.portal.transform)) {
			// go to next level
			this.portal.entered();
		}
	},

	testCollisionWithFlag: function() {
		if (this.player.transform.testCollision(this.flag.transform)) {
			this.player.hasFlag = true;
		}
	},

	testCollisionWithDiamond: function() {
		for (var i = this.diamonds.length -1; i >= 0; i--) {
			if (this.player.transform.testCollision(this.diamonds[i].transform)) {
				// we collided
				this.diamonds.splice(i, 1);
				this.player.diamonds++;
			}
		}
	},

	testCollisionWithSpike: function() {
		var tileManager = this.scene.levelTiles;
		for (var i = 0; i < this.player.transform.width; i ++) {
			for (var j = 0; j < this.player.transform.height; j ++) {
				var x = Math.floor(this.player.transform.position.x + i);
				var y = Math.floor(this.player.transform.position.y + j);

				if (tileManager.getTile(x, y) === tileManager.SPIKE) {
					// ded
					this.player.die();
				}
			}
		}
	}
});
