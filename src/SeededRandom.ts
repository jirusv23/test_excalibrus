/**
 * SeededRandom - A seedable pseudo-random number generator
 * Uses the Mulberry32 algorithm for consistent, reproducible random sequences
 */
export class Random {
    private seed: number;

    constructor(seed: number) {
        this.seed = seed >>> 0; // Convert to unsigned 32-bit integer
    }

    /**
     * Internal hash function that updates the seed and returns a random value between 0 and 1 inclusive
     */
    private next(): number {
        this.seed |= 0; // Convert to 32-bit integer
        this.seed = (this.seed + 0x6d2b79f5) | 0;
        let t = Math.imul(this.seed ^ (this.seed >>> 15), 1 | this.seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }

    /**
     * Returns a random float between 0 (inclusive) and 1 (exclusive)
     */
    random(): number {
        return this.next();
    }

    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     */
    randInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(this.random() * (max - min + 1)) + min;
    }

    /**
     * Returns a random integer between min (inclusive) and max (exclusive)
     */
    randRange(min: number, max: number): number {
        return Math.floor(this.random() * (max - min)) + min;
    }

    /**
     * Returns a random float between min (inclusive) and max (inclusive)
     */
    randFloat(min: number, max: number): number {
        return this.random() * (max - min) + min;
    }

    /**
     * Returns true with the given probability (0-1)
     */
    chance(probability: number): boolean {
        return this.random() < probability;
    }

    /**
     * Returns a random element from an array
     */
    pick<T>(array: T[]): T {
        return array[this.randRange(0, array.length)];
    }

    /**
     * Shuffles an array in-place using Fisher-Yates algorithm
     */
    shuffle<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = this.randRange(0, i + 1);
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * Gets the current seed
     */
    getSeed(): number {
        return this.seed;
    }

    /**
     * Resets the generator to a new seed
     */
    setSeed(seed: number): void {
        this.seed = seed >>> 0;
    }
}