import Phaser from 'phaser'
export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x,y, texture) {
        super(scene, x, y, texture);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.alive = true;
        this.player = this.scene.player; 
        this.type = 'wizard'
		this.body.setSize(60, 80)
		this.body.setOffset(5, 0)
				
        this.texture = texture
        this.body.setCollideWorldBounds(true);
		this.acceleration = 60
		this.body.setDragX(60) 
		this.body.setMaxVelocity(30, 0);
		this.state = "idle"
		
    }

    update(musicParams){

		if(Math.abs(this.body.velocity.x) <= 5){
			this.anims.play("wizard-idle", true)
		}
		else if(Math.abs(this.body.velocity.x) < Math.abs(this.body.maxVelocity.x) ){
			if(this.state == "chase"){
				this.anims.play("wizard-fly-start", true)
			}
			else{
				this.anims.playReverse("wizard-fly-start", true)
			}
			
		}
		else{
			this.anims.play("wizard-fly", true)
		}
		if(this.state !== "die" || this.state !== "dead"){
			if(this.player.y > 500 && this.player.body.onFloor() && this.player.state != 'crouch'){
				this.state = "chase"
				let distance = 100/Math.abs(this.player.x - this.x);

				musicParams.valence =-distance; 
				musicParams.energy = distance; 
				if(this.player.x < this.x){
					this.flipX = false; 
					this.body.setAccelerationX(-this.acceleration)
				}
				else{
					this.flipX = true
					this.body.setAccelerationX(this.acceleration)
				}
		
			}
			else{
				this.state = "idle"
				this.body.setAccelerationX(0); 
			}
	
		}
		
		return musicParams
       
	} 
	die(){
		this.state = "dead";
		this.body.checkCollision.none = true; 
		this.body.setAccelerationX(0); 
		this.anims.play("wizard-death", true)
		
	}
	spawn(){
		this.state = "idle";
		this.body.checkCollision.none = false; 
		this.body.setAccelerationX(0); 
		
	}
}