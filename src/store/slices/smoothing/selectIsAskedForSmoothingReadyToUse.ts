import nanoEqual from "nano-equal";

import { type GameRootState } from "../../store";
import { selectSmoothingInputs } from "./selectSmoothingInputs";
import { selectSmoothed } from "./smoothingSlice";

/**
 * whether the smoothing the settings ask for has finished, so its pixels are
 * ready to be taken
 */
export const selectIsAskedForSmoothingReadyToUse = (
  state: GameRootState,
): boolean => {
  const askedFor = selectSmoothingInputs(state);
  return askedFor !== undefined && nanoEqual(askedFor, selectSmoothed(state));
};
