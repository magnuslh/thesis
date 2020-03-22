import Phaser from 'phaser'
export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x,y, texture) {
        super(scene, x, y, texture);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.alive = true;
        this.player = scene.player; 
				this.type = 'door';
				
       
        this.texture = texture
      
    }
}