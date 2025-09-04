import type {
  JsonItemConfig,
  JsonItemType,
} from "../../../model/json/JsonItem";
import type { MonsterJsonConfig } from "../../../model/json/MonsterJsonConfig";
import type { Xyz } from "../../../utils/vectors/vectors";
import type {
  EditorJsonItem,
  EditorJsonItemUnion,
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJson,
  EditorRoomJsonItems,
} from "../../editorTypes";
import type { ItemTool } from "../../Tool";
import type {
  LevelEditorState,
  PreviewedRoomItemEdits,
} from "../levelEditorSlice";

import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSelectors";

export const nextItemId = (
  targetRoomJson: EditorRoomJson,
  baseName: string,
): EditorRoomItemId => {
  // eslint-disable-next-line no-constant-condition -- while(true) is ok; this will terminate
  for (let i = 1; true; i++) {
    const itemId = (
      i === 1 ? baseName : `${baseName}_${i}`) as EditorRoomItemId;
    if (!targetRoomJson.items[itemId]) {
      return itemId;
    }
  }
};

export const nextItemIdForItemTool = <T extends JsonItemType = JsonItemType>(
  targetRoomJson: EditorRoomJson,
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

  const baseName =
    itemTool.type === "monster" ?
      // special case monsters since they have so many variations:
      (itemTool.config as MonsterJsonConfig).which
    : itemTool.type;

  return nextItemId(targetRoomJson, baseName);
};

export const addItemInPlace = <T extends JsonItemType = JsonItemType>(
  state: LevelEditorState,
  itemTool: ItemTool<T>,
  blockPosition: Xyz,
  isPreview: boolean,
): [EditorRoomItemId, EditorJsonItem<T>] => {
  const room = selectCurrentRoomFromLevelEditorState(state);
  const id = nextItemIdForItemTool(room, itemTool, isPreview);

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
