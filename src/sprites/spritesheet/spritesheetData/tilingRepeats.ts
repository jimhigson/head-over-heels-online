import { type Xy } from "../../../utils/vectors/vectors";
import { floorTileSize, wallTileSize } from "./textureSizes";

/**
 * Where the next instance of a tiled sprite is drawn, relative to this one, in
 * screen pixels.
 *
 * A block steps to `{ x: yw - xw, y: -(xw + yw) / 2 }` on screen, so with 16px
 * blocks a step along world x lands 16 across and 8 down, and along world y 16
 * across and 8 up - the 2:1 shift. A wall repeats along one of them, a floor
 * along both at once. The sign does not matter: an apron is filled from both
 * directions either way.
 *
 * Which of the two a wall facing uses is not evident from its id - the art is
 * mirrored and re-slotted by camera angle - but it is written plainly in the
 * art: a tile's capping line is a length of the wall's continuous 2:1 top
 * edge, so the way it slopes says where the next tile sits. Across the 31
 * `.d0` tiles it rises to the right and across the 31 `.d2` tiles it falls,
 * by a median of 6 over the 15 columns between first and last - the 8 per 16
 * these vectors carry.
 */
const nextTileUp = { x: 16, y: -8 } as const satisfies Xy;
const nextTileDown = { x: 16, y: 8 } as const satisfies Xy;

const isSize = (
  frame: { w: number; h: number },
  size: { w: number; h: number },
) => frame.w === size.w && frame.h === size.h;

/**
 * The repeats of a frame, empty for the sprites that are never tiled - which
 * is everything but the walls and floors. Their ids are generated in
 * `scenerySpritesheetData`, as `<scenery>.wall.<wall>.d0|d2` and
 * `<scenery>.floor`; the size is checked too so a rename cannot silently start
 * aproning something that is not a wall tile.
 */
export const tilingRepeatsOf = (
  textureId: string,
  frame: { w: number; h: number },
): ReadonlyArray<Xy> => {
  if (textureId.includes(".wall.") && isSize(frame, wallTileSize)) {
    return textureId.endsWith(".d0") ? [nextTileUp] : [nextTileDown];
  }
  if (textureId.endsWith(".floor") && isSize(frame, floorTileSize)) {
    return [nextTileUp, nextTileDown];
  }
  return [];
};

/**
 * how far a tiled frame's apron reaches on each side: the cleanEdge shader
 * measures runs up to four pixels long and its slant cases look two out, so
 * four is all it can see and any more would be dead pixels
 */
export const apronWidth = 4;
