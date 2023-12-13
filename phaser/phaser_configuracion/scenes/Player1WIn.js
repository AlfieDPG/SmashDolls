

export default class Player1Win extends Phaser.Scene{
    constructor(){
        super("Player1Win"); //nombre escena
    }
preload(){
    this.load.image("mainBackground","./assets/mainBackground.png");
    this.load.image("j1Gana","./assets/j1Gana.png");
}
create(){
    var background = this.add.image(900,500,"mainBackground");
        background.setScale(3);
    var j1Win = this.add.image(900,500,"j1Gana");
        j1Win.setScale(1);

}
update(){

}


}