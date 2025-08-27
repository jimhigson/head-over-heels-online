import type { ItemInPlayType } from "./ItemInPlay";

export type Disappear = {
  on: "stand" | "touch";
  /**
   * if given, the item will disappear only if stood/touched by items of this type.
   * Eg, set to ['head', 'heels', 'headOverHeels'] to make only when touched by the player
   * or ['head'] eg for doughnuts that only head can collect
   */
  byType?: ItemInPlayType[];
};
