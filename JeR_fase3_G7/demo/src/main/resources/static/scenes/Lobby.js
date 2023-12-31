var playerCount;


export default class Lobby extends Phaser.Scene{

    constructor(){
        super("Lobby"); //nombre escena
        
}

preload() {
    this.load.image("mainBackground","./assets/fondos/Fondo-morado.jpg");
    this.load.image("fullScreenButton","./assets/pantalla-completa.png");
    this.load.image("local","./assets/Botones/BotonLocal.png");
    this.load.html("form", "/scenes/form.html");

 }
 create(){

     //añadir fondo
     var background = this.add.image(960,540,"mainBackground");
     background.setScale(1);

     //boton jugar
    let playButton = this.add.image (960,800, "local" ).setInteractive();
        playButton.setScale(3);
        playButton.on("pointerdown", (playButton) =>{
     this.scene.start("scene1");
 });

 this.idOfExitedPlayer = 0;
 this.returnKey =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
 this.add.image(0,0,"scenelobby").setOrigin(0);
 this.style = { font: "15px OCR A", fill: "#FFFFFF" };
 this.nameInput = this.add.dom(400, 325).createFromCache("form");

 setInterval(function loadChat() {
     $('#chat').empty();
     $.ajax({
        method: "GET",
        url: 'http://'+ ip + '8080/player'+ 'Lobby'
    }).done(function (chat) {
        for (var i = 0; i < chat.length; i++) {
            var style = '';
            $('#chat').append('<div><span ' + style + '>' + chat[i] +'</span>')
        }
    });
 },3000);

 setInterval(function loadPlayers(callback) {
     $('#info-players').empty();
     $.ajax({
         url: 'http://'+ ip + '8080/player'+ 'Lobby'
     }).done(function (Player) {
         console.log('Jugadores Conectados: ' + JSON.stringify(Player));
         for (var i = 0; i < Player.length; i++) {
             showPlayer(Player[i]);
         }
     })
 },3000);

 function Players(){
     $.ajax({
         method: "GET",
         url: 'http://'+ ip + '8080/player' + 'Lobby/valor',
     }).done(function (value) {
         playerCount = value;
         console.log(playerCount);
     })
 }

 //Create player in server
 function createPlayer(player, callback) {
     playerCount++;
     console.log(playerCount);
     $.ajax({
         method: "POST",
         url: 'http://'+ ip + '8080/player' + 'Lobby',
         data: JSON.stringify(player),
         processData: false,
         headers: {
             "Content-Type": "application/json"
         }
     }).done(function (player) {
         var style = '';
         console.log("Se ha unido el siguiente jugador: " + JSON.stringify(player));
         id = player.id;
         callback(player);
         $('#info-players').append(
             '<div><span ' + style + '>' + "Se ha conectado el " + player.name + id +
             '</span>')
     })
 }

 function createMessage(message, callback) {
     $.ajax({
         method: "POST",
         url: 'http://'+ ip + '8080/player' + 'lobby/mensaje',
         data: JSON.stringify(message),
         processData: false,
         headers: {
             "Content-Type": "application/json"
         }
     }).done(function (message) {
         console.log("Se ha escrito el siguiente mensaje: " + JSON.stringify(message));
         callback(message);
     })
 }

 //Get Player
 setInterval(function getJugador(total) {
     for (var i = 0; i <= total; i++) {
         $.ajax({
             method: 'GET',
             url: 'http://'+ ip + '8080/player' + 'Lobby/' + i
         }).done(function (player) {
             console.log("Jugador " + JSON.stringify(player))
         })
         .fail(function () {
             console.log("Jugador con id " + i + " no encontrado")
         })
     }
 }, 3000)

 //Delete player from server 
 function deletePlayer(playerId) {
     playerCount--;
     $.ajax({
         method: 'DELETE',
         url: 'http://'+ ip + '8080/player' + 'Lobby/' + playerId
     }).done(function (jugador) {
         var style = "";
         this.idOfExitedPlayer = playerId;
         console.log("Se ha salido del lobby el siguiente jugador: " + JSON.stringify(player));
         $('#info-players').append(
             '<div><span ' + style + '>' + "El jugador " + playerId + " se ha desconectado" +
             '</span>')
     })
 }

 //Show player connection
 function showPlayer(player) {
     var style = '';
     $('#info-players').append(
         '<div id="jugador-' + player.id + '"><span ' + style + '>' + player.name + " " + player.id +
         " esta online " + '</span>')
 }

 // Show message
 function showMessage(message) {
     var style = '';
     $('#chat').append(
         '<div><span>' + message.content +
         '</span>')
 }

 $(document).ready(function () {
     var player = {
         name: "Jugador"
     }
     createPlayer(player, function (Jugador) {
         //When item with id is returned from server
         showPlayer(Jugador);
     })
     window.onbeforeunload = function () {
         deletePlayer(id);
     };

     Players();

     var infoPlayer = $('#info-players')
     var input = $('#input')
     var chat = $('#chat')

     //Handle send button
     $("#send-button").click(function () {
         var test = document.querySelector('#input-form')
         var name = test.querySelector('input[name="name"]');
         var message = {
             content: name.value,
         }
         name.value = "";
         createMessage(message, function (msg) {
             //When item with id is returned from server
             showMessage(msg);
         });
     })
 })
}

update() {
 if(this.returnKey.isDown){
     this.scene.start('selectorModeScene');
 }

}
}
 