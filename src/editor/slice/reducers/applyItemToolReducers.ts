import type { PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";

import type {
  CybermanConfig,
  MonsterJsonConfig,
} from "../../../model/json/MonsterJsonConfig";
import { addXyz, originXyz, type Xyz } from "../../../utils/vectors/vectors";
import type {
  EditorJsonItemUnion,
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJsonItems,
} from "../../editorTypes";
import { isDoorToolItems } from "../../RoomEditingArea/interactivity/isDoorToolItems";
import type { ItemToolItem } from "../../RoomEditingArea/interactivity/Tool";
import { addDoorInPlace } from "../inPlaceMutators/addDoorInPlace";
import {
  addItemInPlace,
  roomEditTarget,
} from "../inPlaceMutators/addItemInPlace";
import { commitPendingNudgeInPlace } from "../inPlaceMutators/commitPendingNudgeInPlace";
import { consolidateCurrentRoomInPlace } from "../inPlaceMutators/consolidateCurrentRoomInPlace";
import { setSelectionOnCursorRoomInPlace } from "../inPlaceMutators/setSelectionOnCursorRoomInPlace";
import { selectCursorRoomIdFromLevelEditorState } from "../levelEditorSelectors";
import type { LevelEditorState } from "../levelEditorSlice";
import { isAboveToaster } from "./isAboveToaster";
import type { UndoItemEntry } from "./undoDescription";
import { snapshotRoomForUndo } from "./undoReducers";

const isCybermanItem = (
  toolItem: ItemToolItem,
): toolItem is ItemToolItem<"monster", CybermanConfig> => {
  return (
    toolItem.type === "monster" &&
    (toolItem.config as MonsterJsonConfig).which === "cyberman"
  );
};

export type ApplyToolToRoomJsonPayload = {
  /**
   * the room the tool is used in - previewed in any pane's room, but only
   * applied in the cursor room
   */
  roomId: EditorRoomId;
  /**
   * where the tool puts its items down: each goes at its own position
   * relative to this
   */
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

/**
 * put down the item tool's items in a room - or, if previewing, stage them
 * as the pending edits
 */
export const applyItemToolInPlace = (
  state: LevelEditorState,
  payload: ApplyToolToRoomJsonPayload,
): void => {
  const { roomId, blockPosition, pointedAtItemJson, preview, timestamp } =
    payload;
  commitPendingNudgeInPlace(state);

  const { tool } = state;

  if (tool.type !== "item") {
    throw new Error(
      "applying item tool reducer while the current tool is not an item tool",
    );
  }

  const isCursorRoom = roomId === selectCursorRoomIdFromLevelEditorState(state);
  if (import.meta.env.DEV && !preview && !isCursorRoom) {
    throw new Error(
      `item tool applied in room ${roomId}, which isn't the cursor room`,
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
      madeBy: { type: "itemTool", placement: payload },
    };
  }
  if (isCursorRoom) {
    setSelectionOnCursorRoomInPlace(state, []);
  }

  const addedEntries: (readonly [EditorRoomItemId, EditorJsonItemUnion])[] = [];

  if (isDoorToolItems(tool.items)) {
    if (pointedAtItemJson.type !== "wall") {
      throw new Error("doors can only be added on walls");
    }
    const [doorItem] = tool.items;

    addedEntries.push(
      addDoorInPlace(
        state,
        roomId,
        addXyz(blockPosition, doorItem.position ?? originXyz),
        pointedAtItemJson.config.direction,
        doorItem,
        preview,
      ),
    );
  } else {
    const roomItems = state.campaignInProgress.rooms[roomId]
      .items as EditorRoomJsonItems;
    for (const toolItem of tool.items) {
      const { position: toolItemPosition = originXyz } = toolItem;
      const itemPosition = addXyz(blockPosition, toolItemPosition);

      addedEntries.push(
        (
          isCybermanItem(toolItem) &&
            toolItem.config.activated === "on" &&
            (isAboveToaster(itemPosition, roomItems) ||
              // toasters put down by this tool are only in the preview's items:
              (preview &&
                isAboveToaster(
                  itemPosition,
                  roomEditTarget(state, preview, roomId),
                )))
        ) ?
          (addItemInPlace(
            state,
            roomId,
            {
              ...toolItem,
              config: {
                ...toolItem.config,
                // special case for cybermen - if placed on a toaster, they start charging:
                activated: "off",
              },
            },
            itemPosition,
            preview,
          ) as readonly [EditorRoomItemId, EditorJsonItemUnion])
        : (addItemInPlace(
            state,
            roomId,
            toolItem,
            itemPosition,
            preview,
          ) as readonly [EditorRoomItemId, EditorJsonItemUnion]),
      );
    }
  }

  const description = {
    kind: "itemAction" as const,
    verb: "Add",
    items: addedEntries.map(
      ([addedId, addedItem]) =>
        [
          { jsonItemId: addedId, whichEditorGhost: undefined },
          addedItem,
        ] as UndoItemEntry,
    ),
  };

  if (!preview) {
    state.history[roomId] ??= { undo: [], redo: [] };
    const { undo, redo } = state.history[roomId];
    redo.length = 0;
    undo.push({
      room: roomSnapshot!,
      description,
      timestamp,
      link: undefined,
    });
  } else {
    state.pendingEdits = {
      edits: state.pendingEdits!.edits,
      description,
      timestamp,
      madeBy: { type: "itemTool", placement: payload },
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
};

export const applyItemToolReducers = {
  applyItemTool(
    _state,
    { payload }: PayloadAction<ApplyToolToRoomJsonPayload>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    applyItemToolInPlace(_state as LevelEditorState, payload);
  },
} satisfies SliceCaseReducers<LevelEditorState>;
