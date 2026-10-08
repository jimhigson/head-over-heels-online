import {
  doorOverallWidthPx,
  doorPostHeightPx,
} from "../../../game/gameState/loadRoom/loadDoorConstants";
import { fineXyzToBlockXyz } from "../../../game/render/projections";
import { completeTimesXy, wallInPlayTimes } from "../../../model/times";
import { epsilon } from "../../../utils/epsilon";
import {
  addXyz,
  alongAxisOfDirectionXy,
  boxMaxOnAxis,
  dominantAxisXy,
  type Xy,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { type EditorUnionOfAllItemInPlayTypes } from "../../editorTypes";
import { type ItemTool } from "../interactivity/Tool";
import { type PointingAtItem } from "./PointingAt";

/**
 * where, in blocks, the item tool would put its item down, given what the
 * pointer is on:
 *
 * - on a top face: at the pointed-at position, sitting on the item
 * - a door on a wall: inside the wall, kept within its length and below its top
 * - any other side face: one block out from that face, so not inside the item
 *
 * undefined only when not possible to put the item down:
 *
 * - if the door tool, a location where a door can't go
 *   (not pointing at a wall, or the wall is too short)
 * - for other item tools, never returns undefined, since it doesn't check
 *   there is space for the item
 */
export const itemToolPutDownLocation = (
  /** where the pointer is, on which face of {@link pointingAtItem} */
  pointingAt: PointingAtItem,
  /** the in-play item {@link pointingAt} points at */
  pointingAtItem: EditorUnionOfAllItemInPlayTypes,
  /** the item the tool is placing */
  itemTool: ItemTool,
): undefined | Xyz => {
  const {
    world: {
      onItem: { face: pointingAtFace },
      position: pointingAtPosition,
    },
  } = pointingAt;

  if (pointingAtFace.z > epsilon) {
    // on top is the simple case - putdown will be at the location
    return fineXyzToBlockXyz(pointingAtPosition);
  }

  if (
    // for doors in walls, we consider a single case, since doors
    // are placed inside the wall, not projected in front of it like
    // other items would be:
    itemTool.type === "door"
  ) {
    if (pointingAtItem.type !== "wall") {
      return undefined;
    }
    const {
      config: wallConfig,
      state: { box: wallBox },
    } = pointingAtItem;

    const currentWallTimes: Xy = completeTimesXy(wallInPlayTimes(wallConfig));

    /** axis running along the wall the door sits on */
    const alongWallAxis = alongAxisOfDirectionXy(wallConfig.direction);
    /** axis for direction of travel through the doorway */
    const doorDirectionAxis = dominantAxisXy(wallConfig.direction);

    if (currentWallTimes[alongWallAxis] < 2) {
      return undefined; // wall not big enough for a door
    }

    const alongMin = wallBox[alongWallAxis];
    const alongMax = boxMaxOnAxis(wallBox, alongWallAxis) - doorOverallWidthPx;

    const zMin = wallBox.z;
    const zMax =
      // door can't go over the top of the wall:
      wallBox.z + wallBox.zd - doorPostHeightPx;

    const clampedPosition = {
      [alongWallAxis]: Math.max(
        Math.min(pointingAtPosition[alongWallAxis], alongMax),
        alongMin,
      ),
      [doorDirectionAxis]: pointingAtPosition[doorDirectionAxis],
      z: Math.max(Math.min(pointingAtPosition.z, zMax), zMin),
    } as Xyz;

    return fineXyzToBlockXyz(clampedPosition);
  }

  // for pointing at vertical surfaces, move the location out of the item being pointed at
  // by adding the normal of the face. Since the normal of the face points out of the item
  // being pointed at, this prevents putting down inside the item we are pointing at
  return addXyz(fineXyzToBlockXyz(pointingAtPosition), pointingAtFace);
};
