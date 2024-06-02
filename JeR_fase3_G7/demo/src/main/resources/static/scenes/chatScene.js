import { return_IP } from "./mainMenu.js";

import {return_playerName} from "./playerName.js"
// Variables necesarias para realizar funciones con peticiones al servidor
var serverRequests = new ServerRequests();

function fullScreen() {
    if (this.scene.scale.isFullscreen == false) {
        this.scene.scale.startFullscreen();
    } else {
        this.scene.scale.stopFullscreen();
    }
}

export default class chatScene extends Phaser.Scene {
    constructor() {
        super("chatScene"); //nombre escena
        this.currentMensajeIndex = 0; // Índice del mensaje actual
        this.mensajes = []; // Array para almacenar los mensajes obtenidos del servidor
        
    }

    preload() {
        this.load.image("fullScreenButton","./assets/pantalla-completa.png");
        this.load.image("mainBackground","./assets/fondos/FondoPC.jpg");
        this.load.image("exit","./assets/Botones/BotonSalir.png");
        this.load.image("edit","./assets/Botones/BotonEditar.png");
        this.load.image("delete","./assets/Botones/BotonBorrar.png");
        this.load.image("add","./assets/Botones/BotonAnadir.png");
        this.load.image("arrowRight","./assets/Botones/BotonFlechaDcha.png");
        this.load.image("arrowLeft","./assets/Botones/BotonFlechaIzqda.png");
     }

    create() {
        // Obtener los mensajes del servidor al iniciar la escena
        this.loadMensajesFromServer();

        // Añadir fondo
        var background = this.add.image(960, 540, "mainBackground").setScale(1);

        // Botón para poner pantalla completa
        let fullScreenButton = this.add.image(70, 70, "fullScreenButton"); // Imagen del botón y su posición
        fullScreenButton.setScale(0.16); // Escalamos la imagen del botón
        fullScreenButton.setInteractive().on("pointerdown", fullScreen); // Al clicar en el botón se pondrá en pantalla completa

        //boton salir
        let exitButton = this.add.image (960,990, "exit" ).setInteractive();
        exitButton.setScale(0.5);
        exitButton.on("pointerdown", (exitButton) =>{
            this.shutdown();
            this.scene.start("mainMenu");
        });

        // Crear un contenedor DOM desplazable para los mensajes
        this.messageContainer = this.add.dom(960, 450).createFromHTML(`
            <div id="messageContainer" style="width: 600px; height: 400px; overflow-y: scroll; background-color: rgba(199, 81, 178, 0.5); padding: 10px; border-radius: 10px;">
                <!-- Los mensajes aparecerán aquí -->
            </div>
        `);

        // Añadir cuadro de texto para ingresar el nuevo mensaje
        this.inputText = this.add.dom(960, 800).createFromHTML(`
            <textarea id="messageInput" placeholder="Escribe aquí tu mensaje" style="font-size: 24px; width: 300px; height: 100px; padding: 10px;"></textarea>
            <button id="sendButton" style="font-size: 24px; padding: 10px;">Enviar mensaje</button>
        `);
        document.getElementById('messageInput').addEventListener('keydown', (event) => {
            event.stopPropagation();
        });

        document.getElementById('sendButton').addEventListener('click', this.sendMessage.bind(this));
    }
    sendMessage() {
        let texto = document.getElementById('messageInput').value;
        let nombreUsuario = return_playerName();
        console.log(nombreUsuario);
        if (texto&&nombreUsuario) {
            let nuevoMensaje = {
                nombre: return_playerName(),  // Puedes ajustar esto para tomar un nombre de usuario real
                mensaje: texto
            };

            // Enviar solicitud al servidor para agregar nuevo mensaje
            serverRequests.addMensaje(nuevoMensaje, return_IP()).done(() => {
                this.displayNewMensaje(nuevoMensaje);  // Mostrar el nuevo mensaje inmediatamente
                document.getElementById('messageInput').value = ''; // Limpiar el campo de texto
            }).fail(() => {
                console.log('ERROR de conexión, no se pudo agregar el nuevo mensaje.');
            });
        }
    }

    loadMensajesFromServer() {
        serverRequests.loadMensajes(return_IP()).done(mensajes => {
            this.mensajes.push(...mensajes);
            this.updateMensajes();
        
        }).fail(() => {
            console.log('ERROR de conexión, no se pudo cargar los mensajes del juego.');
        });
    }

    updateMensajes() {
        let messageContainer = document.getElementById('messageContainer');
        messageContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar los mensajes

        this.mensajes.forEach(mensaje => {
            let messageElement = document.createElement('div');
            messageElement.style.marginBottom = '10px';
            messageElement.innerHTML = `<strong>${mensaje.nombre}:</strong> ${mensaje.mensaje}`;
            messageContainer.appendChild(messageElement);
        });

        // Desplazar hacia abajo para mostrar el último mensaje
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    displayNewMensaje(nuevoMensaje) {
        // Añadir el nuevo mensaje al array de mensajes y actualizar el índice actual
        this.mensajes.push(nuevoMensaje);
        this.updateMensajes(); // Actualizar la lista de mensajes en el contenedor
    }

    update(time, delta) {
        // Este método puede permanecer vacío si no se necesita realizar ninguna acción continua
    }

    shutdown() {
        this.input.keyboard.off('keydown');
        this.input.keyboard.off('keyup');
        this.events.off('resume', this.handleSceneResume, this);
    }
}