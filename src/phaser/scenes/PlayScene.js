import Phaser from 'phaser';


export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({key: 'PlayScene'});
  }

  create() {
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
    if (( cursors.space.isDown || cursors.up.isDown) && player.body.onFloor())
    {
        player.body.setVelocityY(-500); // jump up
    }
  }
}
