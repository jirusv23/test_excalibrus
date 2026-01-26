import * as ex from 'excalibur'
import { Player } from '../player';

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
            width: 500,
            height: 50,
            color: new ex.Color(99, 66, 33),
            collisionType: ex.CollisionType.Fixed,
        }))

        this.add(new ex.Actor({
            pos: new ex.Vector(0, 0), 
            width: 50,
            height: 500,
            color: new ex.Color(99, 66, 33),
            collisionType: ex.CollisionType.Fixed,
        }))
    }
}