import type { DirectionXyz4, Xyz } from "../../../utils/vectors/vectors";
import type { EditorRoomId, EditorRoomItemId } from "../../EditorRoomId";

export type PointingAt = {
  roomId: EditorRoomId;

  itemId: EditorRoomItemId;
  /**
   * which face of the item's aabb have we interpreted the pointer
   * to be pointed at? Usually one of the visible faces, but can
   * be a 'back' face in some cases, like placing a door on an
   * invisible wall
   */
  face: DirectionXyz4;
  /** the position of the cursor in the world (on the top face) */
  position: Xyz;
};
