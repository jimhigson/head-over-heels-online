import { collisionBoxes } from "../../../../../game/collision/aabbCollision";
import { itemBehaviourKey } from "../../../../itemInPlay/ItemInPlay";
import { isInsideCorner } from "./isInsideCorner";
import type { LoadedItem } from "./LoadedItem";
import { overlapBox } from "./overlapBox";

/**
 * whether two items, as loaded, are solid to each other and overlap - not
 * merely touching, not parts of the same json item, and not walls meeting at
 * an inside corner
 */
export const areOverlappingSolids = (
  a: LoadedItem,
  b: LoadedItem,
  roomTopZ: number,
): boolean =>
  a.jsonItemId !== undefined &&
  b.jsonItemId !== undefined &&
  a.jsonItemId !== b.jsonItemId &&
  !a[itemBehaviourKey].isNonSolid(a, b) &&
  !b[itemBehaviourKey].isNonSolid(b, a) &&
  collisionBoxes(overlapBox(a, roomTopZ), overlapBox(b, roomTopZ)) &&
  !isInsideCorner(a, b);
