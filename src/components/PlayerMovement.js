Juicy.Component.create('PlayerMovement', {
	direction: 1,
	speed: 14,

	update: function(dt, input) {
		var position = this.entity.transform.position;
		var playerWidth = this.entity.transform.width;
		var playerHeight = this.entity.transform.height;

		var physics = this.entity.getComponent('Physics');

		physics.dy += 240*dt;
		physics.dx = 0;

		if (input.keyDown('UP')) {
			physics.jump();
		}

		if (input.keyDown('LEFT')) {
			physics.dx = -this.speed;
		}

		if (input.keyDown('RIGHT')) {
			physics.dx = this.speed;
		}

		// update the pointer for the direction
		if (physics.dx !== 0) {
			this.direction = physics.dx > 0 ? 1 : -1;
		}
	}
});
