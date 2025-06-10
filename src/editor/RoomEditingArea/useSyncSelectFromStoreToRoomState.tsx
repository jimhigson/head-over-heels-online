import { useEffect } from "react";
import { useEditorRoomState } from "../EditorRoomStateProvider";
import {
  selectSelectedJsonItemIds,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";

export const useSyncSelectFromStoreToRoomState = () => {
  const roomState = useEditorRoomState();
  const selectedJsonItemId = useAppSelectorWithLevelEditorSlice(
    selectSelectedJsonItemIds,
  );

  useEffect(() => {
    if (!roomState.editor) {
      roomState.editor = {};
    }
    roomState.editor.selectedJsonItemId = selectedJsonItemId;
  }, [roomState, selectedJsonItemId]);
};
