import { isEmpty } from "iter-tools";
import { collision1toManyIter } from "../../../game/collision/aabbCollision";
import { isSolid } from "../../../game/physics/itemPredicates";
import { iterateRoomItems } from "../../../model/RoomState";
import type {
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomState,
  EditorUnionOfAllItemInPlayTypes,
} from "../../EditorRoomId";
import type { PointingAt } from "./PointingAt";
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

let cursorItemCount = 0;

export const itemToolPutDownLocation = (
  pointingAt: PointingAt,
  roomState: EditorRoomState,
  itemTool: ItemTool,
): Xyz | undefined => {
  if (pointingAt.face === "up") {
    // on top is the simple case - putdown will be at the location
    return fineXyzToBlockXyz(pointingAt.position);
  }

  if (
    // for doors in walls, we consider a single case, since doors
    // are placed inside the wall, not projected in front of it like
    // other items would be:
    itemTool.type === "door"
  ) {
    const pointingAtItem = roomState.items[pointingAt.itemId];
    if (pointingAtItem.type !== "wall") {
      return undefined;
    }
    const {
      config: wallConfig,
      aabb: wallAabb,
      state: { position: wallPosition },
    } = pointingAtItem;

    const currentWallTimes: Xy = { x: 1, y: 1, ...wallConfig.times };

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
        Math.min(pointingAt.position[alongWallAxis], alongMax),
        alongMin,
      ),
      [doorDirectionAxis]: pointingAt.position[doorDirectionAxis],
      z: Math.max(Math.min(pointingAt.position.z, zMax), zMin),
    } as Xyz;

    return fineXyzToBlockXyz(clampedPosition);
  }

  const normalToSurface = unitVectors[pointingAt.face];

  return addXyz(fineXyzToBlockXyz(pointingAt.position), normalToSurface);
};

/**
 * if we're using an item tool, load the items(s) where we would put them down, for preview.
 *
 * Can also be used to validate - if returns undefined, the putdown can't happen
 *
 * @returns the location, or undefined if this putdown is invalid
 */
export const previewItemsForCursor = <T extends JsonItemType>(
  pointingAt: PointingAt,
  roomState: EditorRoomState,
  itemTool: ItemTool<T>,
): EditorUnionOfAllItemInPlayTypes[] | undefined => {
  const collideableItemsInRoom = [
    ...iterateRoomItems(roomState.items).filter(
      (item) => isSolid(item) && !item.isCursorPreview,
    ),
  ];

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
    const pointingAtItem = roomState.items[pointingAt.itemId];

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

  const hasCollisions = loadedItems.some((loadedItem) => {
    const collisions = collision1toManyIter(loadedItem, collideableItemsInRoom);

    return !isEmpty(collisions);
  });
  return hasCollisions ? undefined : loadedItems;
};
