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

export default class BootScene extends Scene {
  constructor() {
    super({key: 'BootScene'});
  }

  preload() {
    this.load.image('tiles', tiles);
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

    
    this.scene.start('PlayScene');
  }
}
