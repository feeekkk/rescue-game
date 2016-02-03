/**
 * Created by Feek on 2/2/16.
 */

var TitleScreen = Juicy.Scene.extend({
    constructor: function() {
        this.play = new Juicy.Entity(this, ['Button', 'Box']);
        this.play.transform.position.x = Game.width / 2 - 50;
        this.play.transform.position.y = Game.height / 2 - 50;
        this.play.transform.height = 100;
        this.play.transform.width = 100;
        this.play.getComponent('Button').action = this.startGame;
        this.play.getComponent('Box').fillStyle = 'lime';

        this.bg = new Juicy.Entity(this, ['Box']);
        this.bg.transform.position.x = 0;
        this.bg.transform.position.y = 0;
        this.bg.transform.width = Game.width;
        this.bg.transform.height = Game.height;
        this.bg.getComponent('Box').fillStyle = 'darkgray';
    },

    render: function(context) {
        this.bg.render(context);
        this.play.render(context);
    },

    click: function(x, y) {
        this.play.getComponent('Button').checkMouseClick(x, y);
    },

    startGame: function() {
        Game.setState(new Level());
    }
})
