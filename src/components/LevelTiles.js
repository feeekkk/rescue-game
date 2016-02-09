/**
 * Thanks to https://github.com/Epiphane/Spellbound/blob/gh-pages/src/components/level_tiles.js for bits and pieces
 */

Juicy.Component.create('LevelTiles', {
    SECTION_HEIGHT: 30,
    SECTION_WIDTH: 40,
    EMPTY: ' ',
    PLATFORM: '-',
    WALL: 'X',
    PLAYER: '^',
    FLAG: '%',
    DIAMOND: '*',
    SAW: 'x',
    SPIKE: 'v',
    PORTAL: 'o',
    SPAWNABLE: /\^|%|\*|o|x/,

    constructor: function() {
        this.loadImages();
        this.tiles = [];
        this.spawns = [];
    },

    imagesLoaded: function() {
        if (
            this.tile1rdy &&
            this.tile2rdy
        ) {
            return true;
        }
        return false;
    },

    /**
     * returns the given tile at this point
     * @param  {[type]} x [description]
     * @param  {[type]} y [description]
     * @return {[type]}   [description]
     */
    getTile: function(x, y) {
        var sector_x = Math.floor(x / this.SECTION_WIDTH);
        var sector_y = Math.floor(y / this.SECTION_HEIGHT);
        var config = this.tiles[sector_x][sector_y];
        var tile_x = x % this.SECTION_WIDTH;
        var tile_y = y % this.SECTION_HEIGHT;
        return config[tile_x + tile_y * this.SECTION_WIDTH];
    },

    /**
     * determines if tile is blocking this point
     * @param  {[type]} x [description]
     * @param  {[type]} y [description]
     * @return {[type]}   [description]
     */
    isTileBlocking: function(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) return true;
        return this.getTile(x, y) !== this.EMPTY && this.getTile(x, y) !== this.SPIKE;
    },

    // called from player movement
    canMove: function(x, y, dx, dy) {
        return !this.isTileBlocking(Math.floor(x + dx), Math.floor(y + dy));
    },

    /**
     * raycast
     * @param  {[type]} x  [description]
     * @param  {[type]} y  [description]
     * @param  {[type]} dx [description]
     * @param  {[type]} dy [description]
     * @return {[type]}    [description]
     */
   raycast: function(x, y, dx, dy) {
      var total_dist = Math.sqrt(dx * dx + dy * dy);

      var _y = y;
      var _x = x;

      var PAD = 0.1;
      var hit_y = false, hit_x = false;

      if (dy !== 0) { // Vertical
         var dist = Math.abs(dy);
         var step_dy = dy / dist;
         while (dist > 0 && this.canMove(x, y, 0, step_dy)) {
            y += step_dy;
            dist --;
         }

         if (dist < 0) {
            // Went too far. Backtrack!
            if (dy > 0)
               y += dist;
            else
               y -= dist;
         }
         else {
            // Hit a block oh no...
            if (step_dy > 0)
               y = Math.ceil(y) - 0.1;
            else
               y = Math.floor(y) + 0.1;

            hit_y = true;
         }
      }

      if (dx !== 0) {
         var dist = Math.abs(dx);
         var step_dx = dx / dist;
         while (dist > 0 && this.canMove(x, y, step_dx, 0)) {
            x += step_dx;
            dist --;
         }

         if (dist < 0) {
            // Went too far. Backtrack!
            if (dx > 0)
               x += dist;
            else
               x -= dist;
         }
         else {
            // Hit a block oh no...
            if (step_dx > 0)
               x = Math.ceil(x) - 0.1;
            else
               x = Math.floor(x) + 0.1;

            hit_x = true;
         }
      }

      var dx = x - _x;
      var dy = y - _y;
      dist = Math.sqrt(dx * dx + dy * dy);

      return {
         dx: dx,
         dy: dy,
         hit: { y: hit_y, x: hit_x },
         dist: total_dist - dist
      };
   },

   /**
    * draws the tile image canvas to the game canvas
    */
    render: function(context, x, y, w, h) {
        context.drawImage(this.imageCanvas, 0, 0, this.width, this.height);
    },

    /**
     * builds the level tiles
     * @return {[type]} [description]
     */
    build: function(level) {
      this.width = this.SECTION_WIDTH;
      this.height = this.SECTION_HEIGHT;

      this.imageCanvas.width = this.width * 20;
      this.imageCanvas.height = this.height * 20;

      this.spawns = [];
      this.tiles.push([]);

        var config = this.levels[level - 1];
        var cfg = this.parse(config);

        // Get spawns
        var toSpawn = config.search(this.SPAWNABLE);
        var found = toSpawn;
        while (found >= 0) {
           var x = toSpawn % this.SECTION_WIDTH;
           var y = Math.floor(toSpawn / this.SECTION_WIDTH);

              switch(cfg[toSpawn]) {
                    case this.PLAYER:
                        sptype = 'player';
                        break;
                    case this.FLAG:
                        sptype = 'flag';
                        break;
                    case this.DIAMOND:
                        sptype = 'diamond';
                        break;
                    case this.PORTAL:
                        sptype = 'portal';
                        break;
                    case this.SAW:
                        sptype = 'saw';
                        break;
              }

           this.spawns.push({
              type: sptype,
              x: x,
              y: y
           });

           cfg[toSpawn] = this.EMPTY;
           found = config.substring(toSpawn + 1).search(this.SPAWNABLE);
           toSpawn += found + 1;
        }

        this.tiles[0].push(cfg);
    },

    /**
     * Renders the resulting canvas from the built version of the level
     * @return {[type]} [description]
     */
   renderCanvas: function() {
      if(!this.imagesLoaded()) {
         return;
      }

      var context = this.imageCanvas.getContext('2d');

      // tiles!

      x = 0;
      y = 0;
      w = 40;
      h = 30;

      for (var i = x; i < this.width; i ++) {
         for (var j = y; j < this.height; j ++) {
            switch (this.getTile(i, j)) {
               case this.PLATFORM:
                  this.renderNormalTile(context, i * 20, j * 20, 20, 20);
                  break;
               case this.WALL:
                  this.renderNormalTile(context, i * 20, j * 20, 20, 20);
                  break;
              case this.SPIKE:
                this.renderSpike(context, i * 20, j * 20, 20, 20);
                break;
            }
         }
      }
   },

   renderNormalTile: function(context, x, y, width, height) {
      context.drawImage(this.tileImg, x, y, width, height);
   },

   renderSpike: function(context, x, y, width, height) {
       context.drawImage(this.spikeImg, x, y, width, height);
   },

   parse: function(config) {
      if (config.length !== this.SECTION_HEIGHT * this.SECTION_WIDTH) {
          throw "Section length is not the right size.";
      }

      var cfg = config.split('');

     for (var i = (this.SECTION_HEIGHT - 1) * this.SECTION_WIDTH; i < cfg.length; i ++)
        cfg[i] = this.PLATFORM;

     for (var i = 0; i < cfg.length; i += this.SECTION_WIDTH)
        cfg[i] = this.WALL;

     for (var i = this.SECTION_WIDTH - 1; i < cfg.length; i += this.SECTION_WIDTH)
        cfg[i] = this.WALL;

      return cfg;
   },

    levels: [
          '----------------------------------------'
        + '                                        '
        + '                                   o    '
        + '   ^          *  *  *  *                '
        + '                                        '
        + '                 x                      '
        + '----------------------------------------'
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '----------------------------------------',


          '----------------------------------------'
        + '                                        '
        + '                                        '
        + '   ^               *  *  *  *           '
        + '                                        '
        + '                                        '
        + '-------------   --- --  -  -          % '
        + '-                                       '
        + '-                      vvvvvv--         '
        + '-                      ------           '
        + '-                                vv---vv'
        + '-                                -------'
        + '-                                       '
        + '-                          -----        '
        + '-                                       '
        + '-                                       '
        + '-                                o      '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-                                       '
        + '-vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv'
        + '----------------------------------------',
    ],

    loadImages: function() {
        var self = this;

        this.tileImg = new Image();
        this.tileImg.src = 'img/tile.png';

        this.tileImg.onload = function() {
            self.tile1rdy = true;
            self.renderCanvas();
        }

        this.spikeImg = new Image();
        this.spikeImg.src = 'img/spike.png';

        this.spikeImg.onload = function() {
            self.tile2rdy = true;
            self.renderCanvas();
        }

        this.imageCanvas = document.createElement('canvas');
    }
});
