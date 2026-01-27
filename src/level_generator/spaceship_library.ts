/** All types that spaceship cell can be */
export enum CellType {
    /** Cell is empty */
    Blank,
    /** The cell is full - there will be a room generated on this space */
    Full,
    /** The cell is entrance. Will serve as one of the acces points. MUST BE NEXT TO `Blank` CELL */
    Entrance,
}

/** Interface for holding value of how likely the chance of cell being selected. */
export interface CellTextureLikelihood {
    /** Spaceship spritesheet index from top left, row-wise. */
    texture_index: number,
    /** Chance represented as a part. (If tile A has chance of `4` and tile B has chance of `1`, chances for tile A are `4/5` and for tile B is `1/5`) */
    chance: number,
}

/** Cell configuration - building block of spaceship. Defines all properties of a specific cell type. */
export interface CellConfiguration {
    /** Cell's type */
    cell_type: CellType
    /** List of all the possible textures for this cell. */
    cell_texture: CellTextureLikelihood[]
    /** What sides of the cell are open 
     * 
     * [`NORTH`, `EAST`, `SOUTH`, `WEST`] */
    open_directions: [boolean, boolean, boolean, boolean]
}