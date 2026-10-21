import { type Tool } from "../../RoomEditingArea/interactivity/Tool";
import { panesIter } from "../EditorPane";
import { type LevelEditorState } from "../levelEditorSlice";
import { clearContextMenuXyInPlace } from "../reducers/contextMenuReducers";
import { setSelectedJsonItemIdsOnCursorRoomInPlace } from "./setSelectedJsonItemIdsOnCursorRoomInPlace";

export const setToolInPlace = (state: LevelEditorState, tool: Tool) => {
  // unselect if using an item tool
  if (tool.type === "item") {
    setSelectedJsonItemIdsOnCursorRoomInPlace(state, []);
    for (const pane of panesIter(state)) {
      pane.hoveredItem = undefined;
    }
    clearContextMenuXyInPlace(state);
  }
  // kept as it is left, so its rotation etc. comes back with it:
  if (state.tool.type === "item") {
    state.lastItemTool = state.tool.item;
  }

  state.tool = tool;
};
