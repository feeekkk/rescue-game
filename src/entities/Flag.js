var Flag = Juicy.Entity.extend({
	components: ['Box', 'Physics'],

	init: function() {
		this.transform.height = 1;
		this.transform.width = 0.5;
		this.getComponent('Box').fillStyle = 'blueviolet';
	},

	render: function(context) {
		this.getComponent('Box').render(context, this.transform.position.x, this.transform.position.y, this.transform.width, this.transform.height);
	}
});
