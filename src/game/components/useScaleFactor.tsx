import { zxSpectrumResolution as originalSystemRes } from "@/originalGame";
import { useState, useLayoutEffect } from "react";
import type { Upscale } from "../render/upscale";
import { calculateUpscale } from "../render/upscale";

export const useScaleFactor = (): Upscale => {
  const [scaleFactor, setScaleFactor] = useState<Upscale>(() =>
    calculateUpscale(
      { x: window.innerWidth, y: window.innerHeight },
      originalSystemRes,
    ),
  );

  useLayoutEffect(() => {
    const updateSize = () => {
      const upscale = calculateUpscale(
        { x: window.innerWidth, y: window.innerHeight },
        originalSystemRes,
      );
      setScaleFactor(upscale);
    };
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return scaleFactor;
};
