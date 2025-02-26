import { fromAllEntries } from "../../utils/entries";
import { originXyz, type Xyz } from "../../utils/vectors/vectors";
import { booleanActions, type BooleanAction } from "./BooleanAction";

/**
 * the state of input given via the on-screen hud (mostly for phones) - this
 * is designed to be modified in-place by the hud
 */
export type HudInputState = Record<BooleanAction, boolean> & {
  directionVector: Xyz;
};

export const createEmptyHudInputState = (): HudInputState => {
  return {
    directionVector: originXyz,
    ...fromAllEntries(booleanActions.map((action) => [action, false])),
  };
};
