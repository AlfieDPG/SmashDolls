

export default class Player1Win extends Phaser.Scene{
    constructor(){
        super("Player1Win"); //nombre escena
    }
preload(){
    this.load.image("mainBackground","./assets/fondos/Fondo-Verde.jpg");
    this.load.image("j1Gana","./assets/j2Gana.png");
}
create(){
    var background = this.add.image(960,540,"mainBackground");
        background.setScale(1);
    var j1Win = this.add.image(960,500,"j1Gana");
        j1Win.setScale(1);

}
update(){

}


}