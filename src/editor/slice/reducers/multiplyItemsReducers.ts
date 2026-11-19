import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { nextItemIdInItems } from "../../../model/inPlaceMutators/nextItemId";
import { typePrefix } from "../../../model/json/typePrefix";
import { keys } from "../../../utils/entries";
import { addXyz, originXyz, type Xyz } from "../../../utils/vectors/vectors";
import {
  type EditorJsonItemWithTimes,
  type EditorRoomItemId,
} from "../../editorTypes";
import { growArgs, shrinkArgs } from "../../toolbar/buttons/nudgeDirections";
import { addNudgeStepToPreviewInPlace } from "../inPlaceMutators/addNudgeStepToPreviewInPlace";
import { selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelectionsFromLevelEditorState } from "../levelEditorSelectors";
import {
  type LevelEditorState,
  type PreviewedRoomItemEdits,
} from "../levelEditorSlice";
import { type MultiplyPlan, type MultiplyType } from "../multiplyPlan";
import { previewedItemsIter } from "../previewedItemsIter";
import {
  addTimesDeltaToJsonItemInPlace,
  moveOrResizeOutcome,
} from "./moveOrResizeItemPreview/moveOrResizeOutcome";

export type MultiplySelectedItemsPayload = {
  /**
   * a world unit vector
   */
  direction: Xyz;
  multiplyType: MultiplyType;
  /**
   * what to do to each item - already cleared of any copy or resize that
   * would collide
   */
  plan: MultiplyPlan;
  timestamp: number;
};

export const multiplyItemsReducers = {
  /**
   * multiply (or shrink) the selected items one block in a direction:
   * resizing the items that take `times` along it, and copying (or deleting
   * copies of) the rest. The copies join the selection, so multiplying again
   * extends the whole of it. Adds to the nudges being previewed - they are
   * committed as one edit once they pause
   */
  multiplySelectedItems(
    _state,
    {
      payload: { direction, multiplyType, plan, timestamp },
    }: PayloadAction<MultiplySelectedItemsPayload>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;

    addNudgeStepToPreviewInPlace(
      state,
      multiplyType,
      { positionDelta: originXyz, timestamp },
      (nudgedRoomJson) => {
        const edits: PreviewedRoomItemEdits = {};

        if (plan.resizedItemIds.length > 0) {
          const { posVector = originXyz, timesDelta } =
            multiplyType === "multiplyOrGrow" ?
              growArgs(direction)
            : shrinkArgs(direction);
          const resizeOutcome = moveOrResizeOutcome(nudgedRoomJson, {
            selectionEntries: plan.resizedItemIds.map((jsonItemId) => ({
              jsonItemId,
              whichEditorGhost: undefined,
            })),
            positionDelta: posVector,
            timesDelta: { ...originXyz, ...timesDelta },
            timestamp,
          });
          if (resizeOutcome.type === "valid") {
            Object.assign(edits, resizeOutcome.edits);
          }
        }

        const takenIds = { ...nudgedRoomJson.items, ...edits };
        const copyIds: EditorRoomItemId[] = [];
        for (const copiedItemId of plan.copiedItemIds) {
          const copiedItem = nudgedRoomJson.items[copiedItemId];
          const copyId = nextItemIdInItems(
            takenIds,
            typePrefix[copiedItem.type],
          );
          const copy = {
            ...copiedItem,
            position: addXyz(copiedItem.position, direction),
          };
          edits[copyId] = copy;
          takenIds[copyId] = copy;
          copyIds.push(copyId);
        }
        for (const deletedItemId of plan.deletedItemIds) {
          edits[deletedItemId] = null;
        }

        if (keys(edits).length === 0) {
          return undefined;
        }

        const deletedItemIds = new Set(plan.deletedItemIds);
        return {
          edits,
          selectedJsonItemIds: [
            ...selectCursorRoomSelectionJsonItemIdsWithoutEditorGhostSelectionsFromLevelEditorState(
              state,
            ).filter((id) => !deletedItemIds.has(id)),
            ...copyIds,
          ],
        };
      },
    );
  },

  /**
   * grow (or shrink) the item held by the current item tool one block along a
   * world direction's axis, so the next placement is that size. Also resizes
   * the hover preview, so it keeps matching the tool. No-op unless an item
   * tool is active
   */
  multiplyCurrentToolItem(
    _state,
    {
      payload: { direction, multiplyType },
    }: PayloadAction<{
      /**
       * a world unit vector - its sense doesn't matter, as the tool's item
       * has no position to grow from
       */
      direction: Xyz;
      multiplyType: MultiplyType;
    }>,
  ) {
    // see multiplySelectedItems for why the WritableDraft<> wrapper is cast away:
    const state = _state as LevelEditorState;

    if (state.tool.type !== "item") {
      return;
    }
    const { timesDelta } =
      multiplyType === "multiplyOrGrow" ?
        growArgs(direction)
      : shrinkArgs(direction);
    const fullTimesDelta = { ...originXyz, ...timesDelta };
    // ItemTool is {type, config} with no position; only its type and times are
    // read and written:
    addTimesDeltaToJsonItemInPlace(
      state.tool.item as EditorJsonItemWithTimes,
      fullTimesDelta,
    );
    if (state.pendingEdits?.madeBy.type === "itemTool") {
      for (const itemPreview of previewedItemsIter(state.pendingEdits)) {
        addTimesDeltaToJsonItemInPlace(
          itemPreview as EditorJsonItemWithTimes,
          fullTimesDelta,
        );
      }
    }
  },
} satisfies SliceCaseReducers<LevelEditorState>;
