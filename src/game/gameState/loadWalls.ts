import { UnknownItemInPlay } from "@/model/ItemInPlay";
import { RoomJson } from "@/model/modelTypes";
import { blockSizePx } from "@/sprites/pixiSpriteSheet";
import { PlanetName } from "@/sprites/planets";
import mitt from "mitt";
import { blockXyzToFineXyz } from "../render/projectToScreen";

/**
 * convert a room's walls into normal items (that can be collided with as with any other item)
 */
export function* loadWalls<R extends string>(
  room: RoomJson<PlanetName, R>,
): Generator<UnknownItemInPlay<R>> {
  // arbitrary block thickness for the sake of bounding boxes having volume
  const wallThicknessBlocks = 0.5;

  // left/right sides:
  for (let yi = room.size.y - 1; yi >= 0; yi--) {
    const style = room.walls.left[yi];
    if (style !== "none")
      yield {
        type: "wall",
        id: `wall-left-${yi}`,
        config: { side: "left", style },
        position: blockXyzToFineXyz({ x: room.size.x, y: yi, z: 0 }),
        events: mitt(), // TODO: question if a wall really needs an event bus!
        state: {},
        aabb: {
          x: wallThicknessBlocks * blockSizePx.w,
          y: blockSizePx.d,
          z: 999,
        },
      };

    // this lookup is slow, but is only done on room load:
    const skipInvisibleWall =
      Object.values(room.items).find(
        (i) =>
          i.type === "door" &&
          i.config.axis === "y" &&
          i.position.x === 0 &&
          (i.position.y === yi || i.position.y + 1 === yi),
      ) !== undefined;

    if (!skipInvisibleWall)
      yield {
        type: "wall",
        id: `wall-right-${yi}`,
        config: { side: "left", style: "none" },
        position: blockXyzToFineXyz({ x: -wallThicknessBlocks, y: yi, z: 0 }),
        events: mitt(), // TODO: question if a wall really needs an event bus!
        state: {},
        aabb: {
          x: wallThicknessBlocks * blockSizePx.w,
          y: blockSizePx.d,
          z: 999,
        },
      };
  }

  // towards/away sides:
  for (let xi = room.size.x - 1; xi >= 0; xi--) {
    const style = room.walls.away[xi];
    if (style !== "none")
      yield {
        type: "wall",
        id: `wall-away-${xi}`,
        config: { side: "away", style },
        position: blockXyzToFineXyz({ x: xi, y: room.size.y, z: 0 }),
        events: mitt(), // TODO: question if a wall really needs an event bus!
        state: {},
        aabb: {
          x: blockSizePx.w,
          y: wallThicknessBlocks * blockSizePx.d,
          z: 999,
        },
      };

    const skipInvisibleWall =
      Object.values(room.items).find(
        (i) =>
          i.type === "door" &&
          i.config.axis === "x" &&
          (i.position.x === xi || i.position.x + 1 === xi) &&
          i.position.y === 0,
      ) !== undefined;

    if (!skipInvisibleWall)
      yield {
        type: "wall",
        id: `wall-towards-${xi}`,
        config: { side: "towards", style: "none" },
        position: blockXyzToFineXyz({ x: xi, y: -wallThicknessBlocks, z: 0 }),
        events: mitt(), // TODO: question if a wall really needs an event bus!
        state: {},
        aabb: {
          x: blockSizePx.w,
          y: wallThicknessBlocks * blockSizePx.d,
          z: 999,
        },
      };
  }
}