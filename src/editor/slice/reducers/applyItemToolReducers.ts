import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import {
  type CybermanConfig,
  type MonsterJsonConfig,
} from "../../../model/json/MonsterJsonConfig";
import { type Xyz } from "../../../utils/vectors/vectors";
import { type EditorJsonItemUnion } from "../../editorTypes";
import { type ItemTool } from "../../RoomEditingArea/interactivity/Tool";
import { addDoorInPlace } from "../inPlaceMutators/addDoorInPlace";
import { addItemInPlace } from "../inPlaceMutators/addItemInPlace";
import { consolidateCurrentRoomInPlace } from "../inPlaceMutators/consolidateCurrentRoomInPlace";
import { selectCursorRoomId } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { type UndoItemEntry } from "./undoDescription";
import { snapshotRoomForUndo } from "./undoReducers";

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
  timestamp: number;
};

export const applyItemToolReducers = {
  applyItemTool(
    _state,
    {
      payload: { blockPosition, pointedAtItemJson, preview, timestamp },
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

    const roomSnapshot = !preview ? snapshotRoomForUndo(state) : undefined;

    if (!preview) {
      state.pendingEdits = undefined;
    } else {
      state.pendingEdits = {
        edits: {},
        description: { kind: "editRoomJson" },
        timestamp,
      };
    }
    state.selectedJsonItemIds = [];

    let addedEntry: UndoItemEntry;

    switch (true) {
      case isDoorTool(tool.item): {
        if (pointedAtItemJson.type !== "wall") {
          throw new Error("doors can only be added on walls");
        }

        addedEntry = addDoorInPlace(
          state,
          blockPosition,
          pointedAtItemJson.config.direction,
          tool.item,
          preview,
        );
        break;
      }

      case isCybermanTool(tool.item) &&
        tool.item.config.activated === "on" &&
        pointedAtItemJson.type === "deadlyBlock" &&
        pointedAtItemJson.config.style === "toaster" &&
        // putting down one block above the toaster:
        pointedAtItemJson.position.z + 1 === blockPosition.z: {
        addedEntry = addItemInPlace(
          state,
          {
            ...tool.item,
            config: {
              ...tool.item.config,
              // special case for cybermen - if placed on a toaster, they start charging:
              activated: "off",
            },
          },
          blockPosition,
          preview,
        ) as UndoItemEntry;
        break;
      }

      default: {
        // add any other item:
        addedEntry = addItemInPlace(
          state,
          tool.item,
          blockPosition,
          preview,
        ) as UndoItemEntry;
      }
    }

    const [addedId, addedItem] = addedEntry;
    const description = {
      kind: "itemAction" as const,
      verb: "Add",
      items: [[addedId, addedItem]] as UndoItemEntry[],
    };

    if (!preview) {
      const roomId = selectCursorRoomId(state);
      state.history[roomId] ??= { undo: [], redo: [] };
      const { undo, redo } = state.history[roomId];
      redo.length = 0;
      undo.push({ room: roomSnapshot!, description, timestamp });
    } else {
      state.pendingEdits = {
        edits: state.pendingEdits!.edits,
        description,
        timestamp,
      };
    }

    if (!preview) {
      if (state.autoCoalesce) {
        consolidateCurrentRoomInPlace(state);
      } else {
        // consolidate just the walls in the room - these are always done:
        consolidateCurrentRoomInPlace(state, (item) => item.type === "wall");
      }
    }
  },
} satisfies SliceCaseReducers<LevelEditorState>;
