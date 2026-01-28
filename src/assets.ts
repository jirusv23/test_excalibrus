import * as ex from 'excalibur'

export const Images = {
    playerSpriteSheetSource: new ex.ImageSource("../assets/player_spritesheet.png"),
    spaceStationSpriteSheetSource: new ex.ImageSource("../assets/spaceship_tilemap.png"),
}

export const SpriteSheets = {
    playerSpriteSheet: ex.SpriteSheet.fromImageSource({
        image: Images.playerSpriteSheetSource,
        grid: {
            rows: 5,
            columns: 3,
            spriteWidth: 16,
            spriteHeight: 16,
        },
        spacing: {
            margin: { x: 16, y: 0 }
        }
    }),
    spaceStationSpriteSheet: ex.SpriteSheet.fromImageSource({
        image: Images.spaceStationSpriteSheetSource,
        grid: {
            rows: 5,
            columns: 4,
            spriteWidth: 16,
            spriteHeight: 16,
        },
        spacing: {
            margin: { x: 1, y: 1 }
        }
    })
};

export const PlayerAnimations = {
    /** Aiming while not walking */
    aiming_idle: ex.Animation.fromSpriteSheet(
        SpriteSheets.playerSpriteSheet,
        [1],
        100,
    ),

    /** Aiming while walking */
    aiming_walking: ex.Animation.fromSpriteSheet(
        SpriteSheets.playerSpriteSheet,
        [1, 4, 7, 10, 13],
        100,
    ),
}