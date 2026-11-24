import type { XyzBox } from "../../../../../utils/vectors/vectors";
import type { LoadedItem } from "./LoadedItem";

/**
 * the part of an item's box that counts for overlapping: a wall's loaded box
 * reaches far above the room (so nothing can be jumped over it), but only the
 * wall within the room is really there
 */
export const overlapBox = (
  item: LoadedItem,
  roomTopZ: number,
): Readonly<XyzBox> =>
  item.type === "wall" ?
    {
      ...item.state.box,
      zd: Math.min(item.state.box.zd, roomTopZ - item.state.box.z),
    }
  : item.state.box;
