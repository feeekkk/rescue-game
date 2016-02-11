var Portal = Juicy.Entity.extend({
	components: ['Image'],

	init: function() {
		this.transform.height = 3;
		this.transform.width = 3;
		this.getComponent('Image').setImage('./img/portal.png');
		this.woosh = new Audio('./music/Whoosh.wav');
	},

	render: function(context) {
		this.getComponent('Image').render(context, this.transform.position.x, this.transform.position.y, this.transform.width, this.transform.height);
	},

	entered: function() {
		this.woosh.play();
		this.scene.slowTime = true;
		this.scene.flash = 1
		this.scene.complete = true;
	}
});
