

export default class Player2Win extends Phaser.Scene{
    constructor(){
        super("Player2Win"); //nombre escena
    }
preload(){
    this.load.image("mainBackground","./assets/mainBackground.png");
    this.load.image("j2Gana","./assets/j2Gana.png");
}
create(){
    var background = this.add.image(900,500,"mainBackground");
        background.setScale(3);

}
update(){

}


}