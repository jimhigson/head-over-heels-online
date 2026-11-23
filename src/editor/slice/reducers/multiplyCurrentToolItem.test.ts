import { expect, test } from "vitest";

import type { Tool } from "../../RoomEditingArea/interactivity/Tool";
import { multiplyCurrentToolItem, setTool } from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
} from "./__test__/storeStates";

test("multiplying grows the item tool's item along the direction's axis", () => {
  expect(
    reduceLevelEditorActions(
      editorStateWithOneRoomWithNoItems,
      setTool({
        type: "item",
        items: [
          {
            type: "block",
            config: { style: "artificial" },
          },
        ],
      }),
      multiplyCurrentToolItem({
        direction: { x: -1, y: 0, z: 0 },
        multiplyType: "multiplyOrGrow",
      }),
    ).tool,
  ).toEqual<Tool>({
    type: "item",
    items: [
      {
        type: "block",
        config: { style: "artificial", times: { x: 2 } },
      },
    ],
  });
});

test("shrinking takes a block off the item tool's item along the direction's axis", () => {
  expect(
    reduceLevelEditorActions(
      editorStateWithOneRoomWithNoItems,
      setTool({
        type: "item",
        items: [
          {
            type: "block",
            config: { style: "artificial", times: { y: 2, z: 3 } },
          },
        ],
      }),
      multiplyCurrentToolItem({
        direction: { x: 0, y: 1, z: 0 },
        multiplyType: "removeOrShrink",
      }),
    ).tool,
  ).toEqual<Tool>({
    type: "item",
    items: [
      {
        type: "block",
        config: { style: "artificial", times: { z: 3 } },
      },
    ],
  });
});

test("an item tool's item can't grow along an axis it takes no times on", () => {
  expect(
    reduceLevelEditorActions(
      editorStateWithOneRoomWithNoItems,
      setTool({
        type: "item",
        items: [
          {
            type: "lamp",
            config: { direction: "towards" },
          },
        ],
      }),
      multiplyCurrentToolItem({
        direction: { x: 1, y: 0, z: 0 },
        multiplyType: "multiplyOrGrow",
      }),
    ).tool,
  ).toEqual<Tool>({
    type: "item",
    items: [
      {
        type: "lamp",
        config: { direction: "towards" },
      },
    ],
  });
});
