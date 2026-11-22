import type { UnionOfAllItemInPlayTypes } from "../../../../ItemInPlayNarrowedUnions";

/**
 * a room's item as loaded for play, which is how overlaps are checked
 */
export type LoadedItem = UnionOfAllItemInPlayTypes<string, string>;
