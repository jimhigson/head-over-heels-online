import { type ItemInPlayType } from "../../../model/ItemInPlay";
import { type XyzBox } from "../../../utils/vectors/vectors";

/**
 * the surface the draw-order machinery needs from an item - purely physical.
 * Real in-play items satisfy this; synthetic sort-test items may omit
 * `type`/`config`. Render boxes are never read off items: they come from the
 * renderBoxes map (owned in-game by the room renderer)
 */
export type DrawOrderComparable = {
  readonly id: string;
  fixedZIndex?: number;
  type?: ItemInPlayType;
  config?: unknown;
  state: { box: Readonly<XyzBox> };
};
