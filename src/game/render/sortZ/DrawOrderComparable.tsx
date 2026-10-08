import { type itemBehaviourKey } from "../../../model/ItemInPlay";
import { type XyzBox } from "../../../utils/vectors/vectors";
import { type ItemBehaviour } from "../../itemBehaviours/ItemBehaviour";

/**
 * the surface the draw-order machinery needs from an item - purely physical,
 * plus the behaviour that decides if it takes part in draw-ordering. Real
 * in-play items satisfy this. Render boxes are never read off items:
 * they come from the renderBoxes map (owned in-game by the room renderer)
 */
export type DrawOrderComparable = {
  readonly id: string;
  readonly [itemBehaviourKey]: ItemBehaviour;
  state: { box: Readonly<XyzBox> };
};
