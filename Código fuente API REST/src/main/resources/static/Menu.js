var nombreUsuario;
var peticionesServidor = new PeticionesServidor();
function devolver_nombre_equipo (){
    return nombreUsuario;
}
export {devolver_nombre_equipo};
function devolver_IP() {
    return location.host;
}
export {devolver_IP};

class SceneMenu extends Phaser.Scene {
    wake = false;
    equipo;
    nombreIntroducido = false;
    nuevoIntento = true;
    cursors;
    constructor ()
    {
        super({ key: 'SceneMenu' });
    }

    preload ()
    {

        this.load.image('titlescreen', 'Assets/title screen 2.png');
        this.load.image('pointer', 'Assets/pointer.png');
        this.load.image('exit', 'Assets/Fondo_Black.jpg');
        this.load.image('textbox1', 'Assets/textbox1.png')

    }

    create (data)
    {
        this.titlescreen = this.add.image(400, 300, 'titlescreen').setScale(0.58);
        this.textbox1 = this.add.image(120,410,'textbox1').setScale(0.25,0.1);

        //this.pointer = this.add.image(110, 348, 'pointer').setScale(0.55);
        
        this.titulo1 = this.add.text(20, 340, 'INTRODUCE UN NOMBRE DE EQUIPO', { fontFamily: 'Times, serif',color: 'silver'});
        this.titulo2 = this.add.text(20, 360, 'Después, pulsa Enter para continuar', { fontFamily: 'Times, serif',color: 'silver'});
        this.nombreEquipo = this.add.text(20,400, '', { fontFamily: 'Times, serif',color: 'silver'});
        //this.add.text(120, 340, 'NUEVA PARTIDA', { fontFamily: 'Times, serif',color: 'silver'});
        //this.add.text(120, 380, 'SALIR', { fontFamily: 'Times, serif',color: 'silver'});

        this.cursors = this.input.keyboard.createCursorKeys();

        this.add.text(20, 480, 'Juan Coronado', { fontFamily: 'Times, serif',color: 'silver'});
        this.add.text(20, 500, 'Luis Fernando Rodríguez', { fontFamily: 'Times, serif',color: 'silver'});
        this.add.text(20, 520, 'Santiago Rubio', { fontFamily: 'Times, serif',color: 'silver'});
        this.add.text(20, 540, 'Jacobo Sánchez', { fontFamily: 'Times, serif',color: 'silver'});
        this.add.text(20, 560, 'Jose María Soriano', { fontFamily: 'Times, serif',color: 'silver'});

        this.temporizadorIntento = this.time.addEvent({ delay: 200, callback: this.NuevoIntento, callbackScope: this});
        this.temporizadorIntento.paused = true;
        
        /*
        //Esta funcion es provisional para pasar a la siguiente escena game con el clic
        this.input.manager.enabled = true;
        this.input.once('pointerdown', function () {

            this.scene.start('SceneGame');

        }, this);
        */
        this.scene.sleep('SceneGame');
        this.scene.sleep('SceneIntr1');
        this.scene.sleep('SceneVictoria');

        this.input.keyboard.on('keydown', event =>
        {
            if (event.keyCode === 8 && this.nombreEquipo.text.length > 0)
            {
                this.nombreEquipo.setText(this.nombreEquipo.text.substr(0, this.nombreEquipo.text.length - 1));
            }
            if(event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90)) {
                this.nombreEquipo.setText(this.nombreEquipo.text+event.key);
            }

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


        this.input.keyboard.on('keydown_ENTER', () =>{ 
            if(this.nombreIntroducido&&this.nuevoIntento) {
                if(!this.wake && this.pointer.y == 348){
                    this.scene.wake('SceneGame');
                    this.scene.stop('SceneMenu');
                    this.scene.start('SceneGame');
                    this.wake = true;
                }else 
                {
                    //window.close();
                    this.exit = this.add.image(400, 300, 'exit').setScale(1.5);
                    
                    this.scene.stop('SceneMenu');
                }
                this.nuevoIntento = false;
                this.temporizadorIntento.paused = false;
            }
            if(!this.nombreIntroducido&&this.nuevoIntento) {
                this.nuevoIntento = false;
                this.temporizadorIntento.paused = false;
                this.nombreIntroducido = true;
                this.equipo = this.nombreEquipo.text;
                nombreUsuario = this.nombreEquipo.text;
                // Hacer una petición al servidor para comunicar el nombre del equipo
                var objeto = {nombreEquipo : nombreUsuario}
                peticionesServidor.añadirEquipo(objeto, devolver_IP());
                this.textbox1.visible = false;
                this.titulo1.setText('');
                this.titulo2.setText('');
                this.nombreEquipo.setText('');
                this.add.text(120, 340, 'NUEVA PARTIDA', { fontFamily: 'Times, serif',color: 'silver'});
                this.add.text(120, 380, 'SALIR', { fontFamily: 'Times, serif',color: 'silver'});
                this.pointer = this.add.image(110, 348, 'pointer').setScale(0.55);
            }

        });

    }

    NuevoIntento() {
        this.nuevoIntento = true;
        this.temporizadorIntento = this.time.addEvent({ delay: 200, callback: this.NuevoIntento, callbackScope: this});
        this.temporizadorIntento.paused = true;
    }

    EnviarNombreEquipo() {
        
    }

}
export default SceneMenu;



