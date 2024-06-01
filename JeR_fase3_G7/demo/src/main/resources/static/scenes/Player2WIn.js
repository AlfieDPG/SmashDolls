
import { connection } from './websocket.js';

export default class Player2Win extends Phaser.Scene{
    constructor(){
        super("Player2Win"); //nombre escena
    }
preload(){
    this.load.image("mainBackground","./assets/fondos/Fondo-Rosa.jpg");
    this.load.image("j2Gana","./assets/j2Gana.png");
    this.load.image("exit","./assets/Botones/BotonSalir.png");

}
create(){
    var background = this.add.image(960,540,"mainBackground");
        background.setScale(1);
        var j2Win = this.add.image(960,500,"j2Gana");
        j2Win.setScale(1);
      //boton salir
      let exitButton = this.add.image (960,990, "exit" ).setInteractive();
      exitButton.setScale(2.2);
      exitButton.on("pointerdown", (exitButton) =>{
          this.scene.start("mainMenu");
          var msg ={
             type : "exit"
         }
         connection.send(JSON.stringify(msg));
      });
      window.addEventListener('ws-message', (event) => {
         const message = event.detail;
         const type = message.type;
         if(type == "exit"){
             this.scene.start("mainMenu");
         }
     });
}
update(){

}


}