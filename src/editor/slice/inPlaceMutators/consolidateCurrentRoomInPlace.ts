import { consolidateItemsMap } from "../../../consolidateItems/consolidateItems";
import { reconsolidateItems } from "../../../consolidateItems/reconsolidateItems";
import { makeToasterConsolidationPredicate } from "../../../consolidateItems/toasterConsolidationPredicate";
import { type EditorJsonItemUnion } from "../../editorTypes";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";

export const consolidateCurrentRoomInPlace = (
  levelEditorSliceState: LevelEditorState,
  considerItem?: (item: EditorJsonItemUnion) => boolean,
) => {
  const currentRoom = selectCurrentRoomFromLevelEditorState(
    levelEditorSliceState,
  );
  const toasterPredicate = makeToasterConsolidationPredicate(currentRoom.items);
  const combinedPredicate =
    considerItem ?
      (item: EditorJsonItemUnion) =>
        considerItem(item) && toasterPredicate(item)
    : toasterPredicate;
  currentRoom.items = reconsolidateItems(
    consolidateItemsMap(currentRoom.items, combinedPredicate),
    toasterPredicate,
  );

  // consolidation could have removed some items, so no longer let them
  // be selected. However, we want to avoid a state update if nothing is being filtered,
  // out, whereas directly assigning .filter in immer will always make one:
  const filtered = levelEditorSliceState.selectedJsonItemIds.filter(
    (jsonItemId) => currentRoom.items[jsonItemId] !== undefined,
  );

  if (filtered.length !== levelEditorSliceState.selectedJsonItemIds.length) {
    levelEditorSliceState.selectedJsonItemIds = filtered;
  }
};
