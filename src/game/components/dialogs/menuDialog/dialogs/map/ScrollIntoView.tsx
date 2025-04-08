import { useRef, useLayoutEffect } from "react";

/** tiny component that scrolls itself into view, and does nothing else */
export const ScrollIntoView = () => {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    ref.current?.scrollIntoView({ behavior: "instant", block: "center" });
  });

  return <div ref={ref} />;
};
