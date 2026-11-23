import { produce } from "immer";
import { expect, test } from "vitest";

import { blockSizePx } from "../../../../game/physics/mechanicsConstants";
import type { EditorRoomItemId, EditorRoomJson } from "../../../editorTypes";
import type { LevelEditorState } from "../../../slice/levelEditorSlice";
import { loadEditorRoom } from "../../../slice/loadEditorRoom";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testOpenRoomId,
  testRoomId,
} from "../../../slice/reducers/__test__/storeStates";
import type { PointingAtItem } from "../../cursor/PointingAt";
import type { EditorViewport } from "../../viewport/EditorViewport";
import type { Tool } from "../Tool";
import { ItemToolHandler } from "./ItemToolHandler";

test("hovering the item tool where its item would collide previews it at the nearest spot that fits instead", () => {
  const floorId = "floor" as EditorRoomItemId;
  const blockTool: Extract<Tool, { type: "item" }> = {
    type: "item",
    items: [
      {
        type: "block",
        config: { style: "organic", times: { x: 2 } },
      },
    ],
  };
  // a floor with a block on it at (2, 0, 0), and a tool for a block two long
  // in x:
  const state0: LevelEditorState = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      const { items } = draft.campaignInProgress.rooms[testRoomId];
      items[floorId] = {
        type: "floor",
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 8, y: 8 },
        },
        position: { x: 0, y: 0, z: 0 },
      };
      items["block" as EditorRoomItemId] = {
        type: "block",
        config: { style: "organic" },
        position: { x: 2, y: 0, z: 0 },
      };
      draft.tool = blockTool;
    },
  );
  const roomState = loadEditorRoom(
    testRoomId,
    state0.campaignInProgress.rooms[testRoomId] as EditorRoomJson,
  );
  // on top of the floor in block (1, 0) - a block two long put down there
  // would reach into (2, 0), where the block is:
  const pointingAtFloorBesideBlock: PointingAtItem = {
    roomId: testRoomId,
    scrXy: { x: 0, y: 0 },
    world: {
      itemId: floorId,
      position: { x: 1.5 * blockSizePx.x, y: 0.5 * blockSizePx.y, z: 0 },
      onItem: { face: { x: 0, y: 0, z: 1 } },
    },
  };

  // the pointer moves onto the floor beside the block:
  const state1Hovered = reduceLevelEditorActions(
    state0,
    new ItemToolHandler().handleMouseMove({
      openRoomId: testOpenRoomId,
      roomState,
      // neither is read by the item tool:
      mouseEvent: {} as MouseEvent,
      viewport: {} as EditorViewport,
      pointingAt: pointingAtFloorBesideBlock,
      pointingAtChanged: true,
    }),
  );

  // one block further up the screen, clear of the block:
  expect(
    Object.values(state1Hovered.pendingEdits?.edits[testRoomId] ?? {}).map(
      (item) => item?.position,
    ),
  ).toEqual([{ x: 2.5, y: 1.5, z: 0 }]);
});

test("hovering a tool of two items previews both at the nearest spot where both fit", () => {
  const floorId = "floor" as EditorRoomItemId;
  const twoBlocksTool: Extract<Tool, { type: "item" }> = {
    type: "item",
    items: [
      {
        type: "block",
        config: { style: "organic" },
      },
      {
        type: "block",
        config: { style: "artificial" },
        position: { x: 1, y: 0, z: 0 },
      },
    ],
  };
  // a floor with a block on it at (2, 0, 0), where the second of the tool's
  // blocks would go if the first was put down in block (1, 0):
  const state0: LevelEditorState = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      const { items } = draft.campaignInProgress.rooms[testRoomId];
      items[floorId] = {
        type: "floor",
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 8, y: 8 },
        },
        position: { x: 0, y: 0, z: 0 },
      };
      items["block" as EditorRoomItemId] = {
        type: "block",
        config: { style: "organic" },
        position: { x: 2, y: 0, z: 0 },
      };
      draft.tool = twoBlocksTool;
    },
  );
  const roomState = loadEditorRoom(
    testRoomId,
    state0.campaignInProgress.rooms[testRoomId] as EditorRoomJson,
  );
  const pointingAtFloorBesideBlock: PointingAtItem = {
    roomId: testRoomId,
    scrXy: { x: 0, y: 0 },
    world: {
      itemId: floorId,
      position: { x: 1.5 * blockSizePx.x, y: 0.5 * blockSizePx.y, z: 0 },
      onItem: { face: { x: 0, y: 0, z: 1 } },
    },
  };

  const state1Hovered = reduceLevelEditorActions(
    state0,
    new ItemToolHandler().handleMouseMove({
      openRoomId: testOpenRoomId,
      roomState,
      // neither is read by the item tool:
      mouseEvent: {} as MouseEvent,
      viewport: {} as EditorViewport,
      pointingAt: pointingAtFloorBesideBlock,
      pointingAtChanged: true,
    }),
  );

  // the second is a block along from the first, and neither is in the block:
  expect(
    Object.values(state1Hovered.pendingEdits?.edits[testRoomId] ?? {}).map(
      (item) => item?.position,
    ),
  ).toEqual([
    { x: 2.5, y: 1.5, z: 0 },
    { x: 3.5, y: 1.5, z: 0 },
  ]);
});

test("clicking the item tool where its item would collide adds it at the nearest spot that fits instead", () => {
  const floorId = "floor" as EditorRoomItemId;
  const blockTool: Extract<Tool, { type: "item" }> = {
    type: "item",
    items: [
      {
        type: "block",
        config: { style: "organic", times: { x: 2 } },
      },
    ],
  };
  // a floor with a block on it at (2, 0, 0), and a tool for a block two long
  // in x:
  const state0: LevelEditorState = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      const { items } = draft.campaignInProgress.rooms[testRoomId];
      items[floorId] = {
        type: "floor",
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 8, y: 8 },
        },
        position: { x: 0, y: 0, z: 0 },
      };
      items["block" as EditorRoomItemId] = {
        type: "block",
        config: { style: "organic" },
        position: { x: 2, y: 0, z: 0 },
      };
      draft.tool = blockTool;
    },
  );
  const roomState = loadEditorRoom(
    testRoomId,
    state0.campaignInProgress.rooms[testRoomId] as EditorRoomJson,
  );
  // on top of the floor in block (1, 0) - a block two long put down there
  // would reach into (2, 0), where the block is:
  const pointingAtFloorBesideBlock: PointingAtItem = {
    roomId: testRoomId,
    scrXy: { x: 0, y: 0 },
    world: {
      itemId: floorId,
      position: { x: 1.5 * blockSizePx.x, y: 0.5 * blockSizePx.y, z: 0 },
      onItem: { face: { x: 0, y: 0, z: 1 } },
    },
  };
  const handler = new ItemToolHandler();

  // the pointer moves onto the floor beside the block:
  const state1Hovered = reduceLevelEditorActions(
    state0,
    handler.handleMouseMove({
      openRoomId: testOpenRoomId,
      roomState,
      // neither is read by the item tool:
      mouseEvent: {} as MouseEvent,
      viewport: {} as EditorViewport,
      pointingAt: pointingAtFloorBesideBlock,
      pointingAtChanged: true,
    }),
  );

  // and clicks there:
  const state2Clicked = reduceLevelEditorActions(
    state1Hovered,
    handler.handleMouseUp({
      openRoomId: testOpenRoomId,
      roomState,
      mouseEvent: {} as MouseEvent,
      viewport: {} as EditorViewport,
      pointingAt: pointingAtFloorBesideBlock,
      isClick: true,
    }),
  );

  // the block already there, and the new one one block further up the
  // screen, clear of it:
  expect(
    Object.values(state2Clicked.campaignInProgress.rooms[testRoomId].items)
      .filter(({ type }) => type === "block")
      .map(({ position }) => position),
  ).toEqual([
    { x: 2, y: 0, z: 0 },
    { x: 2.5, y: 1.5, z: 0 },
  ]);
});
