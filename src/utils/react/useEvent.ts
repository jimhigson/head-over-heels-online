import type { Emitter, EventType } from "mitt";
import { useEffect } from "react";
import { useRef } from "react";

export const useEvent = <
  Events extends Record<EventType, unknown>,
  T extends keyof Events,
>(
  events: Emitter<Events>,
  type: T,
  /**
   * MUST be memoised with useCallback or useMemo or the event will be
   * re-added on every render!
   */
  handler: (event: Events[T]) => void,
) => {
  useEffect(() => {
    events.on(type, handler);

    return () => {
      events.off(type, handler);
    };
  }, [events, handler, type]);
};

export const useUnchanging = <T>(latest: T) => {
  const { current: original } = useRef(latest);

  if (original !== latest)
    throw new Error(
      `Value should not change between renders: ${original} => ${latest}`,
    );
};
