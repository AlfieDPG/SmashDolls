function return_IP() {
    return location.host;
}
export {return_IP};

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
        this.music;
        this.musicIsPlaying=false;
}

     preload() {
       this.load.image("mainBackground","./assets/fondos/Fondo-morado.jpg");
       this.load.image("fullScreenButton","./assets/pantalla-completa.png");
       this.load.image("local","./assets/Botones/BotonLocal.png");
       this.load.image("credits","./assets/Botones/BotonCreditos.png");
       this.load.image("control","./assets/Botones/BotonControles.png");
      
       this.load.image("titulo","./assets/fondos/titulo.png");
       this.load.audio("music","/assets/sonidos/musica.mp3")
    }
    
     create(){
        //añadir fondo
        var background = this.add.image(960,540,"mainBackground");
        background.setScale(1);

        if (this.musicIsPlaying==false){
            this.music= this.sound.add("music");
        this.musicIsPlaying=true;
        }
        
        //añadir musica
        if (!this.music.isPlaying){
            
            this.music.loop= true;
            this.music.play();
        }
        
        //titulo
        var title = this.add.image(960,200,"titulo");
        title.setScale(0.5);

        //botón para poner pantalla completa
        let fullScreenButton= this.add.image(70,70,"fullScreenButton"); //imagen del botón y su posición
        fullScreenButton.setScale(0.16); //escalamos la imagen del botón
        fullScreenButton.setInteractive().on("pointerdown",fullScreen); //al clicar en el botón se pondrá en pantalla completa
 
        //boton jugar en local
        let localButton = this.add.image (960,500, "local" ).setInteractive();
        localButton.setScale(2.5);
        localButton.on("pointerdown", (localButton) =>{
            this.scene.start("playerName");
        });

        //boton lore
        let loreButton = this.add.image (730,850, "credits" ).setInteractive();
        loreButton.setScale(2);
        loreButton.on("pointerdown", (loreButton) =>{
            this.scene.start("loreScene");
        });

        //boton creditos
        let creditsButton = this.add.image (730,700, "credits" ).setInteractive();
        creditsButton.setScale(2);
        creditsButton.on("pointerdown", (creditsButton) =>{
            this.scene.start("creditsMenu");
        });

        //boton controles
        let controlButton = this.add.image (1170,850, "control" ).setInteractive();
        controlButton.setScale(2);
        controlButton.on("pointerdown", (controlButton) =>{
            this.scene.start("controlMenu");
        });

        //boton chat
        let chatButton = this.add.image (1170,700, "control" ).setInteractive();
        chatButton.setScale(2);
        chatButton.on("pointerdown", (chatButton) =>{
            this.scene.start("chatScene");
        });
    }
    
    update(time, delta){
        
    }
}


