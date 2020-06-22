import Phaser from 'phaser';
import MusicController from '@/midi/MusicController.js'
import Player from '@/phaser/objects/Player.js';

import Enemy from '@/phaser/objects/Enemy.js';
import Collectible from '@/phaser/objects/Collectible.js';
import Door from '@/phaser/objects/Door.js';

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({key: 'PlayScene'});
  }

  create() {

    this.musicController = new MusicController();
    
	this.pause = false; 
    this.graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } })

    this.map = this.add.tilemap('map', 32, 32);

    const tiles = this.map.addTilesetImage("tiles");
    this.layer = this.map.createStaticLayer("Tile Layer 1", tiles, 0,0);
  
   
    this.layer.setCollision([2])

    this.player = new Player(this, 100,200, 'player');
    
	

	this.doors = this.add.group();
	let d1= new Door(this, 750, 89, "door")
	let d2= new Door(this, 750, 505, "door")
	
	d1.targetDoor = d2;
	d2.targetDoor = d1; 
	d1.spawn = "left";
	d2.spawn = "left"
	this.doors.addMultiple([d1, d2]);
	this.collectible = new Collectible(this, 630, 90, "heart");

    this.physics.add.collider(this.player, this.layer);
	
	this.physics.add.collider(this.collectible, this.layer);

	
	this.physics.add.overlap(this.player, this.doors, this.enterDoor, null, this);
	this.physics.add.overlap(this.player, this.collectible, this.collect, null, this);
		


    this.lives = this.add.group();
	this.updateLives(); 
	
	
	this.musicParams ={

		velocity:0.5,
		valence:0, 
		energy:0, 
	}

   

    this.keys = this.input.keyboard.addKeys({ 
			up: Phaser.Input.Keyboard.KeyCodes.W, 
			left:Phaser.Input.Keyboard.KeyCodes.A, 
			right:Phaser.Input.Keyboard.KeyCodes.D, 
      down: Phaser.Input.Keyboard.KeyCodes.S,
      attack: Phaser.Input.Keyboard.KeyCodes.E,
      ctrl: Phaser.Input.Keyboard.KeyCodes.CTRL,
			space: Phaser.Input.Keyboard.KeyCodes.SPACE
    });
	}
	
	collect(){
		this.player.health += 1; 
		this.collectible.destroy() //setActive(false).setVisible(false).body.enable = false;
		// setTimeout(() => {
		// 	this.collectible.setActive(true).setVisible(true).body.enable = true;
		// }, 10000)
		this.updateLives(); 
		if(!this.enemy){
			this.enemy = new Enemy(this, 600, 505, 'wizard-idle');
			this.physics.add.collider(this.enemy, this.layer);
			this.physics.add.overlap(this.player, this.enemy, this.touchEnemy, null, this);
			
		}
	}

	enterDoor(player, door){
		
		let xOffset = door.spawn=="left"?-50:50
		
		
		this.player.body.setAccelerationX(0);
		this.player.body.setVelocityX(0)
		this.cameras.main.fade(500, 0,0,0)
		this.physics.pause(); 
		// let fadeOutInterval = setInterval(()=> {
		// 	this.musicParams.velocity -= 0.02;
		// 	this.musicController.setVelocity(this.musicParams.velocity)
		// }, 100)
		console.log("Enterdoor")
		this.pause = true; 
		this.musicParams.velocity = 0.1
		this.musicParams.energy = -1;
		
		setTimeout(()=>{
			this.exitDoor(door.targetDoor.x + xOffset, door.targetDoor.y)
			// clearInterval(fadeOutInterval)
		}, 500)
		
	}
	exitDoor(x,y){
		
		console.log("ExitDoor")
		// let fadeInInterval = setInterval(()=> this.musicParams.velocity += 0.02, 100)
		
		this.physics.resume(); 
		this.pause = false; 
		this.cameras.main.fadeIn(500) //, 0, 0 , 0, () => clearInterval(fadeInInterval)); 
	
		
		this.player.x = x 
		this.player.y = y
		this.player.flipX = true; 
		
	}
	updateLives(){
		this.lives.clear(true,true)
		for(let i = 0; i< this.player.health; i++){
      		this.lives.create(this.player.health*64-64 *i, 32, 'heart')
		}
	}	

  touchEnemy ()
  {
    
    if(this.player.hurtable){
      this.player.setTint(0xff0000);
      this.musicController.setValence(-1)
      this.player.health -= 1; 
      // let life = this.lives.getFirstAlive();
			// console.log(life)
      // if(life){
      //   life.destroy(); 
			// }
			this.updateLives(); 
			
      this.player.hurtable = false; 
      
      if(this.player.health <= 0){
				this.physics.pause(); 
				
				this.gameOver = true;
				//this.cameras.main.fade(500, 0,0,0)
				
				this.player.anims.play("die", true)
			
				this.add.text(0 , 220 , 'Game Over', { fontFamily: 'Arial', align: "center", fontSize: 64, color: '#ff0000', fixedWidth: 800 });
				
				this.musicParams.velocity = 0.5
				this.musicParams.valence = -0.8
				this.musicParams.energy = -0.8;
				
      }

      else {
        setTimeout(() => {
          this.player.clearTint(); 
          this.player.hurtable = true; 
        }, 3000) 
      }

    }
     
      
  }
  	
	hitEnemy(){
		
		this.enemy.die(); 
		setTimeout(()=> this.enemy.spawn(), 10000)
	}


  update() {

	if(!this.pause && !this.gameOver){
		this.musicParams = this.player.update(this.keys, this.musicParams)
		if(this.enemy){
			if(this.enemy.active && this.enemy.state !== "dead"){
				this.musicParams = this.enemy.update(this.musicParams); 
			}
		}
		
	}
	
    
	this.musicController.setValence(this.musicParams.valence); 
	this.musicController.setEnergy(this.musicParams.energy); 
	this.musicController.setVelocity(this.musicParams.velocity); 
   
  }
  	render() {

		this.debug.text("Arrows to move. Click to fade", 32, 32);

	}

}
