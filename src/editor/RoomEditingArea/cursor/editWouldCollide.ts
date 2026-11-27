import { produce } from "immer";

import {
  collision1toManyIter,
  hasCollisionItemWithIndex,
} from "../../../game/collision/aabbCollision";
import { buildRoomJsonDirectionalIndex } from "../../../game/gameState/loadRoom/buildRoomJsonDirectionalIndex";
import { loadItemFromJson } from "../../../game/gameState/loadRoom/loadItemFromJson";
import { itemBehaviourKey } from "../../../model/itemInPlay/ItemInPlay";
import type { JsonItemType } from "../../../model/json/JsonItem";
import { roomItemsIterable } from "../../../model/roomItemsInPlayIterators";
import { roomJsonItemsIterable } from "../../../model/RoomJsonItemIterators";
import { roomSpatialIndexKey } from "../../../model/RoomState";
import { noPlanetsLiberated } from "../../../store/slices/gameInPlay/gameInPlaySlice";
import { fromEntries, objectEntriesIter } from "../../../utils/entries";
import { isEmpty } from "../../../utils/iterators/isEmpty";
import { addXyz, type Xyz } from "../../../utils/vectors/vectors";
import type {
  EditorJsonItemUnion,
  EditorJsonItemWithTimes,
  EditorRoomItemId,
  EditorRoomJson,
  EditorRoomState,
  EditorUnionOfAllItemInPlayTypes,
} from "../../editorTypes";
import { addTimesDeltaToJsonItemInPlace } from "../../slice/reducers/moveOrResizeItemPreview/moveOrResizeOutcome";
import type { ItemTool } from "../interactivity/Tool";

/**
 * find items that items being (added to/moved in/resized in) a room would
 * need to care about colliding with, when they are added/moved
 */
const collideableItemsInRoom = (
  roomState: EditorRoomState,
): IterableIterator<EditorUnionOfAllItemInPlayTypes> => {
  return roomItemsIterable(roomState.items).filter(
    (item) => !item[itemBehaviourKey].isNonSolid(item),
  );
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
 * how one item is moved and/or resized
 */
export type ItemMoveOrResize = {
  blockPositionDelta: Xyz;
  timesDelta?: Xyz;
};

/**
 * items' moves/resizes, each by its own json item id
 */
export type ItemMovesOrResizes = Partial<
  Record<EditorRoomItemId, ItemMoveOrResize>
>;

/**
 * the same move/resize for every one of the items
 */
export const sameMoveOrResizeForEach = (
  jsonItemIds: EditorRoomItemId[],
  moveOrResize: ItemMoveOrResize,
): ItemMovesOrResizes =>
  fromEntries(jsonItemIds.map((jsonItemId) => [jsonItemId, moveOrResize]));

/**
 * return true/false depending on if moving or resizing items would cause a
 * collision - the items are all moved together, so each is checked against
 * the others where they are moved to
 */
export const itemMoveOrResizeWouldCollide = ({
  roomState,
  roomJson,
  movesOrResizes,
}: {
  roomState: EditorRoomState;
  /**
   * the room's json with the items where they are now, previews included -
   * which the loaded room's own json needn't be
   */
  roomJson: EditorRoomJson;
  movesOrResizes: ItemMovesOrResizes;
}) => {
  const directionalIndex = buildRoomJsonDirectionalIndex(
    roomJsonItemsIterable(roomJson),
  );

  const loadedModifiedItemTuples = objectEntriesIter(movesOrResizes)
    // modify the json items to their new position/size:
    .map(
      ([jsonItemId, { blockPositionDelta, timesDelta }]) =>
        [
          jsonItemId,
          produce(roomJson.items[jsonItemId], (draftItemJson) => {
            draftItemJson.position = addXyz(
              draftItemJson.position,
              blockPositionDelta,
            );
            addTimesDeltaToJsonItemInPlace(
              draftItemJson as EditorJsonItemWithTimes,
              timesDelta,
            );
          }),
        ] as const,
    )
    // load the json items to in-play items (could be multiple per json item)
    .flatMap(function* ([jsonItemId, modifiedJsonItem]) {
      for (const loadedItem of loadItemFromJson(
        jsonItemId,
        modifiedJsonItem,
        roomJson,
        noPlanetsLiberated,
        directionalIndex,
      )) {
        yield [jsonItemId, modifiedJsonItem, loadedItem] as const;
      }
    })
    // ignore any non-solid items we just loaded:
    .filter(
      ([, , loadedItem]) =>
        !loadedItem[itemBehaviourKey].isNonSolid(loadedItem),
    )
    .toArray();

  return loadedModifiedItemTuples.some(([, modifiedJsonItem, loadedItem]) => {
    // check for collisions with items that were already in the room:
    const collideableItemsAlreadyInRoom = collideableForItem(
      roomState,
      modifiedJsonItem.type,
    ).filter(
      // do not colliding with the items we are currently moving - that will come next
      (item) =>
        item.jsonItemId && movesOrResizes[item.jsonItemId] === undefined,
    );

    if (
      !isEmpty(collision1toManyIter(loadedItem, collideableItemsAlreadyInRoom))
    ) {
      return true;
    }

    // check for collisions with other items we just loaded
    for (const c of collision1toManyIter(
      loadedItem,
      loadedModifiedItemTuples.map(([, , otherLoaded]) => otherLoaded),
    )) {
      // allow a json item to collide with other partsof itself in the case of it making multiple in-play items
      // (eg, a door with overlapping frame parts for the sake of keeping the rendering on even numbers so y doesn't
      // end up on a half-pixel)
      if (c.jsonItemId !== loadedItem.jsonItemId) {
        return true;
      }
    }

    // we also need to check for collisions with the other items being moved/resized.
    // for moving, this generally won't be an issue, since they'll all move by the same amount,
    // but resizing could make them overlap each other.

    return false;
  });
};

/**
 * a check of whether adding the tool's item to the room would collide, at a
 * given position - the room's side of the check is worked out once, so
 * checking many positions (eg searching for one that fits) costs only the
 * item's side each time
 */
export const addingItemCollisionCheck = ({
  roomState,
  itemTool,
  previewOnlyJsonItemIds,
}: {
  roomState: EditorRoomState;
  itemTool: ItemTool;
  /**
   * items in the room only because a previous position of this same tool is
   * being previewed - the item being added can't collide with its own preview
   */
  previewOnlyJsonItemIds: ReadonlySet<EditorRoomItemId>;
}): ((blockPosition: Xyz) => boolean) => {
  const directionalIndex = buildRoomJsonDirectionalIndex(
    roomJsonItemsIterable(roomState.roomJson),
  );
  const spatialIndex = roomState[roomSpatialIndexKey];
  const isCollideableForThisTool = (item: EditorUnionOfAllItemInPlayTypes) =>
    !item[itemBehaviourKey].isNonSolid(item) &&
    // doors can collide with walls, and that's ok since they cut into the wall:
    !(itemTool.type === "door" && item.type === "wall") &&
    (item.jsonItemId === undefined ||
      !previewOnlyJsonItemIds.has(item.jsonItemId));

  return (blockPosition) =>
    // load the item from JSON, at the position:
    loadItemFromJson(
      "maybeAddedItem" as EditorRoomItemId,
      {
        ...itemTool,
        position: blockPosition,
      } as EditorJsonItemUnion,
      roomState.roomJson,
      noPlanetsLiberated,
      directionalIndex,
    )
      // our new item may have some non-solid items, which are fine to collide (eg, stopAutowalk doors)
      .filter((i) => !i[itemBehaviourKey].isNonSolid(i))
      .some((loadedItem) =>
        hasCollisionItemWithIndex(
          loadedItem,
          spatialIndex,
          isCollideableForThisTool,
        ),
      );
};
