import * as ex from 'excalibur'
import { Player } from '../player';
import { SpaceshipGenerator } from '../level_generator/SpaceshipGenerator';
import { SpriteSheets } from '../assets';
import { SPACESHIP_TEMPLATES } from '../level_generator/spaceship_templates';

export class GameScene extends ex.Scene {
    player : ex.Actor;

    constructor() {
        super()
        this.backgroundColor = new ex.Color(100, 100, 100);
    }

    onInitialize(engine: ex.Engine): void {
        this.player = new Player(new ex.Vector(250, 250));
        this.camera.strategy.elasticToActor(this.player, 0.1, 0.5);
        this.add(this.player);

        this.add(new ex.Actor({
            pos: new ex.Vector(10, 10), 
            width: 50,
            height: 50,
            color: new ex.Color(99, 66, 33),
            collisionType: ex.CollisionType.Fixed,
        }))

        let generator = new SpaceshipGenerator(SPACESHIP_TEMPLATES[0], SpriteSheets.spaceStationSpriteSheet, ex.randomIntInRange(0, 10000));
        generator.generateUsingRecursiveBacktracking();
        console.log(generator.tilemap);
        this.add(generator.tilemap);

    }
}