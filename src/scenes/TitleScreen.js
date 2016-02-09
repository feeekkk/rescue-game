/**
 * Created by Feek on 2/2/16.
 */

var TitleScreen = Juicy.Scene.extend({
    constructor: function() {
        this.play = new Juicy.Entity(this, ['Button', 'Box']);
        this.play.transform.position.x = Game.width / 2 - 50;
        this.play.transform.position.y = Game.height / 2 + 60;
        this.play.transform.height = 60;
        this.play.transform.width = 200;
        this.play.getComponent('Button').action = this.startGame;
        this.play.getComponent('Box').fillStyle = 'lawngreen';

        this.playText = new Juicy.Text('Play Now', '36pt Poplar Std', 'purple', 'left');

        this.logo = new Juicy.Entity(this, ['Image']);
        this.logo.getComponent('Image').setImage('./img/logo.png');
        this.logo.transform.position.y = -150;
        this.logo.transform.width = 1000;
        this.logo.transform.height = 800;
    },

    render: function(context) {
        context.fillStyle = 'purple';
        context.fillRect(0, 0, Game.width, Game.height);

        this.logo.render(context);
        this.play.render(context);
        this.playText.draw(context, Game.width / 2 - 20, Game.height / 2 + 70);
    },

    click: function(x, y) {
        this.play.getComponent('Button').checkMouseClick(x, y);
    },

    startGame: function() {
        Game.setState(new Level());
    }
})
