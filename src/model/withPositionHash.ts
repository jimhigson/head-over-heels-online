import { hashXyzToNumber0to1 } from "../utils/maths/hashXyzToNumber0to1";
import { type Xyz } from "../utils/vectors/vectors";

/**
 * Complete a freshly-built item by stamping its {@link ItemInPlay.hash hash},
 * derived from its initial position. Item creators build the item without a
 * hash (returning {@link ItemInPlayBeforeHash}) and pass it through here so
 * every item ends up with one - keyed off position, not the item id.
 */
export const withPositionHash = <T extends { state: { position: Xyz } }>(
  item: T,
): T & { hash: number } => ({
  ...item,
  hash: hashXyzToNumber0to1(item.state.position),
});
