/**
 * The side length, in pixels, of every spritesheet the game draws from -
 * `sprites.webp`, `spritesDebug.webp` and `sprites.borders.png` are all
 * square and all this size.
 *
 * Wanted up front by anything that has to size a texture derived from a sheet
 * before it has the sheet in hand - the cleanEdge bake has to know how far it
 * can upscale before the result outgrows what the hardware will hold.
 */
export const spritesheetSideLength = 1_024;
