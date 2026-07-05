import { isAnyOf } from "@reduxjs/toolkit";
import { useCallback, useEffect } from "preact/hooks";

import { startAppListening } from "../../../store/listenerMiddleware";
import {
  changeToRoom,
  rotateViewAnticlockwise,
  rotateViewClockwise,
  rotateViewTo,
} from "../../slice/levelEditorSlice";
import { useProvidedPixiApplication } from "../PixiApplicationProvider";
import { useEditorViewport } from "./EditorViewportProvider";
import { fitRoomInView } from "./fitRoomInView";

/**
 * keeps the room fitted in the pane: fits on changing room and on rotating the
 * view. Returns a callback that fits on demand (for the fit button and the
 * initial fit once the pane's size is first known).
 */
export const useFitRoomInView = (): (() => void) => {
  const viewport = useEditorViewport();
  const application = useProvidedPixiApplication();

  const fit = useCallback(
    () => fitRoomInView(viewport, application.renderer),
    [viewport, application],
  );

  useEffect(() => {
    return startAppListening({
      matcher: isAnyOf(
        changeToRoom,
        rotateViewClockwise,
        rotateViewAnticlockwise,
        rotateViewTo,
      ),
      effect() {
        fit();
      },
    });
  }, [fit]);

  return fit;
};
