import Phaser from 'phaser'
export default class Sword extends Phaser.GameObjects.Sprite {
    constructor(scene, x,y, texture) {
        super(scene, x, y, texture);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.alive = false;
        this.enemy = scene.enemy; 
				this.type = 'sword';
				this.body.setSize(25, 50)
				this.body.allowGravity = false; 
        this.texture = texture
				if(scene.enemy){
					scene.physics.add.overlap(this, scene.enemy, this.hitEnemy, null, this);
				}
		}
		
		
	hitEnemy(){
		
		this.scene.enemy.die(); 
	}
}