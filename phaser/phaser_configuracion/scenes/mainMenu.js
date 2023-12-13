

function fullScreen(){
    if(this.scene.scale.isFullscreen == false){
        this.scene.scale.startFullscreen();

    }
    else{
        this.scene.scale.stopFullscreen();
    }

}
export default class mainMenu extends Phaser.Scene {
    constructor(){
        super("mainMenu"); //nombre escena
    }

     preload() {
       this.load.image("mainBackground","./assets/mainBackground.png");
       this.load.image("fullScreenButton","./assets/pantalla-completa.png");
       this.load.image("local","./assets/Botones/BotonLocal.png");
       this.load.image("credits","./assets/Botones/BotonCreditos.png");
       this.load.image("control","./assets/Botones/BotonControles.png");
       this.load.image("exit","./assets/Botones/BotonSalir.png");

    }
    
     create(){
        //añadir fondo
        var background = this.add.image(900,500,"mainBackground");
        background.setScale(3);

        //botón para poner pantalla completa
        let fullScreenButton= this.add.image(70,70,"fullScreenButton"); //imagen del botón y su posición
        fullScreenButton.setScale(0.16); //escalamos la imagen del botón
        fullScreenButton.setInteractive().on("pointerdown",fullScreen); //al clicar en el botón se pondrá en pantalla completa
 
        //boton jugar en local
        let localButton = this.add.image (900,480, "local" ).setInteractive();
        localButton.setScale(2.5);
        localButton.on("pointerdown", (localButton) =>{
            this.scene.start("scene1");
        });

        //boton creditos
        let creditsButton = this.add.image (900,650, "credits" ).setInteractive();
        creditsButton.setScale(2.5);
        creditsButton.on("pointerdown", (creditsButton) =>{
            this.scene.start("creditsMenu");
        });

        //boton controles
        let controlButton = this.add.image (900,820, "control" ).setInteractive();
        controlButton.setScale(2.5);
        controlButton.on("pointerdown", (controlButton) =>{
            this.scene.start("controlMenu");
        });

        //boton salir
        let exitButton = this.add.image (900,990, "exit" ).setInteractive();
        exitButton.setScale(2.5);


    }
    
    update(time, delta){
       
    }
}


