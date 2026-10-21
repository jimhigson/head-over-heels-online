import { createContext } from "preact";
import { type PropsWithChildren } from "preact/compat";
import { useContext, useLayoutEffect, useState } from "preact/hooks";

import { type EditorRootState, editorStore } from "../../../store/store";
import { type EditorRoomItemId, type EditorRoomJson } from "../../editorTypes";
import {
  LoadedRoomCache,
  type LoadedRoomJsonSelectors,
} from "../../LoadedRoomCache";
import { paneLoadedRooms } from "../../paneLoadedRooms";
import {
  type EditorPaneId,
  type EditorPaneRoomSource,
  generateEditorPaneId,
} from "../../slice/EditorPane";
import { selectCurrentEditingRoomJsonWithPreviews } from "../../slice/levelEditorSelectors";
import {
  editorPaneActivated,
  editorPaneMounted,
  editorPaneUnmounted,
  selectCurrentCommittedRoomJson,
  selectRoom,
} from "../../slice/levelEditorSlice";

export type EditorPaneContextValue = {
  paneId: EditorPaneId;
  roomSource: EditorPaneRoomSource;
  editable: boolean;
  /**
   * the pane's room, loaded and following the store
   */
  loadedRoom: LoadedRoomCache;
};

const EditorPaneContext = createContext<EditorPaneContextValue | null>(null);

const cursorRoomJsonSelectors: LoadedRoomJsonSelectors = {
  selectRoomJsonWithPreviews: selectCurrentEditingRoomJsonWithPreviews,
  selectCommittedRoomJson: selectCurrentCommittedRoomJson,
};

const roomJsonSelectorsFor = (
  roomSource: EditorPaneRoomSource,
): LoadedRoomJsonSelectors => {
  if (roomSource.type === "cursorRoom") {
    return cursorRoomJsonSelectors;
  }
  const selectFixedRoomJson = (state: EditorRootState): EditorRoomJson => {
    const maybeRoomJson = selectRoom(state, roomSource.roomId);
    if (import.meta.env.DEV && maybeRoomJson === undefined) {
      throw new Error(
        `pane's room ${roomSource.roomId} is not in the campaign`,
      );
    }
    return maybeRoomJson!;
  };
  // a fixed room is never previewed:
  return {
    selectRoomJsonWithPreviews: selectFixedRoomJson,
    selectCommittedRoomJson: selectFixedRoomJson,
  };
};

export type EditorPaneProviderProps = PropsWithChildren<{
  /**
   * the id to register the pane under - generated if not given. Given by
   * a parent that reads the pane's state, eg what is picked in it
   */
  paneId?: EditorPaneId;
  roomSource: EditorPaneRoomSource;
  editable: boolean;
  /**
   * what the pane starts with selected
   */
  initialSelectedJsonItemIds?: EditorRoomItemId[];
  /**
   * become the active pane on mounting, even if another pane already is - eg
   * for a pane in a modal dialog
   */
  activateOnMount?: boolean;
}>;

/**
 * one room pane: registers it in the store under an id of its own for as long
 * as it is mounted, with a loaded room following the room it shows. Pointing
 * at or focusing anything inside makes it the active pane
 */
export const EditorPaneProvider = ({
  paneId: givenPaneId,
  roomSource,
  editable,
  initialSelectedJsonItemIds,
  activateOnMount = false,
  children,
}: EditorPaneProviderProps) => {
  // a pane keeps its id, room source and starting selection for its whole life:
  const [paneId] = useState(() => givenPaneId ?? generateEditorPaneId());
  const [mountedRoomSource] = useState(roomSource);
  const [mountedInitialSelection] = useState(initialSelectedJsonItemIds);
  const [paneContextValue, setPaneContextValue] =
    useState<EditorPaneContextValue | null>(null);

  useLayoutEffect(() => {
    editorStore.dispatch(
      editorPaneMounted({
        paneId,
        roomSource: mountedRoomSource,
        editable,
        activate: activateOnMount,
        initialSelectedJsonItemIds: mountedInitialSelection,
      }),
    );
    const loadedRoom = new LoadedRoomCache(
      editorStore,
      roomJsonSelectorsFor(mountedRoomSource),
    );
    paneLoadedRooms.set(paneId, loadedRoom);
    setPaneContextValue({
      paneId,
      roomSource: mountedRoomSource,
      editable,
      loadedRoom,
    });

    return () => {
      paneLoadedRooms.delete(paneId);
      loadedRoom.dispose();
      editorStore.dispatch(editorPaneUnmounted(paneId));
    };
  }, [
    paneId,
    mountedRoomSource,
    editable,
    activateOnMount,
    mountedInitialSelection,
  ]);

  if (paneContextValue === null) {
    // not registered yet, act as a gate
    return null;
  }

  const activate = () => editorStore.dispatch(editorPaneActivated(paneId));

  return (
    <EditorPaneContext value={paneContextValue}>
      <div
        class="contents"
        onPointerDownCapture={activate}
        onFocusCapture={activate}
      >
        {children}
      </div>
    </EditorPaneContext>
  );
};

export const useEditorPane = (): EditorPaneContextValue => {
  const paneContextValue = useContext(EditorPaneContext);
  if (paneContextValue === null) {
    throw new Error("useEditorPane must be used inside an EditorPaneProvider");
  }
  return paneContextValue;
};
