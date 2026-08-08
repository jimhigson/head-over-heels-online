import nanoEqual from "nano-equal";
import { useRef } from "preact/hooks";

/**
 * gives a value a stable identity for as long as it is deeply equal to what it
 * was, so that recomputing an equivalent value doesn't invalidate the effects
 * and memos that depend on it
 */
export const useStableValue = <T>(value: T): T => {
  const stableRef = useRef(value);

  if (!nanoEqual(stableRef.current, value)) {
    stableRef.current = value;
  }

  return stableRef.current;
};
