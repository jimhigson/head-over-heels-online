import { useSyncExternalStore } from "preact/compat";
import { useCallback } from "preact/hooks";

import { useEditorViewport } from "./EditorViewportProvider";

/** the viewport's current zoom, re-rendering as it changes */
export const useEditorViewportZoom = (): number => {
  const viewport = useEditorViewport();
  return useSyncExternalStore(
    useCallback((onChange) => viewport.onChange(onChange), [viewport]),
    () => viewport.zoom,
  );
};
