import Phaser from 'phaser'
export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x,y, texture) {
        super(scene, x, y, texture);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.alive = true;
        this.player = this.scene.player; 
        this.type = 'bomb'
       
        this.texture = texture
        this.body.setCollideWorldBounds(true);
        this.player = scene.player; 
        this.speed = 25
    }

    update(){
        if(this.player.y > 500 && this.player.body.onFloor() && this.player.state != 'crouch'){
            let distance = 100/Math.abs(this.player.x - this.x);
          
            this.scene.musicController.setValence(-distance); 
            this.scene.musicController.setEnergy(distance)
            if(this.player.x < this.x){
                this.body.setVelocityX(-this.speed)
            }
            else{
                this.body.setVelocityX(this.speed)
            }
                
        }
        else{
            
            this.body.setVelocityX(0); 
        }
    }  
}