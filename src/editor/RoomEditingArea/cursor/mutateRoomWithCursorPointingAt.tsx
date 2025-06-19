import { fullBlockAabb } from "../../../game/collision/boundingBoxes";
import { defaultBaseState } from "../../../game/gameState/loadRoom/itemDefaultStates";
import { addItemToRoom } from "../../../game/gameState/mutators/addItemToRoom";
import { getRoomItem, iterateRoomItems } from "../../../model/RoomState";
import type { EditorUnionOfAllItemInPlayTypes } from "../../EditorRoomId";
import { type EditorRoomState, cursorId } from "../../EditorRoomId";
import type { PointingAt } from "./PointingAt";

type MutateRoomAddCursorItems = {
  room: EditorRoomState;
  pointingAt: PointingAt;
  valid: boolean;
  includeCursor: boolean;
  previewItems: Iterable<EditorUnionOfAllItemInPlayTypes>;
};

/**
 * mutate the given room in-place
 */
export const mutateRoomAddCursorItems = ({
  room,
  pointingAt,
  valid,
  includeCursor,
  previewItems,
}: MutateRoomAddCursorItems) => {
  const { face, position } = pointingAt;

  for (const item of previewItems) {
    addItemToRoom({ room, item });
  }

  if (includeCursor) {
    const existingCursor = getRoomItem(cursorId, room.items);
    if (existingCursor) {
      // replace values on cursor in-place so renderers keep the reference to the
      // right item
      existingCursor.state.position = position;
      existingCursor.state.face = face;
      existingCursor.state.valid = valid;
    } else {
      room.items[cursorId] = {
        type: "cursor",
        id: cursorId,
        state: {
          ...defaultBaseState(),
          face,
          position,
          valid,
        },
        config: {},
        aabb: fullBlockAabb,
      };
    }
  } else {
    delete room.items[cursorId];
  }
};

export const mutateRoomRemoveCursorPreviews = (room: EditorRoomState) => {
  for (const item of iterateRoomItems(room.items)) {
    if (item.isCursorPreview) {
      delete room.items[item.id];
    }
  }
};
