

function fullScreen(){
    if(this.scene.scale.isFullscreen == false){
        this.scene.scale.startFullscreen();

    }
    else{
        this.scene.scale.stopFullscreen();
    }

}
export default class creditsMenu2 extends Phaser.Scene {
    constructor(){
        super("creditsMenu2"); //nombre escena
    }

     preload() {
       this.load.image("creditsBackground","./assets/fondos/creditos.jpg");
       this.load.image("fullScreenButton","./assets/pantalla-completa.png");
      
       this.load.image("exit2","./assets/Botones/BotonSalir.png");

    }
    
     create(){
        //añadir fondo
        var background = this.add.image(960,540,"creditsBackground");
        background.setScale(1);

        //botón para poner pantalla completa
        let fullScreenButton= this.add.image(70,70,"fullScreenButton"); //imagen del botón y su posición
        fullScreenButton.setScale(0.16); //escalamos la imagen del botón
        fullScreenButton.setInteractive().on("pointerdown",fullScreen); //al clicar en el botón se pondrá en pantalla completa


        //boton salir
        let exitButton2 = this.add.image (960,990, "exit2" ).setInteractive();
        exitButton2.setScale(2.2);
        exitButton2.on("pointerdown", (exitButton2) =>{
            this.scene.start("pauseMenu");
        });

    }
    
    update(time, delta){
       
    }
}


