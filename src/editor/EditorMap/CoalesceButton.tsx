import { createSelector } from "@reduxjs/toolkit";

import {
  type EditorRootState,
  editorStore,
  useEditorAppSelector,
} from "../../store/store";
import { Button } from "../../ui/Button";
import { coalesceSelectedRooms } from "../slice/levelEditorSlice";
import { areRoomsCoalesceable } from "./areRoomsCoalesceable";
import { selectEditorShownMapArea } from "./useEditorMapData";

export const selectIsCoalesceable = createSelector(
  [
    selectEditorShownMapArea,
    (state: EditorRootState) => state.levelEditor.selectedRoomIds,
  ],
  (shownArea, selectedRoomIds) =>
    // only rooms in the shown area can be next to each other:
    shownArea !== undefined &&
    areRoomsCoalesceable(selectedRoomIds, shownArea.gridPositions).coalesceable,
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
