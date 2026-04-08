import { produce } from "immer";

import type { JsonItemType } from "../../../model/json/JsonItem";
import type {
  EditorJsonItemUnion,
  EditorJsonItemWithTimes,
  EditorRoomItemId,
  EditorRoomState,
  EditorUnionOfAllItemInPlayTypes,
} from "../../editorTypes";
import type { ItemTool } from "../interactivity/Tool";

import { collision1toManyIter } from "../../../game/collision/aabbCollision";
import { loadItemFromJson } from "../../../game/gameState/loadRoom/loadItemFromJson";
import { isSolid } from "../../../game/physics/itemPredicates";
import { roomItemsIterable } from "../../../model/RoomState";
import { isEmpty } from "../../../utils/iterators/isEmpty";
import { addXyz, type Xyz } from "../../../utils/vectors/vectors";
import { addTimesDeltaToJsonItemInPlace } from "../../slice/reducers/moveOrResizeItemPreview/moveOrResizeItemPreviewReducers";

/**
 * find items that items being (added to/moved in/resized in) a room would
 * need to care about colliding with, when they are added/moved
 */
export const collideableItemsInRoom = (
  roomState: EditorRoomState,
): IterableIterator<EditorUnionOfAllItemInPlayTypes> => {
  return roomItemsIterable(roomState.items).filter((item) => isSolid(item));
};

const collideableForItem = (
  roomState: EditorRoomState,
  forItemType: JsonItemType,
) => {
  const collideableItems = collideableItemsInRoom(roomState);

  const collideableItemsForThisItem =
    forItemType === "door" ?
      // doors can collide with walls, and that's ok since they cut into the wall:
      collideableItems.filter((item) => item.type !== "wall")
    : collideableItems;
  return collideableItemsForThisItem;
};

/**
 * return true/false depending on if moving or resizing would cause a collision
 */
export const itemMoveOrResizeWouldCollide = ({
  roomState,
  jsonItemIds,
  blockPositionDelta,
  timesDelta,
}: {
  roomState: EditorRoomState;
  jsonItemIds: EditorRoomItemId[];
  blockPositionDelta: Xyz;
  timesDelta?: Xyz;
}) => {
  const loadedModifiedItemTuples = Iterator.from(jsonItemIds)
    // get the json items from the room json:
    .map(
      (jsonItemId) =>
        [jsonItemId, roomState.roomJson.items[jsonItemId]] as [
          EditorRoomItemId,
          EditorJsonItemUnion,
        ],
    )
    // modify the json items to their new position/size:
    .map(
      ([jsonItemId, jsonItem]) =>
        [
          jsonItemId,
          produce(jsonItem, (draftItemJson) => {
            draftItemJson.position = addXyz(
              draftItemJson.position,
              blockPositionDelta,
            );
            addTimesDeltaToJsonItemInPlace(
              draftItemJson as EditorJsonItemWithTimes,
              timesDelta,
            );
          }),
        ] as [EditorRoomItemId, EditorJsonItemUnion],
    )
    // load the json items to in-play items (could be multiple per json item)
    .flatMap(function* ([jsonItemId, modifiedJsonItem]) {
      for (const loadedItem of loadItemFromJson(
        jsonItemId,
        modifiedJsonItem,
        roomState.roomJson,
      )) {
        yield [jsonItemId, modifiedJsonItem, loadedItem] as [
          EditorRoomItemId,
          EditorJsonItemUnion,
          EditorUnionOfAllItemInPlayTypes,
        ];
      }
    })
    // ignore any non-solid items we just loaded:
    .filter(([, , loadedItem]) => isSolid(loadedItem))
    .toArray();

  return loadedModifiedItemTuples.some(([, modifiedJsonItem, loadedItem]) => {
    // check for collisions with items that were already in the room:
    const collideableItemsAlreadyInRoom = collideableForItem(
      roomState,
      modifiedJsonItem.type,
    ).filter(
      // do not colliding with the items we are currently moving - that will come next
      (item) => item.jsonItemId && !jsonItemIds.includes(item.jsonItemId),
    );

    for (const c of collision1toManyIter(
      loadedItem,
      collideableItemsAlreadyInRoom,
    )) {
      console.warn(
        loadedItem.id,
        "colliding with static item",
        c.id,
        "after moving by",
        blockPositionDelta,
        timesDelta ? "with timesDelta" : "",
        timesDelta ?? "",
      );
      return true;
    }

    // check for collisions with other items we just loaded
    for (const c of collision1toManyIter(
      loadedItem,
      loadedModifiedItemTuples.map(([, , otherLoaded]) => otherLoaded),
    )) {
      console.warn(loadedItem.id, "colliding with other mutating item", c.id);
      return true;
    }

    // we also need to check for collisions with the other items being moved/resized.
    // for moving, this generally won't be an issue, since they'll all move by the same amount,
    // but resizing could make them overlap each other.

    return false;
  });
};

export const addingItemWouldCollide = ({
  roomState,
  blockPosition,
  itemTool,
}: {
  roomState: EditorRoomState;
  blockPosition: Xyz;
  itemTool: ItemTool;
}) => {
  // load the modified version of the item from JSON:
  const newItems = loadItemFromJson(
    "maybeAddedItem" as EditorRoomItemId,
    {
      ...itemTool,
      position: blockPosition,
    } as EditorJsonItemUnion,
    roomState.roomJson,
  )
    // our new item may have some non-solid items, which are fine to collide (eg, stopAutowalk doors)
    .filter((i) => isSolid(i));

  const collideableItemsForThisTool = Array.from(
    collideableForItem(roomState, itemTool.type),
  );

  return newItems.some((loadedItem) => {
    const collisions = collision1toManyIter(
      loadedItem,
      collideableItemsForThisTool,
    );

    return !isEmpty(collisions);
  });
};
