import { useEffect, useRef, useState } from "preact/hooks";

export type ElementSize = {
  width: number | undefined;
  height: number | undefined;
};

export const useElementSize = <T extends Element>() => {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<ElementSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const el = ref.current;
    if (el === null) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, ...size };
};
