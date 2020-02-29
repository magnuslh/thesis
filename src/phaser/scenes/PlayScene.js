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
			space: Phaser.Input.Keyboard.KeyCodes.SPACE
		});
	
		console.log(this.cursors)
		this.player = this.physics.add.sprite(200, 200, 'bomb')
    this.player.setCollideWorldBounds(true)
   
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
        
        player.body.setVelocityX(-200); // move left
    }
    else if (cursors.right.isDown) // if the right arrow key is down
    {
        player.body.setVelocityX(200); // move right
		}
		else {
			player.body.setVelocityX(0);
    }  
    if(!player.body.onFloor()){
      this.emotions.sendSad();
    }
    if(player.body.onFloor()){
      this.emotions.sendHappy();
    }
    if (( cursors.space.isDown || cursors.up.isDown) && player.body.onFloor())
    {
      
      player.body.setVelocityY(-500); // jump up
    }
  }
}
