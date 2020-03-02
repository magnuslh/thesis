import Phaser from 'phaser';
import EmotionController from '@/midi/EmotionController.js'

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({key: 'PlayScene'});
  }

  create() {
    this.emotions = new EmotionController();
    
    this.add.image(400, 300, 'sky');

		
		this.cursors = this.input.keyboard.addKeys({ 
			up: Phaser.Input.Keyboard.KeyCodes.W, 
			left:Phaser.Input.Keyboard.KeyCodes.A, 
			right:Phaser.Input.Keyboard.KeyCodes.D, 
      down: Phaser.Input.Keyboard.KeyCodes.S,
      attack: Phaser.Input.Keyboard.KeyCodes.E,
			space: Phaser.Input.Keyboard.KeyCodes.SPACE
		});
	
		console.log(this.cursors)
		this.player = this.physics.add.sprite(200, 200, 'player')
    this.player.setCollideWorldBounds(true)
    


    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 15 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 15 }),
      frameRate: 10,
      repeat: -1
     });
     this.anims.create({
      key: 'jump',
      frames: [ { key: 'player', frame: 16 } ],
      frameRate: 10
     });

     this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNumbers('player', { start: 44, end: 58 }),
      frameRate: 10,
      repeat: 0
     });
   

    this.anims.create({
      key: 'somersault',
      frames: this.anims.generateFrameNumbers('player', { start: 18, end: 21 }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'falling',
      frames: this.anims.generateFrameNumbers('player', { start: 22, end: 23 }),
      frameRate: 10,
      repeat: 1,
    });
  
  
   

   
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');


    this.physics.add.collider(this.player, this.platforms);

    this.sound.add('thud');
    this.physics.world.on('worldbounds', () => {
      this.sound.play('thud', {volume: 0.75});
    });
  }

  update() {
		let cursors = this.cursors;
    let player = this.player;
    
    
    if (cursors.left.isDown) // if the left arrow key is down
    {
      player.flipX = true; 
        player.body.setVelocityX(-200); // move left
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) // if the right arrow key is down
    {
      player.flipX = false;
      player.body.setVelocityX(200); // move right
      player.anims.play('right', true);
		}
		else{
      player.body.setVelocityX(0);
      
    }  
   
    if(!player.body.onFloor()){
      this.emotions.sendSad();
      if(player.body.velocity.y<-50){
        player.anims.play('jump', true)
      }
      else if(Math.abs(player.body.velocity.y < 50)){
        player.anims.play('somersault', true)
      }
      else {
        player.anims.play('falling', true)
      }
     
      
    }
    if (cursors.attack.isDown){
      player.anims.play('attack', true);
    }
  
    else if(player.body.onFloor() && player.body.velocity.x == 0){
      this.emotions.sendHappy();
      player.anims.play('idle', true);
    }
   
    if (( cursors.space.isDown || cursors.up.isDown) && player.body.onFloor())
    {
      player.body.setVelocityY(-300); // jump up
      player.anims.play('jump', true);
    }
  }
}
