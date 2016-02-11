var Flag = Juicy.Entity.extend({
	components: ['Physics', 'Sprite', 'Animations'],

	init: function() {
		this.transform.height = 1.5;
		this.transform.width = 1.5;

		this.getComponent('Sprite').setSheet('./img/kid-sheet-orig.png', 4320 / 12, 360);
		this.getComponent('Sprite').last_sprite = 11;
		this.getComponent('Sprite').repeat = true;
		this.getComponent('Sprite').runAnimation(0, 11, 0.25, true);
	},

	// if this is being updated, it is attached to the player
	update: function(dt) {
		if (this.scene.player.hasFlag) {
			this.transform.position.x = this.scene.player.transform.position.x;
			this.transform.position.y = this.scene.player.transform.position.y;
		}

		this.getComponent('Sprite').update(dt);
	},
});
