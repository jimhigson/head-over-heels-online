import { useEffect, useRef, useState } from "react";

export const useElementWidth = <T extends Element>() => {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState<number | undefined>();

  useEffect(() => {
    const el = ref.current;
    if (el === null) return;
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, width };
};
