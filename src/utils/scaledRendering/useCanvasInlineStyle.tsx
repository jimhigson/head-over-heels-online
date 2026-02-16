import type { CSSProperties } from "react";

import { useAppSelector } from "../../store/hooks";
import { selectUpscale } from "../../store/slices/upscale/upscaleSlice";

export const useCanvasInlineStyle = (): CSSProperties => {
  const { cssUpscale, canvasSize, rotate90 } = useAppSelector(selectUpscale);

  return {
    transform: `scale(${cssUpscale})`,

    width: rotate90 ? canvasSize.y : canvasSize.x,
    height: rotate90 ? canvasSize.x : canvasSize.y,
    transformOrigin: "top left",
  };
};

export const useMaybeRotated = (): CSSProperties => {
  const { canvasSize, rotate90 } = useAppSelector(selectUpscale);

  return {
    // using scale3d (not scale) to try to force hardware acceleration of the scaling
    transform:
      rotate90 ? `rotate(90deg) translate(0, -${canvasSize.y}px)` : undefined,
    transformOrigin: "top left",
  };
};

export const useCanvasTransform = (): string => {
  const { cssUpscale, canvasSize, rotate90 } = useAppSelector(selectUpscale);

  return rotate90 ?
      `scale(${cssUpscale}) rotate(90deg) translate(0, -${canvasSize.y}px)`
    : `scale(${cssUpscale})`;
};
