import { nextItemId } from "../../../model/inPlaceMutators/nextItemId";
import {
  type JsonItemConfig,
  type JsonItemType,
} from "../../../model/json/JsonItem";
import { typePrefix } from "../../../model/json/typePrefix";
import { keys } from "../../../utils/entries";
import { type Xyz } from "../../../utils/vectors/vectors";
import {
  type EditorJsonItem,
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJsonItems,
} from "../../editorTypes";
import { type ItemTool } from "../../RoomEditingArea/interactivity/Tool";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSelectors";
import {
  type LevelEditorState,
  type PreviewedRoomItemEdits,
} from "../levelEditorSlice";

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

/**
 * get the items object to write edits to for either preview
 * or permanent edits
 **/
export const roomEditTarget = (
  state: LevelEditorState,
  isPreview: boolean,
  roomId: EditorRoomId = state.currentlyEditing.roomId,
): EditorRoomJsonItems | PreviewedRoomItemEdits => {
  if (isPreview) {
    if (state.pendingEdits === undefined) {
      throw new Error(
        "roomEditTarget called in preview mode without pendingEdits",
      );
    }
    return state.pendingEdits.edits;
  }
  return state.campaignInProgress.rooms[roomId].items as EditorRoomJsonItems;
};
