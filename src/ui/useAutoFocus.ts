import { useEffect, useRef } from "preact/hooks";

/**
 * Reproduces React's built-in `autoFocus` behaviour, which Preact lacks:
 * focuses the element on mount when enabled. Returns a ref to attach to the
 * element.
 *
 * Preact does not special-case `autoFocus` the way React does (React calls
 * `.focus()` on mount), so passing `autoFocus` to an element only sets the
 * `autofocus` attribute, which has no effect on dynamically-inserted nodes.
 */
export const useAutoFocus = <T extends HTMLElement = HTMLElement>(
  /** when true, the element is focused on mount */
  enabled: boolean,
) => {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (enabled) {
      ref.current?.focus();
    }
  }, [enabled]);
  return ref;
};
