var Diamond = Juicy.Entity.extend({
	components: ['Box'],

	init: function() {
		this.transform.height = 0.5;
		this.transform.width = 0.5;
		this.getComponent('Box').fillStyle = 'cyan';
	},

	render: function(context) {
		this.getComponent('Box').render(context, this.transform.position.x, this.transform.position.y, this.transform.width, this.transform.height);
	}
});
