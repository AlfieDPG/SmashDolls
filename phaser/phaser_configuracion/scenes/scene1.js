import UI from "./UI.js";

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
        this.shieldCount1 = 0; // contador de veces que se ha usado el escudo para doll1
        this.shieldCount2 = 0; // contador de veces que se ha usado el escudo para doll2

        this.shieldCooldownTime = 10000; // Tras 5 segundos se puede volver a activar el escudo
        this.lastShieldTime1 = 0;
        this.lastShieldTime2 = 0;

        this.isShieldActive1 = true;
        this.isShieldActive2 = true;
    }

     preload() {
       this.load.image("background","./assets/Background.png");
       this.load.atlas('girlie', 'assets/girlie.png', 'assets/girliesprites.json');
       this.load.image("fullScreenButton","./assets/pantalla-completa.png");
       
    }
    //inicia las barras de vida
    init (){
        this.scene.launch('UI');
    }
    
     create(){
        //añadir fondo
        var background = this.add.image(500,500,"background");
        background.setScale(6);

        //botón para poner pantalla completa
        let fullScreenButton= this.add.image(70,70,"fullScreenButton"); //imagen del botón y su posición
        fullScreenButton.setScale(0.16); //escalamos la imagen del botón
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
            frameRate:12,
            repeat: 0
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

        this.anims.create({
            key: 'shield',
            frames: this.anims.generateFrameNames('girlie', {prefix: 'shield', end: 1, zeroPad: 4 }),
            frameRate:15,
            repeat: 2
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

         // Añadir texto para mostrar las vidas de la muñeca 1
         this.textLife1 = this.add.text(this.doll1.x - 30, this.doll1.y +50, '100%', { fontFamily: 'Arial', fontSize: 50, color: '#ffffff' });
         this.textLife1.setScrollFactor(0); // Para que el texto permanezca fijo al hacer scroll
 
         // Añadir texto para mostrar las vidas de la muñeca 2
         this.textLife2 = this.add.text(this.doll2.x -30, this.doll2.y +50, '100%', { fontFamily: 'Arial', fontSize: 50, color: '#ffffff' });
         this.textLife2.setScrollFactor(0);
         
        

         
        var cursors = this.input.keyboard.createCursorKeys();   

        const keys = Phaser.Input.Keyboard.KeyCodes;
        this.keyZ = this.input.keyboard.addKey(keys.Z);
         // Configurar colisiones entre las muñecas
         this.physics.add.collider(this.doll1, this.doll2, this.handleCollision, null, this);
         

    }
    
    update(time, delta){

    const doll1X = this.doll1.x;
    const doll1Y = this.doll1.y;

    const doll2X = this.doll2.x;
    const doll2Y = this.doll2.y;

    this.textLife1.setPosition(doll1X , doll1Y -200);
    this.textLife2.setPosition(doll2X-120 , doll2Y -200);

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
            this.doll1.anims.play('basic', false);
            console.log('ataque');
        }

        else if(this.input.keyboard.addKey('R').isDown ){ //animación de ataque especial
            this.doll1.anims.play('attacking', false);
           
        }

        else if(this.input.keyboard.addKey('Q').isDown && this.isShieldActive1 ){ //animación de daño recibido
            this.doll1.anims.play('shield', true);
            
        }
        else{
            // Solo ejecutar si ninguna de las animaciones específicas está reproduciéndose
            if (
                !this.doll1.anims.isPlaying 
            ) {
                if (this.doll1.body.blocked.down) { // Animación de estar de pie solo si está en el suelo
                    this.doll1.setVelocityX(0);
                    this.doll1.anims.play('standing', true);
                }
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
            this.doll2.anims.play('basic', false);
            
        }

        else if(this.input.keyboard.addKey('P').isDown ){ //animación de ataque especial
            this.doll2.anims.play('attacking', false);
            
        }

        else if(this.input.keyboard.addKey('U').isDown && this.isShieldActive2){ //animación de escudo
            this.doll2.anims.play('shield', true);
            
        }

        else{
            // Solo ejecutar si ninguna de las animaciones específicas está reproduciéndose
            if (
                !this.doll2.anims.isPlaying 
            ) {
                if (this.doll2.body.blocked.down) { // Animación de estar de pie solo si está en el suelo
                    this.doll2.setVelocityX(0);
                    this.doll2.anims.play('standing', true);
                }
            }
        }
       
    
       
    }


    // COLISIONES ENTRE LOS JUGADORES
    handleCollision(player1, player2) {
        // Este método se ejecutará cuando los dos personajes colisionen
        console.log('¡Colisión detectada!');
        // Puedes agregar aquí lógica adicional, como reducir la salud, reproducir un sonido, etc.
       
        // Obtiene las animaciones doll1
        const basicAnimation1 = this.input.keyboard.addKey('E').isDown;
        const shieldAnimation1 = this.input.keyboard.addKey('Q').isDown;
        const attackingAnimation1 = this.input.keyboard.addKey('R').isDown;

        // Obtiene las animaciones de doll2
        const basicAnimation2 = this.input.keyboard.addKey('O').isDown;
        const attackingAnimation2 = this.input.keyboard.addKey('P').isDown;
        const shieldAnimation2 = this.input.keyboard.addKey('U').isDown;


    // SISTEMA DE VIDAS DE LA MUÑECA 1

    if (shieldAnimation1 && (basicAnimation2==true || attackingAnimation2==true)) { //Si la animacion "shield"
        console.log('Animación "shield" está en reproducción para doll1.');
            this.shieldCount1++; //si se ha usado menos de 3 veces se aumenta el contador 
            console.log('Contador de escudo para doll1:', this.shieldCount1);
            this.handleShield1(this.shieldCount1);
    }
    else if (basicAnimation1 == true && shieldAnimation2==false){ // si la animación de ataque básico de la muñeca 1 y la de escudo de la muñeca 2 está desactivada
        console.log('Animación "basic" está en reproducción.');
        this.restarVidas = 5; //vida restada ataque normal
        if (player2.getData('life2') - this.restarVidas > 0) { //la muñeca 2 pierde 5 vidas
            player2.setData('life2', player2.getData('life2') - this.restarVidas);
            console.log('Vida doll2:', player2.getData('life2'));
            // Actualizar texto de vidas de la muñeca 1
            
            this.textLife2.setText(` ${player2.getData('life2')}%`);

            player2.anims.play('damaged', true);
        }
        this.registry.events.emit('vida2', player2.getData('life2'));
        }  
    
    else if (attackingAnimation1 == true && shieldAnimation2==false) { // si la animación de ataque especial de la muñeca 1 y la de escudo de la muñeca 2 está desactivada
            console.log('Animación "attacking" está en reproducción para doll1.');
            this.restarVidas = 10; //vida restada ataque especial
        if (player2.getData('life2') - this.restarVidas > 0) {
            player2.setData('life2', player2.getData('life2') - this.restarVidas);//la muñeca 2 pierde 5 vidas
            console.log('Vida doll2:', player2.getData('life2'));
            
            this.textLife2.setText(` ${player2.getData('life2')}%`);
            player2.anims.play('damaged', true); 
        }
        this.registry.events.emit('vida2', player2.getData('life2'));
    }

     //SISTEMA DE VIDAS DE LA MUÑECA 2   
    
    if (shieldAnimation2 && (basicAnimation1==true || attackingAnimation1==true)) {
            console.log('Animación "shield" está en reproducción para doll2.');
                this.shieldCount2++;
                console.log('Contador de escudo para doll2:', this.shieldCount2);
                this.handleShield2();
        }    
    
        // Verifica si la animación 'basic' está en reproducción en doll2
    else if (basicAnimation2 == true && shieldAnimation1==false) {
            console.log('Animación "basic" esatá en reproducción para doll2.');
            this.restarVidas = 5; //vida restada ataque normal
        if (player1.getData('life1') - this.restarVidas > 0) {
                player1.setData('life1', player1.getData('life1') - this.restarVidas);
                console.log('Vida doll1:', player1.getData('life1'));
                
                this.textLife1.setText(` ${player1.getData('life1')}%`);
                player1.anims.play('damaged', true);
            }
            this.registry.events.emit('vida', player1.getData('life1'));
        } 
    else if (attackingAnimation2 == true && shieldAnimation1==false) {
            console.log('Animación "attacking" está en reproducción para doll2.');
            this.restarVidas = 10; //vida restada ataque normal
            if (player1.getData('life1') - this.restarVidas > 0) {
                player1.setData('life1', player1.getData('life1') - this.restarVidas);
                console.log('Vida doll1:', player1.getData('life1'));
                
                this.textLife1.setText(` ${player1.getData('life1')}%`);
                player1.anims.play('damaged', true);
            }
            this.registry.events.emit('vida', player1.getData('life1'));
            // Agregar lógica adicional para la animación de ataque especial de doll2
        }

        //REACCIÓN AL COLISIONAR 

        /*//Los jugadores rebotarán un poco hacia el lado al chocar
        if (player1.x < player2.x) {// Verificar si player1 está a la izquierda de player2
            // Hacer que player1 se mueva hacia la izquierda y player2 hacia la derecha
            player1.setVelocityX(-300);
            player2.setVelocityX(300);
        } else {
            // Hacer que player1 se mueva hacia la derecha y player2 hacia la izquierda
            player1.setVelocityX(300);
            player2.setVelocityX(-300);
        } */  

        
    }


handleShield1(shieldCount1){
if (shieldCount1 <3){
this.isShieldActive1=true;
}
else{
    this.isShieldActive1=false;
    this.time.addEvent({
        delay:this.shieldCooldownTime,
        callback: ()=>{
            this.isShieldActive1=true;
            this.shieldCount1=0;
        },
        callbackContext: this
    });
}

}

handleShield2(shieldCount2){
    if (shieldCount2 <3){
    this.isShieldActive2=true;
    }
    else{
        this.isShieldActive2=false;
        this.time.addEvent({
            delay:this.shieldCooldownTime,
            callback: ()=>{
                this.isShieldActive2=true;
                this.shieldCount2=0;
            },
            callbackContext: this
        });
    }
    
    }





}

