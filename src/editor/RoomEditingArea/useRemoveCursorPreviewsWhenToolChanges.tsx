import { useEffect } from "react";
import { startAppListening } from "../../store/listenerMiddleware";
import { useEditorRoomState } from "../EditorRoomStateProvider";
import { setTool } from "../slice/levelEditorSlice";
import { mutateRoomRemoveCursorPreviews } from "./cursor/mutateRoomWithCursorPointingAt";

export const useRemoveCursorPreviewsWhenToolChanges = () => {
  const roomState = useEditorRoomState();

  useEffect(() => {
    return startAppListening({
      actionCreator: setTool,
      effect() {
        mutateRoomRemoveCursorPreviews(roomState);
      },
    });
  }, [roomState]);
};
