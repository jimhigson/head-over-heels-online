import { editorStore } from "../store/store";
import { type LoadedRoomCache } from "./LoadedRoomCache";
import { type EditorPaneId } from "./slice/EditorPane";
import { selectActivePaneId } from "./slice/levelEditorSlice";

/**
 * each mounted pane's loaded room, kept here for the pane's lifetime so code
 * outside the pane (commands, thunks) can reach it by the pane's id
 */
export const paneLoadedRooms = new Map<EditorPaneId, LoadedRoomCache>();

/** the active pane's loaded room, if any pane is mounted */
export const activePaneLoadedRoom = (): LoadedRoomCache | undefined => {
  const activePaneId = selectActivePaneId(editorStore.getState());
  return activePaneId === undefined ? undefined : (
      paneLoadedRooms.get(activePaneId)
    );
};
