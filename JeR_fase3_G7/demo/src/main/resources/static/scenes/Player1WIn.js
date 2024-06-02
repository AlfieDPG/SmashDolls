

export default class Player1Win extends Phaser.Scene{
    constructor(){
        super("Player1Win"); //nombre escena
    }
preload(){
    this.load.image("mainBackground","./assets/fondos/FondoPC.jpg");
    this.load.image("j1Gana","./assets/j1Gana.png");
    this.load.image("exit","./assets/Botones/BotonSalir.png");
}
create(){
    var background = this.add.image(960,540,"mainBackground");
        background.setScale(1);
    var j1Win = this.add.image(960,500,"j1Gana");
        j1Win.setScale(1);

          //boton salir
          let exitButton = this.add.image (960,990, "exit" ).setInteractive();
          exitButton.setScale(0.5);
          exitButton.on("pointerdown", (exitButton) =>{
              this.scene.start("mainMenu");
          });
  
}
update(){

}


}