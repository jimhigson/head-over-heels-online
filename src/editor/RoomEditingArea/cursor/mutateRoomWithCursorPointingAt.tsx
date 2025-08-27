import { produce } from "immer";
import { isEmpty } from "iter-tools";

import type { EditorRoomItemId } from "../../editorTypes";

import { collision1toManyIter } from "../../../game/collision/aabbCollision";
import { iterateRoomItems } from "../../../model/RoomState";
import { addXyz, type Xyz } from "../../../utils/vectors/vectors";
import { type EditorRoomState } from "../../editorTypes";
import { collideableItemsInRoom } from "./collideableItemsInRoom";

/**
 * mutate the room state to move the item with the given jsonItemId
 * by the given drag vector.
 *
 * This will not mutate the room if there are collisions
 * with other items in the room.
 */
export const mutateRoomMoveItemForDrag = (
  roomState: EditorRoomState,
  jsonItemId: EditorRoomItemId,
  /**
   * how far the user has dragged the item
   */
  positionDelta: Xyz,
) => {
  // could be multiple in-play items to move for a single json id - find them all:
  const itemsToDrag = Array.from(
    iterateRoomItems(roomState.items).filter(
      (item) => item.jsonItemId === jsonItemId,
    ),
  );

  // check for collisions:
  const collideableItems = Array.from(collideableItemsInRoom(roomState));

  const hasCollisions = itemsToDrag.some((itemToDrag) => {
    const itemCopyAtNewLocation = produce(itemToDrag, (draftItem) => {
      draftItem.state.position = addXyz(
        itemToDrag.state.position,
        positionDelta,
      );
    });
    // item won't collide with the unmodified version of itself because they have the same id:
    const collisions = collision1toManyIter(
      itemCopyAtNewLocation,
      collideableItems,
    );

    return !isEmpty(collisions);
  });

  if (!hasCollisions) {
    for (const itemToDrag of itemsToDrag) {
      itemToDrag.state.position = addXyz(
        itemToDrag.state.position,
        positionDelta,
      );
    }
  }
};
