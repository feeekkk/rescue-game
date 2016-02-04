var CollisionDetector = Juicy.Entity.extend({

	init: function() {
		this.player = this.scene.player;
		this.flag = this.scene.flag;
		this.diamonds = this.scene.diamonds;
	},

	update: function() {
		if (!this.player.hasFlag) {
			this.testCollisionWithFlag();
		}
		this.testCollisionWithDiamond();
	},

	testCollisionWithFlag: function() {
		if (this.player.transform.testCollision(this.flag.transform)) {
			// collided with flag
			this.player.hasFlag = true;
		}
	},

	testCollisionWithDiamond: function() {
		for (var i = this.diamonds.length -1; i >= 0; i--) {
			if (this.player.transform.testCollision(this.diamonds[i].transform)) {
				// we collided
				this.diamonds.splice(i, 1);
			}
		}
	}
});
