import {Scene}from 'phaser';
import sky from '@/phaser/assets/sky.png';
import bomb from '@/phaser/assets/bomb.png';
import thudMp3 from '@/phaser/assets/thud.mp3';
import thudOgg from '@/phaser/assets/thud.ogg';
import tiles from '@/phaser/assets/tiles.png';
import map from '@/phaser/assets/tilemap.json'
import player from '@/phaser/assets/Adventurer/adventurer-Sheet.png';
import playerHC from '@/phaser/assets/Adventurer/adventurer-hand-combat-Sheet.png';
import heart from '@/phaser/assets/heart.png';
import black from '@/phaser/assets/black-cube.png';
import wizardIdle from '@/phaser/assets/Wizard/wizard-idle.png';
import wizardFly from '@/phaser/assets/Wizard/wizard-fly.png';
import wizardDeath from '@/phaser/assets/Wizard/wizard-death.png';

export default class BootScene extends Scene {
  constructor() {
    super({key: 'BootScene'});
  }

  preload() {
		this.load.image('tiles', tiles);
		this.load.image('door', black);
    this.load.image('sky', sky);
    this.load.image('bomb', bomb);
    this.load.image('heart', heart);
    this.load.audio('thud', [thudMp3, thudOgg]);
    this.load.tilemapTiledJSON('map', map, null);
    this.load.spritesheet('player', 
        player,
        { frameWidth: 50, frameHeight: 37 }
    );
    this.load.spritesheet('playerHC', 
        playerHC,
        { frameWidth: 50, frameHeight: 37 }
		);
		this.load.spritesheet('wizard-idle', 
        wizardIdle,
        { frameWidth: 80, frameHeight: 80 }
		);
		this.load.spritesheet('wizard-fly', 
			wizardFly,
			{ frameWidth: 80, frameHeight: 80 }
		);
		this.load.spritesheet('wizard-death', 
			wizardDeath,
			{ frameWidth: 80, frameHeight: 80 }
		);
    
    
  }

  create() {
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'idle-sword',
      frames: this.anims.generateFrameNumbers('player', { start: 38, end: 41 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'crouch',
      frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: 1,
    });
    this.anims.create({
      key: 'crouch-walk',
      frames: this.anims.generateFrameNumbers('playerHC', { start: 52, end: 57 }),
      frameRate: 5,
      repeat: 1,
    });
   

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', { start: 8, end: 13  }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'die',
      frames: this.anims.generateFrameNumbers('player', { start: 65, end: 68 }),
      frameRate: 10,
      repeat: 0
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
      key: 'jumptop',
      frames: [ { key: 'player', frame: 17 } ],
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'falltop',
      frames: [ { key: 'player', frame: 18} ],
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'falling',
      frames: this.anims.generateFrameNumbers('player', { start: 22, end: 23 }),
      frameRate: 10,
      repeat: 1,
		});
		

		this.anims.create({
			key: 'wizard-idle',
      frames: this.anims.generateFrameNumbers('wizard-idle'),
			frameRate: 10,
			yoyo:true,
      repeat: -1
		})
		this.anims.create({
			key: 'wizard-fly-start',
      frames: this.anims.generateFrameNumbers('wizard-fly',  { start: 0, end: 3 }),
			frameRate: 10,
			repeat: 0
		})
		this.anims.create({
			key: 'wizard-fly',
      frames: this.anims.generateFrameNumbers('wizard-fly', { start: 4, end: 5 } ),
			frameRate: 5,
      repeat: -1
		})
		this.anims.create({
			key: 'wizard-death',
      frames: this.anims.generateFrameNumbers('wizard-death'),
			frameRate: 10,
      repeat: 0
		})
		this.anims.create({
			key: 'wizard-dead',
      frames: this.anims.generateFrameNumbers('wizard-death',{ start: 9, end: 9 }),
			frameRate: 10,
      repeat: 0
		})

    
    this.scene.start('PlayScene');
  }
}
