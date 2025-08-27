import { useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  manualLoadingFinished,
  manualLoadingStarted,
} from "../slices/manualLoadingSlice";

/**
 * Hook for wrapping async operations with loading state tracking
 *
 * @example
 * const withLoading = useManualLoading();
 *
 * const handleFileUpload = withLoading(async (file: File) => {
 *   await uploadFile(file);
 * });
 */
export const useManualLoading = () => {
  const dispatch = useDispatch();

  return useCallback(
    <T extends (...args: Parameters<T>) => Promise<ReturnType<T>>>(
      asyncFn: T,
    ): T => {
      return (async (...args: Parameters<T>) => {
        dispatch(manualLoadingStarted());
        try {
          return await asyncFn(...args);
        } finally {
          dispatch(manualLoadingFinished());
        }
      }) as T;
    },
    [dispatch],
  );
};
