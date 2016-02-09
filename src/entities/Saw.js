var Saw = Juicy.Entity.extend({
	components: ['Image', 'Patrolling'],

	init: function() {
		this.speed = 7;
		this.direction = 1;
		this.transform.height = 0.5;
		this.transform.width = 1;

		this.getComponent('Image').setImage('./img/saw.png');
	},

	update: function(dt) {
		var physics = this.getComponent('Patrolling');
		physics.dy += 240 * dt;
		physics.dx = this.speed * this.direction;

		physics.update(dt);
	},

	render: function(context) {
		this.getComponent('Image').render(context, this.transform.position.x, this.transform.position.y, this.transform.width, this.transform.height);
	}
});
