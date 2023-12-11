

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
       this.load.image("local","./assets/local.png");
       this.load.image("online","./assets/online.png");

    }
    
     create(){
        //añadir fondo
        var background = this.add.image(900,500,"mainBackground");
        background.setScale(3);

        //botón para poner pantalla completa
        let fullScreenButton= this.add.image(100,100,"fullScreenButton"); //imagen del botón y su posición
        fullScreenButton.setScale(0.2); //escalamos la imagen del botón
        fullScreenButton.setInteractive().on("pointerdown",fullScreen); //al clicar en el botón se pondrá en pantalla completa
 
        //boton jugar en local
        let localButton = this.add.image (900,670, "local" ).setInteractive();
        localButton.on("pointerdown", (localButton) =>{
            this.scene.start("scene1");
        });

        //boton jugar online (SIN IMPLEMENTAR TODAVIA)
        let onlineButton = this.add.image (900,850, "online" ).setInteractive();
        //onlineButton.on("pointerdown", (localButton) =>{
        //    this.scene.start("scene1");
        //});
          
    }
    
    update(time, delta){
       
    }
}


