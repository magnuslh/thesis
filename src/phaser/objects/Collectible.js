import Phaser from 'phaser'
export default class Collectible extends Phaser.GameObjects.Sprite {
    constructor(scene, x,y, texture) {
        super(scene, x, y, texture);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.alive = true;
        this.player = this.scene.player; 
				this.type = 'collectible';
				this.body.bounce.y = 1; 
				this.scale = 0.5; 
       
        this.texture = texture
        this.player = scene.player; 
    }
}