import { createSelector } from "@reduxjs/toolkit";

import {
  type EditorRootState,
  editorStore,
  useEditorAppSelector,
} from "../../store/store";
import { Button } from "../../ui/Button";
import { selectCursorRoom } from "../slice/levelEditorSelectors";
import { coalesceSelectedRooms } from "../slice/levelEditorSlice";
import { areRoomsCoalesceable } from "./areRoomsCoalesceable";
import { mapAreaIndexOfRoom } from "./mapAreaIndexOfRoom";
import { selectEditorMapData } from "./useEditorMapData";

export const selectIsCoalesceable = createSelector(
  [
    selectEditorMapData,
    (state: EditorRootState) => state.levelEditor.selectedRoomIds,
    (state: EditorRootState) => selectCursorRoom(state.levelEditor).roomId,
  ],
  (mapData, selectedRoomIds, cursorRoomId) => {
    if (mapData.isError) {
      return false;
    }
    // only rooms in the shown area can be next to each other:
    const shownArea =
      mapData.areas[mapAreaIndexOfRoom(mapData.areas, cursorRoomId)];
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
