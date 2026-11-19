import { useMemo } from "preact/hooks";

import { useEditorAppSelector } from "../../../store/store";
import { CommandContextMenuItem } from "../../commands/CommandContextMenuItem";
import { activeOpenRoomLoadedRoom } from "../../loadedRoomCache/loadedRoomCaches";
import {
  selectionSnapResolutions,
  snapLabels,
  type SnapResolution,
} from "../../selectionSnapResolutions";
import {
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelections,
  snapSelectedItemsToGrid,
} from "../../slice/levelEditorSlice";

/**
 * the grids the selection can be snapped to, in the active open room
 */
const useSelectionSnapResolutions = (): SnapResolution[] => {
  const selectedJsonItemIds = useEditorAppSelector(
    selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelections,
  );
  const roomJson = useEditorAppSelector(selectCurrentCommittedRoomJson);

  return useMemo(() => {
    const roomState = activeOpenRoomLoadedRoom()?.getRoomState();
    return roomState === undefined ?
        []
      : selectionSnapResolutions(roomState, roomJson, selectedJsonItemIds);
  }, [selectedJsonItemIds, roomJson]);
};

/**
 * Snaps the selected items across onto the grid or half grid - one item for
 * each that some are off, and snapping them to wouldn't collide
 */
export const SnapToGridMenuItems = () => (
  <>
    {useSelectionSnapResolutions().map((gridResolution) => (
      <CommandContextMenuItem
        key={gridResolution}
        command={{
          type: "action",
          label: snapLabels[gridResolution],
          action: () =>
            snapSelectedItemsToGrid({
              gridResolution,
              timestamp: Date.now(),
            }),
        }}
      />
    ))}
  </>
);
