/**
* Thanks to https://github.com/Epiphane/Spellbound/blob/gh-pages/src/components/physics.js for bits and pieces
*/
Juicy.Component.create('Physics', {
	constructor: function() {
		this.dx = this.dy = 0;
		this.onGround = false;
		this.jumpPower = -25;

		this.collisions = {
			above: false,
			below: false,
			right: false,
			left: false
		};
	},

	jump: function() {
		if (this.onGround) {
			this.dy = this.jumpPower;
			this.onGround = false;
		}
	},

	update: function(dt, input) {
		var tileManager = this.entity.scene.tileManager.getComponent('LevelTiles');

		var transform = this.entity.transform;

		var dx = this.dx * dt;
		var dy = this.dy * dt;

		var tl = tileManager.raycast(transform.position.x, transform.position.y, dx, dy);
		var tr = tileManager.raycast(transform.position.x + transform.width, transform.position.y, dx, dy);
		var ml = tileManager.raycast(transform.position.x, transform.position.y + transform.height / 2, dx, dy);
		var mr = tileManager.raycast(transform.position.x + transform.width, transform.position.y + transform.height / 2, 1, dy);
		var bl = tileManager.raycast(transform.position.x, transform.position.y + transform.height, dx, dy);
		var bm = tileManager.raycast(transform.position.x + transform.width / 2, transform.position.y + transform.height, dx, dy);
		var br = tileManager.raycast(transform.position.x + transform.width, transform.position.y + transform.height, dx, dy);

		var mindx = tl.dx;
		var mindy = tl.dy;

		if (dx > 0) {
			if (Math.abs(tr.dx) < Math.abs(mindx)) mindx = tr.dx;
			if (Math.abs(tr.dy) < Math.abs(mindy)) mindy = tr.dy;
			if (Math.abs(mr.dx) < Math.abs(mindx)) mindx = mr.dx;
		}

		if (Math.abs(br.dx) < Math.abs(mindx)) mindx = br.dx;
		if (Math.abs(br.dy) < Math.abs(mindy)) mindy = br.dy;
		if (Math.abs(bl.dx) < Math.abs(mindx)) mindx = bl.dx;
		if (Math.abs(bl.dy) < Math.abs(mindy)) mindy = bl.dy;
		if (Math.abs(bm.dy) < Math.abs(mindy)) mindy = bm.dy;
		if (Math.abs(ml.dx) < Math.abs(mindx)) mindx = ml.dx;

		// Walk across all the tiles
		transform.position.x += mindx;
		transform.position.y += mindy;

		if (dy > 0 && Math.abs(mindy) < 0.01) {
			if (!tileManager.canMove(transform.position.x, transform.position.y + transform.height, 0, 1)
			|| !tileManager.canMove(transform.position.x + transform.width, transform.position.y + transform.height, 0, 1)) {

				this.dy = 0;
				this.onGround = true;
			}
		}
		else {
			this.onGround = false;
		}

		if (dx !== 0 && Math.abs(mindx) < 0.01) {
			// We hit a wall
			if (dx < 0) this.collisions.left = true;
			else this.collisions.right = true;
		}

		if (dy !== 0 && Math.abs(mindy) < 0.01) {
			// We hit a wall
			if (dy < 0) this.collisions.above = true;
			else this.collisions.below = true;

			this.dy = 0;
		}
	},

	render: function(context) {}
});
