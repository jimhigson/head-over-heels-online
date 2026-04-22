import type {
  JsonItemConfig,
  JsonItemType,
} from "../../../model/json/JsonItem";
import type { Xyz } from "../../../utils/vectors/vectors";
import type {
  EditorJsonItem,
  EditorJsonItemUnion,
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJsonItems,
} from "../../editorTypes";
import type { ItemTool } from "../../RoomEditingArea/interactivity/Tool";
import type {
  LevelEditorState,
  PreviewedRoomItemEdits,
} from "../levelEditorSlice";

import { typePrefix } from "../../../model/json/typePrefix";
import { keys } from "../../../utils/entries";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSelectors";

/**
 * Finds the next unused id of the form `<baseName>`, `<baseName>1`,
 * `<baseName>2`, … — matches the scheme used by `keyItems` for auto-converted
 * rooms so ids look consistent across both sources.
 */
export const nextItemId = (
  existingIds: Iterable<EditorRoomItemId>,
  baseName: string,
): EditorRoomItemId => {
  const existing = new Set(existingIds);
  // eslint-disable-next-line no-constant-condition -- while(true) is ok; this will terminate
  for (let i = 0; true; i++) {
    const itemId = (i === 0 ? baseName : `${baseName}${i}`) as EditorRoomItemId;
    if (!existing.has(itemId)) {
      return itemId;
    }
  }
};

export const nextItemIdForItemTool = <T extends JsonItemType = JsonItemType>(
  existingIds: Iterable<EditorRoomItemId>,
  itemTool: ItemTool<T>,
  isPreview: boolean,
): EditorRoomItemId => {
  // head/heels have their own ids, and can only be one of them:
  if (itemTool.type === "player") {
    const { which } = itemTool.config as JsonItemConfig<
      "player",
      EditorRoomId,
      EditorRoomItemId
    >;
    // since there can be only one head/heels in the room, it looks weird
    // if the tool removes them while hovering, so this is the only item
    // that gets a different id while in preview, so there can temporarily
    // be two of them in the room:
    return (isPreview ? `preview-${which}` : which) as EditorRoomItemId;
  }

  return nextItemId(existingIds, typePrefix[itemTool.type]);
};

export const addItemInPlace = <T extends JsonItemType = JsonItemType>(
  state: LevelEditorState,
  itemTool: ItemTool<T>,
  blockPosition: Xyz,
  isPreview: boolean,
): [EditorRoomItemId, EditorJsonItem<T>] => {
  const room = selectCurrentRoomFromLevelEditorState(state);
  const id = nextItemIdForItemTool(keys(room.items), itemTool, isPreview);

  const target = roomEditTarget(state, isPreview);

  const itemJson = {
    type: itemTool.type,
    config: itemTool.config,
    position: blockPosition,
  };

  target[id] = itemJson as EditorJsonItemUnion;

  return [id, itemJson as EditorJsonItem<T>];
};

export const roomEditTarget = (
  state: LevelEditorState,
  isPreview: boolean,
  roomId: EditorRoomId = state.currentlyEditingRoomId,
): EditorRoomJsonItems | PreviewedRoomItemEdits => {
  return isPreview ?
      state.previewedEdits
    : (state.campaignInProgress.rooms[roomId].items as EditorRoomJsonItems);
};
