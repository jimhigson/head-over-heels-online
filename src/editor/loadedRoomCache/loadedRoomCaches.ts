import { startEditorListening } from "../../store/listenerMiddleware";
import { editorStore } from "../../store/store";
import { selectActiveOpenRoomId } from "../slice/levelEditorSlice";
import { type OpenRoomId } from "../slice/OpenRoom";
import { layoutNodesOfType, type PaneLayout } from "../slice/PaneLayout";
import { LoadedRoomCache } from "./LoadedRoomCache";

/**
 * the loaded room of every open room in the store - made as the open room
 * enters the store, disposed of as it leaves
 */
const loadedRoomCaches = new Map<OpenRoomId, LoadedRoomCache>();

const changeListeners = new Set<() => void>();

/**
 * make loaded rooms for open rooms that have entered the store, and dispose of
 * those whose open rooms have left it
 */
const followOpenRoomsInStore = (layout: PaneLayout) => {
  let hasChanged = false;
  for (const [openRoomId, loadedRoom] of loadedRoomCaches) {
    if (!(openRoomId in layout.nodes)) {
      loadedRoom.dispose();
      loadedRoomCaches.delete(openRoomId);
      hasChanged = true;
    }
  }
  for (const { id: openRoomId } of layoutNodesOfType(layout, "openRoom")) {
    if (!loadedRoomCaches.has(openRoomId)) {
      loadedRoomCaches.set(
        openRoomId,
        new LoadedRoomCache(editorStore, openRoomId),
      );
      hasChanged = true;
    }
  }
  if (hasChanged) {
    for (const changeListener of changeListeners) {
      changeListener();
    }
  }
};

/**
 * keep a loaded room for each open room in the store, from now on
 */
export const registerLoadedRoomCachesListener = () => {
  followOpenRoomsInStore(editorStore.getState().levelEditor.layout);
  return startEditorListening({
    predicate: (_action, currentState, originalState) =>
      currentState.levelEditor.layout.nodes !==
      originalState.levelEditor.layout.nodes,
    effect(_action, { getState }) {
      followOpenRoomsInStore(getState().levelEditor.layout);
    },
  });
};

/**
 * be told whenever loaded rooms are made or disposed of
 */
export const subscribeToLoadedRoomCaches = (changeListener: () => void) => {
  changeListeners.add(changeListener);
  return () => {
    changeListeners.delete(changeListener);
  };
};

/**
 * an open room's loaded room - undefined once the open room has left the store
 * (in case we have a stale openRoomId reference)
 */
export const findLoadedRoomCache = (
  openRoomId: OpenRoomId,
): LoadedRoomCache | undefined => loadedRoomCaches.get(openRoomId);

/**
 * the active open room's loaded room
 */
export const activeOpenRoomLoadedRoom = (): LoadedRoomCache | undefined =>
  findLoadedRoomCache(selectActiveOpenRoomId(editorStore.getState()));
