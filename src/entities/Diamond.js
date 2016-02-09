var Diamond = Juicy.Entity.extend({
	components: ['Image'],

	init: function() {
		this.transform.height = 0.5;
		this.transform.width = 0.5;
		this.getComponent('Image').setImage('./img/diamond.png');
	},

	render: function(context) {
		this.getComponent('Image').render(context, this.transform.position.x, this.transform.position.y, this.transform.width, this.transform.height);
	}
});
