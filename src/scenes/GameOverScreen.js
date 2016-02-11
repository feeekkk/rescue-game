/**
 * Created by Feek on 2/2/16.
 */

var GameOverScreen = Juicy.Scene.extend({
    constructor: function(message, player) {
		this.player = player;
        this.play = new Juicy.Entity(this, ['Button', 'Box']);
        this.play.transform.position.x = Game.width / 2 - 100;
        this.play.transform.position.y = Game.height / 2 + 130;
        this.play.transform.height = 60;
        this.play.transform.width = 200;
        this.play.getComponent('Button').action = this.startGame;
        this.play.getComponent('Box').fillStyle = 'lawngreen';

		this.over = new Juicy.Text('Game Over', '72pt Poplar Std', 'White', 'center');
		this.diamonds = new Juicy.Text('Diamonds:  ' + this.player.diamonds, '36pt Poplar Std', 'White', 'center');
		this.message = new Juicy.Text(message, '36pt Poplar Std', 'White', 'center');

        this.playText = new Juicy.Text('Play Again', '36pt Poplar Std', 'purple', 'center');
    },

    render: function(context) {
        context.fillStyle = 'purple';
        context.fillRect(0, 0, Game.width, Game.height);

        this.play.render(context);
        this.playText.draw(context, Game.width / 2, Game.height / 2 + 140);
		this.diamonds.draw(context, Game.width / 2, Game.height / 2);
		this.message.draw(context, Game.width / 2, Game.height / 2 + 70);
		this.over.draw(context, Game.width / 2, Game.height / 2 - 100);
    },

    click: function(x, y) {
        this.play.getComponent('Button').checkMouseClick(x, y);
    },

    startGame: function() {
        Game.setState(new Level());
    }
})
