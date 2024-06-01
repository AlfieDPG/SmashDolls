/*var connection = new WebSocket('ws://'+ return_IP() +'/chat');
	connection.onerror = function(e) {
		console.log("WS error: " + e);
	}
    connection.onclose = function() {
        console.log("Closing socket");
    }*/

    import connection from './scene1.js'; // Asegúrate de que la ruta del archivo sea correcta


function fullScreen(){
    if(this.scene.scale.isFullscreen == false){
        this.scene.scale.startFullscreen();

    }
    else{
        this.scene.scale.stopFullscreen();
    }

}
 
export default class pauseMenu extends Phaser.Scene {
    constructor(){
        super("pauseMenu"); //nombre escena
}

     preload() {
       this.load.image("pauseBackground","./assets/fondos/Fondo-morado.jpg");
       this.load.image("fullScreenButton","./assets/pantalla-completa.png");
      
       this.load.image("credits2","./assets/Botones/BotonCreditos.png");
       this.load.image("control2","./assets/Botones/BotonControles.png");
       this.load.image("pausa","./assets/MenuPausa.png");
       this.load.image("return","./assets/Botones/BotonReanudar.png");
    }
    
     create(){
        //añadir fondo
        var background = this.add.image(960,540,"pauseBackground");
        background.setScale(1);

        
        //titulo
        var title = this.add.image(960,200,"pausa");
        title.setScale(1.2);

        //botón para poner pantalla completa
        let fullScreenButton= this.add.image(70,70,"fullScreenButton"); //imagen del botón y su posición
        fullScreenButton.setScale(0.16); //escalamos la imagen del botón
        fullScreenButton.setInteractive().on("pointerdown",fullScreen); //al clicar en el botón se pondrá en pantalla completa
 
       

        //boton creditos
        let creditsButton = this.add.image (960,500, "credits2" ).setInteractive();
        creditsButton.setScale(3);
        creditsButton.on("pointerdown", (creditsButton) =>{
            this.scene.start("creditsMenu2");
        });

        //boton controles
        let controlButton = this.add.image (960,700, "control2" ).setInteractive();
        controlButton.setScale(3);
        controlButton.on("pointerdown", (controlButton) =>{
            this.scene.start("controlMenu2");
        });
        //boton salir
        let returnButton = this.add.image (960,900, "return" ).setInteractive();
        returnButton.setScale(3);
        
        returnButton.on("pointerdown", (returnButton) =>{
            
            this.scene.stop("pauseMenu");
            this.scene.wake("scene1");
            this.scene.wake("UI");
            var msg ={
                type : "pauseOff"
            }
            connection.send(JSON.stringify(msg));
            
        });
        /*connection.onmessage = (msg) => {
            console.log("WS message: " + msg.data);
            var message = JSON.parse(msg.data)
            var type = message.type
            if(type == "pauseOf"){
                this.scene.stop("pauseMenu");
                this.scene.wake("scene1");
                this.scene.wake("UI");
            

        }
    }*/
}
    
    update(time, delta){
        
    }
}

     
