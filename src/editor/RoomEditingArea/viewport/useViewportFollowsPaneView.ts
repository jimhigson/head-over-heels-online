import { useEffect } from "preact/hooks";

import { editorStore } from "../../../store/store";
import { type EditorRoomView } from "../../slice/EditorRoomView";
import { selectPaneView } from "../../slice/levelEditorSlice";
import { useEditorPane } from "../pane/EditorPaneProvider";
import { useEditorViewport } from "./EditorViewportProvider";

/**
 * keeps the viewport showing the pane's view of its room
 */
export const useViewportFollowsPaneView = () => {
  const viewport = useEditorViewport();
  const { paneId } = useEditorPane();

  useEffect(() => {
    let shownView: EditorRoomView | undefined;
    const showPaneView = () => {
      const paneView = selectPaneView(editorStore.getState(), paneId);
      // a pane with no view yet keeps showing the last until it is fitted:
      if (paneView !== undefined && paneView !== shownView) {
        shownView = paneView;
        viewport.show(paneView);
      }
    };
    showPaneView();
    return editorStore.subscribe(showPaneView);
  }, [viewport, paneId]);
};
