

function fullScreen(){
    if(this.scene.scale.isFullscreen == false){
        this.scene.scale.startFullscreen();

    }
    else{
        this.scene.scale.stopFullscreen();
    }

}
export default class controlMenu extends Phaser.Scene {
    constructor(){
        super("controlMenu"); //nombre escena
    }

     preload() {
       this.load.image("mainBackground","./assets/mainBackground.png");
       this.load.image("fullScreenButton","./assets/pantalla-completa.png");
      
       this.load.image("exit","./assets/Botones/BotonSalir.png");
       
    }
    
     create(){
        //añadir fondo
        var background = this.add.image(900,500,"mainBackground");
        background.setScale(3);

        this.textControl = this.add.text(1000, 400, 'hola', { fontFamily: 'Arial Black', fontSize: 50, color: '#000000' });

        //botón para poner pantalla completa
        let fullScreenButton= this.add.image(70,70,"fullScreenButton"); //imagen del botón y su posición
        fullScreenButton.setScale(0.16); //escalamos la imagen del botón
        fullScreenButton.setInteractive().on("pointerdown",fullScreen); //al clicar en el botón se pondrá en pantalla completa


        //boton salir
        let exitButton = this.add.image (900,990, "exit" ).setInteractive();
        exitButton.setScale(2.5);
        exitButton.on("pointerdown", (exitButton) =>{
            this.scene.start("mainMenu");
        });

    }
    
    update(time, delta){
       
    }
}


