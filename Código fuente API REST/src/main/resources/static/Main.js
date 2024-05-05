import SceneMenu from './Menu.js';
import SceneGame from './Game.js';


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            debug: false
        }

    }
    
};

var game = new Phaser.Game(config);

game.scene.add('Escena de Menu', SceneMenu, true, { x: 400, y: 300 });
game.scene.add('Escena de Juego', SceneGame, true, { x: 800, y: 600 });


