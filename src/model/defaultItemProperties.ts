import { smallItemAabb } from "../game/collision/boundingBoxes";
import type { UnionOfAllItemInPlayTypes } from "./ItemInPlay";

/**
 * to spread over items on instantiation and cut down on typing
 **/

export const defaultItemProperties = {
  renders: true,
  aabb: smallItemAabb,
} as const satisfies Partial<UnionOfAllItemInPlayTypes>;
