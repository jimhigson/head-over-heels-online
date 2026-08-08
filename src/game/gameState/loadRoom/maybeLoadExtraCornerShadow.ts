import { type ItemInPlay } from "../../../model/ItemInPlay";
import { type JsonItem } from "../../../model/json/JsonItem";
import { emptyObject } from "../../../utils/empty";
import { valuesIter } from "../../../utils/entries";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  addXyz,
  boxWithSize,
  type DirectionXy4,
  doorAlongAxis,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { blockXyzToFineXyz } from "../../render/projections";
import { nonRenderingItemFixedZIndex } from "../../render/sortZ/fixedZIndexes";
import { type RoomDirectionalIndex } from "./buildRoomJsonDirectionalIndex";
import { defaultBaseState } from "./itemDefaultStates";

const cubeSetbackBlocks = 9 / 12;
const cubeSize: Xyz = blockXyzToFineXyz({
  x: cubeSetbackBlocks,
  y: cubeSetbackBlocks,
  z: 1,
});

/** the (x-bounding, y-bounding) wall direction pairs of the room's four corners */
const cornerDirectionPairs: ReadonlyArray<[DirectionXy4, DirectionXy4]> = [
  ["right", "towards"],
  ["right", "away"],
  ["left", "towards"],
  ["left", "away"],
];

/**
 * loads the purely decorative shadow-casters at the room's corners, for
 * corners that have walls on both sides ending in same-facing doors. Every
 * qualifying world corner gets an item; only the corner that is camera-near
 * (both its walls hidden) actually casts, gated per angle by its
 * hintShadowDirections
 */
export function* maybeLoadExtraCornerShadow<
  RoomId extends string,
  RoomItemId extends string,
>(
  directionalIndex: RoomDirectionalIndex<RoomId, RoomItemId>,
): Generator<ItemInPlay<"blocker", RoomId, RoomItemId>> {
  const { walls: wallLocations, doors: doorLocations } = directionalIndex;

  const wallsOfDirection = (direction: DirectionXy4) =>
    valuesIter(wallLocations)
      .map((wallsAtLocation) => wallsAtLocation[direction])
      .filter((wall) => wall !== undefined);

  /**
   * a wall bounds the corner only if it touches the corner at one of its
   * along-axis ends, and runs into a same-facing door at its other end
   */
  const touchesCornerAndEndsWithDoor = (
    wall: JsonItem<"wall", RoomId, RoomItemId>,
    /** the corner's ordinate on the wall's along axis */
    cornerOrd: number,
  ): boolean => {
    const { direction } = wall.config;
    const alongAxis = doorAlongAxis(direction);
    const wallLength = wall.config.tiles.length;

    const atMinEnd = wall.position[alongAxis] === cornerOrd;
    const atMaxEnd = wall.position[alongAxis] + wallLength === cornerOrd;
    if (!atMinEnd && !atMaxEnd) {
      return false;
    }

    const doorPosition = addXyz(wall.position, {
      // doors are two blocks wide, keyed by their min corner:
      [alongAxis]: atMinEnd ? wallLength : -2,
    });
    return (
      doorLocations[`${doorPosition.x},${doorPosition.y}`]?.[direction] !==
      undefined
    );
  };

  /**
   * whether any wall occupies the given block cell - in concave (multi-)
   * rooms, the cell diagonally out of an interior corner can be another
   * section's wall, and the cube must not be spawned inside it
   */
  const cellHasWall = (cellX: number, cellY: number): boolean =>
    valuesIter(wallLocations)
      .flatMap((wallsAtLocation) => valuesIter(wallsAtLocation))
      .some((wall) => {
        const alongAxis = doorAlongAxis(wall.config.direction);
        const { x, y } = wall.position;
        const wallLength = wall.config.tiles.length;
        return alongAxis === "y" ?
            cellX === x && cellY >= y && cellY < y + wallLength
          : cellY === y && cellX >= x && cellX < x + wallLength;
      });

  for (const [xDirection, yDirection] of cornerDirectionPairs) {
    for (const xWall of wallsOfDirection(xDirection).toArray()) {
      for (const yWall of wallsOfDirection(yDirection)) {
        // each wall gives the corner's ordinate on its own tangent axis:
        const corner = { x: xWall.position.x, y: yWall.position.y };

        if (
          // the x-tangent wall runs along y, so meets the corner at corner.y:
          !touchesCornerAndEndsWithDoor(xWall, corner.y) ||
          !touchesCornerAndEndsWithDoor(yWall, corner.x)
        ) {
          continue;
        }

        // the cell the cube would (partially) occupy, diagonally out of the
        // room at the corner:
        if (
          cellHasWall(
            unitVectors[xDirection].x > 0 ? corner.x : corner.x - 1,
            unitVectors[yDirection].y > 0 ? corner.y : corner.y - 1,
          )
        ) {
          continue;
        }

        // the cube pokes diagonally out of the room at the corner: on each
        // axis, out of the room is the bounding direction's outward normal:
        yield {
          id: `extraCornerShadow-${corner.x},${corner.y}` as RoomItemId,
          type: "blocker",
          // never animates, so the hash (only used to de-synchronise animations) is irrelevant:
          hash: 0,
          state: {
            ...defaultBaseState<RoomItemId>(),
            box: boxWithSize(
              blockXyzToFineXyz({
                x:
                  corner.x +
                  (unitVectors[xDirection].x > 0 ? 0 : -cubeSetbackBlocks),
                y:
                  corner.y +
                  (unitVectors[yDirection].y > 0 ? 0 : -cubeSetbackBlocks),
                z: 0,
              }),
              cubeSize,
            ),
          },
          shadowCastTexture: {
            textureId: "shadow.wallCorner",
          },
          castsShadowWhileStoodOn: false,
          // only casts when this corner is the camera-near one:
          hintShadowDirections: [
            unitVectors[xDirection],
            unitVectors[yDirection],
          ],
          config: emptyObject,
          fixedZIndex: nonRenderingItemFixedZIndex,
        };
      }
    }
  }
}
