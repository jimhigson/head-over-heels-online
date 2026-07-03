import { createSelector } from "@reduxjs/toolkit";

import {
  type EditorRootState,
  editorStore,
  useEditorAppSelector,
} from "../../store/store";
import { Button } from "../../ui/Button";
import { coalesceSelectedRooms } from "../slice/levelEditorSlice";
import { areRoomsCoalesceable } from "./areRoomsCoalesceable";
import { selectEditorMapData } from "./useEditorMapData";

export const selectIsCoalesceable = createSelector(
  [
    selectEditorMapData,
    (state: EditorRootState) => state.levelEditor.selectedRoomIds,
  ],
  (mapData, selectedRoomIds) => {
    if (mapData.isError) {
      return false;
    }
    return areRoomsCoalesceable(selectedRoomIds, mapData.gridPositions)
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
    <div className="absolute bottom-1 left-1 z-10">
      <Button
        className="p-1"
        onClick={() => editorStore.dispatch(coalesceSelectedRooms())}
        tooltipContent="Merge selected rooms into one"
      >
        <span className="text-white text-single-line">{`Merge ${roomCount} rooms`}</span>
      </Button>
    </div>
  );
};
