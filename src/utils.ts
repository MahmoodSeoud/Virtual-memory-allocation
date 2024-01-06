/**
 * Creates a random number between [a, b]
 * @param {number} a - start interval of the random number 
 * @param {number} b - end interval of the random number (included)
 * @returns {number} a random number in the [a, b] interval
 */
export function createRandomNumber(a: number, b: number): number {
    // the b+1 to make [a, b-1] into [a, b]
    return Math.floor(Math.random() * (b + 1 - a)) + a;
}