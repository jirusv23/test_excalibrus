import { SpaceshipTemplate } from './spaceship_templates';
import * as ex from 'excalibur'
import { Random } from '../SeededRandom'
import { CellType } from './spaceship_library';
import { CellLibrary } from './CellLibrary'

/** Simple interface for holding X and Y coordinates */
interface Coordinates {
    X: number,
    Y: number,
}

/** Class for generating a random level from a template */
export class SpaceshipGenerator {
    /** Template which is used when generating spaceship */
    public template: SpaceshipTemplate
    /** Spritesheet used for creating tilemap */
    public spriteSheet: ex.SpriteSheet
    /** Seeded random module */
    private random: Random
    /** Tilemap which is being build */
    public tilemap: ex.TileMap

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

        if (this.spriteSheet.sprites.length === 0) { 
            console.error("SpriteSheet passed to SpaceshipGenerator constructor doesn't have atleast one tile!");
            throw new Error("SpriteSheet doesn't have atleast one tile!");
        }

        this.tilemap = new ex.TileMap({
            rows: this.template.layout.length,
            columns: this.template.layout[0].length,
            tileWidth: this.spriteSheet.sprites[0].width,
            tileHeight: this.spriteSheet.sprites[0].height,
        })
    }

    /** Pick one entrance randomly from the template. Returns coordinates [x, y] */
    private pickRandomEntrance() : Coordinates
    {
        const entrances: Coordinates[] = [];
        
        // Find all entrance cells in the template
        // Add templates coordinates to entrances
        for (let y = 0; y < this.template.layout.length; y++) {
            for (let x = 0; x < this.template.layout[y].length; x++) {
                if (this.template.layout[y][x] === CellType.Entrance) {
                    entrances.push({X: x, Y: y});
                }
            }
        }
        
        // Pick a random entrance
        if (entrances.length === 0) {
            throw new Error("No entrances found in the template!");
        }
        
        const randomIndex = this.random.randRange(0, entrances.length);
        return entrances[randomIndex];
    }

    /** Generates a level using recursive backtracking */
    public generateUsingRecursiveBacktracking()
    {
        this.resetTilemap();
        /** Coordinates from which we start generating  */
        const startingCoordinates = this.pickRandomEntrance()
        /** Current point we are currently at */
        let currentCoordinate: Coordinates = {...startingCoordinates};
        /** Set of already visited coordinates (stored as "x,y" strings for proper Set comparison) */
        let alreadyVisited: Set<string> = new Set();
        /** Stack for backtracking */
        let stack: Coordinates[] = [];
        /** Track which directions each cell connects to */
        let cellConnections: Map<string, boolean[]> = new Map();
        
        // Calculate total number of non-blank cells to visit
        let totalCellsToVisit = 0;
        for (let y = 0; y < this.template.layout.length; y++) {
            for (let x = 0; x < this.template.layout[y].length; x++) {
                if (this.template.layout[y][x] !== CellType.Blank) {
                    totalCellsToVisit++;
                }
            }
        }

        // Add starting coordinate to visited and stack
        const startKey = this.coordinatesToKey(currentCoordinate);
        alreadyVisited.add(startKey);
        stack.push({...currentCoordinate});
        
        // Initialize connections for starting cell
        cellConnections.set(startKey, [false, false, false, false]);

        while (alreadyVisited.size < totalCellsToVisit)
        {
            // Get possible unvisited directions
            const possibleDirections = this.GetPossibleDirections(alreadyVisited, currentCoordinate);
            
            if (possibleDirections.length > 0) {
                // Choose a random direction and carve through
                const chosenDirection = this.random.pick(possibleDirections);
                
                // Mark the current cell as open in the chosen direction
                const currentKey = this.coordinatesToKey(currentCoordinate);
                let currentConnections = cellConnections.get(currentKey)!;
                currentConnections[chosenDirection] = true;
                
                // Move to the next cell
                switch (chosenDirection) {
                    case 0: // North
                        currentCoordinate.Y -= 1; 
                        break;
                    case 1: // East
                        currentCoordinate.X += 1; 
                        break;
                    case 2: // South
                        currentCoordinate.Y += 1; 
                        break;
                    case 3: // West
                        currentCoordinate.X -= 1; 
                        break; 
                }
                
                // Add new cell to visited and stack
                const newKey = this.coordinatesToKey(currentCoordinate);
                alreadyVisited.add(newKey);
                stack.push({...currentCoordinate});
                
                // Initialize connections for new cell and mark the opposite direction as open
                const oppositeDirection = (chosenDirection + 2) % 4;
                let newConnections = cellConnections.get(newKey) || [false, false, false, false];
                newConnections[oppositeDirection] = true;
                cellConnections.set(newKey, newConnections);
            } else {
                // Backtrack - no unvisited neighbors
                if (stack.length === 0) {
                    break; // Should not happen if template is valid
                }
                
                stack.pop(); // Remove current position
                
                if (stack.length > 0) {
                    currentCoordinate = {...stack[stack.length - 1]};
                } else {
                    break;
                }
            }
        }
        
        // Now assign cell configurations based on connections
        this.assignCellConfigurations(cellConnections, startingCoordinates);
    }

    /**
     * Converts coordinates to a string key for use in Set/Map
     * @param coord Coordinates to convert
     * @returns String key in format "x,y"
     */
    private coordinatesToKey(coord: Coordinates): string {
        return `${coord.X},${coord.Y}`;
    }
    
    /**
     * Assigns appropriate cell configurations from CellLibrary based on open directions
     * @param cellConnections Map of coordinate keys to their open direction arrays
     * @param startingCoord Optional coordinates which will indicate from which cell was spaceship generated
    */
   private assignCellConfigurations(cellConnections: Map<string, boolean[]>, startingCoord: Coordinates | null): void {

        const entranceTextureIndex = this.selectTextureFromLikelihood(CellLibrary.ENTRANCE_OVERLAY.cell_texture)
        const choosenEntranceTextureIndex = this.selectTextureFromLikelihood(CellLibrary.CHOOSEN_ENTRANCE_OVERLAY.cell_texture)

        cellConnections.forEach((openDirections, key) => {
            const [xStr, yStr] = key.split(',');
            const x = parseInt(xStr);
            const y = parseInt(yStr);
            
            // Find matching cell configuration from library
            const cellConfig = this.findMatchingCellConfig(openDirections);

            // Get the tile
            const tile = this.tilemap.getTile(x, y);

            if (cellConfig) {
                // Select texture based on likelihood
                const textureIndex = this.selectTextureFromLikelihood(cellConfig.cell_texture);
                
                // Convert linear texture index to 2D spritesheet coordinates
                const spriteX = textureIndex % this.spriteSheet.columns;
                const spriteY = Math.floor(textureIndex / this.spriteSheet.columns);
                
                if (tile) {
                    tile.addGraphic(this.spriteSheet.getSprite(spriteX, spriteY));
                }
            }

            if (this.getCellTypeFromTemplate(x, y) === CellType.Entrance)
            {
                // Check if the entrance is the one which was choosen as starting point for spaceship generation
                if (startingCoord && startingCoord.X == x && startingCoord.Y == y)
                {
                    const spriteX = choosenEntranceTextureIndex % this.spriteSheet.columns;
                    const spriteY = Math.floor(choosenEntranceTextureIndex / this.spriteSheet.columns);

                    if (tile) {
                        tile.addGraphic(this.spriteSheet.getSprite(spriteX, spriteY));
                    }
                }
                else 
                {
                    const spriteX = entranceTextureIndex % this.spriteSheet.columns;
                    const spriteY = Math.floor(entranceTextureIndex / this.spriteSheet.columns);

                    if (tile) {
                        tile.addGraphic(this.spriteSheet.getSprite(spriteX, spriteY));
                    }
                }
            }
        });
    }

    /**
     * Finds a matching cell configuration from CellLibrary based on open directions
     * @param openDirections Array of booleans representing open directions [N, E, S, W]
     * @returns Matching CellConfiguration or null if not found
     */
    private findMatchingCellConfig(openDirections: boolean[]) {
        // Search through CellLibrary for matching configuration
        for (const configName in CellLibrary) {
            const config = CellLibrary[configName];
            
            // Check if all directions match
            if (this.directionsMatch(config.open_directions, openDirections)) {
                return config;
            }
        }
        
        // Fallback to blank space if no match found
        console.warn(`No matching cell configuration found for directions: ${openDirections}`);
        return CellLibrary.BLANK_SPACE;
    }

    /**
     * Checks if two direction arrays match
     * @param dir1 First direction array
     * @param dir2 Second direction array
     * @returns True if all directions match
     */
    private directionsMatch(dir1: boolean[], dir2: boolean[]): boolean {
        return dir1[0] === dir2[0] && 
               dir1[1] === dir2[1] && 
               dir1[2] === dir2[2] && 
               dir1[3] === dir2[3];
    }

    /**
     * Selects a texture index based on likelihood weights
     * @param textures Array of texture likelihoods
     * @returns Selected texture index
     */
    private selectTextureFromLikelihood(textures: { texture_index: number, chance: number }[]): number {
        // Calculate total weight
        const totalWeight = textures.reduce((sum, tex) => sum + tex.chance, 0);
        
        // Pick a random value
        const randomValue = this.random.randRange(0, totalWeight);
        
        // Find which texture this corresponds to
        let currentWeight = 0;
        for (const texture of textures) {
            currentWeight += texture.chance;
            if (randomValue < currentWeight) {
                return texture.texture_index;
            }
        }
        
        // Fallback to first texture
        return textures[0].texture_index;
    }

    /**
     * Checks all direction and return a list with possible direction to travel to. Returns empty list if no direction is acceptable
     * @param alreadyVisited Set of coordinate key strings which were already visited
     * @param currentCoordinate Where we are in the generation process in form of [X, Y] coord
     * @returns Set of numbers containing all possible direction to travel to. 
     * 
     * 0 = NORTH | 1 = EAST | 2 = SOUTH | 3 = WEST
     */
    private GetPossibleDirections(alreadyVisited: Set<string>, currentCoordinate: Coordinates) : number[]
    {
        const possibleDirection: number[] = [];

        /** Amount of rows in template */
        const rowCount: number = this.template.layout.length;
        /** Amount of columns in template */
        const colCount: number = this.template.layout[0].length;

        // Check North
        if (currentCoordinate.Y - 1 >= 0 && 
            this.template.layout[currentCoordinate.Y - 1][currentCoordinate.X] != CellType.Blank &&
            !alreadyVisited.has(this.coordinatesToKey({X: currentCoordinate.X, Y: currentCoordinate.Y - 1})))
        { possibleDirection.push(0); }
        
        // Check South
        if (currentCoordinate.Y + 1 < rowCount && 
            this.template.layout[currentCoordinate.Y + 1][currentCoordinate.X] != CellType.Blank &&
            !alreadyVisited.has(this.coordinatesToKey({X: currentCoordinate.X, Y: currentCoordinate.Y + 1})))
        { possibleDirection.push(2); }

        // Check West 
        if (currentCoordinate.X - 1 >= 0 && 
            this.template.layout[currentCoordinate.Y][currentCoordinate.X - 1] != CellType.Blank &&
            !alreadyVisited.has(this.coordinatesToKey({X: currentCoordinate.X - 1, Y: currentCoordinate.Y})))
        { possibleDirection.push(3); }
        
        // Check East
        if (currentCoordinate.X + 1 < colCount && 
            this.template.layout[currentCoordinate.Y][currentCoordinate.X + 1] != CellType.Blank &&
            !alreadyVisited.has(this.coordinatesToKey({X: currentCoordinate.X + 1, Y: currentCoordinate.Y})))
        { possibleDirection.push(1); }

        return possibleDirection;
    }

    /** Sets the tilemap to empty one */
    private resetTilemap()
    {
        this.tilemap = new ex.TileMap({
            rows: this.template.layout.length,
            columns: this.template.layout[0].length,
            tileWidth: this.spriteSheet.sprites[0].width,
            tileHeight: this.spriteSheet.sprites[0].height,
        })
    }

    /**
     * Returns a `CellType` located somewhere in this.template.layout
     * @param x X coordinates of template
     * @param y Y coordinate of template
     * @returns Cell Type of the cell
     */
    private getCellTypeFromTemplate(x: number, y: number): CellType
    {
        return this.template.layout[y][x]
    }
}