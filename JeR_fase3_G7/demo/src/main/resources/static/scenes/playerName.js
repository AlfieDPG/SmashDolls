import {return_IP} from "./mainMenu.js";

// Variables necesarias para realizar funciones con peticiones al servidor
var serverRequests = new ServerRequests();

function fullScreen(){
    if(this.scene.scale.isFullscreen == false){
        this.scene.scale.startFullscreen();

    }
    else{
        this.scene.scale.stopFullscreen();
    }
}

export default class playerName extends Phaser.Scene{
    constructor(){
        super("playerName");

    }
    wake= false;
    player;
    newPlayer = false;
    newTry = true;
    cursor;

    preload(){
        this.load.image("mainBackground","./assets/fondos/Fondo-morado.jpg");
        this.load.image("fullScreenButton","./assets/pantalla-completa.png");
        this.load.image("local","./assets/Botones/BotonLocal.png");
        this.load.image("textbox1", "./assets/textbox1.png")
    
    }
    create(){
        //añadir fondo
        var background = this.add.image(960,540,"mainBackground");
        background.setScale(1);

        //texto para intoducir el jugador
        var textbox1 = this.add.image(960,500,'textbox1');
        textbox1.setScale(0.7,0.3);

        var titulo = this.add.text(650, 400, 'INTRODUCE UN NOMBRE DEL JUGADOR', { fontFamily: 'Courier New, monospace',color: 'white'});
        titulo.setScale(2)
        this.namePlayer = this.add.text(690,480, '', { fontFamily: 'Courier New, monospace',color: 'black'}).setScale(2.5);
        
        this.cursors = this.input.keyboard.createCursorKeys();

        this.tempTry = this.time.addEvent({ delay: 200, callback: this.NewTry, callbackScope: this});
        this.tempTry.paused = true;

        this.input.keyboard.on('keydown', event =>
            {
                if (event.keyCode === 8 && this.namePlayer.text.length > 0)
                {
                    this.namePlayer.setText(this.namePlayer.text.substr(0, this.namePlayer.text.length - 1));
                }
                if(event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90)) {
                    this.namePlayer.setText(this.namePlayer.text+event.key);
                }
    
            });

        //boton jugar en local
        let localButton = this.add.image (960,1000, "local" ).setInteractive();
        localButton.setScale(1.7);
        localButton.on("pointerdown", (localButton) =>{
            this.scene.start("scene1");
        });
    }
    update(){
        if (this.cursors.down.isDown && this.pointer.y == 348)
            {
            this.pointer.y += 40;
            }
            else if (this.cursors.up.isDown && this.pointer.y == 388)
            {
            this.pointer.y -= 40;
            }

            //si se presiona enter
            this.input.keyboard.on('keydown_ENTER', () =>{ 

                //si ya se ha introducido el nombre y es un nuevo intento
                if(this.newPlayer&&this.newTry) {
                    // si no se ha iniciado la esena y el puntero
                    if(!this.wake && this.pointer.y == 348){
                        this.scene.wake('scene1');
                        this.scene.stop('SceneMenu');
                        this.scene.start('scene1');
                        this.wake = true;
                    }else 
                    {
                        //window.close();
                        this.exit = this.add.image(400, 300, 'exit').setScale(1.5);
                        
                        this.scene.stop('scene1');
                    }
                    this.newTry = false;
                    this.tempTry.paused = false;
                }

                //si el nuevo nombre no ha sido introducido y es un nuevo intento
                if(!this.newPlayer&&this.newTry) {
                    this.newTry = false;
                    this.tempTry.paused = false;
                    this.newPlayer = true;
                    this.player = this.namePlayer.text;
                    nombreJugador = this.namePlayer.text;
                    // Hacer una petición al servidor para comunicar el nombre del jugador
                    var objeto = {namePlayer : nombreJugador}
                    serverRequests.addPlayers(objeto, return_IP());
                    this.textbox1.visible = false;
                    this.titulo1.setText('');
                    this.titulo2.setText('');
                    this.namePlayer.setText('');
                    this.add.text(120, 340, 'NUEVA PARTIDA', { fontFamily: 'Times, serif',color: 'silver'});
                    this.add.text(120, 380, 'SALIR', { fontFamily: 'Times, serif',color: 'silver'});
                    this.pointer = this.add.image(110, 348, 'pointer').setScale(0.55);
                }
    
            });
        }
        NewTry() {
            this.newTry = true;
            this.tempTry = this.time.addEvent({ delay: 200, callback: this.newTry, callbackScope: this});
            this.tempTry.paused = true;
        }
    
}