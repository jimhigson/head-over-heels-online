import { consolidateItemsMap } from "../../../consolidateItems/consolidateItems";
import type { EditorJsonItemUnion } from "../../editorTypes";
import type { LevelEditorState } from "../levelEditorSlice";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSelectors";

export const consolidateCurrentRoomInPlace = (
  levelEditorSliceState: LevelEditorState,
  considerItem?: (item: EditorJsonItemUnion) => boolean,
) => {
  const currentRoom = selectCurrentRoomFromLevelEditorState(
    levelEditorSliceState,
  );
  currentRoom.items = consolidateItemsMap(currentRoom.items, considerItem);

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
