import { isAnyOf } from "@reduxjs/toolkit";

import { startAppListening } from "../../store/listenerMiddleware";
import {
  commitPendingNudge,
  multiplySelectedItems,
  nudgeSelectedItems,
} from "./levelEditorSlice";

/**
 * how long nudges must pause for before they are committed as one edit
 */
const nudgeCommitDelayMs = 500;

/**
 * commit the nudges being previewed once they pause - a held key's repeats
 * become one edit
 */
export const registerNudgeCommitListeners = () => {
  startAppListening({
    matcher: isAnyOf(nudgeSelectedItems, multiplySelectedItems),
    async effect(_action, { cancelActiveListeners, delay, dispatch }) {
      // each nudge restarts the wait:
      cancelActiveListeners();
      await delay(nudgeCommitDelayMs);
      dispatch(commitPendingNudge());
    },
  });
};
