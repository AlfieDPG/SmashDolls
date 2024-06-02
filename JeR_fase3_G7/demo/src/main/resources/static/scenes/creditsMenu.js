

function fullScreen(){
    if(this.scene.scale.isFullscreen == false){
        this.scene.scale.startFullscreen();

    }
    else{
        this.scene.scale.stopFullscreen();
    }

}
export default class creditsMenu extends Phaser.Scene {
    constructor(){
        super("creditsMenu"); //nombre escena
    }

    preload() {
        this.load.image("creditsBackground","./assets/fondos/Creditos.jpg");
        this.load.image("fullScreenButton","./assets/pantalla-completa.png");
       
        this.load.image("exit","./assets/Botones/BotonSalir.png");
 
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
        let exitButton = this.add.image (960,990, "exit" ).setInteractive();
        exitButton.setScale(0.5);
        exitButton.on("pointerdown", (exitButton) =>{
            this.scene.start("mainMenu");
        });

    }
    
    update(time, delta){
       
    }
}


