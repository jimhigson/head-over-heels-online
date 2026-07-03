import { useEffect } from "preact/hooks";

import { HookComponent } from "../../../utils/preact/HookComponent";
import { useAppDispatch } from "../../hooks";
import {
  assetsLoadingFinished,
  assetsLoadingStarted,
} from "./assetsLoadingSlice";

/**
 * Render this when loading, to mark as loading happening in the store.
 *
 * Non-visual component.
 *
 * Use, eg, inside Suspense fallbacks
 */
export const AssetLoading = HookComponent(() => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(assetsLoadingStarted());
    return () => {
      dispatch(assetsLoadingFinished());
    };
  }, [dispatch]);
});
