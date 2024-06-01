import { return_IP } from "./mainMenu.js";
import { return_playerName } from "./playerName.js";
import { return_players } from "./playerName.js";
var serverRequests = new ServerRequests();
var rondasGanadas;
var nombrePlayer;

export default class Player2Win extends Phaser.Scene{
    constructor(){
        super("Player2Win"); //nombre escena
    }
preload(){
    this.load.image("mainBackground","./assets/fondos/Fondo-Rosa.jpg");
    this.load.image("j2Gana","./assets/j2Gana.png");
}
create(){
    nombrePlayer = return_playerName();
    var background = this.add.image(960,540,"mainBackground");
        background.setScale(1);
        var j2Win = this.add.image(960,500,"j2Gana");
        j2Win.setScale(1);
        rondasGanadas=+1;
        this.anadirRondas();
}
update(){
    
}
anadirRondas(){
    var Jugador = {
        nombre : nombrePlayer,
        rondas : rondasGanadas
    }
    serverRequests.updatePlayer(Jugador, return_IP())
    .then ((updatePlayer)=>{
        console.log("rondas actualizadas:",updatePlayer );
        this.return_players();
    }).fail(() => {
        console.log('ERROR de conexión, no se pudo agregar las rondas.');
    });
}


}