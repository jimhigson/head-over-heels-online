import type { Upscale } from "../../../store/slices/upscale/Upscale";
import type { Xy } from "../../../utils/vectors/vectors";
import type { RenderedRoomDimensions } from "../../slice/levelEditorSelectors";

import { roomEditingAreaMarginPx } from "../roomEditingAreaMarginPx";

export const upscaledMousePosition = (
  upscale: Upscale,
  roomRenderSize: RenderedRoomDimensions,
  event: MouseEvent,
): Xy => {
  const totalUpscale = upscale.cssUpscale * upscale.gameEngineUpscale;

  if (event.target === null) {
    throw new Error("Mouse event target is null");
  }

  const rect = (event.target as HTMLElement).getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const result: Xy = {
    x: x / totalUpscale + roomRenderSize.l - roomEditingAreaMarginPx,
    y: y / totalUpscale + roomRenderSize.t - roomEditingAreaMarginPx,
  };

  return result;
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
