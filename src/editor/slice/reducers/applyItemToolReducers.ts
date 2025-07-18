import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";
import type { LevelEditorState } from "../levelEditorSlice";
import { type Xyz } from "../../../utils/vectors/vectors";
import type { EditorJsonItemUnion } from "../../editorTypes";
import type { ItemTool } from "../../Tool";
import { pushUndoInPlace } from "./undoReducers";
import type {
  CybermanConfig,
  MonsterJsonConfig,
} from "../../../model/json/MonsterJsonConfig";
import { addDoorInPlace } from "./addDoorInPlace";
import { addItemInPlace } from "./addItemInPlace";

const isDoorTool = (itemTool: ItemTool): itemTool is ItemTool<"door"> => {
  return itemTool.type === "door";
};
const isCybermanTool = (
  itemTool: ItemTool,
): itemTool is ItemTool<"monster", CybermanConfig> => {
  return (
    itemTool.type === "monster" &&
    (itemTool.config as MonsterJsonConfig).which === "cyberman"
  );
};

export type ApplyToolToRoomJsonPayload = {
  blockPosition: Xyz;
  /**
   * the item (in play, not in json) in the room-in-play preview that the
   * user clicked on to use this tool
   */
  pointedAtItemJson: EditorJsonItemUnion;

  /** if preview, items added are put into the staging area */
  preview: boolean;
};

export const applyItemToolReducers = {
  applyItemTool(
    _state,
    {
      payload: { blockPosition, pointedAtItemJson, preview },
    }: PayloadAction<ApplyToolToRoomJsonPayload>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    const { tool } = state;

    if (tool.type !== "item") {
      throw new Error(
        "applying item tool reducer while the current tool is not an item tool",
      );
    }

    if (!preview) {
      pushUndoInPlace(state);
      state.previewedEdits = {};
    }
    state.selectedJsonItemIds = [];

    switch (true) {
      case isDoorTool(tool.item): {
        if (pointedAtItemJson.type !== "wall") {
          throw new Error("doors can only be added on walls");
        }

        addDoorInPlace(
          state,
          blockPosition,
          pointedAtItemJson.config.direction,
          tool.item,
          preview,
        );
        break;
      }

      case isCybermanTool(tool.item) &&
        pointedAtItemJson.type === "deadlyBlock" &&
        pointedAtItemJson.config.style === "toaster" &&
        // putting down one block above the toaster:
        pointedAtItemJson.position.z + 1 === blockPosition.z: {
        // special case for cybermen - if placed on a toaster, they start charging

        addItemInPlace(
          state,
          {
            ...tool.item,
            config: {
              ...tool.item.config,
              activated: "off",
            },
          },
          blockPosition,
          preview,
        );
        break;
      }

      default: {
        // add any other item:
        addItemInPlace(state, tool.item, blockPosition, preview);
      }
    }
  },
} satisfies SliceCaseReducers<LevelEditorState>;
