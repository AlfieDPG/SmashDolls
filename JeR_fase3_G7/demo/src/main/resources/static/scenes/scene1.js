import UI from "./UI.js";
import { return_IP } from "./mainMenu.js";

function fullScreen(){
    if(this.scene.scale.isFullscreen == false){
        this.scene.scale.startFullscreen();

    }
    else{
        this.scene.scale.stopFullscreen();
    }

}


import { connection } from './websocket.js';
	

    
var playerId = 0;

var jump;
var attack;
var attackBela;
var attackFroppy;
export default class scene1 extends Phaser.Scene {
 

    constructor(){
        super("scene1"); //nombre escena
        this.shieldCount1 = 0; // contador de veces que se ha usado el escudo para doll1
        this.shieldCount2 = 0; // contador de veces que se ha usado el escudo para doll2

        this.shieldCooldownTime = 5000; // Tras 5 segundos se puede volver a activar el escudo
        this.lastShieldTime1 = 0;
        this.lastShieldTime2 = 0;

        this.isShieldActive1 = false;
        this.isShieldActive2 = false;

        this.collisionHandled = false;

        this.isAttacking1 =false;
        this.isAttacking2 =false;

        this.isSuperAttacking1= false;
        this.isSuperAttacking2= false;

        

    }

     preload() {
       this.load.image("background","./assets/tienda.jpeg");
       this.load.atlas('girlie', 'assets/girlie.png', 'assets/girliesprites.json');
       this.load.atlas('superfroggie', 'assets/superfroggie.png', 'assets/superfroppiesprite.json');
       this.load.atlas('vudu', 'assets/vudu.png', 'assets/budusprite.json');
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
        
        
//ANIMACIONES DE SUPERFROGGIE

        //Animacion de standing de superfroggie
        this.anims.create({
            key: 'standingf',
            frames: this.anims.generateFrameNames('superfroggie', {prefix: 'standing', end: 1,zeroPad: 4 }),
            frameRate:5,
            repeat: 0
        });

        //animacion de caminar de superfroggie
        this.anims.create({
            key: 'walkingf',
            frames: this.anims.generateFrameNames('superfroggie', {prefix: 'walking', end: 7,zeroPad: 4 }),
            frameRate:12,
            repeat: 0
        });

        //animación de saltar de superfroggie
        this.anims.create({
            key: 'jumpingf',
            frames: this.anims.generateFrameNames('superfroggie', {prefix: 'jumping', end: 3, zeroPad: 4 }),
            frameRate:10,
            repeat: 0
        });

        //animación de atacar de superfroggie
        this.anims.create({
            key: 'attackingf',
            frames: this.anims.generateFrameNames('superfroggie', {prefix: 'attacking', end: 5, zeroPad: 4 }),
            frameRate:10,
            repeat: 2
        });

        //animacion de basic de superfroggie
        this.anims.create({
            key: 'basicf',
            frames: this.anims.generateFrameNames('superfroggie', {prefix: 'basic', end: 3, zeroPad: 4 }),
            frameRate:10,
            repeat: 2
        });

       //animacion de shield de superfroggie
        this.anims.create({
            key: 'shieldf',
            frames: this.anims.generateFrameNames('superfroggie', {prefix: 'shield',start:1, end: 1, zeroPad: 4 }),
            frameRate:1,
            repeat: 0
        });




        

//ANIMACIONES DE VUDU
           //Animacion de standing de vudu
           this.anims.create({
            key: 'standingv',
            frames: this.anims.generateFrameNames('vudu', {prefix: 'idle', end: 1,zeroPad: 1 }),
            frameRate:5,
            repeat: 0
        });

        //animacion de caminar de vudu
        this.anims.create({
            key: 'walkingv',
            frames: this.anims.generateFrameNames('vudu', {prefix: 'walk', end: 3,zeroPad: 1 }),
            frameRate:12,
            repeat: 0
        });

        //animación de saltar de vudu
        this.anims.create({
            key: 'jumpingv',
            frames: this.anims.generateFrameNames('vudu', {prefix: 'jump', end: 3, zeroPad: 1 }),
            frameRate:10,
            repeat: 0
        });

        //animación de atacar de vudu
        this.anims.create({
            key: 'attackingv',
            frames: this.anims.generateFrameNames('vudu', {prefix: 'normal', end: 1, zeroPad: 1 }),
            frameRate:7,
            repeat: 2
        });

        //animacion de basic de vudu
        this.anims.create({
            key: 'basicv',
            frames: this.anims.generateFrameNames('vudu', {prefix: 'special', end: 1, zeroPad: 1 }),
            frameRate:7,
            repeat: 2
        });

       //animacion de shield de vudu
        this.anims.create({
            key: 'shieldv',
            frames: this.anims.generateFrameNames('vudu', {prefix: 'block', start: 1, end: 1, zeroPad: 1 }),
            frameRate:1,
            repeat: 0
        });
        
        
         //añadir personaje 1
        this.doll1 = this.physics.add.sprite(500,600,"superfroggie");
        this.doll1.setScale(2);
        this.doll1.body.setSize(108, 196); // Establecer el tamaño del cuerpo de colisión de doll1
        //Tamaño del sprite de doll1: 108 196
        //console.log('Tamaño del sprite de doll1:', this.doll1.width, this.doll1.height);
        //this.doll1.body.setOffset(20, 0); // Ajustar la posición del cuerpo de colisión
        this.doll1.flipX = true;
        this.doll1.setCollideWorldBounds(true);
        this.doll1.setData ('life1',100); //creas la vida de la muñeca
        this.physics.world.setBoundsCollision(true);
        

        //añadir personaje 2
        this.doll2 = this.physics.add.sprite(1420,600,"vudu");
        this.doll2.setScale(2.1);
        this.doll2.body.setSize(110, 177); // Establecer el tamaño del cuerpo de colisión de doll1
        console.log('Tamaño del sprite de doll2:', this.doll2.width, this.doll2.height);
        //Tamaño del sprite de doll2: 147 177
        //this.doll2.body.setOffset(0, 0); // Ajustar la posición del cuerpo de colisión porque no quedaba en el cuerpo del personaje
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
         
         this.isAttacking1 = false;
         this.isSuperAttacking1 = false;
         this.isAttacking2 = false;
         this.isSuperAttacking2 = false;


        
         
        var cursors = this.input.keyboard.createCursorKeys();   

        const keys = Phaser.Input.Keyboard.KeyCodes;
        this.keyZ = this.input.keyboard.addKey(keys.Z);
         // Configurar colisiones entre las muñecas
         this.physics.add.collider(this.doll1, this.doll2, this.handleCollision, null, this);

         
         window.addEventListener('ws-message', (event) => {
            const message = event.detail;
            const type = message.type;

            if (type === "playerId") {
                console.log("Id request successful. My ID = " + message.id);
                assignedPlayer = message.id;

            }

            if(type == "pauseOn"){
                this.scene.sleep("UI");
                this.scene.sleep("scene1");
                this.scene.launch("pauseMenu");
        
            }
            if(type == "pauseOff"){
                this.scene.stop("pauseMenu");
                this.scene.wake("scene1");
                this.scene.wake("UI");
            }
            if(type[0] > 0){
                if(this.assignedPlayer == 2){
                    this.doll1.x = Phaser.Math.Linear(this.doll1.x,type[0],0.2)
                    this.doll1.y = Phaser.Math.Linear(this.doll1.y,type[1],0.2)

                }
                if(this.assignedPlayer == 1){
                    this.doll2.x = Phaser.Math.Linear(this.doll2.x,type[0],0.2)
                    this.doll2.y = Phaser.Math.Linear(this.doll2.y,type[1],0.2)
                }
                
                
            }
            
            if(type == "A" &&  !this.isAttacking1 && !this.isSuperAttacking1){
                //this.doll1.setVelocityX(-300);
                this.doll1.flipX = true;
                if (this.doll1.body.blocked.down) {
                   this.doll1.anims.play('walkingf',true);
                 }
            }
            if(type == "W" &&  !this.isAttacking1 && !this.isSuperAttacking1){
                //this.doll1.setVelocityY(-700);
                this.doll1.anims.play('jumpingf', true);
                jump.play();
                
            }
        
            if(type == "D" &&  !this.isAttacking1 && !this.isSuperAttacking1){

                //this.doll1.setVelocityX(300);
                this.doll1.flipX=false;
                if (this.doll1.body.blocked.down) {
                this.doll1.anims.play('walkingf', true);
            }
                
            }
            if(type == "J" &&  !this.isAttacking2 && !this.isSuperAttacking2){
                
                //this.doll2.setVelocityX(-300);
                this.doll2.flipX = true; 
                this.doll2.body.setOffset(30, 0); // Ajustar la posición del cuerpo de colisión 
                if (this.doll2.body.blocked.down) {
                this.doll2.anims.play('walkingv',true);
             }  
        
            }
            if(type == "I" &&  !this.isAttacking2 && !this.isSuperAttacking2){
                //this.doll2.setVelocityY(-700);
                this.doll2.anims.play('jumpingv', true);
                jump.play();
            }
        
            if(type == "L" &&  !this.isAttacking2 && !this.isSuperAttacking2){
                //this.doll2.setVelocityX(300);
                this.doll2.flipX=false;
                this.doll2.body.setOffset(20, 0); // Ajustar la posición del cuerpo de colisión
                if (this.doll2.body.blocked.down) {
                this.doll2.anims.play('walkingv', true);
            }
                
            }
        
            if(type == "E" &&  !this.isAttacking1 && !this.isSuperAttacking1){
                this.doll1.body.setOffset(20, 0);
                this.doll1.anims.play('basicf', false);
                attack.play();
                this.doll1.on('animationcomplete', function (animation) {
                if (animation.key === 'basicf') {
                    this.doll1.isAttacking1 = false; // Resetear la bandera cuando la animación completa
                }
            }, this);
                            // Verificar si la animación de ataque básico está reproduciéndose
            if (this.doll1.anims.isPlaying) {
                this.isAttacking1 = true;
                
            }
        }
        

            if(type == "R" &&  !this.isAttacking1 && !this.isSuperAttacking1){
                this.doll1.body.setOffset(30, 0);
                this.doll1.anims.play('attackingf', false);
                attackFroppy.play();
                this.doll1.on('animationcomplete', function (animation) {
                if (animation.key === 'attackingf') {
                    this.isSuperAttacking1 = false; // Resetear cuando la animación se completa
                }
            }, this);
        
            // Verificar si la animación de ataque especial está reproduciéndose
            if (this.doll1.anims.isPlaying) {
                this.isSuperAttacking1 = true;     
            }
        
            }
            if(type == "Q" &&  !this.isAttacking1 && !this.isSuperAttacking1){
                this.doll1.anims.play('shieldf', false);
                this.doll2.on('animationcomplete', function (animation) {
                if (animation.key === 'shieldv') {
                    this.isShieldActive2 = false; // Resetear la bandera cuando la animación completa
                }
                }, this);
        
            // Verificar si la animación de ataque básico está reproduciéndose
                if (this.doll2.anims.isPlaying) {
                this.isShieldActive2 = true;
                console.log("shield is active");
                
                }
        
            }
            if(type == "O" &&  !this.isAttacking2 && !this.isSuperAttacking2){
                this.doll2.body.setOffset(-20, 0);
            this.doll2.anims.play('attackingv', false);
            attack.play();
            this.doll2.on('animationcomplete', function (animation) {
                if (animation.key === 'attackingv') {
                    this.isAttacking2 = false; // Resetear la bandera cuando la animación completa
                }
            }, this);
        
            // Verificar si la animación de ataque básico está reproduciéndose
            if (this.doll2.anims.isPlaying) {
                this.isAttacking2 = true;
                
            }
        
            }
            if(type == "P" &&  !this.isAttacking2 && !this.isSuperAttacking2){
                this.doll2.anims.play('basicv', false);
            attackBela.play();
            this.doll2.on('animationcomplete', function (animation) {
                if (animation.key === 'basicv') {
                    this.isSuperAttacking2 = false; // Resetear cuando la animación se completa
                }
            }, this);
        
            // Verificar si la animación de ataque especial está reproduciéndose
            if (this.doll2.anims.isPlaying) {
                this.isSuperAttacking2 = true;
                
                
            }
        
            }
            if(type == "U" &&  !this.isAttacking2 && !this.isSuperAttacking2){
                this.doll2.anims.play('shieldv', false);
            this.doll2.on('animationcomplete', function (animation) {
                if (animation.key === 'shieldv') {
                    this.isShieldActive2 = false; // Resetear la bandera cuando la animación completa
                }
            }, this);
        
            if (this.doll2.anims.isPlaying) {
                this.isShieldActive2 = true;
                console.log("shield is active");
                
            }
            
        
            }
        
            if(type == "Dano1"){
                this.doll2.setData('life2', this.doll2.getData('life2') - 5);
            
                // Actualizar texto de vidas de la muñeca 1
                
                this.textLife2.setText(` ${this.doll2.getData('life2')}%`);
                
                
            }
            if(type == "Danoespecial1"){
                this.doll2.setData('life2', this.doll2.getData('life2') - 10);//la muñeca 2 pierde 5 vidas
           
                this.textLife2.setText(` ${this.doll2.getData('life2')}%`);
                
                
            }
            if(type == "Victoria1"){
                this.doll1.setData ('life1',100); //creas la vida de la muñeca
                this.doll2.setData ('life2',100); //creas la vida de la muñeca

                this.scene.stop("UI");
                this.scene.start("Player1Win");
                
                
            }
            if(type == "Dano2"){
                this.doll1.setData('life1', this.doll1.getData('life1') - 5);
                
                
                this.textLife1.setText(` ${this.doll1.getData('life1')}%`);
                
                
            }
            if(type == "Danoespecial2"){
                this.doll1.setData('life1', this.doll1.getData('life1') - 10);
               
                
                this.textLife1.setText(` ${this.doll1.getData('life1')}%`);
                
                
            }
            if(type == "Victoria2"){
                this.doll1.setData ('life1',100); //creas la vida de la muñeca
                this.doll2.setData ('life2',100); //creas la vida de la muñeca

                this.scene.stop("UI");
                this.scene.start("Player2Win");
                
            }

        
        });



        console.log("Assigned Player ID:", window.assignedPlayer);
        this.assignedPlayer = window.assignedPlayer;

        // this.actPosition = this.time.addEvent({delay : 100, callback: this.actPosition(this.doll1.x,this.doll1.y,this.doll2.x,this.doll2.y), callbackScope: this, loop: true});

         
    }


    update(time, delta){

    const doll1X = this.doll1.x;
    const doll1Y = this.doll1.y;

    const doll2X = this.doll2.x;
    const doll2Y = this.doll2.y;
    this.actPosition(this.doll1.x,this.doll1.y,this.doll2.x,this.doll2.y);
        //menu pausa
        if (this.input.keyboard.addKey('ESC').isDown) //MENU PAUSA
        {
            this.scene.sleep("UI");
            this.scene.sleep("scene1");
            this.scene.launch("pauseMenu");
            var msg ={
                type : "pauseOn"
            }
            connection.send(JSON.stringify(msg));
        }
       
        //eventos de teclado para la muñeca 1
        if (this.input.keyboard.addKey('A').isDown && this.assignedPlayer == 1 &&  !this.isAttacking1 && !this.isSuperAttacking1) //moverse a la izquierda
        {
            

            //this.doll1.setPosition
            //connection.send()
            this.doll1.setVelocityX(-300);
            this.doll1.flipX = true;
            if (this.doll1.body.blocked.down) {
               this.doll1.anims.play('walkingf',true);
             }

             var msg ={
                type : "A"
             }
             connection.send(JSON.stringify(msg));
            
           
        }
        else if (this.input.keyboard.addKey('D').isDown && this.assignedPlayer == 1 &&  !this.isAttacking1 && !this.isSuperAttacking1) //moverse a la derecha
        {
            this.doll1.setVelocityX(300);
            this.doll1.flipX=false;
            if (this.doll1.body.blocked.down) {
                this.doll1.anims.play('walkingf', true);
            }


            var msg ={
                type : "D"
             }
             connection.send(JSON.stringify(msg));
        }

        else if(this.input.keyboard.addKey('W').isDown && this.doll1.body.blocked.down && this.assignedPlayer == 1 &&  !this.isAttacking1 && !this.isSuperAttacking1){ //animación de saltar
            this.doll1.setVelocityY(-700);
            this.doll1.anims.play('jumpingf', true);
            jump.play();


            var msg ={
                type : "W"
             }
             connection.send(JSON.stringify(msg));
        }

        else if(this.input.keyboard.addKey('E').isDown && this.assignedPlayer == 1 &&  !this.isAttacking1 && !this.isSuperAttacking1){ //animación de ataque básico
            this.doll1.body.setOffset(20, 0);
            this.doll1.anims.play('basicf', false);
            attack.play();
            this.doll1.on('animationcomplete', function (animation) {
                if (animation.key === 'basicf') {
                    this.doll1.isAttacking1 = false; // Resetear la bandera cuando la animación completa
                }
            }, this);
    
            // Verificar si la animación de ataque básico está reproduciéndose
            if (this.doll1.anims.isPlaying) {
                this.isAttacking1 = true;
                
            }
            playerId = 1;
            var msg ={
                type : "E"
             }
             connection.send(JSON.stringify(msg));
            
            
        }

        else if(this.input.keyboard.addKey('R').isDown && this.assignedPlayer == 1 &&  !this.isAttacking1 && !this.isSuperAttacking1 ){ //animación de ataque especial
            this.doll1.body.setOffset(30, 0);
            this.doll1.anims.play('attackingf', false);
            attackFroppy.play();
            this.doll1.on('animationcomplete', function (animation) {
                if (animation.key === 'attackingf') {
                    this.isSuperAttacking1 = false; // Resetear cuando la animación se completa
                }
            }, this);
    
            // Verificar si la animación de ataque especial está reproduciéndose
            if (this.doll1.anims.isPlaying) {
                this.isSuperAttacking1 = true;
                
                
            }
            var msg ={
                type : "R"
             }
             connection.send(JSON.stringify(msg));
           
        }

        else if(this.input.keyboard.addKey('Q').isDown && this.shieldCount1<4 && this.assignedPlayer == 1 &&  !this.isAttacking1 && !this.isSuperAttacking1){ //animación de daño recibido
            this.doll1.anims.play('shieldf', false);
            this.doll2.on('animationcomplete', function (animation) {
                if (animation.key === 'shieldv') {
                    this.isShieldActive2 = false; // Resetear la bandera cuando la animación completa
                }
            }, this);
    
            // Verificar si la animación de ataque básico está reproduciéndose
            if (this.doll2.anims.isPlaying) {
                this.isShieldActive2 = true;
                console.log("shield is active");
                
            }
            var msg ={
                type : "Q"
             }
             connection.send(JSON.stringify(msg));
            
        }
        else{
            // Solo ejecutar si ninguna de las animaciones específicas está reproduciéndose
            if (
                !this.doll1.anims.isPlaying 
            ) {
                if (this.doll1.body.blocked.down) { // Animación de estar de pie solo si está en el suelo
                    this.doll1.setVelocityX(0);
                    this.doll1.anims.play('standingf', true);
                    
                    
                }
            }
        }

        //eventos de teclado para la muñeca 2
        if (this.input.keyboard.addKey('J').isDown && this.assignedPlayer == 2 &&  !this.isAttacking2 && !this.isSuperAttacking2) //moverse a la izquierda
        {
            this.doll2.setVelocityX(-300);
            this.doll2.flipX = true; 
            this.doll2.body.setOffset(30, 0); // Ajustar la posición del cuerpo de colisión 
            if (this.doll2.body.blocked.down) {
                
               this.doll2.anims.play('walkingv',true);
             }  

             var msg ={
                type : "J"
             }
             connection.send(JSON.stringify(msg));
        }
        else if (this.input.keyboard.addKey('L').isDown && this.assignedPlayer == 2 &&  !this.isAttacking2 && !this.isSuperAttacking2) //moverse a la derecha
        {
            this.doll2.setVelocityX(300);
            this.doll2.flipX=false;
            this.doll2.body.setOffset(20, 0); // Ajustar la posición del cuerpo de colisión
            if (this.doll2.body.blocked.down) {
                this.doll2.anims.play('walkingv', true);
            }

            var msg ={
                type : "L"
             }
             connection.send(JSON.stringify(msg));
        }
        else if(this.input.keyboard.addKey('I').isDown && this.doll2.body.blocked.down && this.assignedPlayer == 2 &&  !this.isAttacking2 && !this.isSuperAttacking2){ //animación de saltar
            this.doll2.setVelocityY(-700);
            this.doll2.anims.play('jumpingv', true);
            jump.play();

            var msg ={
                type : "I"
             }
             connection.send(JSON.stringify(msg));
        }

        else if(this.input.keyboard.addKey('O').isDown && this.assignedPlayer == 2 &&  !this.isAttacking2 && !this.isSuperAttacking2){ //animación de ataque básico
            this.doll2.body.setOffset(-20, 0);
            this.doll2.anims.play('attackingv', false);
            attack.play();
            this.doll2.on('animationcomplete', function (animation) {
                if (animation.key === 'attackingv') {
                    this.isAttacking2 = false; // Resetear la bandera cuando la animación completa
                }
            }, this);
    
            // Verificar si la animación de ataque básico está reproduciéndose
            if (this.doll2.anims.isPlaying) {
                this.isAttacking2 = true;
                
            }
            playerId = 2;
            var msg ={
                type : "O"
             }
             connection.send(JSON.stringify(msg));
            
        }

        else if(this.input.keyboard.addKey('P').isDown && this.assignedPlayer == 2 &&  !this.isAttacking2 && !this.isSuperAttacking2){ //animación de ataque especial
            
            this.doll2.anims.play('basicv', false);
            attackBela.play();
            this.doll2.on('animationcomplete', function (animation) {
                if (animation.key === 'basicv') {
                    this.isSuperAttacking2 = false; // Resetear cuando la animación se completa
                }
            }, this);
    
            // Verificar si la animación de ataque especial está reproduciéndose
            if (this.doll2.anims.isPlaying) {
                this.isSuperAttacking2 = true;
                
                
            }
            var msg ={
                type : "P"
             }
             connection.send(JSON.stringify(msg));
            
        }

        else if(this.input.keyboard.addKey('U').isDown && (this.shieldCount2<4) && this.assignedPlayer == 2 &&  !this.isAttacking2 && !this.isSuperAttacking2){ //animación de escudo
            this.doll2.anims.play('shieldv', false);
            this.doll2.on('animationcomplete', function (animation) {
                if (animation.key === 'shieldv') {
                    this.isShieldActive2 = false; // Resetear la bandera cuando la animación completa
                }
            }, this);
    
            if (this.doll2.anims.isPlaying) {
                this.isShieldActive2 = true;
                console.log("shield is active");
                
            }
            
            var msg ={
                type : "U"
             }
             connection.send(JSON.stringify(msg));
            
        }

        else{
            // Solo ejecutar si ninguna de las animaciones específicas está reproduciéndose
            if (
                !this.doll2.anims.isPlaying 
            ) {
                if (this.doll2.body.blocked.down) { // Animación de estar de pie solo si está en el suelo
                    this.doll2.setVelocityX(0);
                    this.doll2.anims.play('standingv', true);
                   
                }
            }
        }

        
       
    }


    handleCollision(doll1, doll2) {
        if (!this.collisionHandled) {
            this.collisionHandled = true;
    
            this.time.addEvent({
                delay: 1000, // 1 segundo
                callback: () => {
                    this.collisionHandled = false;
                },
                callbackContext: this,
            });
    
            this.handleAttacks(doll1, doll2);
        }
    }

    // COLISIONES ENTRE LOS JUGADORES
    handleAttacks(doll1, doll2) {

        // Este método se ejecutará cuando los dos personajes colisionen, se detecta una colision por segundo
        
    // SISTEMA DE VIDAS DE LA MUÑECA 1

    if (this.isShieldActive1==true && (this.isAttacking2==true || this.isSuperAttacking2==true)) { //Si la animacion "shield"
        console.log('Animación "shield" está en reproducción para doll1.');
        
            this.shieldCount1++; //si se ha usado menos de 3 veces se aumenta el contador 
            console.log('Contador de escudo para doll1:', this.shieldCount1);
        }
        else{
            this.handleShield1();}
    
     if (this.isAttacking1 == true && this.isShieldActive2==false){ // si la animación de ataque básico de la muñeca 1 y la de escudo de la muñeca 2 está desactivada
        console.log('Animación "basic" está en reproducción.');
        this.restarVidas = 5; //vida restada ataque normal
        this.isAttacking1=false;

        if (this.doll2.getData('life2') - this.restarVidas > -1 && this.assignedPlayer==1) { //la muñeca 2 pierde 5 vidas
            this.doll2.setData('life2', this.doll2.getData('life2') - this.restarVidas);
            
            // Actualizar texto de vidas de la muñeca 1
            
            this.textLife2.setText(` ${this.doll2.getData('life2')}%`);
            //Mensaje daño 1
            var msg ={
                type : "Dano1"
             }
             connection.send(JSON.stringify(msg));
            
        }
        else if(this.doll2.getData('life2') - this.restarVidas < -1) {
            this.doll1.setData ('life1',100); //creas la vida de la muñeca
            this.doll2.setData ('life2',100); //creas la vida de la muñeca

            this.scene.stop("UI");
            this.scene.start("Player1Win");

            //Mensaje victoria
            var msg ={
                type : "Victoria1"
             }
             connection.send(JSON.stringify(msg));

        } 
        this.registry.events.emit('vida2', doll2.getData('life2'));
        }  
    
    else if (this.isSuperAttacking1 == true && this.isShieldActive2==false) { // si la animación de ataque especial de la muñeca 1 y la de escudo de la muñeca 2 está desactivada
            
            this.restarVidas = 10; //vida restada ataque especial
            this.isSuperAttacking1=false;

        if (this.doll2.getData('life2') - this.restarVidas > -1 && this.assignedPlayer==1 ) {
            this.doll2.setData('life2', this.doll2.getData('life2') - this.restarVidas);//la muñeca 2 pierde 5 vidas
           
            this.textLife2.setText(` ${this.doll2.getData('life2')}%`);

            //Mensaje daño especial
            var msg ={
                type : "Danoespecial1"
             }
             connection.send(JSON.stringify(msg));

            
        }
        else if(this.doll2.getData('life2') - this.restarVidas < -1) {
            this.doll1.setData ('life1',100); //creas la vida de la muñeca
            this.doll2.setData ('life2',100); //creas la vida de la muñeca

            this.scene.stop("UI");
            this.scene.start("Player1Win");

            //Mensaje victoria 1
            var msg ={
                type : "Victoria1"
             }
             connection.send(JSON.stringify(msg));

        } 
        this.registry.events.emit('vida2', doll2.getData('life2'));
    }

     //SISTEMA DE VIDAS DE LA MUÑECA 2   
    
    if (this.isShieldActive2==true && (this.isAttacking1==true || this.isSuperAttacking1==true)) {
            
        
            this.shieldCount2++; //si se ha usado menos de 3 veces se aumenta el contador 
            console.log('Contador de escudo para doll2:', this.shieldCount2);}
        
        else{
            this.handleShield2();
        }    
    
        // Verifica si la animación 'basic' está en reproducción en doll2
   if (this.isAttacking2 == true && this.isShieldActive2==false) {
            
            this.restarVidas = 5; //vida restada ataque normal
            this.isAttacking2=false;
            
        if (this.doll1.getData('life1') - this.restarVidas > -1 && this.assignedPlayer==2) {
            this.doll1.setData('life1', this.doll1.getData('life1') - this.restarVidas);
                
                
                this.textLife1.setText(` ${doll1.getData('life1')}%`);

                //Mensaje Daño 2
                var msg ={
                    type : "Dano2"
                 }
                 connection.send(JSON.stringify(msg));

                
            }
            else if (this.doll1.getData('life1') - this.restarVidas < -1){
                this.doll1.setData ('life1',100); //creas la vida de la muñeca
                this.doll2.setData ('life2',100); //creas la vida de la muñeca

                this.scene.stop("UI");
                this.scene.start("Player2Win");
                
                //Mensaje victoria 2
                var msg ={
                    type : "Victoria2"
                 }
                 connection.send(JSON.stringify(msg));
            } 
            this.registry.events.emit('vida', doll1.getData('life1'));
        } 
    else if (this.isSuperAttacking2 == true && this.isShieldActive1==false) {
            
            this.restarVidas = 10; //vida restada ataque especial
            this.isSuperAttacking2=false;

            if (this.doll1.getData('life1') - this.restarVidas > -1 && this.assignedPlayer==2) {
                this.doll1.setData('life1', this.doll1.getData('life1') - this.restarVidas);
               
                
                this.textLife1.setText(` ${this.doll1.getData('life1')}%`);
                
                //Mensaje daño especial
                var msg ={
                    type : "Danoespecial2"
                 }
                 connection.send(JSON.stringify(msg));
            }
            else if (this.doll1.getData('life1') - this.restarVidas < -1){
                this.doll1.setData ('life1',100); //creas la vida de la muñeca
                this.doll2.setData ('life2',100); //creas la vida de la muñeca

                this.scene.stop("UI");
                this.scene.start("Player2Win");

                //Mensaje victoria 2
                var msg ={
                    type : "Victoria2"
                 }
                 connection.send(JSON.stringify(msg));
                
            } 
            this.registry.events.emit('vida', doll1.getData('life1'));
            // Agregar lógica adicional para la animación de ataque especial de doll2
        }







        
    }


handleShield1(){
  
    this.time.addEvent({
        delay:this.shieldCooldownTime,
        callback: ()=>{ this.shieldCount1=0;
        },
        callbackContext: this
    });


}

handleShield2(){
    
        this.time.addEvent({
            delay:this.shieldCooldownTime,
            callback: ()=>{this.shieldCount2=0;
            },
            callbackContext: this
        });
    
    
    }


actPosition(doll1X,doll1Y,doll2X,doll2Y){
    if(this.assignedPlayer == 1){
        var msg ={
            type : [doll1X,doll1Y]
         }
         connection.send(JSON.stringify(msg));
}
    if(this.assignedPlayer == 2){
        var msg ={
            type : [doll2X,doll2Y]
         }
         connection.send(JSON.stringify(msg));
    }

}


}