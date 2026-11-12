import { editorStore } from "../../store/store";
import { selectActiveOpenRoomId } from "../slice/levelEditorSlice";
import { type OpenRoomId } from "../slice/OpenRoom";
import { type LoadedRoomCache } from "./LoadedRoomCache";

/**
 * the loaded room of each open room a pane is drawing, kept here while it is
 * drawn so code outside the pane (commands, thunks) can reach it by its id
 */
export const loadedRoomCaches = new Map<OpenRoomId, LoadedRoomCache>();

/**
 * the active open room's loaded room, if a pane is drawing it
 */
export const activeOpenRoomLoadedRoom = (): LoadedRoomCache | undefined =>
  loadedRoomCaches.get(selectActiveOpenRoomId(editorStore.getState()));
