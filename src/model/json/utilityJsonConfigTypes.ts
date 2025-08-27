import type { Xyz } from "../../utils/vectors/vectors";

export type BlockStyle = "artificial" | "book" | "organic" | "tower";

export type JsonMovement =
  | "back-forth"
  | "clockwise"
  | "forwards"
  | "patrol-randomly-diagonal"
  | "patrol-randomly-xy4"
  | "towards-analogue"
  | "towards-on-shortest-axis-xy4"
  | "towards-tripped-on-axis-xy4"
  | "unmoving"
  // same as patrol-randomly-xy4 but sometimes walks backwards - kind of because
  // it is funny really to see the big head computer robots doing this
  | "patrol-randomly-xy4-and-reverse"
  | "patrol-randomly-xy8"
  // special case for emperor's guardian - runs away if you have the first 4 crowns
  | "towards-analogue-unless-planet-crowns"
  // turns towards the player while staying still (elephant heads in the remake)
  | "turn-to-player";

export type MovementActivated =
  // on and off potentially overridable switchable in item state in-game using switches
  | "off"
  | "on"
  // wakes up once when the player is near and does not turn off if they move away
  | "after-player-near"
  // wakes up once when the player is near and ignores them after they move away
  | "while-player-near"
  // ie, moving blocks that start when you stand on them
  | "on-stand";

// to validate a union as a subset of JsonMovement
export type MovementsSubset<U extends JsonMovement> = U;
export type ActivatedWhenSubset<U extends MovementActivated> = U;

export type ConsolidatableConfig = {
  times?: Partial<Xyz>;
};

/**
 * stand-in property for when times is undefined:
 * multiplied by 1 in every dimension - ie, no multiplication
 */
export const timesNotMultiplied = { x: 1, y: 1, z: 1 };
