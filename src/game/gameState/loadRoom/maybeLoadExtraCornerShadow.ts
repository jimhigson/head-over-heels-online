import { type ItemInPlay } from "../../../model/ItemInPlay";
import { type JsonItem } from "../../../model/json/JsonItem";
import { emptyObject } from "../../../utils/empty";
import { valuesIter } from "../../../utils/entries";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  addXyz,
  type DirectionXy4,
  doorAlongAxis,
  rotateDirectionXy4ByCameraAngle,
  tangentAxis,
  type Xy,
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

/**
 * loads the purely decorative shadow-caster at the camera-near corner of the
 * room, for rooms that have (hidden) walls on both of their near sides. Which
 * world corner is near depends on the camera angle, so this is re-derived when
 * the room structure reloads for a new angle.
 */
export function* maybeLoadExtraCornerShadow<
  RoomId extends string,
  RoomItemId extends string,
>(
  directionalIndex: RoomDirectionalIndex<RoomId, RoomItemId>,
  cameraAngle: Xy,
): Generator<ItemInPlay<"blocker", RoomId, RoomItemId>> {
  const { walls: wallLocations, doors: doorLocations } = directionalIndex;

  // the world directions that render as the two near (hidden) sides under
  // this camera - rotating the rendered direction by the inverse angle:
  const inverseAngle: Xy = { x: cameraAngle.x, y: -cameraAngle.y };
  const nearDirections = [
    rotateDirectionXy4ByCameraAngle("towards", inverseAngle),
    rotateDirectionXy4ByCameraAngle("right", inverseAngle),
  ] as const;
  // of the two near directions, one bounds the room on each world axis:
  const [xNearDirection, yNearDirection] =
    tangentAxis(nearDirections[0]) === "x" ? nearDirections : (
      [nearDirections[1], nearDirections[0]]
    );

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

  for (const xNearWall of wallsOfDirection(xNearDirection).toArray()) {
    for (const yNearWall of wallsOfDirection(yNearDirection)) {
      // each near wall gives the corner's ordinate on its own tangent axis:
      const corner: Xy = { x: xNearWall.position.x, y: yNearWall.position.y };

      if (
        // the x-tangent wall runs along y, so meets the corner at corner.y:
        !touchesCornerAndEndsWithDoor(xNearWall, corner.y) ||
        !touchesCornerAndEndsWithDoor(yNearWall, corner.x)
      ) {
        continue;
      }

      // the cube pokes diagonally out of the room at the corner: on each
      // axis, out of the room is the near direction's outward normal:
      const cornerCube: ItemInPlay<"blocker", RoomId, RoomItemId> = {
        id: `extraCornerShadow-${corner.x},${corner.y}` as RoomItemId,
        type: "blocker",
        // never animates, so the hash (only used to de-synchronise animations) is irrelevant:
        hash: 0,
        state: {
          ...defaultBaseState<RoomItemId>(),
          position: blockXyzToFineXyz({
            x:
              corner.x +
              (unitVectors[xNearDirection].x > 0 ? 0 : -cubeSetbackBlocks),
            y:
              corner.y +
              (unitVectors[yNearDirection].y > 0 ? 0 : -cubeSetbackBlocks),
            z: 0,
          }),
        },
        shadowCastTexture: {
          textureId: "shadow.wallCorner",
        },
        castsShadowWhileStoodOn: true,
        config: emptyObject,
        aabb: cubeSize,
        fixedZIndex: nonRenderingItemFixedZIndex,
      };

      yield cornerCube;
    }
  }
}
