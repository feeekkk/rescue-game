var CollisionDetector = Juicy.Entity.extend({

	init: function() {
		this.player = this.scene.player;
		this.flag = this.scene.flag;
	},
	
	update: function() {
		if (!this.player.hasFlag) {
			this.testCollisionWithFlag();
		}
	},

	testCollisionWithFlag: function() {
		if (this.player.transform.testCollision(this.flag.transform)) {
			this.flag.addComponent('PlayerMovement');
			this.player.hasFlag = true;
		}
	}
});
