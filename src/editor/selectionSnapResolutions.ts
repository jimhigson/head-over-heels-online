import { fromEntries, keysIter } from "../utils/entries";
import { isEmpty } from "../utils/iterators/isEmpty";
import { originXyz, subXyz, xyzEqual } from "../utils/vectors/vectors";
import {
  type EditorRoomItemId,
  type EditorRoomJson,
  type EditorRoomState,
} from "./editorTypes";
import {
  type ItemMoveOrResize,
  itemMoveOrResizeWouldCollide,
  type ItemMovesOrResizes,
} from "./RoomEditingArea/cursor/editWouldCollide";
import { type GridResolution } from "./slice/levelEditorSlice";
import { snapGridResolution } from "./snapGridResolution";
import { snappedToGridXy } from "./snappedToGridXy";

export const snapLabels = {
  1: "Snap to grid",
  0.5: "Snap to half grid",
} as const satisfies Partial<Record<GridResolution, string>>;

export type SnapResolution = keyof typeof snapLabels;

const snapResolutions: SnapResolution[] = [1, 0.5];

/**
 * the grids the selection can be snapped to: those some selected item is off,
 * that none would collide once snapped to. The half grid is left out if any
 * selected item moves only in whole blocks
 */
export const selectionSnapResolutions = (
  /**
   * the loaded room, to check the snapped items for collisions in
   */
  roomState: EditorRoomState,
  roomJson: EditorRoomJson,
  selectedJsonItemIds: EditorRoomItemId[],
): SnapResolution[] => {
  const selectedItems = selectedJsonItemIds
    .map((id) => [id, roomJson.items[id]] as const)
    .filter(([, item]) => item !== undefined);
  const selectedTypes = selectedItems.map(([, { type }]) => type);

  const canSnapTo = (gridResolution: SnapResolution) => {
    const snapMoves: ItemMovesOrResizes = fromEntries(
      selectedItems
        .map(([id, { position }]): [EditorRoomItemId, ItemMoveOrResize] => [
          id,
          {
            blockPositionDelta: subXyz(
              snappedToGridXy(position, gridResolution),
              position,
            ),
          },
        ])
        .filter(
          ([, { blockPositionDelta }]) =>
            !xyzEqual(blockPositionDelta, originXyz),
        ),
    );
    return (
      !isEmpty(keysIter(snapMoves)) &&
      // the items all snap together, so are checked together:
      !itemMoveOrResizeWouldCollide({
        roomState,
        roomJson,
        movesOrResizes: snapMoves,
      })
    );
  };

  return snapResolutions.filter(
    (gridResolution) =>
      snapGridResolution(gridResolution, selectedTypes) === gridResolution &&
      canSnapTo(gridResolution),
  );
};
