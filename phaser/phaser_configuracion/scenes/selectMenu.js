
//proxima implementacion para cuando metamos mas personajes
export default class selecMenu extends Phaser.Scene{
    constructor(){
        super("selectMenu"); //nombre escena
    }

    preload() {
        this.load.image("selectBackground","./assets/tienda.jpeg");
      
 
     }
     
      create(){
         //añadir fondo
         var background = this.add.image(950,530,"selectBackground");
         background.setScale(1.9);
 
         

           
     }
     
     update(time, delta){
        
     }
}