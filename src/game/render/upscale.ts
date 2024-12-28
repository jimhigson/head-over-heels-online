import type { Xy } from "@/utils/vectors/vectors";

export const calculateUpscale = (
  modernScreenSize: Xy,
  originalScreenSize: Xy,
) => {
  const scaleFactor = Math.floor(
    Math.min(
      modernScreenSize.x / originalScreenSize.x,
      modernScreenSize.y / originalScreenSize.y,
    ),
  );
  const effectiveSize = {
    x: Math.round(modernScreenSize.x / scaleFactor),
    y: Math.round(modernScreenSize.y / scaleFactor),
  };

  return { scaleFactor, effectiveSize };
};
