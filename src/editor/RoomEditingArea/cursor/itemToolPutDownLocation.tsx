import { isEmpty } from "iter-tools";
import { collision1toManyIter } from "../../../game/collision/aabbCollision";
import type {
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomState,
  EditorUnionOfAllItemInPlayTypes,
} from "../../EditorRoomId";
import type { PointingAtItem } from "./PointingAt";
import type { ItemTool } from "../../Tool";
import { loadItemFromJson } from "../../../game/gameState/loadRoom/loadItemFromJson";
import { fineXyzToBlockXyz } from "../../../game/render/projections";
import type {
  JsonItemConfig,
  JsonItemType,
  JsonItemUnion,
} from "../../../model/json/JsonItem";
import type { Xy } from "../../../utils/vectors/vectors";
import {
  addXyz,
  directionAxis,
  perpendicularAxisXy,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  doorOverallWidthPx,
  doorPostHeightPx,
} from "../../../game/gameState/loadRoom/loadDoor";
import {
  completeTimesXy,
  wallTimes,
} from "../../../game/collision/boundingBoxTimes";
import { findCollideableItemsInRoom } from "./findCollideableItemsInRoom";

let cursorItemCount = 0;

export const itemToolPutDownLocation = (
  pointingAt: PointingAtItem,
  roomState: EditorRoomState,
  itemTool: ItemTool,
): Xyz | undefined => {
  const {
    world: {
      face: pointingAtFace,
      position: pointingAtPosition,
      itemId: pointingAtItemId,
    },
  } = pointingAt;

  if (pointingAtFace === "up") {
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

  const normalToSurface = unitVectors[pointingAtFace];

  return addXyz(fineXyzToBlockXyz(pointingAtPosition), normalToSurface);
};

/**
 * if we're using an item tool, load the items(s) where we would put them down, for preview.
 *
 * Can also be used to validate - if returns undefined, the putdown can't happen
 *
 * @returns the location, or undefined if this putdown is invalid
 */
export const previewItemsForCursor = <T extends JsonItemType>(
  pointingAt: PointingAtItem,
  roomState: EditorRoomState,
  itemTool: ItemTool<T>,
): EditorUnionOfAllItemInPlayTypes[] | undefined => {
  const loadItems = <T2 extends JsonItemType>(
    type: T2,
    config: JsonItemConfig<T2, EditorRoomId, EditorRoomItemId>,
    position: Xyz,
  ) => {
    const loadedItems = loadItemFromJson(
      `cursor/${cursorItemCount++}`,
      {
        type,
        config,
        position,
      } as JsonItemUnion<string, string>,
      roomState.roomJson,
    ).toArray() as EditorUnionOfAllItemInPlayTypes[];

    loadedItems.forEach((item) => {
      item.isCursorPreview = true;
    });

    return loadedItems;
  };

  const jsonBlockPosition = itemToolPutDownLocation(
    pointingAt,
    roomState,
    itemTool,
  );

  if (jsonBlockPosition === undefined) {
    return undefined; // can't put down here
  }

  if (itemTool.type === "door") {
    const pointingAtItem = roomState.items[pointingAt.world.itemId];

    if (pointingAtItem.type !== "wall") {
      return undefined;
    }

    const wallDirection = pointingAtItem.config.direction;

    const loadedItems = loadItems<"door">(
      "door",
      {
        ...(itemTool.config as JsonItemConfig<
          "door",
          EditorRoomId,
          EditorRoomItemId
        >),
        direction: wallDirection,
      },
      jsonBlockPosition,
    );

    // doors are a special case since they can only be added on walls:
    return loadedItems;
  }

  const loadedItems = loadItems(
    itemTool.type,
    itemTool.config,
    jsonBlockPosition,
  );

  const collideableItems = Array.from(findCollideableItemsInRoom(roomState));

  const hasCollisions = loadedItems.some((loadedItem) => {
    const collisions = collision1toManyIter(loadedItem, collideableItems);

    return !isEmpty(collisions);
  });
  return hasCollisions ? undefined : loadedItems;
};
