import {
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import { type Tool } from "../../RoomEditingArea/interactivity/Tool";
import { setToolInPlace } from "../inPlaceMutators/setToolInPlace";
import { type LevelEditorState } from "../levelEditorSlice";

const pointerTool: Tool = { type: "pointer" };

export const setToolReducers = {
  /**
   * set the tool that is currently selected
   */
  setTool(_state, { payload: tool }: PayloadAction<Tool>) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    setToolInPlace(_state as LevelEditorState, tool);
  },
  /**
   * go back to the pointer tool, leaving the state untouched if already on it
   */
  resetTool(_state) {
    const state = _state as LevelEditorState;
    if (state.tool.type !== "pointer") {
      setToolInPlace(state, pointerTool);
    }
  },
  /**
   * the pointer tool, or from the pointer, back to the last item tool
   */
  togglePointerTool(_state) {
    const state = _state as LevelEditorState;
    if (state.tool.type !== "pointer") {
      setToolInPlace(state, pointerTool);
    } else if (state.lastItemTool !== undefined) {
      setToolInPlace(state, { type: "item", item: state.lastItemTool });
    }
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const setToolSelectors = {
  selectTool: (state: LevelEditorState) => state.tool,
} satisfies SliceSelectors<LevelEditorState>;
