var Portal = Juicy.Entity.extend({
	components: ['Box'],

	init: function() {
		this.transform.height = 3;
		this.transform.width = 3;
		this.getComponent('Box').fillStyle = 'pink';
	},

	render: function(context) {
		this.getComponent('Box').render(context, this.transform.position.x, this.transform.position.y, this.transform.width, this.transform.height);
	},

	entered: function() {
		this.scene.slowTime = true;
		this.scene.flash = 1
		this.scene.complete = true;
	}
});
