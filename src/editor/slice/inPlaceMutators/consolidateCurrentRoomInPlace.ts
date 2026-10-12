import { consolidateItemsMap } from "../../../consolidateItems/consolidateItems";
import { reconsolidateItems } from "../../../consolidateItems/reconsolidateItems";
import { makeToasterConsolidationPredicate } from "../../../consolidateItems/toasterConsolidationPredicate";
import { type EditorJsonItemUnion } from "../../editorTypes";
import {
  selectCurrentCommittedRoomJsonFromLevelEditorState,
  selectCursorRoomSelectedJsonItemIdsFromLevelEditorState,
} from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { clearContextMenuXyInPlace } from "../reducers/contextMenuReducers";
import { setSelectedJsonItemIdsOnCursorRoomInPlace } from "./setSelectedJsonItemIdsOnCursorRoomInPlace";

export const consolidateCurrentRoomInPlace = (
  levelEditorSliceState: LevelEditorState,
  considerItem?: (item: EditorJsonItemUnion) => boolean,
) => {
  const currentRoom = selectCurrentCommittedRoomJsonFromLevelEditorState(
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
  const filtered = selectCursorRoomSelectedJsonItemIdsFromLevelEditorState(
    levelEditorSliceState,
  ).filter((jsonItemId) => currentRoom.items[jsonItemId] !== undefined);

  if (
    filtered.length !==
    selectCursorRoomSelectedJsonItemIdsFromLevelEditorState(
      levelEditorSliceState,
    ).length
  ) {
    setSelectedJsonItemIdsOnCursorRoomInPlace(levelEditorSliceState, filtered);
  }

  clearContextMenuXyInPlace(levelEditorSliceState);
};
