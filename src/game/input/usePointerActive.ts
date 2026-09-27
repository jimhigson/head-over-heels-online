import { useSyncExternalStore } from "preact/compat";
import { useCallback } from "preact/hooks";

import { usePointerTracker } from "./InputStateProvider";

/**
 * Whether the mouse is in use - for ui that is summoned by the pointer and
 * should get out of the way when the player is not using one
 */
export const usePointerActive = (): boolean => {
  const pointerTracker = usePointerTracker();

  const subscribe = useCallback(
    (onChange: () => void) => {
      pointerTracker.events.on("change", onChange);
      return () => pointerTracker.events.off("change", onChange);
    },
    [pointerTracker],
  );

  return useSyncExternalStore(subscribe, () => pointerTracker.active);
};
