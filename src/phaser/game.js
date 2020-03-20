import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import PlayScene from './scenes/PlayScene';


function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 608,
    parent: containerId,
    pixelArt: true, 
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {y: 300},
        debug: true,
      },
    },
    scene: [BootScene, PlayScene],
  });
}

export default launch;
export {launch};
