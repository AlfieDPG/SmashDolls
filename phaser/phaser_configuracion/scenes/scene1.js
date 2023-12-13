import UI from "./UI.js";

function fullScreen(){
    if(this.scene.scale.isFullscreen == false){
        this.scene.scale.startFullscreen();

    }
    else{
        this.scene.scale.stopFullscreen();
    }

}
var jump;
var attack;
var attackBela;
var attackFroppy;
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

        this.collisionHandled = false;

        this.isAttacking1 =false;
        this.isAttacking2 =false;

        this.isSuperAttacking1= false;
        this.isSuperAttacking2= false;

    

    }

     preload() {
       this.load.image("background","./assets/tienda.jpeg");
       this.load.atlas('girlie', 'assets/girlie.png', 'assets/girliesprites.json');
       this.load.image("fullScreenButton","./assets/pantalla-completa.png");
       this.load.audio("jump", "/assets/sonidos/salto.mp3");
       this.load.audio("attack", "/assets/sonidos/ataque.mp3");
       this.load.audio("attackBela", "/assets/sonidos/ataqBela.mp3");
       this.load.audio("attackFroppy", "/assets/sonidos/ataqFroppy.mp3");
       
    }
    //inicia las barras de vida
    init (){
        this.scene.launch('UI');
    }
    
     create(){
        //añadir fondo
        var background = this.add.image(950,530,"background");
         background.setScale(1.9);

        //efectos sonidos
          jump = this.sound.add("jump");
          attack = this.sound.add("attack");
          attackBela = this.sound.add("attackBela");
          attackFroppy = this.sound.add("attackFroppy");

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
        //console.log('Taomaño del sprite de doll1:', this.doll1.width, this.doll1.height);
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
         this.textLife1 = this.add.text(130,32, '100%', { fontFamily: 'Arial',fontSize: 74, color: '#000000', backgroundColor: '#ffffff' });
         this.textLife1.setScrollFactor(0); // Para que el texto permanezca fijo al hacer scroll

         // Añadir texto para mostrar las vidas de la muñeca 2
         this.textLife2 = this.add.text(1060,32, '100%', { fontFamily: 'Arial', fontSize: 74, color: '#000000', backgroundColor: '#ffffff' });
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
        //menu pausa
        if (this.input.keyboard.addKey('ESC').isDown) //MENU PAUSA
        {
            this.scene.sleep("UI");
            this.scene.sleep("scene1");
            this.scene.launch("pauseMenu");
            
        }
    

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
            jump.play();
        }

        else if(this.input.keyboard.addKey('E').isDown ){ //animación de ataque básico
            this.doll1.anims.play('basic', false);
            attack.play();
            this.doll1.on('animationcomplete', function (animation) {
                if (animation.key === 'basic') {
                    this.doll1.isAttacking1 = false; // Resetear la bandera cuando la animación completa
                }
            }, this);
    
            // Verificar si la animación de ataque básico está reproduciéndose
            if (this.doll1.anims.isPlaying) {
                this.isAttacking1 = true;
                
            }
            
        }

        else if(this.input.keyboard.addKey('R').isDown ){ //animación de ataque especial
            this.doll1.anims.play('attacking', false);
            attackFroppy.play();
            this.doll1.on('animationcomplete', function (animation) {
                if (animation.key === 'attacking') {
                    this.isSuperAttacking1 = false; // Resetear cuando la animación se completa
                }
            }, this);
    
            // Verificar si la animación de ataque especial está reproduciéndose
            if (this.doll1.anims.isPlaying) {
                this.isSuperAttacking1 = true;
                
                
            }
           
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
            jump.play();
        }

        else if(this.input.keyboard.addKey('O').isDown ){ //animación de ataque básico
            this.doll2.anims.play('basic', false);
            attack.play();
            this.doll2.on('animationcomplete', function (animation) {
                if (animation.key === 'basic') {
                    this.isAttacking2 = false; // Resetear la bandera cuando la animación completa
                }
            }, this);
    
            // Verificar si la animación de ataque básico está reproduciéndose
            if (this.doll2.anims.isPlaying) {
                this.isAttacking2 = true;
                
            }
            
        }

        else if(this.input.keyboard.addKey('P').isDown ){ //animación de ataque especial
            this.doll2.anims.play('attacking', false);
            attackBela.play();
            this.doll2.on('animationcomplete', function (animation) {
                if (animation.key === 'attacking') {
                    this.isSuperAttacking2 = false; // Resetear cuando la animación se completa
                }
            }, this);
    
            // Verificar si la animación de ataque especial está reproduciéndose
            if (this.doll2.anims.isPlaying) {
                this.isSuperAttacking2 = true;
                
                
            }
            
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


    handleCollision(player1, player2) {
        if (!this.collisionHandled) {
            this.collisionHandled = true;
    
            this.time.addEvent({
                delay: 1000, // 1 segundo
                callback: () => {
                    this.collisionHandled = false;
                },
                callbackContext: this,
            });
    
            this.handleAttacks(player1, player2);
        }
    }

    // COLISIONES ENTRE LOS JUGADORES
    handleAttacks(player1, player2) {

        // Este método se ejecutará cuando los dos personajes colisionen, se detecta una colision por segundo
        
    // SISTEMA DE VIDAS DE LA MUÑECA 1

    if (this.isShieldActive1==true && (this.isAttacking2==true || this.isSuperAttacking2==true)) { //Si la animacion "shield"
        console.log('Animación "shield" está en reproducción para doll1.');
            this.shieldCount1++; //si se ha usado menos de 3 veces se aumenta el contador 
            console.log('Contador de escudo para doll1:', this.shieldCount1);
            this.handleShield1(this.shieldCount1);
    }
    else if (this.isAttacking1 == true && this.isShieldActive2==false){ // si la animación de ataque básico de la muñeca 1 y la de escudo de la muñeca 2 está desactivada
        console.log('Animación "basic" está en reproducción.');
        this.restarVidas = 5; //vida restada ataque normal
        this.isAttacking1=false;

        if (player2.getData('life2') - this.restarVidas > -1) { //la muñeca 2 pierde 5 vidas
            player2.setData('life2', player2.getData('life2') - this.restarVidas);
            
            // Actualizar texto de vidas de la muñeca 1
            
            this.textLife2.setText(` ${player2.getData('life2')}%`);

            player2.anims.play('damaged', true);
        }
        else {
            this.scene.stop("UI");
            this.scene.start("Player1Win");
        } 
        this.registry.events.emit('vida2', player2.getData('life2'));
        }  
    
    else if (this.isSuperAttacking1 == true && this.isShieldActive2==false) { // si la animación de ataque especial de la muñeca 1 y la de escudo de la muñeca 2 está desactivada
            
            this.restarVidas = 10; //vida restada ataque especial
            this.isSuperAttacking1=false;

        if (player2.getData('life2') - this.restarVidas > -1) {
            player2.setData('life2', player2.getData('life2') - this.restarVidas);//la muñeca 2 pierde 5 vidas
           
            
            this.textLife2.setText(` ${player2.getData('life2')}%`);
            player2.anims.play('damaged', true); 
        }
        else {
            this.scene.stop("UI");
            this.scene.start("Player1Win");
        } 
        this.registry.events.emit('vida2', player2.getData('life2'));
    }

     //SISTEMA DE VIDAS DE LA MUÑECA 2   
    
    if (this,this.isShieldActive2==true && (this.isAttacking1==true || this.isSuperAttacking1==true)) {
            
                this.shieldCount2++;
                console.log('Contador de escudo para doll2:', this.shieldCount2);
                this.handleShield2();
        }    
    
        // Verifica si la animación 'basic' está en reproducción en doll2
    else if (this.isAttacking2 == true && this.isShieldActive2==false) {
            
            this.restarVidas = 5; //vida restada ataque normal
            this.isAttacking2=false;
            
        if (player1.getData('life1') - this.restarVidas > -1) {
                player1.setData('life1', player1.getData('life1') - this.restarVidas);
                
                
                this.textLife1.setText(` ${player1.getData('life1')}%`);
                player1.anims.play('damaged', true);
            }
            else {
                this.scene.stop("UI");
                this.scene.start("Player2Win");
            } 
            this.registry.events.emit('vida', player1.getData('life1'));
        } 
    else if (this.isSuperAttacking2 == true && this.isShieldActive1==false) {
            
            this.restarVidas = 10; //vida restada ataque normal
            this.isSuperAttacking2=false;

            if (player1.getData('life1') - this.restarVidas > -1) {
                player1.setData('life1', player1.getData('life1') - this.restarVidas);
               
                
                this.textLife1.setText(` ${player1.getData('life1')}%`);
                player1.anims.play('damaged', true);
            }
            else {
                this.scene.stop("UI");
                this.scene.start("Player2Win");
                
            } 
            this.registry.events.emit('vida', player1.getData('life1'));
            // Agregar lógica adicional para la animación de ataque especial de doll2
        }

       

        
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
