import { return_IP } from "./mainMenu.js";
var nombreJugador;

function return_playerName() {
    return nombreJugador;
}
export {return_playerName}

function return_players(){
    loadPlayersFromServer();
}

export { return_players };



// Variables necesarias para realizar funciones con peticiones al servidor
var serverRequests = new ServerRequests();

function fullScreen() {
    if (this.scene.scale.isFullscreen == false) {
        this.scene.scale.startFullscreen();
    } else {
        this.scene.scale.stopFullscreen();
    }
}

export default class playerName extends Phaser.Scene {
    constructor() {
        super("playerName");
    }
    wake = false;
    player;
    newPlayer = false;
    newTry = true;
    cursor;
    jugadores = []; //array para amacenar la lista de jugadores
   

    preload() {
        this.load.image("mainBackground", "./assets/fondos/Fondo-morado.jpg");
        this.load.image("fullScreenButton", "./assets/pantalla-completa.png");
        this.load.image("local", "./assets/Botones/BotonLocal.png");
        this.load.image("exit", "./assets/Botones/BotonSalir.png");
        this.load.image("textBox", "./assets/Botones/textBox.png");
    }

    create() {
        //obtener los jugadores ddel servidor 
        this.loadPlayersFromServer();
        console.log(this.jugadores);
        // Añadir fondo
        var background = this.add.image(960, 540, "mainBackground");
        background.setScale(1);
        this.textBox = this.add.image(960, 500,'textBox');
        this.textBox.setScale(0.6);

        // Botón para poner pantalla completa
        let fullScreenButton = this.add.image(70, 70, "fullScreenButton");
        fullScreenButton.setScale(0.16);
        fullScreenButton.setInteractive().on("pointerdown", fullScreen);

        var titulo = this.add.text(500, 300, 'INTRODUCE UN NOMBRE DEL JUGADOR', { fontFamily: 'Courier New, monospace', color: 'white' });
        titulo.setScale(3);
        this.namePlayer = this.add.text(710, 480, '', { fontFamily: 'Courier New, monospace', color: 'white' }).setScale(2.5);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.tempTry = this.time.addEvent({ delay: 200, callback: this.NewTry, callbackScope: this });
        this.tempTry.paused = true;

        //detectar escribir
        this.input.keyboard.on('keydown', event => {
            if (event.keyCode === 8 && this.namePlayer.text.length > 0) {
                this.namePlayer.setText(this.namePlayer.text.substr(0, this.namePlayer.text.length - 1));
            }
            if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90)) {
                this.namePlayer.setText(this.namePlayer.text + event.key);
            }
            if (event.keyCode === 13) { // 13 es el código de la tecla Enter
                this.handleEnterKey();
            }
        });

        // Botón jugar en local
        let localButton = this.add.image(1200, 990, "local").setInteractive();
        localButton.setScale(0.5);
        localButton.on("pointerdown", () => {
            this.scene.start("scene1");
        });
         //boton salir
         let exitButton = this.add.image (700,990, "exit" ).setInteractive();
         exitButton.setScale(0.5);
         exitButton.on("pointerdown", (exitButton) =>{
             this.scene.start("mainMenu");
         });
    }
    loadPlayersFromServer() {
        this.jugadores=[]
        serverRequests.loadPlayers(return_IP()).done(jugadores => {
        this.jugadores.push(...jugadores);
        console.log(this.jugadores);
    }).fail(() => {
        console.log('ERROR de conexión, no se pudieron cargar los jugadores desde el servidor.');
    });
}
 

    update() {
        if (this.cursors.down.isDown && this.pointer.y == 348) {
            this.pointer.y += 40;
        } else if (this.cursors.up.isDown && this.pointer.y == 388) {
            this.pointer.y -= 40;
        }
    }

    handleEnterKey() {
        console.log("enter detectado");
    
        const inputName = this.namePlayer.text.trim(); // Nombre introducido por el usuario
    
        // Verificar si el nombre ya existe en la lista de jugadores
        const existingPlayer = this.jugadores.find(player => player.name === inputName);
    
        if (existingPlayer) {
            // Si el nombre del jugador ya existe, muestra el mensaje de bienvenida y luego inicia directamente la escena "scene1"
            console.log(`Jugador existente: ${JSON.stringify(existingPlayer)}`);
            const welcomeText = this.add.text(650, 340, 'BIENVENIDO DE NUEVO', { fontFamily: 'Courier New, monospace', color: 'white' }).setScale(3.5);
            nombreJugador = inputName;
            
            //this.scene.start('chatScene'); // Iniciar la escena del chat
    
        } else {
            // Si el nombre del jugador no existe, crea un nuevo jugador
            if (this.newPlayer && this.newTry) {
                if (!this.wake && this.pointer.y == 348) {
                    this.scene.wake('scene1');
                    this.scene.stop('mainMenu');
                    this.scene.start('scene1');
                    this.wake = true;
                } else {
                    this.exit = this.add.image(400, 300, 'exit').setScale(1.5);
                    this.scene.stop('scene1');
                }
                this.newTry = false;
                this.tempTry.paused = false;
                this.titulo.setText('');
                this.namePlayer.setText('');
            }
    
            if (!this.newPlayer && this.newTry) {
                this.newTry = false;
                this.tempTry.paused = false;
                this.newPlayer = true;
                nombreJugador = inputName;
    
                // Añadir el nuevo jugador al array
                this.jugadores.push({ name: nombreJugador });
    
                let player = {
                    name: nombreJugador,
                   
                };
    
                serverRequests.addPlayers(player, return_IP()).done((player) => {
                    this.jugadores.push(player);
                    this.loadPlayersFromServer();
                }).fail(() => {
                    console.log('ERROR de conexión, no se pudo agregar el nuevo jugador.');
                });
              
                //this.namePlayer.setText('');
            }
        }
    }
    
    

    NewTry() {
        this.newTry = true;
        this.tempTry = this.time.addEvent({ delay: 200, callback: this.NewTry, callbackScope: this });
        this.tempTry.paused = true;
    }
}