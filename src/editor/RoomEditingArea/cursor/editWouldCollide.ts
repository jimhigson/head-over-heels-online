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
  // check for collisions:
  const collideableItems = iterate(collideableItemsInRoom(roomState)).filter(
    // not colliding with itself:
    (item) => item.id !== jsonItemId,
  );

  // load the modified version of the item from JSON:
  const modifiedItems = loadItemFromJson(
    "testItem" as EditorRoomItemId,
    produce(roomState.roomJson.items[jsonItemId], (draftItemJson) => {
      if (newTimes) {
        (draftItemJson as EditorJsonItemWithTimes).config.times = newTimes;
      }
      draftItemJson.position = newBlockPosition;
    }),
    roomState.roomJson,
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
  // check for collisions:
  const collideableItems = iterate(collideableItemsInRoom(roomState));

  const collideableItemsForThisTool =
    itemTool.type === "door" ?
      collideableItems.filter((item) => item.type !== "wall")
    : collideableItems;

  // load the modified version of the item from JSON:
  const newItems = loadItemFromJson(
    "maybeAddedItem" as EditorRoomItemId,
    {
      ...itemTool,
      position: blockPosition,
    } as EditorJsonItemUnion,
    roomState.roomJson,
  );

  return newItems.some((loadedItem) => {
    const collisions = collision1toManyIter(
      loadedItem,
      collideableItemsForThisTool,
    );

    return !isEmpty(collisions);
  });
};
