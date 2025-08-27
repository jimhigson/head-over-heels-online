import type { RefObject } from "react";

import { useLayoutEffect, useRef } from "react";

/** tiny component that scrolls itself into view, and does nothing else */
export const ScrollIntoView = ({
  svg = false,
  smooth = false,
}: {
  svg?: boolean;
  smooth?: boolean;
}) => {
  const ref = useRef<Element>(null);
  useLayoutEffect(() => {
    ref.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "instant",
      block: "center",
    });
  });

  if (svg) {
    return <g ref={ref as RefObject<SVGGElement>} />;
  } else {
    return <div ref={ref as RefObject<HTMLDivElement>} />;
  }
};
