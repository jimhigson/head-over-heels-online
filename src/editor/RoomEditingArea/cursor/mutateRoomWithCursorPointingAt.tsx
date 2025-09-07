import { produce } from "immer";
import { isEmpty } from "iter-tools-es";

import type { EditorRoomItemId } from "../../editorTypes";

import { collisionItemWithIndex } from "../../../game/collision/aabbCollision";
import { updateItemPosition } from "../../../game/gameState/mutators/updateItemPosition";
import {
  iterateRoomItems,
  roomSpatialIndexKey,
} from "../../../model/RoomState";
import { addXyz, type Xyz } from "../../../utils/vectors/vectors";
import { type EditorRoomState } from "../../editorTypes";

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
  const hasCollisions = itemsToDrag.some((itemToDrag) => {
    // temporary copy item at a new position
    // NOTE: this temp copy doesn't actually have to be *in* the spatial index itself to check it's
    // cuboid *collides* with whatever is in the index
    const itemCopyAtNewLocation = produce(itemToDrag, (draftItem) => {
      draftItem.state.position = addXyz(
        itemToDrag.state.position,
        positionDelta,
      );
    });
    // item won't collide with the unmodified version of itself because they have the same id:
    const collisions = collisionItemWithIndex(
      itemCopyAtNewLocation,
      roomState[roomSpatialIndexKey],
    );

    return !isEmpty(collisions);
  });

  if (!hasCollisions) {
    for (const itemToDrag of itemsToDrag) {
      updateItemPosition(
        roomState,
        itemToDrag,
        addXyz(itemToDrag.state.position, positionDelta),
      );
    }
  }
};
