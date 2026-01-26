import { useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  gameAssetsLoadingFinished,
  gameAssetsLoadingStarted,
} from "../slices/gameAssetsLoadingSlice";

/**
 * Hook for wrapping async operations with game assets loading state tracking
 *
 * @example
 * const withLoading = useGameAssetsLoading();
 *
 * const handleFileUpload = withLoading(async (file: File) => {
 *   await uploadFile(file);
 * });
 */
export const useGameAssetsLoading = () => {
  const dispatch = useDispatch();

  return useCallback(
    <T extends (...args: Parameters<T>) => Promise<ReturnType<T>>>(
      asyncFn: T,
    ): T => {
      return (async (...args: Parameters<T>) => {
        dispatch(gameAssetsLoadingStarted());
        try {
          return await asyncFn(...args);
        } finally {
          dispatch(gameAssetsLoadingFinished());
        }
      }) as T;
    },
    [dispatch],
  );
};
