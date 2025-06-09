import type { PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import type { LevelEditorState } from "../levelEditorSlice";
import { type Xyz } from "../../../utils/vectors/vectors";
import type {
  JsonItemConfig,
  JsonItemType,
  JsonItemUnion,
} from "../../../model/json/JsonItem";
import type {
  EditorRoomId,
  EditorRoomItemId,
  EditorUnionOfAllItemInPlayTypes,
} from "../../EditorRoomId";
import type { ItemTool } from "../../Tool";
import { selectCurrentRoomFromLevelEditorState } from "../levelEditorSliceSelectors";
import { cutHoleInWallsForDoors } from "./cutHoleInWallsForDoor";

const addItemInPlace = <T extends JsonItemType = JsonItemType>(
  state: LevelEditorState,
  type: T,
  config: JsonItemConfig<T, EditorRoomId, EditorRoomItemId>,
  blockPosition: Xyz,
) => {
  const id = `item${type}#${state.nextItemId}` as EditorRoomItemId;

  const room = selectCurrentRoomFromLevelEditorState(state);
  state.nextItemId++;

  // add to the room json - the loaded state of the room will flow from there
  room.items[id] = {
    type,
    config,
    position: blockPosition,
  } as JsonItemUnion<EditorRoomId, EditorRoomItemId>;
};

const isDoorTool = (itemTool: ItemTool): itemTool is ItemTool<"door"> => {
  return itemTool.type === "door";
};

type ApplyToolToRoomJsonPayload = {
  blockPosition: Xyz;
  /**
   * the item (in play, not in json) in the room-in-play preview that the
   * user clicked on to use this tool
   */
  pointedAtItem: EditorUnionOfAllItemInPlayTypes;
};

export const applyToolReducers = {
  applyToolToRoomJson(
    _state,
    {
      payload: { blockPosition, pointedAtItem },
    }: PayloadAction<ApplyToolToRoomJsonPayload>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const { tool } = state;

    switch (tool?.type) {
      case "item": {
        const itemTool = tool.item;
        if (isDoorTool(itemTool) && pointedAtItem.type === "wall") {
          const doorDirection = pointedAtItem.config.direction;

          // for doors, trim walls around where the door was placed:
          cutHoleInWallsForDoors(state, doorDirection, blockPosition);

          addItemInPlace(
            state,
            tool.item.type,
            {
              ...tool.item.config,
              direction: doorDirection,
            },
            blockPosition,
          );
        } else {
          addItemInPlace(
            state,
            tool.item.type,
            tool.item.config,
            blockPosition,
          );
        }
      }
    }
  },
} satisfies SliceCaseReducers<LevelEditorState>;
