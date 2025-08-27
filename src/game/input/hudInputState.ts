import { fromAllEntries } from "../../utils/entries";
import { originXyz, type Xyz } from "../../utils/vectors/vectors";
import { type BooleanAction, booleanActions } from "./actions";

/**
 * the state of input given via the on-screen hud (mostly for phones) - this
 * is designed to be modified in-place by the hud
 *
 * Since it is updated externally, it contains no logic for updating itself
 */
export type HudInputState = Record<BooleanAction, boolean> & {
  directionVector: Xyz;
  /**
   * the look vector on the hud input state is a special case because it represents
   * the exact pixel movement from the last frame, since it is drag-based. It doesn't
   * get speed set to it, but has to be reset by the user after using it back to zero
   */
  lookVector: Xyz;
};

export const createEmptyHudInputState = (): HudInputState => {
  return {
    directionVector: originXyz,
    // this vector is modified in-place, so make a mutable object from the origin:
    lookVector: { ...originXyz },
    ...fromAllEntries(booleanActions.map((action) => [action, false])),
  };
};
