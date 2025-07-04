import { isEmpty } from "iter-tools";
import { collision1toManyIter } from "../../../game/collision/aabbCollision";
import { addItemToRoom } from "../../../game/gameState/mutators/addItemToRoom";
import { iterateRoomItems } from "../../../model/RoomState";
import { addXyz, type Xyz } from "../../../utils/vectors/vectors";
import type {
  EditorRoomItemId,
  EditorUnionOfAllItemInPlayTypes,
} from "../../EditorRoomId";
import { type EditorRoomState } from "../../EditorRoomId";
import { findCollideableItemsInRoom } from "./findCollideableItemsInRoom";
import { produce } from "immer";

/**
 * mutate the given room in-place
 */
export const mutateRoomAddCursorPreviews = (
  room: EditorRoomState,
  previewItems: Iterable<EditorUnionOfAllItemInPlayTypes>,
) => {
  for (const item of previewItems) {
    addItemToRoom({ room, item });
  }
};

export const mutateRoomRemoveCursorPreviews = (room: EditorRoomState) => {
  for (const item of iterateRoomItems(room.items)) {
    if (item.isCursorPreview) {
      delete room.items[item.id];
    }
  }
};

/**
 * mutate the room state to move the item with the given jsonItemId
 * by the given drag vector.
 *
 * This will not mutate the room if there are collisions
 * with other items in the room.
 *
 * @returns true if the room was mutated, false otherwise
 */
export const mutateRoomForDrag = (
  roomState: EditorRoomState,
  jsonItemId: EditorRoomItemId,
  /**
   * how far the user has dragged the item
   */
  positionDelta: Xyz,
): boolean => {
  const itemsToDrag = Array.from(
    iterateRoomItems(roomState.items).filter(
      (item) => item.jsonItemId === jsonItemId,
    ),
  );

  // check for collisions:
  const collideableItems = Array.from(findCollideableItemsInRoom(roomState));

  const hasCollisions = itemsToDrag.some((itemToDrag) => {
    const itemCopyAtNewLocation = produce(itemToDrag, (draft) => {
      draft.state.position = addXyz(itemToDrag.state.position, positionDelta);
    });
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
  return !hasCollisions;
};
