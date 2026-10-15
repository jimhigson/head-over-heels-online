import { expect, test } from "vitest";

import { doorItemTool } from "../../RoomEditingArea/interactivity/doorItemTool";
import { type Tool } from "../../RoomEditingArea/interactivity/Tool";
import {
  changeDoorAutoAddsRoom,
  selectTool,
  setTool,
} from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
} from "./__test__/storeStates";

test("changing the door setting while the door tool is selected selects the door tool for the new setting", () => {
  const state = reduceLevelEditorActions(
    editorStateWithOneRoomWithNoItems,
    setTool({ type: "item", item: doorItemTool(true) }),
    changeDoorAutoAddsRoom(false),
  );

  expect<Tool>(selectTool({ levelEditor: state })).toEqual<Tool>({
    type: "item",
    item: doorItemTool(false),
  });
});

test("changing the door setting leaves other tools selected", () => {
  const state = reduceLevelEditorActions(
    editorStateWithOneRoomWithNoItems,
    setTool({ type: "pointer" }),
    changeDoorAutoAddsRoom(false),
  );

  expect<Tool>(selectTool({ levelEditor: state })).toEqual<Tool>({
    type: "pointer",
  });
});
