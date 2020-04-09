import Phaser from 'phaser';
import Sword from './Sword';


export default class Player extends Phaser.GameObjects.Sprite{
    constructor (scene, x, y)
    {
        super(scene, x, y);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.body.setSize(20, 32)
        this.body.setOffset(15,4)
        this.type = 'player'
        this.alive = true;
        this.body.setMaxVelocity(180, 400);
        this.body.setDragX(500) 
        this.body.setCollideWorldBounds(true);
        
        this.scale = 1.5; 
        this.health = 2;
        this.hurtable = true; 
        this.landed = false; 
        this.state = 'idle';
        this.sword = null;  
		
    }


    update(keys, musicParams){
        
        musicParams.velocity = 0.2*this.health; 
        
       

        if(this.sword && this.state !== "attack"){
            
            this.sword.destroy(); 
            this.sword = null;
        }

        // this.scene.musicController.setVelocity(0.5)
       
        if (keys.left.isDown) // if the left arrow key is down
        {
            this.flipX = true; 
            if(keys.ctrl.isDown  || keys.down.isDown){
                this.state = "crouch"
                this.body.setVelocityX(-30)
                this.anims.play('crouch-walk', true);
            }
            else{
                this.state = 'run'; 
            
                this.body.setAccelerationX(-500) // move left
                this.anims.play('run', true);
            }
           
        }
        else if (keys.right.isDown) // if the right arrow key is down
        {

            this.flipX = false;
            if(keys.ctrl.isDown || keys.down.isDown){
                this.state = "crouch"
                this.body.setVelocityX(30)
                this.anims.play('crouch-walk', true);
            }
            else{
                this.state = 'run'; 
                this.body.setAccelerationX(500); // move right
                this.anims.play('run', true);
            }
            
        }   
        else{
            
            this.body.setAccelerationX(0);
        }  

        
       
        
        musicParams.valence= (this.health  -2) / 2; 
        
      
        
         //player in the air
        if(!this.body.onFloor()){
            this.state = 'jump'; 

            let tileBelow = this.scene.map.getTileAtWorldXY(this.x, this.y + 50); 
            if(tileBelow.canCollide && this.body.velocity.y >0){
                musicParams.energy = 0; 
                musicParams.velocity += 0.3;//this.scene.musicController.setVelocity(0.8)
           
								
            }
            else{
                let speed = -0.8 + Math.abs(this.body.velocity.y/450) ; 
                
                musicParams.energy = speed; 
                musicParams.valence = musicParams.valence + speed;
                musicParams.velocity += speed*this.health/6; ///this.scene.musicController.setVelocity(0.25*this.health+speed /3)
            }
          
            
           

            if(this.body.velocity.y<-50){
                
                this.anims.play('jump', true)
            }
            else if(this.body.velocity.y < 0){
								
                this.anims.play('jumptop', true)
            }
            else if(this.body.velocity.y <50){
         
                this.anims.play('falltop', true)
            }
            else {
             
                this.anims.play('falling', true)
            }
        
            
        }
      
        //player on the ground 
        else if(this.body.onFloor() ){
           
           
            if(this.body.deltaY() > 0.1 ){
           
                this.landed = true; 

                setTimeout(()=>{
                    
                    this.landed = false;
                }, 250)
            }
            if(this.landed){
                musicParams.energy = 0; //this.scene.musicController.setEnergy(0); 
                musicParams.velocity +=0.2; //this.scene.musicController.setVelocity(0.7);
            }
            else if(this.state=="crouch"){
                musicParams.energy = -1; //this.scene.musicController.setEnergy(-1); 
                musicParams.valence = 0; //this.scene.musicController.setValence(-0.8)
                musicParams.velocity -= 0.2; //this.scene.musicController.setVelocity(0.2);
            }
            else{
                musicParams.energy = this.health/6 - 0.5+ Math.abs(this.body.velocity.x/360); //this.scene.musicController.setEnergy(-0.5+ Math.abs(this.body.velocity.x/(360) )); //RUNNING
            }
            
            
          
           
            if(Math.abs(this.body.velocity.x) <= 20){
                if (keys.attack.isDown){
                    this.state = 'attack'; 
                    musicParams.velocity = 0.8
                    musicParams.energy = 0.5
                    musicParams.valence = -1
                    if(!this.sword){
                        let offset = this.flipX?-25:25
                        this.sword = new Sword(this.scene, this.x + offset, this.y)
                
                    }
                    this.anims.play('attack', true);
                }
                else if(keys.ctrl.isDown || keys.down.isDown){
                    this.state = 'crouch'; 
                    this.anims.play('crouch', true)
                }
                else{
                    this.state = 'idle'; 
                    if(this.y <= 400){
                        this.anims.play('idle', true);
                    }
                    else{
                        this.anims.play('idle-sword', true);
                    }
                    
                }
            }
           
        }
       

      if (( keys.space.isDown || keys.up.isDown) && this.body.onFloor())
      {
        this.body.setVelocityY(-320); // jump up
        this.anims.play('jump', true);
      }
      
      return musicParams
    }
}