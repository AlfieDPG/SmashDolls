import scene1 from "/scenes/scene1.js";
import mainMenu from "/scenes/mainMenu.js";
import UI from "/scenes/UI.js";
import selectMenu from "/scenes/selectMenu.js";
import creditsMenu from "/scenes/creditsMenu.js";
import controlMenu from "/scenes/controlMenu.js";
import creditsMenu2 from "/scenes/creditsMenu2.js";
import controlMenu2 from "/scenes/controlMenu2.js";
import Player1Win from "/scenes/Player1Win.js";
import Player2Win from "/scenes/Player2Win.js";
import pauseMenu from "/scenes/pauseMenu.js";
import loreScene from "../scenes/loreScene.js";
import playerName from "../scenes/playerName.js";

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
            debug:false
        }

    },
    dom: {
        createContainer: true
    },

    scene: [mainMenu,playerName,creditsMenu,creditsMenu2,pauseMenu,Player2Win,Player1Win,loreScene,
    controlMenu, controlMenu2,selectMenu,scene1,UI] // aqui van todas las escenas
   

}


var game= new Phaser.Game(config);

var cursors;