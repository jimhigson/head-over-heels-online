import { useEffect } from "react";

import { useAppSelector } from "../../store/hooks";
import { useEditorRoomRenderDimensions } from "../slice/levelEditorSelectors";
import { useProvidedPixiApplication } from "./PixiApplicationProvider";
import { roomEditingAreaMarginPx } from "./roomEditingAreaMarginPx";

export const useResizePixiApplicationToMatchCanvasSize = () => {
  const application = useProvidedPixiApplication();

  // this size actually only applies in the game engine, not in the editor, where we
  // want the canvas to be bigger than what can be shown on the screen for native scrolling:
  //const canvasSize = useAppSelector(selectCanvasSize);
  const roomRenderSize = useEditorRoomRenderDimensions();
  const upscale = useAppSelector((state) => state.upscale.upscale);

  useEffect(() => {
    const scaledW =
      (2 * roomEditingAreaMarginPx + roomRenderSize.w) *
      upscale.gameEngineUpscale;
    const scaledH =
      (2 * roomEditingAreaMarginPx + roomRenderSize.h) *
      upscale.gameEngineUpscale;
    application.renderer?.resize(scaledW, scaledH);
  }, [application.renderer, roomRenderSize, upscale]);
};
