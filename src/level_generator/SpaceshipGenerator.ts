import { SpaceshipTemplate } from './spaceship_templates';
import * as ex from 'excalibur'
import { Random } from '../SeededRandom'

/** Class for generating a random level from a template */
export class SpaceshipGenerator {
    /** Template which is used when generating spaceship */
    public template: SpaceshipTemplate
    /** Spritesheet used for creating tilemap */
    public spriteSheet: ex.SpriteSheet
    /** Seeded random module */
    private random: Random

    /**
     * Creates a SpaceshipGenerator
     * @param template Template which will be used
     * @param spaceShipSpriteSheet Spritesheet used for creating tilemap
     * @param seed Seed for generating the random layout. Same seed and template will result in same ship every time
     */
    constructor(template: SpaceshipTemplate, spaceShipSpriteSheet: ex.SpriteSheet, seed: number)
    {
        this.template = template;
        this.spriteSheet = spaceShipSpriteSheet;
        this.random = new Random(seed);
    }
}