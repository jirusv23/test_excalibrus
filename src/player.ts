import * as ex from 'excalibur'
import { UserKeyboardKeybinds } from './game_config'
import { PlayerAnimations } from './assets';

export class Player extends ex.Actor {
    /** Player's deceleration */
    private deceleration : number = 1500;
    /** Players acceleration */
    private acceleration : number = 1600;
    /** Players max speed */
    private max_speed : number = 400;
    /** Players scaling factor for both collider and sprite */
    private scalingFactor : number = 3;

    constructor(init_position : ex.Vector) {
        super({
            pos: init_position,
            color: new ex.Color(0, 255, 0),
            radius: 7.5,
            collisionType: ex.CollisionType.Active,
        })
        
        this.acc = new ex.Vector(0, 0);
        this.graphics.use(PlayerAnimations.aiming_idle)
        this.scale = new ex.Vector(this.scalingFactor, this.scalingFactor);
    }

    update(engine: ex.Engine, elapsed: number): void {
        const deltaTime = elapsed / 1000; // Convert ms to seconds

        // Movement
        this.move(engine, deltaTime);

        // Make player look toward mouse
        const screenPos = engine.input.pointers.primary.lastScreenPos;
        if (screenPos !== null) {
            const worldPos = engine.screenToWorldCoordinates(screenPos);
            this.lookAt(worldPos);
        }

        // Handle animation
        this.handleAnimation();
    }

    /**
     * Adds acceleration to the player based on the held keys.   
     * Deaccelerate the players when no input is detected. Keybinds are stored in `game_config.ts`
     * @param {[ex.Engine]} engine Engine whose input will be checked
     * @param {number} deltaTime Time elapsed since last frame in seconds
     */
    private move(engine : ex.Engine, deltaTime : number) {
        // Reset acceleration each frame
        this.acc.x = 0;
        this.acc.y = 0;

        if (engine.input.keyboard.isHeld(UserKeyboardKeybinds.UP))
        { this.acc.y -= this.acceleration }
        else if (engine.input.keyboard.isHeld(UserKeyboardKeybinds.DOWN))
        { this.acc.y += this.acceleration }

        if (engine.input.keyboard.isHeld(UserKeyboardKeybinds.RIGHT))
        { this.acc.x += this.acceleration }
        else if (engine.input.keyboard.isHeld(UserKeyboardKeybinds.LEFT))
        { this.acc.x -= this.acceleration }

        if (this.acc.x === 0 && this.acc.y === 0)
        { this.deaccelerate(deltaTime) }

        // Clamp velocity to max speed
        if (this.vel.magnitude > this.max_speed) {
            this.vel = this.vel.normalize().scale(this.max_speed);
        }
    }

    /** Deaccelerates the player when no input is detected
     * @param {number} deltaTime Time elapsed since last frame in seconds
     */
    private deaccelerate(deltaTime: number)
    {
        if (Math.abs(this.vel.x) > 0) {
            const decelX = this.deceleration * deltaTime;
            this.vel.x > 0 ? this.vel.x -= decelX : this.vel.x += decelX;
            if (Math.abs(this.vel.x) < decelX) this.vel.x = 0;
        }

        if (Math.abs(this.vel.y) > 0) {
            const decelY = this.deceleration * deltaTime;
            this.vel.y > 0 ? this.vel.y -= decelY : this.vel.y += decelY;
            if (Math.abs(this.vel.y) < decelY) this.vel.y = 0;
        }
    }

    /**
     * Make the player rotate toward the point
     * @param point Point toward which to rotate to
     */
    private lookAt(point : ex.Vector) {
        const deltaX : number = point.x - this.pos.x;
        const deltaY : number = point.y - this.pos.y; 

        const angle = Math.atan2(deltaY, deltaX);

        this.rotation = angle;
    }

    /**
     * Handle animation of the player
     */
    private handleAnimation() 
    {
        // Highest priority first!
        // NOTE: could be more readable if conditions were checked at beggining and change the animation based upon these conditions

        // When the player moving
        if (Math.abs(this.acc.x) > 0 || Math.abs(this.acc.y) > 0)
        {
            this.graphics.use(PlayerAnimations.aiming_walking)
        }
        else 
        {
            this.graphics.use(PlayerAnimations.aiming_idle)
        }
    }
}