import Phaser from 'phaser';


export default class Player extends Phaser.GameObjects.Sprite{
    constructor (scene, x, y)
    {
        super(scene, x, y);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.body.setSize(25, 37)
        this.body.setOffset(11,0)
        this.type = 'player'
        this.alive = true;
        this.body.setMaxVelocity(180, 400);
        this.body.setDragX(500) 
        this.body.setCollideWorldBounds(true);
        
        
        this.health = 3;
        this.hurtable = true; 
        this.landed = false; 
        this.chased = false; 
        this.state = 'idle'; 
        
        
    }


    update(keys){

        this.scene.musicController.setVelocity(0.5)
       
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

        
       
        
        this.scene.musicController.setValence(this.health  -2) //0.5, 0, -0.5
      
        
         //player in the air
        if(!this.body.onFloor()){
            this.state = 'jump'; 

            let tileBelow = this.scene.map.getTileAtWorldXY(this.x, this.y + 50); 
            if(tileBelow.canCollide && this.body.velocity.y >0){
								this.scene.musicController.setEnergy(0.8)
								this.scene.musicController.setVelocity(0.8)
								
            }
            else{
                let speed = -1 + Math.abs(this.body.velocity.y/320) ; 
                
								this.scene.musicController.setEnergy(speed);
								this.scene.musicController.setValence(-0.8)
                this.scene.musicController.setVelocity(speed+1.2)
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
								this.scene.musicController.setEnergy(0.8); 
								this.scene.musicController.setVelocity(0.8);
            }
            else if(this.state=="crouch"){
                this.scene.musicController.setEnergy(-1); 
								this.scene.musicController.setValence(-0.8)
								this.scene.musicController.setVelocity(0.2);
            }
            else{
                this.scene.musicController.setEnergy(-0.5+ Math.abs(this.body.velocity.x/(360) )); //RUNNING
            }
            
            
          
           
            if(Math.abs(this.body.velocity.x) <= 20){
                if (keys.attack.isDown){
                    this.state = 'attack'; 
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
    }
}