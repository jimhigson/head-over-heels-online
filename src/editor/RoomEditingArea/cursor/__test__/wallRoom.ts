import { roomItemsIterable } from "../../../../model/RoomState";
import {
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
  type EditorRoomState,
  type EditorUnionOfAllItemInPlayTypes,
} from "../../../editorTypes";
import { loadEditorRoom } from "../../../slice/loadEditorRoom";

export const wallJsonItemId = "wall1" as EditorRoomItemId;

/**
 * the camera angles at which the fixture room's wall is one of the two hidden
 * (camera-facing, undrawn) walls, and at which it is drawn
 */
export const wallHiddenAtCameraAngle = { x: 1, y: 0 };
export const wallDrawnAtCameraAngle = { x: -1, y: 0 };

/**
 * load a room containing a single wall on the room's "right" side, through the
 * editor's own room-loading path. Walls are physically unbounded upwards (so
 * that nothing can be placed outside the room over the top of them), which is
 * what makes them interesting to hit-testing
 */
export const wallRoom = (): {
  room: EditorRoomState;
  wall: EditorUnionOfAllItemInPlayTypes;
} => {
  const roomJson = {
    id: "testRoom" as EditorRoomId,
    planet: "blacktooth",
    color: {
      hue: "cyan",
      shade: "dimmed",
    },
    items: {
      [wallJsonItemId]: {
        type: "wall",
        position: { x: 0, y: 0, z: 0 },
        config: {
          direction: "right",
          tiles: ["plain", "plain", "plain", "plain"],
        },
      },
    },
  } as EditorRoomJson;

  const room = loadEditorRoom(roomJson);
  const wall = roomItemsIterable(room.items).find((i) => i.type === "wall");
  if (wall === undefined) {
    throw new Error("fixture room has no wall");
  }
  return { room, wall };
};
