import { produce } from "immer";
import { type Xyz } from "../../../utils/vectors/vectors";
import type {
  EditorJsonItemUnion,
  EditorJsonItemWithTimes,
  EditorRoomItemId,
  EditorRoomState,
} from "../../editorTypes";
import { collideableItemsInRoom } from "./collideableItemsInRoom";
import { loadItemFromJson } from "../../../game/gameState/loadRoom/loadItemFromJson";
import { collision1toManyIter } from "../../../game/collision/aabbCollision";
import { isEmpty } from "iter-tools";
import { iterate } from "../../../utils/iterate";
import type { ItemTool } from "../../Tool";
import type { JsonItemType } from "../../../model/json/JsonItem";

const collideableForItem = (
  roomState: EditorRoomState,
  forItemType: JsonItemType,
) => {
  const collideableItems = iterate(collideableItemsInRoom(roomState));

  const collideableItemsForThisTool =
    forItemType === "door" ?
      // doors can collide with walls, and that's ok since they cut into the wall:
      collideableItems.filter((item) => item.type !== "wall")
    : collideableItems;
  return collideableItemsForThisTool;
};

export const itemMoveOrResizeWouldCollide = ({
  roomState,
  jsonItemId,
  newBlockPosition,
  newTimes,
}: {
  roomState: EditorRoomState;
  jsonItemId: EditorRoomItemId;
  newBlockPosition: Xyz;
  newTimes?: Xyz;
}) => {
  const itemToChange = roomState.roomJson.items[jsonItemId];

  // load the modified version of the item from JSON:
  const modifiedItems = loadItemFromJson(
    "testItem" as EditorRoomItemId,
    produce(itemToChange, (draftItemJson) => {
      if (newTimes) {
        (draftItemJson as EditorJsonItemWithTimes).config.times = newTimes;
      }
      draftItemJson.position = newBlockPosition;
    }),
    roomState.roomJson,
  );

  const collideableItems = iterate(
    collideableForItem(roomState, itemToChange.type),
  ).filter(
    // not colliding with itself:
    (item) => item.id !== jsonItemId,
  );

  return modifiedItems.some((loadedItem) => {
    const collisions = collision1toManyIter(loadedItem, collideableItems);

    return !isEmpty(collisions);
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
  );

  const collideableItemsForThisTool = collideableForItem(
    roomState,
    itemTool.type,
  );

  return newItems.some((loadedItem) => {
    const collisions = collision1toManyIter(
      loadedItem,
      collideableItemsForThisTool,
    );

    return !isEmpty(collisions);
  });
};
