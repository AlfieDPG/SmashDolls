
function fullScreen(){
    if(this.scene.scale.isFullscreen == false){
        this.scene.scale.startFullscreen();

    }
    else{
        this.scene.scale.stopFullscreen();
    }

}
export default class scene1 extends Phaser.Scene {
 

    constructor(){
        super("scene1"); //nombre escena
    }

     preload() {
       this.load.image("background","./assets/Background.png");
       this.load.atlas('girlie', 'assets/girlie.png', 'assets/girliesprites.json');
       this.load.image("fullScreenButton","./assets/pantalla-completa.png");
       
    }
    
     create(){
        //añadir fondo
        var background = this.add.image(500,500,"background");
        background.setScale(6);

        //botón para poner pantalla completa
        let fullScreenButton= this.add.image(100,100,"fullScreenButton"); //imagen del botón y su posición
        fullScreenButton.setScale(0.2); //escalamos la imagen del botón
        fullScreenButton.setInteractive().on("pointerdown",fullScreen); //al clicar en el botón se pondrá en pantalla completa
    
       


        //Animaciones de girlie
        this.anims.create({
            key: 'standing',
            frames: this.anims.generateFrameNames('girlie', {prefix: 'standing', end: 3,zeroPad: 4 }),
            frameRate:5,
            repeat: 0
        });

        this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNames('girlie', {prefix: 'running', end: 7,zeroPad: 4 }),
            frameRate:10,
            repeat: -1
        });

        this.anims.create({
            key: 'jumping',
            frames: this.anims.generateFrameNames('girlie', {prefix: 'jumping', end: 4, zeroPad: 4 }),
            frameRate:10,
            repeat: 0
        });

        this.anims.create({
            key: 'attacking',
            frames: this.anims.generateFrameNames('girlie', {prefix: 'attacking', end: 5, zeroPad: 4 }),
            frameRate:10,
            repeat: 0
        });

        this.anims.create({
            key: 'basic',
            frames: this.anims.generateFrameNames('girlie', {prefix: 'basicattack', end: 5, zeroPad: 4 }),
            frameRate:10,
            repeat: 0
        });

        this.anims.create({
            key: 'damaged',
            frames: this.anims.generateFrameNames('girlie', {prefix: 'damaged', end: 2, zeroPad: 4 }),
            frameRate:10,
            repeat: 0
        });
        
         //añadir personaje 1
        this.doll1 = this.physics.add.sprite(500,600,"girlie");
        this.doll1.setScale(6);
        this.doll1.body.setSize(22, 50); // Establecer el tamaño del cuerpo de colisión de doll1
        //console.log('Tamaño del sprite de doll1:', this.doll1.width, this.doll1.height);
        this.doll1.body.setOffset(20, 0); // Ajustar la posición del cuerpo de colisión
        this.doll1.setCollideWorldBounds(true);
        this.doll1.setData ('life1',100); //creas la vida de la muñeca
        this.physics.world.setBoundsCollision(true);
        

        //añadir personaje 2
        this.doll2 = this.physics.add.sprite(1420,600,"girlie");
        this.doll2.setScale(6);
        this.doll2.body.setSize(22, 50); // Establecer el tamaño del cuerpo de colisión de doll1
        //el tamaño del sprite es (39,50) pero como de X ocupa mucho espacio el pañuelo que en realidad no generaría colisión lo hemos reducido
        this.doll2.body.setOffset(0, 0); // Ajustar la posición del cuerpo de colisión porque no quedaba en el cuerpo del personaje
        this.doll2.flipX = true; //girar la segunda muñeca para que esté mirando hacia el lado contrario (enfrentándose)
        this.doll2.setCollideWorldBounds(true);
        this.doll2.setData ('life2',100);
        this.physics.world.setBoundsCollision(true);
        

         
        var cursors = this.input.keyboard.createCursorKeys();   

        const keys = Phaser.Input.Keyboard.KeyCodes;
        this.keyZ = this.input.keyboard.addKey(keys.Z);
         // Configurar colisiones entre las muñecas
         this.physics.add.collider(this.doll1, this.doll2, this.handleCollision, null, this);
         

    }
    
    update(time, delta){

        //eventos de teclado para la muñeca 1
        if (this.input.keyboard.addKey('A').isDown) //moverse a la izquierda
        {
            this.doll1.setVelocityX(-300);
            this.doll1.flipX = true;
            this.doll1.body.setOffset(0, 0); // Ajustar la posición del cuerpo de colisión
            if (this.doll1.body.blocked.down) {
               this.doll1.anims.play('running',true);
             }

            
           
        }
        else if (this.input.keyboard.addKey('D').isDown) //moverse a la derecha
        {
            this.doll1.setVelocityX(300);
            this.doll1.flipX=false;
            this.doll1.body.setOffset(20, 0); // Ajustar la posición del cuerpo de colisión
            if (this.doll1.body.blocked.down) {
                this.doll1.anims.play('running', true);
            }
        }

        else if(this.input.keyboard.addKey('W').isDown && this.doll1.body.blocked.down){ //animación de saltar
            this.doll1.setVelocityY(-700);
            this.doll1.anims.play('jumping', true);
        }

        else if(this.input.keyboard.addKey('E').isDown ){ //animación de ataque básico
            this.doll1.anims.play('basic', true);
            console.log('ataque');
        }

        else if(this.input.keyboard.addKey('R').isDown ){ //animación de ataque especial
            this.doll1.anims.play('attacking', true);
           
        }

        else if(this.input.keyboard.addKey('Q').isDown ){ //animación de daño recibido
            this.doll1.anims.play('damaged', true);
            
        }
        else
        {  
            if (this.doll1.body.blocked.down) { //animación de estar de pie 
                this.doll1.setVelocityX(0);
                this.doll1.anims.play('standing', true);
            }
       }


        //eventos de teclado para la muñeca 2
        if (this.input.keyboard.addKey('J').isDown) //moverse a la izquierda
        {
            this.doll2.setVelocityX(-300);
            this.doll2.flipX = true; 
            this.doll2.body.setOffset(0, 0); // Ajustar la posición del cuerpo de colisión 
            if (this.doll2.body.blocked.down) {
               this.doll2.anims.play('running',true);
             }  
        }
        else if (this.input.keyboard.addKey('L').isDown) //moverse a la derecha
        {
            this.doll2.setVelocityX(300);
            this.doll2.flipX=false;
            this.doll2.body.setOffset(20, 0); // Ajustar la posición del cuerpo de colisión
            if (this.doll2.body.blocked.down) {
                this.doll2.anims.play('running', true);
            }
        }
        else if(this.input.keyboard.addKey('I').isDown && this.doll2.body.blocked.down){ //animación de saltar
            this.doll2.setVelocityY(-700);
            this.doll2.anims.play('jumping', true);
        }

        else if(this.input.keyboard.addKey('O').isDown ){ //animación de ataque básico
            this.doll2.anims.play('basic', true);
            
        }

        else if(this.input.keyboard.addKey('P').isDown ){ //animación de ataque especial
            this.doll2.anims.play('attacking', true);
            
        }

        else if(this.input.keyboard.addKey('U').isDown ){ //animación de daño recibido
            this.doll2.anims.play('damaged', true);
            
        }

        else
        {  
            if (this.doll2.body.blocked.down) { //animación de estar de pie 
                this.doll2.setVelocityX(0);
                this.doll2.anims.play('standing', true);
       }
           
            
        }
       
    
       
    }


    // COLISIONES ENTRE LOS JUGADORES
    handleCollision(player1, player2) {
        // Este método se ejecutará cuando los dos personajes colisionen
        console.log('¡Colisión detectada!');
        // Puedes agregar aquí lógica adicional, como reducir la salud, reproducir un sonido, etc.
        
        // Obtiene la animación 'basic' de doll1
        const basicAnimation = this.input.keyboard.addKey('E').isDown;
        console.log('Animación actual:', basicAnimation);
    // Verifica si la animación 'basic' está en reproducción en doll1
    if (basicAnimation == true){
        console.log('Animación "basic" está en reproducción.');
        this.restarVidas = 10; //vida restada ataque normal
            if (this.doll2.getData('life2') - this.restarVidas > 0){
                this.doll2.setData('life2', this.doll2.getData('life2')- this.restarVidas)
                console.log ('vida:',this.doll2.getData('life2'));
            }
            this.registry.events.emit('vida', this.doll2.getData('life2'))
        }

        //Los jugadores rebotarán un poco hacia el lado al chocar
        if (player1.x < player2.x) {// Verificar si player1 está a la izquierda de player2
            // Hacer que player1 se mueva hacia la izquierda y player2 hacia la derecha
            player1.setVelocityX(-300);
            player2.setVelocityX(300);
        } else {
            // Hacer que player1 se mueva hacia la derecha y player2 hacia la izquierda
            player1.setVelocityX(300);
            player2.setVelocityX(-300);
        }

       
        
    }





}

