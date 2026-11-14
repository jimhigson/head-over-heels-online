import { useEffect } from "preact/hooks";

import { editorStore } from "../../../store/store";
import { type EditorRoomView } from "../../slice/EditorRoomView";
import { selectOpenRoomView } from "../../slice/levelEditorSlice";
import { useOpenRoomPane } from "../useOpenRoomPane";
import { useEditorViewport } from "./EditorViewportProvider";

/**
 * keeps the viewport showing the open room's view
 */
export const useViewportFollowsOpenRoomView = () => {
  const viewport = useEditorViewport();
  const { openRoomId } = useOpenRoomPane();

  useEffect(() => {
    let shownView: EditorRoomView | undefined;
    const showOpenRoomView = () => {
      const openRoomView = selectOpenRoomView(
        editorStore.getState(),
        openRoomId,
      );
      // an open room with no view yet keeps showing the last until it is fitted:
      if (openRoomView !== undefined && openRoomView !== shownView) {
        shownView = openRoomView;
        viewport.show(openRoomView);
      }
    };
    showOpenRoomView();
    return editorStore.subscribe(showOpenRoomView);
  }, [viewport, openRoomId]);
};
