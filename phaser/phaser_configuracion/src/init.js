import scene1 from "/scenes/scene1.js";
import mainMenu from "/scenes/mainMenu.js";
import UI from "/scenes/UI.js";
import selectMenu from "/scenes/selectMenu.js";
import creditsMenu from "/scenes/creditsMenu.js";
import controlMenu from "/scenes/controlMenu.js";
import Player1Win from "/scenes/Player1Win.js";
import Player2Win from "/scenes/Player2Win.js";

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

    scene: [mainMenu,creditsMenu,Player1Win,Player2Win,
    controlMenu, selectMenu,scene1,UI] // aqui van todas las escenas
   

}


var game= new Phaser.Game(config);

var cursors;