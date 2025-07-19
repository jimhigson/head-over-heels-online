import type { RefObject } from "react";
import { useCallback, useEffect, useRef } from "react";
import normalizeWheel from "normalize-wheel-es";

export const useMouseWheel = (
  elementRef: RefObject<Element | null>,
  callback: (direction: 1 | -1) => void,
  disabled: boolean = false,
) => {
  const wheelY = useRef(0);

  const onWheel = useCallback(
    (e: Event) => {
      if (disabled) {
        return;
      }

      const wheelEvent = e as WheelEvent;

      wheelEvent.preventDefault();
      wheelEvent.stopPropagation();

      const norm = normalizeWheel(wheelEvent);

      wheelY.current -= norm.spinY;

      if (wheelY.current >= 1) {
        callback(1);
        wheelY.current = 0;
      }
      if (wheelY.current <= -1) {
        // find currently selected item's index:
        callback(-1);
        wheelY.current = 0;
      }
    },
    [callback, disabled],
  );

  useEffect(() => {
    const element = elementRef.current;
    if (element === null) {
      return;
    }
    // manual adding is needed to explicity give passive: false - React provides no way to do this
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      element.removeEventListener("wheel", onWheel);
    };
  }, [elementRef, onWheel]);
};

export const useMouseWheelOptions = <T>(
  elementRef: RefObject<Element | null>,
  values: Readonly<T[]>,
  callback: (value: T, idx: number) => void,
  disabled: boolean = false,
) => {
  const valueRef = useRef<number>(0);

  return useMouseWheel(
    elementRef,
    (delta) => {
      if (values.length === 0) {
        return;
      }
      const newIndex =
        (valueRef.current + delta + 256 * values.length) % values.length;
      valueRef.current = newIndex;
      callback(values[newIndex], newIndex);
    },
    disabled,
  );
};
