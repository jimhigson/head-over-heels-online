import type { Xy } from "@/utils/vectors/vectors";

export type Upscale = { scaleFactor: number; effectiveSize: Xy };

export const calculateUpscale = (
  actualScreenSize: Xy,
  emulatedScreenSize: Xy,
): Upscale => {
  const scaleFactor = Math.floor(
    Math.min(
      actualScreenSize.x / emulatedScreenSize.x,
      actualScreenSize.y / emulatedScreenSize.y,
    ),
  );
  const effectiveSize = {
    x: Math.floor(actualScreenSize.x / scaleFactor),
    y: Math.floor(actualScreenSize.y / scaleFactor),
  };

  return { scaleFactor, effectiveSize };
};
