import { useSyncExternalStore } from "preact/compat";
import { useMemo } from "preact/hooks";

import { editorLoadedRoom } from "./editorLoadedRoom";
import { type EditorRoomState } from "./editorTypes";

/**
 * value returned by useEditorLoadedRoom; a new, reference-unequal object is
 * returned whenever the room updates, otherwise will be referentially equal.
 *
 * The room itself inside this object is patched-in-place for minor edits, even
 * if this containing object changes
 */
export type UseEditorLoadedRoomReturn = {
  /**
   * its identity only changes on a full reload (a room switch), since edits
   * patch it in place
   */
  roomState: EditorRoomState;
};

const getRevision = () => editorLoadedRoom.revision;

/** the editor's loaded room, for rendering: re-renders whenever it changes */
export const useEditorLoadedRoom = (): UseEditorLoadedRoomReturn => {
  const revision = useSyncExternalStore(
    editorLoadedRoom.subscribe,
    getRevision,
  );
  const roomState = editorLoadedRoom.getRoomState();

  // oxlint-disable-next-line react-hooks/exhaustive-deps -- we only want to recompute the wrapper when revision changes
  return useMemo(() => ({ roomState }), [revision]);
};
