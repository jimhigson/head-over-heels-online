import type {
  UnionOfAllItemInPlayTypes,
  ItemInPlayType,
} from "../../model/ItemInPlay";

/**
 * it matters what order items are processed in - for example, lifts move but nothing can move a lift, so
 * lifts should be processed first so they can push everything else before they can also move and fail
 * to push the lift
 */
export const itemTickOrderComparator = (
  a: UnionOfAllItemInPlayTypes,
  b: UnionOfAllItemInPlayTypes,
) => {
  const scores: Partial<Record<ItemInPlayType, number>> = {
    lift: -4, // <- highest priority
    head: -3,
    heels: -3,
    monster: -2,
    // everything else goes here
    block: 1, // <- lowest priority
    deadlyBlock: 1, // <- lowest priority
  };

  const aScore = scores[a.type] ?? 0;
  const bScore = scores[b.type] ?? 0;

  return aScore - bScore;
};
