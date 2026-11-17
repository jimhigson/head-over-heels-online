import { createSelector } from "@reduxjs/toolkit";

import {
  type EditorRootState,
  editorStore,
  useEditorAppSelector,
} from "../../store/store";
import { Button } from "../../ui/Button";
import { selectCursorRoomFromLevelEditorState } from "../slice/levelEditorSelectors";
import { coalesceSelectedRooms } from "../slice/levelEditorSlice";
import { areRoomsCoalesceable } from "./areRoomsCoalesceable";
import { mapAreaIndexOfRoom } from "./mapAreaIndexOfRoom";
import { selectEditorMapAreas } from "./useEditorMapData";

export const selectIsCoalesceable = createSelector(
  [
    selectEditorMapAreas,
    (state: EditorRootState) => state.levelEditor.selectedRoomIds,
    (state: EditorRootState) =>
      selectCursorRoomFromLevelEditorState(state.levelEditor).roomId,
  ],
  (mapAreas, selectedRoomIds, cursorRoomId) => {
    if (mapAreas.isError) {
      return false;
    }
    // only rooms in the shown area can be next to each other:
    const shownArea =
      mapAreas.areas[mapAreaIndexOfRoom(mapAreas.areas, cursorRoomId)];
    return areRoomsCoalesceable(selectedRoomIds, shownArea.gridPositions)
      .coalesceable;
  },
);

export const CoalesceButton = () => {
  const coalesceable = useEditorAppSelector(selectIsCoalesceable);
  const roomCount = useEditorAppSelector(
    (state) => state.levelEditor.selectedRoomIds.length,
  );

  if (!coalesceable) {
    return null;
  }

  return (
    <div class="absolute bottom-1 left-1 z-10">
      <Button
        class="p-1"
        onClick={() => editorStore.dispatch(coalesceSelectedRooms())}
        tooltipContent="Merge selected rooms into one"
      >
        <span class="text-white text-single-line">{`Merge ${roomCount} rooms`}</span>
      </Button>
    </div>
  );
};
