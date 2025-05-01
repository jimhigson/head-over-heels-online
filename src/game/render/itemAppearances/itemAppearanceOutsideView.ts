/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Container } from "pixi.js";
import type { ItemInPlayType } from "../../../model/ItemInPlay";
import type { ItemAppearance } from "./ItemAppearance";

export type ItemAppearanceOutsideView<T extends ItemInPlayType> =
  ItemAppearance<T, any, Container>;

/**
 * identity function - a blight on the call stack
 *
 * a convenience to cast an item appearance to a view that is external to the appearance's implementation.
 * This 'washes' the given appearance type to not include everything that only the view itself cares about;
 * returns the type that other modules should interact with most of the time.
 */
export const itemAppearanceOutsideView = <T extends ItemInPlayType>(
  itemAppearance: ItemAppearance<T, any, any>,
): ItemAppearance<T, any, Container> => {
  return itemAppearance as unknown as ItemAppearance<T, any, Container>;
};
