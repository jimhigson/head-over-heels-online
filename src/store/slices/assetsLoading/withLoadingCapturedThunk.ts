import { type AppThunk } from "../../store";
import {
  assetsLoadingFinished,
  assetsLoadingStarted,
} from "./assetsLoadingSlice";

/**
 * runs `work` while the assets-loading indicator is shown: dispatches
 * assetsLoadingStarted before, and assetsLoadingFinished in a finally once it
 * settles (success or failure). Any error from `work` is re-thrown, not
 * swallowed, so the caller can still handle it.
 */
export const withLoadingCapturedThunk =
  <T>(work: () => Promise<T> | T): AppThunk<Promise<T>> =>
  async (dispatch) => {
    dispatch(assetsLoadingStarted());
    try {
      return await work();
    } finally {
      dispatch(assetsLoadingFinished());
    }
  };
