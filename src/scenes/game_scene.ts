import * as ex from 'excalibur'
import { Player } from '../player';
import { SpaceshipGenerator } from '../level_generator/SpaceshipGenerator';
import { SpriteSheets } from '../assets';
import { SPACESHIP_TEMPLATES } from '../level_generator/spaceship_templates';
import { delay } from 'excalibur/build/dist/Util/Util';

export class GameScene extends ex.Scene {
    player : ex.Actor;
    generator : SpaceshipGenerator

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

        this.generator = new SpaceshipGenerator(SPACESHIP_TEMPLATES[0], SpriteSheets.spaceStationSpriteSheet, 10);
        this.generator.generateUsingRecursiveBacktracking();
        this.generator.tilemap.scale = new ex.Vector(4, 4);
        this.add(this.generator.tilemap);
    }

    update(engine: ex.Engine, elapsed: number): void {
        super.update(engine, elapsed);

        if (engine.input.keyboard.wasPressed(ex.Keys.F))
        {
            this.remove(this.generator.tilemap);
            this.generator.generateUsingRecursiveBacktracking();
            this.generator.tilemap.scale = new ex.Vector(4, 4);
            this.add(this.generator.tilemap);
        }
    }
}