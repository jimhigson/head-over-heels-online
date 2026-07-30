import { useEffect, useState } from "preact/hooks";

import { useIdleTracker } from "../../utils/idle/useIdleTracker";
import { originXyz, xyzEqual } from "../../utils/vectors/vectors";
import { useInputStateTracker } from "./InputStateProvider";
import { type InputStateTrackerInterface } from "./InputStateTracker";

/**
 * every mouse action counts as the pointer being in use, not only movement -
 * clicking without moving should keep pointer-summoned ui on screen. All carry
 * clientX/clientY, so a handler can both detect use and read the position
 */
export const pointerActivityEvents = [
  "pointermove",
  "pointerdown",
  "pointerup",
] as const satisfies readonly (keyof WindowEventMap)[];

const isSteering = (inputStateTracker: InputStateTrackerInterface) =>
  !xyzEqual(inputStateTracker.directionVector, originXyz);

/**
 * Whether the mouse is in use - for ui that is summoned by the pointer and
 * should get out of the way when the player is not using one. Stays true until
 * the mouse has been still for the idle tracker's countdown.
 *
 * Listens on `window`, since a mouse anywhere on screen counts: scoping to an
 * element could not work for ui that hides itself, as a hidden element receives
 * no pointer events to bring it back.
 *
 * Goes false at once, rather than waiting out the countdown, when a direction is
 * pressed (the player has switched to keys or a pad), when the pointer is not a
 * mouse, and when the pointer leaves the window.
 */
export const usePointerActive = (): boolean => {
  const inputStateTracker = useInputStateTracker();
  const [pointerActive, setPointerActive] = useState(false);

  const { markActive, makeIdleNow } = useIdleTracker(() => {
    setPointerActive(true);

    // a direction press is only detectable by polling, so it is watched for
    // every frame while active - a held direction sends no events of its own
    let frame = requestAnimationFrame(function watchForSteering() {
      frame = requestAnimationFrame(watchForSteering);
      if (isSteering(inputStateTracker)) {
        makeIdleNow();
      }
    });

    return () => {
      cancelAnimationFrame(frame);
      setPointerActive(false);
    };
  });

  useEffect(() => {
    if (import.meta.env.MODE === "visual-regression") {
      // the mouse never counts as in use, so pointer-summoned ui is a function
      // of the touch-controls setting alone and screenshots cannot catch it
      // mid-countdown. Playwright's own clicks would otherwise summon it
      return;
    }

    const handlePointerActivity = (e: PointerEvent) => {
      // a mouse nudged while steering must not summon the ui back
      if (e.pointerType !== "mouse" || isSteering(inputStateTracker)) {
        makeIdleNow();
        return;
      }
      markActive();
    };

    for (const eventName of pointerActivityEvents) {
      window.addEventListener(eventName, handlePointerActivity, {
        passive: true,
      });
    }
    // the os cursor takes over once outside the window
    document.documentElement.addEventListener("pointerleave", makeIdleNow);
    window.addEventListener("blur", makeIdleNow);
    return () => {
      for (const eventName of pointerActivityEvents) {
        window.removeEventListener(eventName, handlePointerActivity);
      }
      document.documentElement.removeEventListener("pointerleave", makeIdleNow);
      window.removeEventListener("blur", makeIdleNow);
    };
  }, [inputStateTracker, markActive, makeIdleNow]);

  return pointerActive;
};
