import { produce } from "immer";
import { type Xyz } from "../../../utils/vectors/vectors";
import type {
  EditorJsonItemWithTimes,
  EditorRoomItemId,
  EditorRoomState,
} from "../../editorTypes";
import { collideableItemsInRoom } from "./collideableItemsInRoom";
import { loadItemFromJson } from "../../../game/gameState/loadRoom/loadItemFromJson";
import { collision1toManyIter } from "../../../game/collision/aabbCollision";
import { isEmpty } from "iter-tools";
import { iterate } from "../../../utils/iterate";

export const itemChangeCausesCollision = ({
  roomState,
  jsonItemId,
  newPosition,
  newTimes,
}: {
  roomState: EditorRoomState;
  jsonItemId: EditorRoomItemId;
  newPosition: Xyz;
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
        // TODO: change from assigning times to something else for visible walls
        // (and also in reducer for changing item pos/size)
        (draftItemJson as EditorJsonItemWithTimes).config.times = newTimes;
      }
      draftItemJson.position = newPosition;
    }),
    roomState.roomJson,
  );

  return modifiedItems.some((loadedItem) => {
    const collisions = collision1toManyIter(loadedItem, collideableItems);

    return !isEmpty(collisions);
  });
};
