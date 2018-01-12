//var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
// Global Variables
var
  game = new Phaser.Game(1200, 720, Phaser.AUTO, 'game'),
  Main = function () {},
  gameOptions = {
    playSound: true,
    playMusic: true
  },
  musicPlayer;




Main.prototype = {

  preload: function () {
      //game.load.spritesheet('cards',    'assets/images/cards18.png', 71, 95, 55);
      //game.load.spritesheet('cards',    'assets/images/cards8.png', 243, 260, 55);   //without TEXT   cards18
      //game.load.spritesheet('cards',    'assets/images/cards28.png', 243, 330, 55);   //width height  cards28
     // game.load.spritesheet('cards',    'assets/images/cards8.png', 230, 325, 55);   //width height
    
    game.load.image('stars',    'assets/images/stars.jpg');     //splash background
    game.load.image('loading',  'assets/images/loading.png');
    game.load.image('brand',    'assets/images/logo.png');    //logo
    game.load.script('polyfill',   'lib/polyfill.js');
    game.load.script('utils',   'lib/utils.js');
    game.load.script('splash',  'states/Splash.js');
  },

  create: function () {
    game.state.add('Splash', Splash);
    game.state.start('Splash');
  }

};

game.state.add('Main', Main);
game.state.start('Main');