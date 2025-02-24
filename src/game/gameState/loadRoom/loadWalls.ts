import { blockXyzToFineXyz } from "../../render/projectToScreen";
import {
  wallThicknessBlocks,
  xAxisWallAabb,
  xAxisWallRenderAabb,
  yAxisWallAabb,
  yAxisWallRenderAabb,
} from "../../collision/boundingBoxes";
import { defaultItemProperties } from "../../../model/defaultItemProperties";
import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import type { RoomJson } from "../../../model/RoomJson";
import type { SceneryName } from "../../../sprites/planets";
import { emptySet } from "../../../utils/empty";
import { doorAlongAxis } from "../../../utils/vectors/vectors";

/**
 * convert a room's walls into normal items (that can be collided with as with any other item)
 */
export function* loadWalls<R extends string>(
  room: RoomJson<SceneryName, R>,
): Generator<UnionOfAllItemInPlayTypes<R>> {
  // left/right sides:
  for (let yi = room.size.y - 1; yi >= 0; yi--) {
    const style = room.walls.left[yi];
    // visible wall - gaps for doors are explicitly given with "none"
    if (style !== "none") {
      yield {
        ...defaultItemProperties,
        ...{
          type: "wall",
          id: `wall-left-${yi}`,
          config: { side: "left", style },
          state: {
            position: {
              ...blockXyzToFineXyz({ x: room.size.x, y: yi, z: 0 }),
              z: 0,
            },
            expires: null,
            stoodOnBy: emptySet,
            disappear: null,
          },
          aabb: yAxisWallAabb,
          renderAabb: yAxisWallRenderAabb,
        },
      };
    }

    // hidden wall - gaps with door are implicit
    // this lookup is slow, but is only done on room load:
    const hasDoorAtThisWall =
      Object.values(room.items).find(
        (i) =>
          i.type === "door" &&
          doorAlongAxis(i.config.direction) === "y" &&
          i.position.x === 0 &&
          (i.position.y === yi || i.position.y + 1 === yi),
      ) !== undefined;

    if (!hasDoorAtThisWall) {
      yield {
        ...defaultItemProperties,
        ...{
          type: "wall",
          id: `wall-right-${yi}`,
          config: { side: "right", style: "none" },
          shadowCastTexture: "shadow.wall.y",
          state: {
            position: blockXyzToFineXyz({
              x: -wallThicknessBlocks,
              y: yi,
              z: 0,
            }),
            expires: null,
            stoodOnBy: emptySet,
            disappear: null,
          },
          aabb: yAxisWallAabb,
          renders: false,
        },
      };
    }
  }

  // towards/away sides:
  for (let xi = room.size.x - 1; xi >= 0; xi--) {
    // visible wall - gaps for doors are explicitly given with "none"
    const style = room.walls.away[xi];
    if (style !== "none") {
      yield {
        ...defaultItemProperties,
        ...{
          type: "wall",
          id: `wall-away-${xi}`,
          config: { side: "away", style },
          state: {
            position: {
              ...blockXyzToFineXyz({ x: xi, y: room.size.y, z: 0 }),
              z: 0,
            },
            expires: null,
            stoodOnBy: emptySet,
            disappear: null,
          },
          aabb: xAxisWallAabb,
          renderAabb: xAxisWallRenderAabb,
        },
      };
    }

    // hidden wall - gaps with door are implicit
    const hasDoorInHiddenWall =
      Object.values(room.items).find(
        (i) =>
          i.type === "door" &&
          doorAlongAxis(i.config.direction) === "x" &&
          (i.position.x === xi || i.position.x + 1 === xi) &&
          i.position.y === 0,
      ) !== undefined;

    if (!hasDoorInHiddenWall) {
      yield {
        ...defaultItemProperties,
        ...{
          type: "wall",
          id: `wall-towards-${xi}`,
          config: { side: "towards", style: "none" },
          shadowCastTexture: {
            texture: "shadow.wall.y",
            flipX: true,
          },
          state: {
            position: blockXyzToFineXyz({
              x: xi,
              y: -wallThicknessBlocks,
              z: 0,
            }),
            expires: null,
            stoodOnBy: emptySet,
            disappear: null,
          },
          aabb: xAxisWallAabb,
          // invisible walls are never rendered so give no renderAabb
          renders: false,
        },
      };
    }
  }
}
