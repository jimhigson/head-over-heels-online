import { type RefObject } from "preact";
import { useLayoutEffect, useRef, useState } from "preact/hooks";

/**
 * whether a row's content overflows at full size, even while it is shown
 * shortened: true once it overflows, until its parent is wide enough for the
 * full size again - the row may size to its content, up to its parent's width.
 * Re-measured at full size whenever `content` changes
 */
export const useOverflowsAtFullSize = (
  rowRef: RefObject<HTMLElement | null>,
  /** what the row shows - a change means the full size must be measured again */
  content: unknown,
): boolean => {
  const [overflows, setOverflows] = useState(false);
  /** the row's width at full size, as last measured */
  const fullSizeWidthRef = useRef<number | undefined>(undefined);

  useLayoutEffect(() => {
    fullSizeWidthRef.current = undefined;
    setOverflows(false);
  }, [content]);

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (row === null) {
      return;
    }
    const parent = row.parentElement;
    if (parent === null) {
      return;
    }
    const fit = () => {
      if (!overflows) {
        fullSizeWidthRef.current = row.scrollWidth;
        if (row.scrollWidth > row.clientWidth) {
          setOverflows(true);
        }
      } else if (
        fullSizeWidthRef.current !== undefined &&
        fullSizeWidthRef.current <= parent.clientWidth
      ) {
        setOverflows(false);
      }
    };
    fit();
    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(row);
    resizeObserver.observe(parent);
    return () => resizeObserver.disconnect();
  }, [rowRef, overflows, content]);

  return overflows;
};
