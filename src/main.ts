import * as ex from 'excalibur';
import { MenuScene } from './scenes/menu_scene';
import { GameScene } from './scenes/game_scene';
import * as res from './assets';

const game = new ex.Engine({
  width: 1600,
  height: 800,
  pixelArt: true,
  pixelRatio: 2,
  //   displayMode: ex.DisplayMode.FitScreen
  scenes: {
    menuScene: new MenuScene(),
    gameScene: new GameScene(),
  }
});

res.Images.playerSpriteSheetSource.load();
res.Images.spaceStationSpriteSheetSource.load();
game.start('menuScene');