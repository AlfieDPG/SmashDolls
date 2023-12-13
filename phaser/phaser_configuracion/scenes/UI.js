import scene1 from "./scene1.js";
console.log('ui cargado');
export default class UI extends Phaser.Scene{
    
    constructor(){
        super({key: 'UI'});
    }

    preload () {
        
    };

create(){
    //BARRA DE VIDA DOLL1 
    const lifeBarWidth= 650;
    this.actual_life = lifeBarWidth; //variables para actualizar la barra
    this.actual_life2 = lifeBarWidth;


    this.graphics = this.add.graphics({
        fillStyle : { color: 0x64AA64}
    });
    
    this.lifeBar = new Phaser.Geom.Rectangle (320,40, lifeBarWidth, 70)
    //this.graphics.fillStyle(0x00aa00,1);
    //this.graphics.fillRectShape(this.lifeBar);

    this.registry.events.on('vida', (life1)=>{ //coge el valor de life1 y 
        this.actual_life = life1*lifeBarWidth /100;   //lo muestra en la barra de vida
    });
     
    //BARRA DE VIDA DOLL2 
    this.graphics2 = this.add.graphics({
        fillStyle : { color: 0x64AA64}
    });
    
    this.lifeBar2 = new Phaser.Geom.Rectangle (1250,40, lifeBarWidth, 70)
    //this.graphics2.fillStyle(0x00aa00,1);
    //this.graphics2.fillRectShape(this.lifeBar2);

    this.registry.events.on('vida2', (life2)=>{ //coge el valor de life2 y 
        this.actual_life2 = life2*lifeBarWidth /100;   //lo muestra en la barra de vida
    });

};

update () {
    this.graphics.clear();
    this.graphics2.clear();
    //para que la vida baje gradualmente (no a cachos)
    this.lifeBar.width = Math.round(
        (Phaser.Math.Interpolation.CatmullRom([this.lifeBar.width, this.actual_life],0.05))
    )

    this.lifeBar2.width = Math.round(
        (Phaser.Math.Interpolation.CatmullRom([this.lifeBar2.width, this.actual_life2],0.05))
    )
    //actualiza la barra
    this.graphics.fillRectShape(this.lifeBar);
    this.graphics.fillRectShape(this.lifeBar2);
    
}

}
