import type { CSSProperties } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectUpscale } from "../../store/slices/upscale/upscaleSlice";

export const useCanvasInlineStyle = (): CSSProperties => {
  const { cssUpscale, canvasSize, rotate90 } = useAppSelector(selectUpscale);

  return {
    // using scale3d (not scale) to try to force hardware acceleration of the scaling
    transform:
      rotate90 ?
        `scale(${cssUpscale}) rotate(90deg) translate(0, -${canvasSize.y}px)`
      : `scale(${cssUpscale})`,
    width: canvasSize.x,
    height: canvasSize.y,
    transformOrigin: "top left",
  };
};
