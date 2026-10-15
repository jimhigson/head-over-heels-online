import { subRoomById } from "../../model/RoomJson";
import { type Xy } from "../../utils/vectors/vectors";
import { type EditorRoomJson } from "../editorTypes";
import {
  roomFloorMaxX,
  roomFloorMaxY,
  roomFloorMinX,
  roomFloorMinY,
} from "./roomJsonSelectors";

export type WallBounds = { from: Xy; to: Xy };

// a room with no floor has no floor extent; measure it from the origin
const finiteOrZero = (n: number) => (Number.isFinite(n) ? n : 0);

/** where a (sub-)room's walls are: the sub-room's extent, or the whole floor's */
export const roomWallBounds = (
  room: EditorRoomJson,
  subRoomId: string,
): WallBounds => {
  const subRoom = subRoomById(room, subRoomId);
  return subRoom ?
      subRoom.physicalPosition
    : {
        from: {
          x: finiteOrZero(roomFloorMinX(room)),
          y: finiteOrZero(roomFloorMinY(room)),
        },
        to: { x: roomFloorMaxX(room), y: roomFloorMaxY(room) },
      };
};
