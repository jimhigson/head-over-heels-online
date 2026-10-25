import { projectBlockXyzToScreenXy } from "../../../game/render/projections";
import { emptyArray } from "../../../utils/empty";
import { type Xy } from "../../../utils/vectors/vectors";
import { floorTileSize } from "./textureSizes";

/**
 * a wall runs along one world axis, so its tile has a neighbour each way
 * along it - at the same screen step the wall renderer places tiles by
 */
const wallNeighboursAlongY: ReadonlyArray<Xy> = [
  projectBlockXyzToScreenXy({ y: 1 }),
  projectBlockXyzToScreenXy({ y: -1 }),
];
const wallNeighboursAlongX: ReadonlyArray<Xy> = [
  projectBlockXyzToScreenXy({ x: 1 }),
  projectBlockXyzToScreenXy({ x: -1 }),
];

/**
 * a light beam's tiles are half a block apart along it. Its art runs along x
 * only (the y-axis beam is it flipped)
 */
const lightBeamNeighbours: ReadonlyArray<Xy> = [
  projectBlockXyzToScreenXy({ x: 0.5 }),
  projectBlockXyzToScreenXy({ x: -0.5 }),
];

/**
 * a floor is drawn as one tiling sprite, so its tile is surrounded by copies
 * of itself on the plain rectangular grid of its own frame size
 */
const floorNeighbours: ReadonlyArray<Xy> = [
  { x: -floorTileSize.w, y: -floorTileSize.h },
  { x: 0, y: -floorTileSize.h },
  { x: floorTileSize.w, y: -floorTileSize.h },
  { x: -floorTileSize.w, y: 0 },
  { x: floorTileSize.w, y: 0 },
  { x: -floorTileSize.w, y: floorTileSize.h },
  { x: 0, y: floorTileSize.h },
  { x: floorTileSize.w, y: floorTileSize.h },
];

const doesNotTile: ReadonlyArray<Xy> = emptyArray;

/**
 * the beam's tile frames, not its terminus
 */
const lightBeamTileTextureId = /^lightBeam\.\d+$/;

/**
 * Where a tiled frame's tiled neighbours sit relative to it in screen
 * pixels. A little repeat gets added to avoid artefacts at the edge of
 * tiles sprites, making the result property continuous
 */
export const tilingOffsets = (textureId: string): ReadonlyArray<Xy> => {
  if (textureId.includes(".wall.")) {
    return textureId.endsWith(".d0") ? wallNeighboursAlongY : (
        wallNeighboursAlongX
      );
  }
  if (lightBeamTileTextureId.test(textureId)) {
    return lightBeamNeighbours;
  }
  if (textureId.endsWith(".floor")) {
    return floorNeighbours;
  }
  return doesNotTile;
};

/**
 * How far a tiled frame's apron reaches on all 4 sides
 */
export const apronWidth = 4;
