import { amigaLowResPal as originalSystemRes } from "@/originalGame";
import { useState, useLayoutEffect } from "react";
import { calculateUpscale } from "../render/upscale";

export function useScaleFactor() {
  const [scaleFactor, setScaleFactor] = useState<number>(() => {
    const { scaleFactor } = calculateUpscale(
      { x: window.innerWidth, y: window.innerHeight },
      originalSystemRes,
    );
    return scaleFactor;
  });
  useLayoutEffect(() => {
    const updateSize = () => {
      const { scaleFactor } = calculateUpscale(
        { x: window.innerWidth, y: window.innerHeight },
        originalSystemRes,
      );
      setScaleFactor(scaleFactor);
    };
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return scaleFactor;
}
