import {
  alongAxisOfDirectionXy,
  boxIntersection,
} from "../../../../../utils/vectors/vectors";
import { isAtWallEnd } from "./isAtWallEnd";
import type { LoadedItem } from "./LoadedItem";

/**
 * whether two walls meet as a room's inside corner: they run on different
 * axes, and the block where they overlap is at an end of both - unlike a
 * wall ending against the middle of another, or two crossing
 */
export const isInsideCorner = (a: LoadedItem, b: LoadedItem): boolean => {
  if (a.type !== "wall" || b.type !== "wall") {
    return false;
  }
  if (
    alongAxisOfDirectionXy(a.config.direction) ===
    alongAxisOfDirectionXy(b.config.direction)
  ) {
    return false;
  }
  const overlap = boxIntersection(a.state.box, b.state.box);
  return isAtWallEnd(a, overlap) && isAtWallEnd(b, overlap);
};
