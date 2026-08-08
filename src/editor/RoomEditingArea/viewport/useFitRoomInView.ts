import { isAnyOf } from "@reduxjs/toolkit";
import { useCallback, useEffect } from "preact/hooks";

import { startAppListening } from "../../../store/listenerMiddleware";
import { editorStore } from "../../../store/store";
import { useGetEditorRoomState } from "../../EditorRoomStateProvider";
import {
  changeToRoom,
  rotateViewAnticlockwise,
  rotateViewClockwise,
  rotateViewTo,
  selectEditorCameraAngle,
} from "../../slice/levelEditorSlice";
import { useProvidedPixiApplication } from "../PixiApplicationProvider";
import { useEditorViewport } from "./EditorViewportProvider";
import { fitRoomInView } from "./fitRoomInView";

/** a callback that fits the current room to the pane on demand */
export const useFitRoomInViewCallback = (): (() => void) => {
  const viewport = useEditorViewport();
  const application = useProvidedPixiApplication();
  const getRoomState = useGetEditorRoomState();

  return useCallback(
    () =>
      fitRoomInView(
        viewport,
        application.renderer,
        getRoomState(),
        // fitting happens in response to actions (eg rotating the view), so
        // take the angle as it is now that they have been reduced:
        selectEditorCameraAngle(editorStore.getState()),
      ),
    [viewport, application, getRoomState],
  );
};

/**
 * keeps the room fitted in the pane: fits on changing room and on rotating the
 * view. Returns a callback that fits on demand (for the initial fit once the
 * pane's size is first known).
 */
export const useFitRoomInView = (): (() => void) => {
  const fit = useFitRoomInViewCallback();

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
