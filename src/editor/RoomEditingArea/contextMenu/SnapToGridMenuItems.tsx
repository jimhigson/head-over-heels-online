import { useMemo } from "preact/hooks";

import { useEditorAppSelector } from "../../../store/store";
import { originXyz, subXyz, xyzEqual } from "../../../utils/vectors/vectors";
import { CommandContextMenuItem } from "../../commands/CommandContextMenuItem";
import { activeOpenRoomLoadedRoom } from "../../loadedRoomCache/loadedRoomCaches";
import {
  type GridResolution,
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectedJsonItemIds,
  snapSelectedItemsToGrid,
} from "../../slice/levelEditorSlice";
import { snapGridResolution } from "../../snapGridResolution";
import { snappedToGridXy } from "../../snappedToGridXy";
import { itemMoveOrResizeWouldCollide } from "../cursor/editWouldCollide";

const snapLabels = {
  1: "Snap to grid",
  0.5: "Snap to half grid",
} as const satisfies Partial<Record<GridResolution, string>>;

type SnapResolution = keyof typeof snapLabels;

const snapResolutions: SnapResolution[] = [1, 0.5];

/**
 * the grids the selection can be snapped to: those some selected item is off,
 * that none would collide once snapped to. The half grid is left out if any
 * selected item moves only in whole blocks
 */
const useSelectionSnapResolutions = (): SnapResolution[] => {
  const selectedJsonItemIds = useEditorAppSelector(
    selectCursorRoomSelectedJsonItemIds,
  );
  const roomJson = useEditorAppSelector(selectCurrentCommittedRoomJson);

  return useMemo(() => {
    const roomState = activeOpenRoomLoadedRoom()?.getRoomState();
    if (roomState === undefined) {
      return [];
    }
    const selectedItems = selectedJsonItemIds
      .map((id) => [id, roomJson.items[id]] as const)
      .filter(([, item]) => item !== undefined);
    const selectedTypes = selectedItems.map(([, { type }]) => type);

    const canSnapTo = (gridResolution: SnapResolution) => {
      const snapMoves = selectedItems
        .map(([id, { position }]) => ({
          id,
          snapDelta: subXyz(
            snappedToGridXy(position, gridResolution),
            position,
          ),
        }))
        .filter(({ snapDelta }) => !xyzEqual(snapDelta, originXyz));
      return (
        snapMoves.length > 0 &&
        !snapMoves.some(({ id, snapDelta }) =>
          itemMoveOrResizeWouldCollide({
            roomState,
            roomJson,
            jsonItemIds: [id],
            blockPositionDelta: snapDelta,
          }),
        )
      );
    };

    return snapResolutions.filter(
      (gridResolution) =>
        snapGridResolution(gridResolution, selectedTypes) === gridResolution &&
        canSnapTo(gridResolution),
    );
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
