Juicy.Component.create('Button', {
	action: null, // click callback

	constructor: function() {

	},

	checkMouseClick: function(x, y) {
		if (this.entity.transform.contains(x, y)) {
			this.action();
		}
	}
});
