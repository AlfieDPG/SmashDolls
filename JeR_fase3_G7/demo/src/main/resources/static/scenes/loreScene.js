import {return_IP} from "./mainMenu.js";

// Variables necesarias para realizar funciones con peticiones al servidor
var serverRequests = new ServerRequests();



//import { return_player_name} from "./Menu.js";
//import { return_IP } from "./Menu.js";  



function fullScreen(){
    if(this.scene.scale.isFullscreen == false){
        this.scene.scale.startFullscreen();

    }
    else{
        this.scene.scale.stopFullscreen();
    }

}
export default class loreScene extends Phaser.Scene {
    constructor(){
        super("loreScene"); //nombre escena
        this.currentLoreIndex = 0; // Índice del lore actual
        this.lores = []; // Array para almacenar los lores obtenidos del servidor
        this.textoTitulo = null; // Objeto de texto para el título
        this.textoCuerpo = null; // Objeto de texto para el cuerpo del lore
         // Verificar si el lore inicial ya se ha creado antes de agregarlo
        
         
            
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
    
     create(){
          
        // Obtener los lores del servidor al iniciar la escena
        this.loadLoreFromServer();
        console.log(this.lores)

        //añadir fondo
        var background = this.add.image(960,540,"mainBackground").setScale(1);
       
// Crear el texto para el título y establecer el estilo en negrita
this.textoTitulo = this.add.text(0, 0, '', {
    fontSize: '28px', // Tamaño del título
    fontStyle: 'bold', // Estilo en negrita
    fill: '#000', // Color del título
    align: 'center', // Alinear el texto al centro
    wordWrap: { width: 800, useAdvancedWrap: true } // Envolver palabras para ajustar dentro de un ancho especificado
});

// Crear el texto para el cuerpo
this.textoCuerpo = this.add.text(0, 0, '', {
    fontSize: '24px', // Tamaño del cuerpo
    fill: '#000', // Color del cuerpo
    align: 'center', // Alinear el texto al centro
    wordWrap: { width: 800, useAdvancedWrap: true } // Envolver palabras para ajustar dentro de un ancho especificado
});

// Calcular la posición inicial del texto para centrarlo en la pantalla
let x = this.cameras.main.width / 2;
let y = this.cameras.main.height / 2;

// Añadir una separación vertical entre el título y el cuerpo
let separacionVertical = 20;

// Establecer la posición del texto para el cuerpo
this.textoCuerpo.setPosition(x, y);

// Ajustar la posición del texto para el título un poco encima del cuerpo
this.textoTitulo.setPosition(x, y - this.textoCuerpo.height  - separacionVertical);

// Centrar ambos textos en la pantalla
this.textoTitulo.setOrigin(0.5, 0.5);
this.textoCuerpo.setOrigin(0.5, 0.5);



        //botón para poner pantalla completa
        let fullScreenButton= this.add.image(70,70,"fullScreenButton"); //imagen del botón y su posición
        fullScreenButton.setScale(0.16); //escalamos la imagen del botón
        fullScreenButton.setInteractive().on("pointerdown",fullScreen); //al clicar en el botón se pondrá en pantalla completa
 
        //botón flecha izquierda
        let prevButton = this.add.image (120,790, "arrowLeft" ).setInteractive();
        prevButton.setScale(0.5);
        prevButton.on("pointerdown", () => {
            this.currentLoreIndex = (this.currentLoreIndex - 1 + this.lores.length) % this.lores.length;
            this.updateLoreText();
            console.log("loreanterior");
        });

        //botón flecha derecha
        let nextButton = this.add.image (1800,800, "arrowRight" ).setInteractive();
        nextButton.setScale(0.5);       
        nextButton.on("pointerdown", () => {
            this.currentLoreIndex = (this.currentLoreIndex + 1) % this.lores.length;
            this.updateLoreText();
            console.log("siguientelore");
        });

        //boton salir
        let exitButton = this.add.image (960,990, "exit" ).setInteractive();
        exitButton.setScale(0.5);
        exitButton.on("pointerdown", (exitButton) =>{
            this.shutdown();
            this.scene.start("mainMenu");
        });

        // Añadir botón para editar el lore actual
        let editButton = this.add.image (1300,990, "edit" ).setInteractive();
        editButton.setScale(0.2);
        editButton.on("pointerdown", () => {
        
        // Llamando a la función updateLore dentro de tu escena
        let selectedLore = this.lores[this.currentLoreIndex];
        let newTitle = prompt("Enter new title for this lore:", selectedLore.titulo);
        let newText = prompt("Enter new text for this lore:", selectedLore.texto);

        if (newTitle !== null && newText !== null) { // Comprueba si el usuario hizo clic en Cancelar
            // Actualiza el objeto selectedLore con los nuevos valores
            selectedLore.titulo = newTitle;
            selectedLore.texto = newText;

            // Llama a la función updateLore para actualizar el lore en el servidor
            serverRequests.updateLore(selectedLore.id, { id: selectedLore.id, titulo: newTitle, texto: newText }, return_IP())
                .then((updatedLore) => {
                    console.log("Lore updated successfully:", updatedLore);
                    // Aquí puedes actualizar la interfaz de usuario si es necesario
                    // Por ejemplo, podrías volver a cargar los lores del servidor para reflejar los cambios
                    this.loadLoreFromServer();
                })
                .catch((error) => {
                    console.log('ERROR de conexión, no se pudo actualizar el lore en el servidor:', error);
                });
        }

    });

        // Añadir botón para agregar nuevo lore
        let addLoreButton = this.add.image (1700,990, "add" ).setInteractive();
        addLoreButton.setScale(0.4);  
        addLoreButton.on("pointerdown", () => {
            // Mostrar formulario emergente para agregar nuevo lore
            let titulo = prompt("Enter title for new lore:");
            let texto = prompt("Enter text for new lore:");

            if (titulo && texto) {
                // Crear objeto de nuevo lore
                let nuevoLore = {
                    titulo: titulo,
                    texto: texto
                };

                  // Enviar solicitud al servidor para agregar nuevo lore
                  serverRequests.addLore(nuevoLore, return_IP()).done((nuevoLore) => {
                    this.loadLoreFromServer();
                }).fail(() => {
                    console.log('ERROR de conexión, no se pudo agregar el nuevo lore.');
                });
            }
        });

        // Añadir botón para borrar el lore actual
        let deleteButton = this.add.image (210,990, "delete" ).setInteractive();
        deleteButton.setScale(0.4);
        deleteButton.on("pointerdown", () => {
        let selectedLore = this.lores[this.currentLoreIndex];


    if (selectedLore && selectedLore.hasOwnProperty('id')) {
        let confirmDelete = confirm("Are you sure you want to delete this lore?");
        if (confirmDelete) {
                // Enviar solicitud al servidor para eliminar el lore actual
            // Captura el valor correcto de "this" en una variable local para usarlo dentro de la función de devolución de llamada
            var self = this;
            


            $.ajax({
                url: 'http://' + return_IP() + '/lores'
            }).done(function () {
                console.log("Lore borrado correctamente.");
                // Usa "self" en lugar de "this" para acceder a "lores" y otras propiedades de la clase
                serverRequests.deleteLore(selectedLore.id, return_IP());
                self.lores.splice(self.currentLoreIndex, 1);
                // Si el índice actual es mayor que la longitud del array de lores, ajustar el índice
                if (self.currentLoreIndex >= self.lores.length) {
                    self.currentLoreIndex = self.lores.length - 1;
                }
                // Actualizar el texto del lore en la interfaz
                self.loadLoreFromServer();
                
                console.log("Lore deleted successfully.");
            }).fail(function () {
                console.log('ERROR de conexión, los datos no se podrán almacenar en el servidor.');
            });
                    }
                } else {
                    console.log('El lore seleccionado no tiene un ID válido para ser borrado.');
                }
            });
    }

    loadLoreFromServer() {
        serverRequests.loadLore(return_IP()).done(lores => {
            this.lores.push(...lores);
            this.updateLoreText();
            console.log(this.lores);
            // Mostrar el lore inicial en el objeto de texto
            
        }).fail(() => {
            console.log('ERROR de conexión, no se pudo cargar el lore del juego.');
        });
    }

    updateLoreText() {
        let selectedLore = this.lores[this.currentLoreIndex];
    
        if (selectedLore && selectedLore.hasOwnProperty('titulo') && selectedLore.hasOwnProperty('texto')) {
            // Calcular la posición inicial del texto para centrarlo en la pantalla
            let x = this.cameras.main.width / 2;
            let y = this.cameras.main.height / 2;
            let separacionVertical = 20;
    
            // Ajustar la posición del texto para el cuerpo
            this.textoCuerpo.setText(selectedLore.texto).setPosition(x, y);
    
            // Ajustar la posición del texto para el título un poco encima del cuerpo
            this.textoTitulo.setText(selectedLore.titulo).setPosition(x, y - this.textoCuerpo.height / 2 - separacionVertical);
        } else {
            console.log('El lore seleccionado no tiene las propiedades esperadas.');
        }
    }
        

    
    update(time, delta){
       
    }

    shutdown() {
        this.input.keyboard.off('keydown');
        this.input.keyboard.off('keyup');
        this.events.off('resume', this.handleSceneResume, this);
    }

    
}