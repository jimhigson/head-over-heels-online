import { type Tool } from "../../RoomEditingArea/interactivity/Tool";
import { type LevelEditorState } from "../levelEditorSlice";
import { layoutNodesOfType } from "../PaneLayout";
import { clearContextMenuXyInPlace } from "../reducers/contextMenuReducers";
import { setSelectionOnCursorRoomInPlace } from "./setSelectionOnCursorRoomInPlace";

export const setToolInPlace = (state: LevelEditorState, tool: Tool) => {
  // unselect if using an item tool
  if (tool.type === "item") {
    setSelectionOnCursorRoomInPlace(state, []);
    for (const openRoom of layoutNodesOfType(state.layout, "openRoom")) {
      openRoom.hoveredItem = undefined;
    }
    clearContextMenuXyInPlace(state);
  }
  // kept as it is left, so its rotation etc. comes back with it:
  if (state.tool.type === "item") {
    state.lastItemTool = state.tool.item;
  }

  state.tool = tool;
};
