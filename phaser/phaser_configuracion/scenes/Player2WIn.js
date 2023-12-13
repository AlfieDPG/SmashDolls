

export default class Player2Win extends Phaser.Scene{
    constructor(){
        super("Player2Win"); //nombre escena
    }
preload(){
    this.load.image("mainBackground","./assets/fondos/Fondo-Rosa.jpg");
    this.load.image("j2Gana","./assets/j2Gana.png");
}
create(){
    var background = this.add.image(960,540,"mainBackground");
        background.setScale(1);
        var j2Win = this.add.image(960,500,"j2Gana");
        j2Win.setScale(1);

}
update(){

}


}