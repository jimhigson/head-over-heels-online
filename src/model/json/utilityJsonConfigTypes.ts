import type { Xyz } from "../../utils/vectors/vectors";

export type BlockStyle = "organic" | "artificial" | "tower" | "book";

export type JsonMovement =
  | "unmoving"
  | "clockwise"
  | "back-forth"
  | "towards-on-shortest-axis-xy4"
  | "towards-analogue"
  // special case for emperor's guardian - runs away if you have the first 4 crowns
  | "towards-analogue-unless-planet-crowns"
  | "towards-tripped-on-axis-xy4"
  | "patrol-randomly-diagonal"
  | "patrol-randomly-xy4"
  | "patrol-randomly-xy8";

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
