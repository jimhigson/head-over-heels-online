import { type UnionOfAllItemInPlayTypes } from "./ItemInPlay";

/**
 * to spread over items on instantiation and cut down on typing
 *
 * TODO: this has gotten so small, it's more fuss than inlining the single property it provides
 **/
export const defaultItemProperties = {
  castsShadowWhileStoodOn: false,
} as const satisfies Partial<UnionOfAllItemInPlayTypes>;
