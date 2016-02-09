var Saw = Juicy.Entity.extend({
	components: ['Box', 'Patrolling'],

	init: function() {
		this.speed = 7;
		this.direction = 1;
		this.transform.height = 0.5;
		this.transform.width = 1;
		this.getComponent('Box').fillStyle = 'red';
	},

	update: function(dt) {
		var physics = this.getComponent('Patrolling');
		physics.dy += 240 * dt;
		physics.dx = this.speed * this.direction;

		physics.update(dt);
	},

	render: function(context) {
		this.getComponent('Box').render(context, this.transform.position.x, this.transform.position.y, this.transform.width, this.transform.height);
	}
});
