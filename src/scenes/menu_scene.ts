import * as ex from 'excalibur'

export class MenuScene extends ex.Scene {
    constructor() {
        super()
        this.backgroundColor = new ex.Color(255, 0, 0);
    }

    override update(engine: ex.Engine, elapsed: number): void {
        super.update(engine, elapsed);

        if (engine.input.keyboard.wasPressed(ex.Keys.Space)) {
            engine.goToScene('gameScene')
        }
    }
}