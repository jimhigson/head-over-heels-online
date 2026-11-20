import { type PayloadAction, type SliceCaseReducers } from "@reduxjs/toolkit";

import { type DeadlyBlockStyle } from "../../../model/json/ItemConfigMap";
import { type BlockStyle } from "../../../model/json/utilityJsonConfigTypes";
import { canBlockBeTower } from "../../canBlockBeTower";
import { type EditorJsonItem } from "../../editorTypes";
import { type ItemTypeAndSubtype } from "../../itemTypeAndSubtype";
import {
  selectCurrentCommittedRoomJsonFromLevelEditorState,
  selectCursorRoomSelectedJsonItemIdsFromLevelEditorState,
} from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { clearContextMenuXyInPlace } from "./contextMenuReducers";
import { mutateSelectedItemsInPlace } from "./mutateSelectedItemsInPlace";
import { type UndoItemEntry } from "./undoDescription";
import { pushUndoToCursorRoomInPlace } from "./undoReducers";

type BlockConfig = EditorJsonItem<"block">["config"];

export type RestylableItemType = "block" | "deadlyBlock" | "portableBlock";

/**
 * a restylable item type, with the style to give its items
 */
type RestylableItemTypeAndStyle = Extract<
  ItemTypeAndSubtype,
  { itemType: RestylableItemType }
>;

const deadlyStyleForBlockStyle = {
  organic: "volcano",
  tower: "volcano",
  artificial: "toaster",
  book: "toaster",
} as const satisfies Record<BlockStyle, DeadlyBlockStyle>;

const blockStyleForDeadlyStyle = {
  volcano: "organic",
  toaster: "artificial",
} as const satisfies Record<DeadlyBlockStyle, BlockStyle>;

const restyledBlockConfig = (
  { times, disappearing }: BlockConfig,
  style: BlockStyle,
): BlockConfig => {
  const disappearingConfig = disappearing !== undefined && { disappearing };
  if (style === "tower") {
    // towers only repeat vertically:
    const z = times?.z;
    return {
      style,
      ...(z !== undefined && { times: { z } }),
      ...disappearingConfig,
    };
  }
  return {
    style,
    ...(times !== undefined && { times }),
    ...disappearingConfig,
  };
};

const deadlyBlockFromBlock = ({
  position,
  config: { style, times },
}: EditorJsonItem<"block">): EditorJsonItem<"deadlyBlock"> => ({
  type: "deadlyBlock",
  position,
  config: {
    style: deadlyStyleForBlockStyle[style],
    ...(times !== undefined && { times }),
  },
});

const blockFromDeadlyBlock = ({
  position,
  config: { style, times },
}: EditorJsonItem<"deadlyBlock">): EditorJsonItem<"block"> => ({
  type: "block",
  position,
  config: {
    style: blockStyleForDeadlyStyle[style],
    ...(times !== undefined && { times }),
  },
});

export const blockDeadlinessAndStyleReducers = {
  /**
   * swap every selected block for a deadly block, or every selected deadly
   * block for a block, mapping their styles across
   */
  setSelectedBlocksDeadly(
    state,
    {
      payload: { makeDeadly, timestamp },
    }: PayloadAction<{ makeDeadly: boolean; timestamp: number }>,
  ) {
    const roomJson = selectCurrentCommittedRoomJsonFromLevelEditorState(state);
    const selectedJsonItemIds =
      selectCursorRoomSelectedJsonItemIdsFromLevelEditorState(state);

    const items: UndoItemEntry[] = selectedJsonItemIds.map((id) => [
      id,
      roomJson.items[id],
    ]);
    pushUndoToCursorRoomInPlace(
      state,
      {
        kind: "itemAction",
        verb: makeDeadly ? "Change to deadly" : "Change to safe",
        items,
      },
      timestamp,
    );

    for (const id of selectedJsonItemIds) {
      const item = roomJson.items[id];
      if (makeDeadly && item?.type === "block") {
        roomJson.items[id] = deadlyBlockFromBlock(item);
      } else if (!makeDeadly && item?.type === "deadlyBlock") {
        roomJson.items[id] = blockFromDeadlyBlock(item);
      }
    }
    clearContextMenuXyInPlace(state);
  },
  /**
   * set the subtype (style) of every selected item of the given type; blocks
   * repeating horizontally can't become towers
   */
  setSelectedItemsSubtype(
    state,
    {
      payload: { timestamp, ...typeAndSubtype },
    }: PayloadAction<RestylableItemTypeAndStyle & { timestamp: number }>,
  ) {
    mutateSelectedItemsInPlace(state, { verb: "Style", timestamp }, (item) => {
      switch (typeAndSubtype.itemType) {
        case "block":
          if (
            item.type === "block" &&
            (typeAndSubtype.subtype !== "tower" || canBlockBeTower(item.config))
          ) {
            item.config = restyledBlockConfig(
              item.config,
              typeAndSubtype.subtype,
            );
          }
          break;
        case "deadlyBlock":
          if (item.type === "deadlyBlock") {
            item.config.style = typeAndSubtype.subtype;
          }
          break;
        case "portableBlock":
          if (item.type === "portableBlock") {
            item.config.style = typeAndSubtype.subtype;
          }
          break;
        default:
          typeAndSubtype satisfies never;
      }
    });
  },
} satisfies SliceCaseReducers<LevelEditorState>;
