import { startAppListening } from "../listenerMiddleware";
import { campaignsApiSlice } from "./campaigns/campaignsApiSlice";
import { clearAllData } from "./clearAllData";
import { githubApiSlice } from "./githubApiSlice";

/**
 * Standard slices reset themselves on `clearAllData` via `extraReducers`.
 * RTK Query slices have their own internal state shape and provide
 * `util.resetApiState()` as the canonical reset path — dispatch it from a
 * listener so cached responses (campaigns, GitHub releases) are wiped
 * alongside the rest of the store.
 */
export const registerClearAllDataListeners = () => {
  startAppListening({
    actionCreator: clearAllData,
    effect(_action, { dispatch }) {
      dispatch(campaignsApiSlice.util.resetApiState());
      dispatch(githubApiSlice.util.resetApiState());
    },
  });
};
