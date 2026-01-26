/** Interface for holding likelihood of the tile being chosen */
interface TileLikelihood {
    /** Chance of this cell being chosen as a part of the whole fraction. (If this part has likelihood of `2` and all other parts have sum of parts `4` this part has `2/4` change of being chosen) */
    likelihood_as_part: number;
    /** Index of where this tile is located on the spaceship tileset (from top left, rows major) */
    tilemap_index: number;
}

/** Type alias for a tile definition (an array of tile likelihoods) */
type TileDefinition = TileLikelihood[];

/** Spaceship's tile definition */
export const SpaceshipTileMap: Record<string, TileDefinition> = {
    DEAD_END_LEFT: [{ tilemap_index: 0, likelihood_as_part: 1 }],
    DEAD_END_RIGHT: [{ tilemap_index: 1, likelihood_as_part: 1 }],
    DEAD_END_BOTTOM: [{ tilemap_index: 2, likelihood_as_part: 1 }],
    DEAD_END_TOP: [{ tilemap_index: 3, likelihood_as_part: 1 }],

    CORNER_BOTTOM_RIGHT: [{ tilemap_index: 4, likelihood_as_part: 1 }],
    CORNER_BOTTOM_LEFT: [{ tilemap_index: 5, likelihood_as_part: 1 }],
    CORNER_TOP_LEFT: [{ tilemap_index: 6, likelihood_as_part: 1 }],
    CORNER_TOP_RIGHT: [{ tilemap_index: 7, likelihood_as_part: 1 }],

    HALLWAY_HORIZONTAL: [{ tilemap_index: 8, likelihood_as_part: 1 }],
    HALLWAY_VERTICAL: [{ tilemap_index: 9, likelihood_as_part: 1 }],

    FOUR_WAY_INTER: [{ tilemap_index: 10, likelihood_as_part: 1 }],
};

interface SpaceshipTemplate {
    /** Name of the spaceship template */
    name: string;
    /** Layout of the spaceship template, `-2` = possible entrance, `-1` = empty space, `0` = tile index */
    layout: number[][];
}

/** List of possible ships templates */
export const spaceships_templates: SpaceshipTemplate[] = [
    {
        name: "Small Shuttle",
        layout: [
            [-1, -1, -1, -1, -1,  0, -2,  0, -1, -1, -1, -1, -1, ],
            [-1, -1, -1, -1,  0,  0,  0,  0,  0, -1, -1, -1, -1, ],
            [-1, -1, -1, -1,  0,  0,  0,  0,  0, -1, -1, -1, -1, ],
            [-1, -1,  0, -2,  0,  0,  0,  0,  0, -2,  0, -1, -1, ],
            [-1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1, ],
            [-1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1, ],
            [-1, -2,  0,  0,  0,  0,  0,  0,  0,  0,  0, -2, -1, ],
            [-1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, ],
            [ 0,  0,  0,  0, -2,  0,  0,  0, -2,  0,  0,  0,  0, ],
        ]
    }
]