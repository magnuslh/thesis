import Phaser from 'phaser';
import MusicController from '@/midi/MusicController.js'
import Player from '@/phaser/objects/Player.js'
import Enemy from '@/phaser/objects/Enemy.js';

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


    this.player = new Player(this, 200,200, 'player')
    
    this.enemy = new Enemy(this, 600, 500, 'bomb');

    this.physics.add.collider(this.player, this.layer);
    this.physics.add.collider(this.enemy, this.layer);

    this.physics.add.overlap(this.player, this.enemy, this.touchEnemy, null, this);



    this.lives = this.add.group();
    for(let i = 0; i< this.player.health; i++){
      this.lives.create(180-64 *i, 32, 'heart')
    }
    

    this.sound.add('thud');
    this.physics.world.on('worldbounds', () => {
      this.sound.play('thud', {volume: 0.75});
    });

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

  touchEnemy ()
  {
    
    if(this.player.hurtable){
      this.player.setTint(0xff0000);
      this.musicController.setValence(-1)
      this.player.health -= 1; 
      let life = this.lives.getFirstAlive();
  
      if(life){
        life.destroy(); 
      }
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
    this.enemy.update(); 
    //this.musicController.sendNotes(); 
   
  }

}
