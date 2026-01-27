import { CellType } from './spaceship_library';

/** Template defining basic structure of the spaceship, from this template will be generated actual level */
export interface SpaceshipTemplate {
    /** Name of the template */
    name: string,
    /** Layout of the spaceships defined as 2D array of CellType */
    layout: CellType[][]
}

/** List of spaceship templates */
export const SPACESHIP_TEMPLATES: SpaceshipTemplate[] = [
    {
        name: "Small shuttle",
        layout: 
        [
            [ CellType.Blank,    CellType.Blank,    CellType.Blank,    CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Blank,    CellType.Blank,    CellType.Blank, ],
            [ CellType.Blank,    CellType.Blank,    CellType.Blank,    CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Blank,    CellType.Blank,    CellType.Blank, ],
            [ CellType.Blank,    CellType.Blank,    CellType.Blank,    CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Blank,    CellType.Blank,    CellType.Blank, ],
            [ CellType.Blank,    CellType.Blank,    CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Blank,    CellType.Blank, ],
            [ CellType.Blank,    CellType.Blank,    CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Blank,    CellType.Blank, ],
            [ CellType.Blank,    CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Blank, ],
            [ CellType.Blank,    CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Blank, ],
            [ CellType.Blank,    CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Blank, ],
            [ CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,  ],
            [ CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Entrance, CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,     CellType.Full,  ],
        ]
    }
]