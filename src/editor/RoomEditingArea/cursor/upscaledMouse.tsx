import type { Upscale } from "../../../store/slices/upscale/Upscale";
import type { Xy } from "../../../utils/vectors/vectors";

export const upscaledMousePosition = (
  upscale: Upscale,
  event: MouseEvent,
): Xy => {
  const totalUpscale = upscale.cssUpscale * upscale.gameEngineUpscale;

  if (event.target === null) {
    throw new Error("Mouse event target is null");
  }

  const rect = (event.target as HTMLElement).getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  return {
    x: x / totalUpscale - upscale.gameEngineScreenSize.x / 2,
    y: y / totalUpscale - upscale.gameEngineScreenSize.y + 16,
  };
};
export const upscaledMouseMove = (upscale: Upscale, event: MouseEvent): Xy => {
  const totalUpscale = upscale.cssUpscale * upscale.gameEngineUpscale;

  if (event.target === null) {
    throw new Error("Mouse event target is null");
  }

  const x = event.movementX;
  const y = event.movementY;

  return {
    x: x / totalUpscale,
    y: y / totalUpscale,
  };
};
