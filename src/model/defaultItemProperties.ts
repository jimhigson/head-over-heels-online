import type { UnionOfAllItemInPlayTypes } from "./ItemInPlay";

import { smallItemAabb } from "../game/collision/boundingBoxes";

/**
 * to spread over items on instantiation and cut down on typing
 *
 * TODO: this has gotten so small, it's more fuss than inlining the single property it provides
 **/
export const defaultItemProperties = {
  aabb: smallItemAabb,
  castsShadowWhileStoodOn: false,
} as const satisfies Partial<UnionOfAllItemInPlayTypes>;
