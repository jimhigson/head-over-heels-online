import { useEffect, useMemo, useRef } from "preact/hooks";

import { IdleTracker } from "./IdleTracker";

export type UseIdleTrackerReturn = {
  /** call on every activity - restarts the countdown to going idle */
  markActive: () => void;
  /** go idle immediately, without waiting out the remaining time */
  makeIdleNow: () => void;
};

/**
 * hook wrapper for IdleTracker
 */
export const useIdleTracker = (
  /**
   * called on becoming active. Whatever it returns is called on going idle, or
   * on unmount
   */
  onActive: () => void,
): UseIdleTrackerReturn => {
  const onActiveRef = useRef(onActive);
  onActiveRef.current = onActive;

  const trackerRef = useRef<IdleTracker | null>(null);
  trackerRef.current ??= new IdleTracker();
  const tracker = trackerRef.current;

  useEffect(() => {
    let teardown: (() => void) | void;

    const runTeardown = () => {
      if (typeof teardown === "function") {
        teardown();
      }
      teardown = undefined;
    };

    const handleActive = () => {
      runTeardown();
      teardown = onActiveRef.current();
    };

    tracker.events.on("active", handleActive);
    tracker.events.on("idle", runTeardown);

    // activity can beat this effect to it, so catch up if already active
    if (!tracker.idle) {
      handleActive();
    }

    return () => {
      tracker.events.off("active", handleActive);
      tracker.events.off("idle", runTeardown);
      runTeardown();
      tracker.destroy();
    };
  }, [tracker]);

  return useMemo(
    () => ({
      markActive: () => tracker.markActive(),
      makeIdleNow: () => tracker.makeIdleNow(),
    }),
    [tracker],
  );
};
