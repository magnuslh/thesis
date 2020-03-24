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
    

    this.graphics = this.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } })

    this.map = this.add.tilemap('map', 32, 32);

    const tiles = this.map.addTilesetImage("tiles");
    this.layer = this.map.createStaticLayer("Tile Layer 1", tiles, 0,0);
  
   
    this.layer.setCollision([2])

  
    
    //this.add.image(400, 300, 'sky');


    //this.platforms = this.physics.add.staticGroup();
    // this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    // this.platforms.create(600, 400, 'ground');
    // this.platforms.create(50, 250, 'ground');
    // this.platforms.create(750, 220, 'ground');

	
    this.player = new Player(this, 100,200, 'player')
    
		this.enemy = new Enemy(this, 600, 505, 'wizard-idle');

		this.doors = this.add.group()
		let d1= new Door(this, 650, 110, "door")
		let d2= new Door(this, 750, 525, "door")
		
	 	d1.targetDoor = d2;
		d2.targetDoor = d1; 
		d1.spawn = "left";
		d2.spawn = "right"
		this.doors.addMultiple([d1, d2])
		this.collectible = new Collectible(this, 750, 90, "heart")

    this.physics.add.collider(this.player, this.layer);
		this.physics.add.collider(this.enemy, this.layer);
		this.physics.add.collider(this.collectible, this.layer);

		this.physics.add.overlap(this.player, this.enemy, this.touchEnemy, null, this);
		this.physics.add.overlap(this.player, this.doors, this.enterDoor, null, this);
		this.physics.add.overlap(this.player, this.collectible, this.collect, null, this);
		


    this.lives = this.add.group();
		this.updateLives(); 
    

   

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
		this.collectible.destroy()
		this.updateLives(); 
	}

	enterDoor(player, door){
		console.log(player);
		console.log(door);
		let xOffset = door.spawn=="left"?-40:40
		
		
		this.player.body.setAccelerationX(0);
		this.player.body.setVelocityX(0)
		this.cameras.main.fade(500, 0,0,0)
		// this.scene.pause();
		this.physics.pause(); 
		setTimeout(()=>this.exitDoor(door.targetDoor.x + xOffset, door.targetDoor.y), 500)
		
	}
	exitDoor(x,y){
		console.log("resume")
		this.physics.resume(); 
		this.cameras.main.fadeIn(500)
		// this.scene.resume();
		// this.input.keyboard.resetKeys(); 
		
		this.player.x = x 
		this.player.y = y
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
      }

      else {
        setTimeout(() => {
          this.player.clearTint(); 
          this.player.hurtable = true; 
        }, 3000) 
      }

    }
     
      
  }


  update() {
		this.player.update(this.keys)
		if(this.enemy.active && this.enemy.state !== "dead"){
			this.enemy.update(); 
		}
    
    //this.musicController.sendNotes(); 
   
  }

}
