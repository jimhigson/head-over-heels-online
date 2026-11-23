// @vitest-environment happy-dom
import { produce } from "immer";
import { expect, test } from "vitest";

import { loadRoom } from "../../../game/gameState/loadRoom/loadRoom";
import {
  iterateRoomJsonItemIds,
  roomJsonItemsIterable,
} from "../../../model/RoomJsonItemIterators";
import { noPlanetsLiberated } from "../../../store/slices/gameInPlay/gameInPlaySlice";
import { emptyUserSettings } from "../../../store/slices/userSettings/emptyUserSettings";
import { originXyz } from "../../../utils/vectors/vectors";
import { rotateSelectionOrToolItemThunk } from "../../commands/rotateSelectionOrToolItemThunk";
import type {
  EditorJsonItemUnion,
  EditorRoomItemId,
  EditorRoomState,
} from "../../editorTypes";
import type { RotationSense } from "../../itemRotation";
import { toolItemMatchers } from "../../RoomEditingArea/interactivity/__test__/toolItemMatchers";
import type { ItemToolItems } from "../../RoomEditingArea/interactivity/Tool";
import {
  selectCurrentCommittedRoomJsonFromLevelEditorState,
  selectItemInLevelEditorState,
} from "../levelEditorSelectors";
import {
  applyItemTool,
  type LevelEditorState,
  rotateCurrentToolItem,
  rotateSelectedItems,
  setSelectedItemsInRoom,
  setTool,
} from "../levelEditorSlice";
import { simulatePointerToolDragWithMouse } from "./__test__/simulatePointerToolDragWithMouse";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testRoomId,
} from "./__test__/storeStates";

expect.extend(toolItemMatchers);

const stateWithItem = (item: EditorJsonItemUnion): LevelEditorState =>
  produce(editorStateWithOneRoomWithNoItems, (draft) => {
    draft.campaignInProgress.rooms[testRoomId].items["i" as EditorRoomItemId] =
      item;
  });

const rotateSelected = (
  item: EditorJsonItemUnion,
  sense: RotationSense,
): EditorJsonItemUnion =>
  selectCurrentCommittedRoomJsonFromLevelEditorState(
    reduceLevelEditorActions(
      stateWithItem(item),
      setSelectedItemsInRoom({
        selection: [
          { jsonItemId: "i" as EditorRoomItemId, whichEditorGhost: undefined },
        ],
      }),
      rotateSelectedItems({ sense, timestamp: 0 }),
    ),
  ).items["i" as EditorRoomItemId];

test("rotates a selected lamp a quarter-turn clockwise", () => {
  expect(
    rotateSelected(
      {
        type: "lamp",
        config: { direction: "towards", activated: true },
        position: { x: 0, y: 0, z: 0 },
      },
      "clockwise",
    ),
  ).toEqual({
    type: "lamp",
    config: { direction: "left", activated: true },
    position: { x: 0, y: 0, z: 0 },
  });
});

test("rotates a selected lamp a quarter-turn anticlockwise", () => {
  expect(
    rotateSelected(
      {
        type: "lamp",
        config: { direction: "towards", activated: true },
        position: { x: 0, y: 0, z: 0 },
      },
      "anticlockwise",
    ),
  ).toMatchObject({ config: { direction: "right" } });
});

test("flips a selected mirror (either sense is a flip)", () => {
  expect(
    rotateSelected(
      {
        type: "mirror",
        config: { orientation: "awayLeft" },
        position: { x: 0, y: 0, z: 0 },
      },
      "clockwise",
    ),
  ).toEqual({
    type: "mirror",
    config: { orientation: "awayRight" },
    position: { x: 0, y: 0, z: 0 },
  });
});

test("rotates a selected conveyor's belt direction a quarter-turn", () => {
  expect(
    rotateSelected(
      {
        type: "conveyor",
        config: { direction: "left" },
        position: { x: 0, y: 0, z: 0 },
      },
      "clockwise",
    ),
  ).toEqual({
    type: "conveyor",
    config: { direction: "away" },
    position: { x: 0, y: 0, z: 0 },
  });
});

test("flips a selected barrier's axis (either sense is a flip)", () => {
  expect(
    rotateSelected(
      {
        type: "barrier",
        config: { axis: "x" },
        position: { x: 0, y: 0, z: 0 },
      },
      "anticlockwise",
    ),
  ).toEqual({
    type: "barrier",
    config: { axis: "y" },
    position: { x: 0, y: 0, z: 0 },
  });
});

test("rotates a selected scenery player by 45° (8-way)", () => {
  expect(
    rotateSelected(
      {
        type: "sceneryPlayer",
        config: { which: "head", startDirection: "towards" },
        position: { x: 0, y: 0, z: 0 },
      },
      "clockwise",
    ),
  ).toMatchObject({ config: { startDirection: "towardsLeft" } });
});

test("turns a multi-block conveyor run about its middle", () => {
  expect(
    rotateSelected(
      {
        type: "conveyor",
        config: { direction: "left", times: { x: 3 } },
        position: { x: 0, y: 0, z: 0 },
      },
      "clockwise",
    ),
  ).toEqual({
    type: "conveyor",
    config: { direction: "away", times: { y: 3 } },
    position: { x: 1, y: -1, z: 0 },
  });
});

test("leaves a non-rotatable selected item untouched", () => {
  expect(
    rotateSelected(
      {
        type: "block",
        config: { style: "artificial" },
        position: { x: 0, y: 0, z: 0 },
      },
      "clockwise",
    ),
  ).toEqual({
    type: "block",
    config: { style: "artificial" },
    position: { x: 0, y: 0, z: 0 },
  });
});

const rotateTool = (items: ItemToolItems, sense: RotationSense) =>
  reduceLevelEditorActions(
    editorStateWithOneRoomWithNoItems,
    setTool({ type: "item", items }),
    rotateCurrentToolItem({ sense }),
  ).tool;

test("rotates the lamp held by the current item tool", () => {
  expect(
    rotateTool(
      [{ type: "lamp", config: { direction: "towards" } }],
      "clockwise",
    ),
  ).toEqualToolItems([
    { type: "lamp", config: { direction: "left" }, position: originXyz },
  ]);
});

test("flips the mirror held by the current item tool", () => {
  expect(
    rotateTool(
      [
        {
          type: "mirror",
          config: { orientation: "awayLeft" },
        },
      ],
      "anticlockwise",
    ),
  ).toMatchObject({ items: [{ config: { orientation: "awayRight" } }] });
});

test("a single multi-block item stays put down at the same corner when its tool is rotated", () => {
  expect(
    rotateTool(
      [
        {
          type: "block",
          config: { style: "organic", times: { x: 3 } },
        },
      ],
      "clockwise",
    ),
  ).toEqualToolItems([
    {
      type: "block",
      config: { style: "organic", times: { y: 3 } },
      position: originXyz,
    },
  ]);
});

test("rotating a tool of several items swings them round the first as a whole", () => {
  // two blocks side by side along x, the second a block along from the first:
  expect(
    rotateTool(
      [
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
      "clockwise",
    ),
  ).toEqualToolItems([
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
    },
    {
      type: "block",
      config: { style: "artificial" },
      position: { x: 0, y: 1, z: 0 },
    },
  ]);
});

test("rotating a tool of several items four times puts them back", () => {
  const items: ItemToolItems = [
    {
      type: "conveyor",
      config: { direction: "left", times: { x: 2 } },
    },
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 3, y: 1, z: 2 },
    },
  ];
  expect(
    reduceLevelEditorActions(
      editorStateWithOneRoomWithNoItems,
      setTool({ type: "item", items }),
      rotateCurrentToolItem({ sense: "clockwise" }),
      rotateCurrentToolItem({ sense: "clockwise" }),
      rotateCurrentToolItem({ sense: "clockwise" }),
      rotateCurrentToolItem({ sense: "clockwise" }),
    ).tool,
  ).toEqualToolItems(items);
});

test("rotateCurrentToolItem is a no-op when no item tool is active", () => {
  const state0 = editorStateWithOneRoomWithNoItems;
  const state1 = reduceLevelEditorActions(
    state0,
    setTool({ type: "pointer" }),
    rotateCurrentToolItem({ sense: "clockwise" }),
  );
  expect(state1.tool).toEqual({ type: "pointer" });
});

const floorForToolToHover: EditorJsonItemUnion = {
  type: "floor",
  config: {
    floorType: "standable",
    scenery: "blacktooth",
    times: { x: 8, y: 8 },
  },
  position: originXyz,
};

// a lamp tool actively hovering the room, so there is a preview item in
// pendingEdits built from the tool:
const state0LampToolHovering = reduceLevelEditorActions(
  produce(editorStateWithOneRoomWithNoItems, (draft) => {
    draft.campaignInProgress.rooms[testRoomId].items[
      "floor" as EditorRoomItemId
    ] = floorForToolToHover;
  }),
  setTool({
    type: "item",
    items: [{ type: "lamp", config: { direction: "towards" } }],
  }),
  applyItemTool({
    roomId: testRoomId,
    blockPosition: { x: 2, y: 2, z: 0 },
    pointedAtItemJson: floorForToolToHover,
    preview: true,
    timestamp: 0,
  }),
);

const state1ToolAndPreviewRotated = reduceLevelEditorActions(
  state0LampToolHovering,
  rotateCurrentToolItem({ sense: "clockwise" }),
);

test("rotates the tool item when a hover preview is present", () => {
  expect(state1ToolAndPreviewRotated.tool).toMatchObject({
    items: [{ config: { direction: "left" } }],
  });
});

test("also rotates the hover preview to match the rotated tool", () => {
  expect(
    Object.values(
      state1ToolAndPreviewRotated.pendingEdits?.edits[testRoomId] ?? {},
    ),
  ).toEqual([
    {
      type: "lamp",
      config: { direction: "left" },
      position: { x: 2, y: 2, z: 0 },
    },
  ]);
});

test("the hover preview of several items swings round with the rotated tool", () => {
  const state0TwoBlocksToolHovering = reduceLevelEditorActions(
    produce(editorStateWithOneRoomWithNoItems, (draft) => {
      draft.campaignInProgress.rooms[testRoomId].items[
        "floor" as EditorRoomItemId
      ] = floorForToolToHover;
    }),
    setTool({
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
    }),
    applyItemTool({
      roomId: testRoomId,
      blockPosition: { x: 2, y: 2, z: 0 },
      pointedAtItemJson: floorForToolToHover,
      preview: true,
      timestamp: 0,
    }),
    rotateCurrentToolItem({ sense: "clockwise" }),
  );
  expect(
    Object.values(
      state0TwoBlocksToolHovering.pendingEdits?.edits[testRoomId] ?? {},
    ).map((previewedItem) => previewedItem?.position),
  ).toEqual([
    { x: 2, y: 2, z: 0 },
    { x: 2, y: 3, z: 0 },
  ]);
});

test("a multi-block conveyor turns about its middle and back, but not into an item in the way", () => {
  const floor: EditorJsonItemUnion = {
    type: "floor",
    config: {
      floorType: "standable",
      scenery: "blacktooth",
      times: { x: 8, y: 8 },
    },
    position: originXyz,
  };
  // an otherwise empty room, with just a floor to put things on:
  const state0EmptyRoom = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      draft.campaignInProgress.rooms[testRoomId].items[
        "floor" as EditorRoomItemId
      ] = floor;
    },
  );

  // a conveyor, put down on the floor with the item tool:
  const state1ConveyorAdded = reduceLevelEditorActions(
    state0EmptyRoom,
    setTool({
      type: "item",
      items: [
        {
          type: "conveyor",
          config: { direction: "left" },
        },
      ],
    }),
    applyItemTool({
      roomId: testRoomId,
      blockPosition: { x: 2, y: 2, z: 0 },
      pointedAtItemJson: floor,
      preview: false,
      timestamp: 0,
    }),
  );
  const [conveyorId] = iterateRoomJsonItemIds(
    selectCurrentCommittedRoomJsonFromLevelEditorState(state1ConveyorAdded)
      .items,
    "conveyor",
  ).toArray();

  // made 3 long, by dragging its edge 2 blocks along x:
  const state2ConveyorResized = simulatePointerToolDragWithMouse(
    state1ConveyorAdded,
    {
      jsonItemIds: [conveyorId],
      edgeDirection: { x: 1, y: 0, z: 0 },
      moves: [{ x: 2, y: 0, z: 0 }],
    },
  );
  expect(
    selectItemInLevelEditorState(state2ConveyorResized, conveyorId),
  ).toEqual({
    type: "conveyor",
    config: { direction: "left", times: { x: 3 } },
    position: { x: 2, y: 2, z: 0 },
  });

  // turned clockwise, about its middle, to face away and run 3 long in y:
  const state3RotatedClockwise = reduceLevelEditorActions(
    state2ConveyorResized,
    rotateSelectedItems({ sense: "clockwise", timestamp: 0 }),
  );
  expect(
    selectItemInLevelEditorState(state3RotatedClockwise, conveyorId),
  ).toEqual({
    type: "conveyor",
    config: { direction: "away", times: { y: 3 } },
    position: { x: 3, y: 1, z: 0 },
  });

  // turned back anticlockwise, back to as it was:
  const state4RotatedBack = reduceLevelEditorActions(
    state3RotatedClockwise,
    rotateSelectedItems({ sense: "anticlockwise", timestamp: 0 }),
  );
  expect(selectItemInLevelEditorState(state4RotatedBack, conveyorId)).toEqual({
    type: "conveyor",
    config: { direction: "left", times: { x: 3 } },
    position: { x: 2, y: 2, z: 0 },
  });

  // a block put down where the conveyor would turn into, then the conveyor
  // selected again:
  const state5BlockInTheWay = reduceLevelEditorActions(
    state4RotatedBack,
    setTool({
      type: "item",
      items: [{ type: "block", config: { style: "organic" } }],
    }),
    applyItemTool({
      roomId: testRoomId,
      blockPosition: { x: 3, y: 1, z: 0 },
      pointedAtItemJson: floor,
      preview: false,
      timestamp: 0,
    }),
    setSelectedItemsInRoom({
      selection: [{ jsonItemId: conveyorId, whichEditorGhost: undefined }],
    }),
  );
  expect(
    roomJsonItemsIterable(
      selectCurrentCommittedRoomJsonFromLevelEditorState(state5BlockInTheWay),
      "block",
    ).toArray(),
  ).toEqual([
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 3, y: 1, z: 0 },
    },
  ]);

  // turning into the block is refused - the conveyor stays as it was:
  const state6RotatedIntoTheBlock = reduceLevelEditorActions(
    state5BlockInTheWay,
    rotateSelectionOrToolItemThunk(
      "clockwise",
      loadRoom({
        roomId: testRoomId,
        roomJson:
          selectCurrentCommittedRoomJsonFromLevelEditorState(
            state5BlockInTheWay,
          ),
        scrollsRead: {},
        planetsLiberated: noPlanetsLiberated,
        roomPickupsCollected: {},
        isNewGame: false,
        userSettings: emptyUserSettings,
      }) as EditorRoomState,
    ),
  );
  expect(
    selectItemInLevelEditorState(state6RotatedIntoTheBlock, conveyorId),
  ).toEqual({
    type: "conveyor",
    config: { direction: "left", times: { x: 3 } },
    position: { x: 2, y: 2, z: 0 },
  });
});

test("two selected conveyors turn together, each into the space the other leaves", () => {
  const conveyorAId = "conveyorA" as EditorRoomItemId;
  const conveyorBId = "conveyorB" as EditorRoomItemId;
  // two conveyors, 3 long in x, B a block further along x and y than A. Each
  // turns into where the other is now, but not where the other turns to:
  const state0TwoConveyors = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      const { items } = draft.campaignInProgress.rooms[testRoomId];
      items["floor" as EditorRoomItemId] = {
        type: "floor",
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 8, y: 8 },
        },
        position: originXyz,
      };
      items[conveyorAId] = {
        type: "conveyor",
        config: { direction: "left", times: { x: 3 } },
        position: { x: 2, y: 2, z: 0 },
      };
      items[conveyorBId] = {
        type: "conveyor",
        config: { direction: "left", times: { x: 3 } },
        position: { x: 3, y: 3, z: 0 },
      };
    },
  );

  const state1BothRotated = reduceLevelEditorActions(
    state0TwoConveyors,
    setSelectedItemsInRoom({
      selection: [conveyorAId, conveyorBId].map((jsonItemId) => ({
        jsonItemId,
        whichEditorGhost: undefined,
      })),
    }),
    rotateSelectionOrToolItemThunk(
      "clockwise",
      loadRoom({
        roomId: testRoomId,
        roomJson:
          selectCurrentCommittedRoomJsonFromLevelEditorState(
            state0TwoConveyors,
          ),
        scrollsRead: {},
        planetsLiberated: noPlanetsLiberated,
        roomPickupsCollected: {},
        isNewGame: false,
        userSettings: emptyUserSettings,
      }) as EditorRoomState,
    ),
  );

  expect(
    roomJsonItemsIterable(
      selectCurrentCommittedRoomJsonFromLevelEditorState(state1BothRotated),
      "conveyor",
    ).toArray(),
  ).toEqual([
    {
      type: "conveyor",
      config: { direction: "away", times: { y: 3 } },
      position: { x: 3, y: 1, z: 0 },
    },
    {
      type: "conveyor",
      config: { direction: "away", times: { y: 3 } },
      position: { x: 4, y: 2, z: 0 },
    },
  ]);
});
