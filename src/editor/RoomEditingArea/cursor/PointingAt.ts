import type { Xyz } from "../../../utils/vectors/vectors";
import type { EditorRoomItemId } from "../../EditorRoomId";

export type IntersectionFace = "top" | "right" | "towards";

export type PointingAt = {
  itemId: EditorRoomItemId;
  face: IntersectionFace;
  /** the position of the cursor in the world (on the top face) */
  position: Xyz;
};
