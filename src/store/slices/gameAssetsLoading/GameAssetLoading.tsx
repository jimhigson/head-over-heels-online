import { useEffect } from "react";

import { HookComponent } from "../../../utils/react/HookComponent";
import { useAppDispatch } from "../../hooks";
import {
  gameAssetsLoadingFinished,
  gameAssetsLoadingStarted,
} from "./gameAssetsLoadingSlice";

/**
 * Render this when loading, to mark as loading happening in the store.
 *
 * Non-visual component.
 *
 * Use, eg, inside Suspense fallbacks
 */
export const GameAssetLoading = HookComponent(() => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(gameAssetsLoadingStarted());
    return () => {
      dispatch(gameAssetsLoadingFinished());
    };
  }, [dispatch]);
});
