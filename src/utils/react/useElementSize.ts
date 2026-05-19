import { useCallback, useEffect, useState } from "preact/hooks";

export type ElementSize = {
  width: number | undefined;
  height: number | undefined;
};

export const useElementSize = <T extends Element>({
  measureFirstChild = false,
}: { measureFirstChild?: boolean } = {}) => {
  const [element, setElement] = useState<null | T>(null);
  const [size, setSize] = useState<ElementSize>({
    width: undefined,
    height: undefined,
  });

  const ref = useCallback((el: null | T) => {
    setElement(el);
  }, []);

  useEffect(() => {
    const target =
      measureFirstChild ? (element?.firstElementChild ?? null) : element;
    if (target === null) {
      return;
    }
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(target);
    return () => ro.disconnect();
  }, [element, measureFirstChild]);

  return { ref, ...size };
};
