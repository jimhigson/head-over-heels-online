import type { EditorRoomState } from "../../editorTypes";
import type { PointingAtItem } from "./PointingAt";
import type { ItemTool } from "../../Tool";
import { fineXyzToBlockXyz } from "../../../game/render/projections";

import type { Xy } from "../../../utils/vectors/vectors";
import {
  addXyz,
  directionAxis,
  perpendicularAxisXy,
  type Xyz,
} from "../../../utils/vectors/vectors";
import {
  doorOverallWidthPx,
  doorPostHeightPx,
} from "../../../game/gameState/loadRoom/loadDoor";
import {
  completeTimesXy,
  wallTimes,
} from "../../../game/collision/boundingBoxTimes";
import { epsilon } from "../../../utils/veryClose";

export const itemToolPutDownLocation = (
  pointingAt: PointingAtItem,
  roomState: EditorRoomState,
  itemTool: ItemTool,
): Xyz | undefined => {
  const {
    world: {
      onItem: { face: pointingAtFace },
      position: pointingAtPosition,
      itemId: pointingAtItemId,
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
    const pointingAtItem = roomState.items[pointingAtItemId];
    if (pointingAtItem.type !== "wall") {
      return undefined;
    }
    const {
      config: wallConfig,
      aabb: wallAabb,
      state: { position: wallPosition },
    } = pointingAtItem;

    const currentWallTimes: Xy = completeTimesXy(wallTimes(wallConfig));

    /** axis running along the wall the door sits on */
    const alongWallAxis = perpendicularAxisXy(
      directionAxis(wallConfig.direction),
    );
    /** axis for direction of travel through the doorway */
    const doorDirectionAxis = directionAxis(wallConfig.direction);

    if (currentWallTimes[alongWallAxis] < 2) {
      return undefined; // wall not big enough for a door
    }

    const alongMin = wallPosition[alongWallAxis];
    const alongMax =
      wallPosition[alongWallAxis] +
      wallAabb[alongWallAxis] -
      doorOverallWidthPx;

    const zMin = wallPosition.z;
    const zMax =
      // door can't go over the top of the wall:
      wallPosition.z + wallAabb.z - doorPostHeightPx;

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
