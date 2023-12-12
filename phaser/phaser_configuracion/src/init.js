import scene1 from "/scenes/scene1.js";
import mainMenu from "/scenes/mainMenu.js";
const config = {
  
    parent:"container",
    type:Phaser.AUTO,

    scale: {
        mode:Phaser.Scale.FIT, // escala automáticamnete
        autoCenter: Phaser.Scale.CENTER_BOTH, //Ccentra automáticamnete
        width:1920,
        height:1080,
    },
    physics : {
        default: "arcade",
        arcade:{
            gravity: {y:1000},
            debug:true
        }

    },

    scene: [mainMenu,scene1] // aqui van todas las escenas
   

}


var game= new Phaser.Game(config);

var cursors;