var Flag = Juicy.Entity.extend({
	components: ['Box', 'Physics'],

	init: function() {
		this.transform.height = 1;
		this.transform.width = 0.5;
		this.getComponent('Box').fillStyle = 'blueviolet';
	},

	// if this is being updated, it is attached to the player
	update: function() {
		this.transform.position.x = this.scene.player.transform.position.x;
		this.transform.position.y = this.scene.player.transform.position.y;
	},

	render: function(context) {
		this.getComponent('Box').render(context, this.transform.position.x, this.transform.position.y, this.transform.width, this.transform.height);
	}
});
