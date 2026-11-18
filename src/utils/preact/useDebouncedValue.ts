import { useEffect, useState } from "preact/hooks";

/**
 * the value as it was once it stopped changing for the given time - starting
 * as the first value given
 */
export const useDebouncedValue = <T>(
  value: T,
  /**
   * how long the value must stay the same for before it is given
   */
  delayMs: number,
): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timeout);
  }, [value, delayMs]);

  return debouncedValue;
};
