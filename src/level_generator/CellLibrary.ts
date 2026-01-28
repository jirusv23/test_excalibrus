import { CellType, CellConfiguration } from "./spaceship_library";

/** Predefined cell configurations library. From these cells will be generated ships */
export const CellLibrary: Record<string, CellConfiguration> = {
    DEAD_END_LEFT: { 
        cell_type: CellType.Full, 
        cell_texture: [ {texture_index: 0, chance: 1} ],
        open_directions: [false, true, false, false] 
    },
    DEAD_END_RIGHT: { 
        cell_type: CellType.Full, 
        cell_texture: [ {texture_index: 1, chance: 1} ],
        open_directions: [false, false, false, true] 
    },
    DEAD_END_BOTTOM: { 
        cell_type: CellType.Full, 
        cell_texture: [ {texture_index: 2, chance: 1} ],
        open_directions: [true, false, false, false] 
    },
    DEAD_END_TOP: { 
        cell_type: CellType.Full, 
        cell_texture: [ {texture_index: 3, chance: 1} ],
        open_directions: [false, false, true, false] 
    },


    CORNER_BOTTOM_RIGHT: {
        cell_type: CellType.Full, 
        cell_texture: [ {texture_index: 4, chance: 1} ],
        open_directions: [false, true, true, false] 
    },
    CORNER_BOTTOM_LEFT: {
        cell_type: CellType.Full, 
        cell_texture: [ {texture_index: 5, chance: 1} ],
        open_directions: [false, false, true, true] 
    },
    CORNER_TOP_LEFT: {
        cell_type: CellType.Full, 
        cell_texture: [ {texture_index: 6, chance: 1} ],
        open_directions: [true, false, false, true] 
    },
    CORNER_TOP_RIGHT: {
        cell_type: CellType.Full, 
        cell_texture: [ {texture_index: 7, chance: 1} ],
        open_directions: [true, true, false, false] 
    },

    HALLWAY_HORIZONTAL: {
        cell_type: CellType.Full, 
        cell_texture: [ {texture_index: 8, chance: 1} ],
        open_directions: [false, true, false, true] 
    },
    HALLWAY_VERTICAL: {
        cell_type: CellType.Full, 
        cell_texture: [ {texture_index: 9, chance: 1} ],
        open_directions: [true, false, true, false] 
    },

    X_INTERSECTION: {
        cell_type: CellType.Full, 
        cell_texture: [ {texture_index: 10, chance: 1} ],
        open_directions: [true, true, true, true] 
    },
    BLANK_SPACE: {
        cell_type: CellType.Full, 
        cell_texture: [ {texture_index: 11, chance: 1} ],
        open_directions: [false, false, false, false] 
    },

    T_INTERSECTION_TOP: {
        cell_type: CellType.Full, 
        cell_texture: [ {texture_index: 12, chance: 1} ],
        open_directions: [false, true, true, true] 
    },
    T_INTERSECTION_BOTTOM: {
        cell_type: CellType.Full, 
        cell_texture: [ {texture_index: 13, chance: 1} ],
        open_directions: [true, true, false, true] 
    },
    T_INTERSECTION_RIGHT: {
        cell_type: CellType.Full, 
        cell_texture: [ {texture_index: 14, chance: 1} ],
        open_directions: [true, false, true, true] 
    },
    T_INTERSECTION_LEFT: {
        cell_type: CellType.Full, 
        cell_texture: [ {texture_index: 15, chance: 1} ],
        open_directions: [true, true, true, false] 
    },
    /** overlay texture for entrances */
    ENTRANCE_OVERLAY: {
        cell_type: CellType.Entrance, 
        cell_texture: [ {texture_index: 16, chance: 1} ],
        open_directions: [false, false, false, false] 
    },
    CHOOSEN_ENTRANCE_OVERLAY: {
        cell_type: CellType.Entrance, 
        cell_texture: [ {texture_index: 17, chance: 1} ],
        open_directions: [false, false, false, false] 
    },
};
