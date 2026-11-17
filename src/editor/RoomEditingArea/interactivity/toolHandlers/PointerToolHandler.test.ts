// @vitest-environment happy-dom
import { produce } from "immer";
import { expect, test } from "vitest";

import { projectWorldXyzToScreenXy } from "../../../../game/render/projections";
import { blockSizePx } from "../../../../model/blockSizePx";
import { getJsonItemTimes } from "../../../../model/times";
import { type EditorRootState } from "../../../../store/store";
import { addXyz, type Xyz } from "../../../../utils/vectors/vectors";
import {
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../../../editorTypes";
import {
  selectCurrentEditingRoomJsonWithPreviews,
  selectRoomJsonWithPreviews,
} from "../../../slice/levelEditorSelectors";
import {
  changeToRoom,
  changeWallsFloorsLocked,
  deleteSelected,
  itemGrabOverOpenRoom,
  type LevelEditorState,
  redo,
  setSelectedItemsInRoom,
  undo,
  undoHovered,
} from "../../../slice/levelEditorSlice";
import { loadEditorRoom } from "../../../slice/loadEditorRoom";
import { openRoomDefaults, type OpenRoomId } from "../../../slice/OpenRoom";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  type ReducibleAction,
  testOpenRoomId,
  testRoomId,
} from "../../../slice/reducers/__test__/storeStates";
import { betweenUpAndLeft } from "../../cursor/pointerIntersectionEdge";
import { type PointingAtItem } from "../../cursor/PointingAt";
import { EditorViewport } from "../../viewport/EditorViewport";
import { PointerToolHandler } from "./PointerToolHandler";

test("a drag puts the dragged block where the pointer is, however few of the pointer's moves were seen", () => {
  const floorId = "floor" as EditorRoomItemId;
  const blockId = "block" as EditorRoomItemId;
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
      items[blockId] = {
        type: "block",
        config: { style: "organic" },
        position: { x: 1, y: 2, z: 0 },
      };
    },
  );
  const roomState = loadEditorRoom(
    state0.campaignInProgress.rooms[testRoomId] as EditorRoomJson,
  );
  // the pane is at the page's origin, and the view unpanned and unzoomed, so
  // client px are the room's screen px:
  const paneElement = document.createElement("div");
  const viewport = new EditorViewport();
  const pointingAtBlock: PointingAtItem = {
    roomId: testRoomId,
    scrXy: { x: 0, y: 0 },
    world: {
      itemId: blockId,
      position: { x: 1.5 * blockSizePx.x, y: 2.5 * blockSizePx.y, z: 0 },
      onItem: { face: { x: 0, y: 0, z: 1 } },
    },
  };
  const handler = new PointerToolHandler();

  // the pointer goes down on the block:
  const state1Down = reduceLevelEditorActions(
    state0,
    handler.handleMouseDown({
      openRoomId: testOpenRoomId,
      roomState,
      mouseEvent: { button: 0 } as MouseEvent,
      viewport,
      pointingAt: pointingAtBlock,
    }),
  );

  // moves one block along x (on screen, half as far up as left):
  const state2MovedOneBlock = reduceLevelEditorActions(
    state1Down,
    handler.handleMouseMove({
      openRoomId: testOpenRoomId,
      roomState,
      mouseEvent: {
        clientX: -blockSizePx.x,
        clientY: -blockSizePx.x / 2,
        currentTarget: paneElement,
        metaKey: false,
        shiftKey: false,
      } as Partial<MouseEvent> as MouseEvent,
      viewport,
      pointingAt: pointingAtBlock,
      pointingAtChanged: true,
    }),
  );

  // and is next seen three blocks along x, as if its moves in between were
  // over another pane:
  const state3SeenThreeBlocksAlong = reduceLevelEditorActions(
    state2MovedOneBlock,
    handler.handleMouseMove({
      openRoomId: testOpenRoomId,
      roomState,
      mouseEvent: {
        clientX: -3 * blockSizePx.x,
        clientY: (-3 * blockSizePx.x) / 2,
        currentTarget: paneElement,
        metaKey: false,
        shiftKey: false,
      } as Partial<MouseEvent> as MouseEvent,
      viewport,
      pointingAt: pointingAtBlock,
      pointingAtChanged: true,
    }),
  );

  expect<Xyz>(
    selectCurrentEditingRoomJsonWithPreviews({
      levelEditor: state3SeenThreeBlocksAlong,
    } as EditorRootState).items[blockId].position,
  ).toEqual<Xyz>({ x: 4, y: 2, z: 0 });
});

test("dragging a block into another room's pane and releasing it there moves it there, at the ids its preview showed", () => {
  const otherRoomId = "otherRoomId" as EditorRoomId;
  const otherOpenRoomId = "openRoom-other" as OpenRoomId;
  const blockId = "block" as EditorRoomItemId;
  const floor: EditorRoomJson["items"][EditorRoomItemId] = {
    type: "floor",
    config: {
      floorType: "standable",
      scenery: "blacktooth",
      times: { x: 8, y: 8 },
    },
    position: { x: 0, y: 0, z: 0 },
  };
  const state0: LevelEditorState = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      const { rooms } = draft.campaignInProgress;
      rooms[testRoomId].items["floor" as EditorRoomItemId] = floor;
      rooms[testRoomId].items[blockId] = {
        type: "block",
        config: { style: "organic" },
        position: { x: 1, y: 2, z: 0 },
      };
      rooms[otherRoomId] = {
        ...rooms[testRoomId],
        id: otherRoomId,
        items: { ["floor" as EditorRoomItemId]: floor },
      };
      draft.layout.nodes[otherOpenRoomId] = {
        ...openRoomDefaults,
        id: otherOpenRoomId,
        roomId: otherRoomId,
        subRoomId: "*",
        editable: true,
      };
    },
  );
  const paneElement = document.createElement("div");
  const viewport = new EditorViewport();
  const grabbedAt: Xyz = {
    x: 1.5 * blockSizePx.x,
    y: 2.5 * blockSizePx.y,
    z: 0,
  };
  const pointingAtBlock: PointingAtItem = {
    roomId: testRoomId,
    scrXy: { x: 0, y: 0 },
    world: {
      itemId: blockId,
      position: grabbedAt,
      onItem: { face: { x: 0, y: 0, z: 1 } },
    },
  };
  const sourceRoomState = loadEditorRoom(
    state0.campaignInProgress.rooms[testRoomId] as EditorRoomJson,
  );
  const otherRoomState = loadEditorRoom(
    state0.campaignInProgress.rooms[otherRoomId] as EditorRoomJson,
  );
  const handler = new PointerToolHandler();
  // two blocks along x and one along y from where it was grabbed:
  const pointerInOtherPane = projectWorldXyzToScreenXy(
    addXyz(grabbedAt, { x: 2 * blockSizePx.x, y: blockSizePx.y }),
  );
  const pointingAtNothingInOtherRoom = {
    roomId: otherRoomId,
    scrXy: pointerInOtherPane,
    world: undefined,
  };

  const state1Previewed = reduceLevelEditorActions(
    state0,
    // the pointer goes down on the block:
    handler.handleMouseDown({
      openRoomId: testOpenRoomId,
      roomState: sourceRoomState,
      mouseEvent: { button: 0 } as MouseEvent,
      viewport,
      pointingAt: pointingAtBlock,
    }),
    // drags it a block along x in its own pane:
    handler.handleMouseMove({
      openRoomId: testOpenRoomId,
      roomState: sourceRoomState,
      mouseEvent: {
        clientX: -blockSizePx.x,
        clientY: -blockSizePx.x / 2,
        currentTarget: paneElement,
        metaKey: false,
        shiftKey: false,
      } as Partial<MouseEvent> as MouseEvent,
      viewport,
      pointingAt: pointingAtBlock,
      pointingAtChanged: true,
    }),
    // and on over the other room's pane:
    itemGrabOverOpenRoom({ openRoomId: otherOpenRoomId, timestamp: 0 }),
    handler.handleMouseMove({
      openRoomId: otherOpenRoomId,
      roomState: otherRoomState,
      mouseEvent: {
        clientX: pointerInOtherPane.x,
        clientY: pointerInOtherPane.y,
        currentTarget: paneElement,
        metaKey: false,
        shiftKey: false,
      } as Partial<MouseEvent> as MouseEvent,
      viewport,
      pointingAt: pointingAtNothingInOtherRoom,
      pointingAtChanged: true,
    }),
  );
  // where it is released:
  const state2Dropped = reduceLevelEditorActions(
    state1Previewed,
    handler.handleMouseUp({
      openRoomId: otherOpenRoomId,
      roomState: otherRoomState,
      mouseEvent: { button: 0 } as MouseEvent,
      viewport,
      pointingAt: pointingAtNothingInOtherRoom,
      isClick: false,
    }),
  );

  expect(
    state1Previewed.itemGrab?.dropInto?.movedItemIds.map(
      (itemId) =>
        [
          itemId,
          state2Dropped.campaignInProgress.rooms[otherRoomId].items[itemId]
            ?.position,
        ] as const,
    ),
  ).toEqual([[blockId, { x: 3, y: 3, z: 0 }]]);
});

test("dragging a block into a second view of its own room and releasing it there moves it there", () => {
  const secondOpenRoomId = "openRoom-second" as OpenRoomId;
  const blockId = "block" as EditorRoomItemId;
  const state0: LevelEditorState = produce(
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
        position: { x: 0, y: 0, z: 0 },
      };
      items[blockId] = {
        type: "block",
        config: { style: "organic" },
        position: { x: 1, y: 2, z: 0 },
      };
      draft.layout.nodes[secondOpenRoomId] = {
        ...openRoomDefaults,
        id: secondOpenRoomId,
        roomId: testRoomId,
        subRoomId: "*",
        editable: true,
      };
    },
  );
  const paneElement = document.createElement("div");
  const viewport = new EditorViewport();
  const grabbedAt: Xyz = {
    x: 1.5 * blockSizePx.x,
    y: 2.5 * blockSizePx.y,
    z: 0,
  };
  const pointingAtBlock: PointingAtItem = {
    roomId: testRoomId,
    scrXy: { x: 0, y: 0 },
    world: {
      itemId: blockId,
      position: grabbedAt,
      onItem: { face: { x: 0, y: 0, z: 1 } },
    },
  };
  const roomState = loadEditorRoom(
    state0.campaignInProgress.rooms[testRoomId] as EditorRoomJson,
  );
  const handler = new PointerToolHandler();
  // two blocks along x and one along y from where it was grabbed:
  const pointerInSecondPane = projectWorldXyzToScreenXy(
    addXyz(grabbedAt, { x: 2 * blockSizePx.x, y: blockSizePx.y }),
  );
  const pointingAtNothing = {
    roomId: testRoomId,
    scrXy: pointerInSecondPane,
    world: undefined,
  };

  const state1Dropped = reduceLevelEditorActions(
    state0,
    // the pointer goes down on the block:
    handler.handleMouseDown({
      openRoomId: testOpenRoomId,
      roomState,
      mouseEvent: { button: 0 } as MouseEvent,
      viewport,
      pointingAt: pointingAtBlock,
    }),
    // drags it a block along x in its own pane:
    handler.handleMouseMove({
      openRoomId: testOpenRoomId,
      roomState,
      mouseEvent: {
        clientX: -blockSizePx.x,
        clientY: -blockSizePx.x / 2,
        currentTarget: paneElement,
        metaKey: false,
        shiftKey: false,
      } as Partial<MouseEvent> as MouseEvent,
      viewport,
      pointingAt: pointingAtBlock,
      pointingAtChanged: true,
    }),
    // on over the second view of the room:
    itemGrabOverOpenRoom({ openRoomId: secondOpenRoomId, timestamp: 0 }),
    handler.handleMouseMove({
      openRoomId: secondOpenRoomId,
      roomState,
      mouseEvent: {
        clientX: pointerInSecondPane.x,
        clientY: pointerInSecondPane.y,
        currentTarget: paneElement,
        metaKey: false,
        shiftKey: false,
      } as Partial<MouseEvent> as MouseEvent,
      viewport,
      pointingAt: pointingAtNothing,
      pointingAtChanged: true,
    }),
    // and is released there:
    handler.handleMouseUp({
      openRoomId: secondOpenRoomId,
      roomState,
      mouseEvent: { button: 0 } as MouseEvent,
      viewport,
      pointingAt: pointingAtNothing,
      isClick: false,
    }),
  );

  expect<Xyz>(
    state1Dropped.campaignInProgress.rooms[testRoomId].items[blockId].position,
  ).toEqual<Xyz>({ x: 3, y: 3, z: 0 });
});

test("holding shift while dragging a block over another room's pane lifts it there", () => {
  const otherRoomId = "otherRoomId" as EditorRoomId;
  const otherOpenRoomId = "openRoom-other" as OpenRoomId;
  const blockId = "block" as EditorRoomItemId;
  const floor: EditorRoomJson["items"][EditorRoomItemId] = {
    type: "floor",
    config: {
      floorType: "standable",
      scenery: "blacktooth",
      times: { x: 8, y: 8 },
    },
    position: { x: 0, y: 0, z: 0 },
  };
  const state0: LevelEditorState = produce(
    editorStateWithOneRoomWithNoItems,
    (draft) => {
      const { rooms } = draft.campaignInProgress;
      rooms[testRoomId].items["floor" as EditorRoomItemId] = floor;
      rooms[testRoomId].items[blockId] = {
        type: "block",
        config: { style: "organic" },
        position: { x: 1, y: 2, z: 0 },
      };
      rooms[otherRoomId] = {
        ...rooms[testRoomId],
        id: otherRoomId,
        items: { ["floor" as EditorRoomItemId]: floor },
      };
      draft.layout.nodes[otherOpenRoomId] = {
        ...openRoomDefaults,
        id: otherOpenRoomId,
        roomId: otherRoomId,
        subRoomId: "*",
        editable: true,
      };
    },
  );
  const paneElement = document.createElement("div");
  const viewport = new EditorViewport();
  const grabbedAt: Xyz = {
    x: 1.5 * blockSizePx.x,
    y: 2.5 * blockSizePx.y,
    z: 0,
  };
  const pointingAtBlock: PointingAtItem = {
    roomId: testRoomId,
    scrXy: { x: 0, y: 0 },
    world: {
      itemId: blockId,
      position: grabbedAt,
      onItem: { face: { x: 0, y: 0, z: 1 } },
    },
  };
  const sourceRoomState = loadEditorRoom(
    state0.campaignInProgress.rooms[testRoomId] as EditorRoomJson,
  );
  const otherRoomState = loadEditorRoom(
    state0.campaignInProgress.rooms[otherRoomId] as EditorRoomJson,
  );
  const handler = new PointerToolHandler();
  // two blocks along x and one along y from where it was grabbed:
  const pointerInOtherPane = projectWorldXyzToScreenXy(
    addXyz(grabbedAt, { x: 2 * blockSizePx.x, y: blockSizePx.y }),
  );
  const pointingAtNothingInOtherRoom = {
    roomId: otherRoomId,
    scrXy: pointerInOtherPane,
    world: undefined,
  };

  const state1Lifted = reduceLevelEditorActions(
    state0,
    // the pointer goes down on the block:
    handler.handleMouseDown({
      openRoomId: testOpenRoomId,
      roomState: sourceRoomState,
      mouseEvent: { button: 0 } as MouseEvent,
      viewport,
      pointingAt: pointingAtBlock,
    }),
    // drags it a block along x in its own pane:
    handler.handleMouseMove({
      openRoomId: testOpenRoomId,
      roomState: sourceRoomState,
      mouseEvent: {
        clientX: -blockSizePx.x,
        clientY: -blockSizePx.x / 2,
        currentTarget: paneElement,
        metaKey: false,
        shiftKey: false,
      } as Partial<MouseEvent> as MouseEvent,
      viewport,
      pointingAt: pointingAtBlock,
      pointingAtChanged: true,
    }),
    // on over the other room's pane:
    itemGrabOverOpenRoom({ openRoomId: otherOpenRoomId, timestamp: 0 }),
    handler.handleMouseMove({
      openRoomId: otherOpenRoomId,
      roomState: otherRoomState,
      mouseEvent: {
        clientX: pointerInOtherPane.x,
        clientY: pointerInOtherPane.y,
        currentTarget: paneElement,
        metaKey: false,
        shiftKey: false,
      } as Partial<MouseEvent> as MouseEvent,
      viewport,
      pointingAt: pointingAtNothingInOtherRoom,
      pointingAtChanged: true,
    }),
    // then, with shift held, up the screen by two blocks' height:
    handler.handleMouseMove({
      openRoomId: otherOpenRoomId,
      roomState: otherRoomState,
      mouseEvent: {
        clientX: pointerInOtherPane.x,
        clientY: pointerInOtherPane.y - 2 * blockSizePx.z,
        movementX: 0,
        movementY: -2 * blockSizePx.z,
        currentTarget: paneElement,
        metaKey: false,
        shiftKey: true,
      } as Partial<MouseEvent> as MouseEvent,
      viewport,
      pointingAt: pointingAtNothingInOtherRoom,
      pointingAtChanged: true,
    }),
  );

  const [movedItemId] = state1Lifted.itemGrab!.dropInto!.movedItemIds;
  expect<undefined | Xyz>(
    selectRoomJsonWithPreviews(
      { levelEditor: state1Lifted } as EditorRootState,
      otherRoomId,
    )?.items[movedItemId].position,
  ).toEqual<Xyz>({ x: 3, y: 3, z: 2 });
});

test("a block dragged out of its room's pane is hidden there until it can be dropped somewhere", () => {
  const blockId = "block" as EditorRoomItemId;
  const state0: LevelEditorState = produce(
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
        position: { x: 0, y: 0, z: 0 },
      };
      items[blockId] = {
        type: "block",
        config: { style: "organic" },
        position: { x: 1, y: 2, z: 0 },
      };
    },
  );
  const paneElement = document.createElement("div");
  const viewport = new EditorViewport();
  const pointingAtBlock: PointingAtItem = {
    roomId: testRoomId,
    scrXy: { x: 0, y: 0 },
    world: {
      itemId: blockId,
      position: { x: 1.5 * blockSizePx.x, y: 2.5 * blockSizePx.y, z: 0 },
      onItem: { face: { x: 0, y: 0, z: 1 } },
    },
  };
  const roomState = loadEditorRoom(
    state0.campaignInProgress.rooms[testRoomId] as EditorRoomJson,
  );
  const handler = new PointerToolHandler();

  const state1LeftPane = reduceLevelEditorActions(
    state0,
    // the pointer goes down on the block:
    handler.handleMouseDown({
      openRoomId: testOpenRoomId,
      roomState,
      mouseEvent: { button: 0 } as MouseEvent,
      viewport,
      pointingAt: pointingAtBlock,
    }),
    // drags it a block along x in its own pane:
    handler.handleMouseMove({
      openRoomId: testOpenRoomId,
      roomState,
      mouseEvent: {
        clientX: -blockSizePx.x,
        clientY: -blockSizePx.x / 2,
        currentTarget: paneElement,
        metaKey: false,
        shiftKey: false,
      } as Partial<MouseEvent> as MouseEvent,
      viewport,
      pointingAt: pointingAtBlock,
      pointingAtChanged: true,
    }),
    // and out of the pane, over no other:
    itemGrabOverOpenRoom({ openRoomId: undefined, timestamp: 0 }),
  );

  expect(
    selectRoomJsonWithPreviews(
      { levelEditor: state1LeftPane } as EditorRootState,
      testRoomId,
    )?.items[blockId],
  ).toBeUndefined();
});

test("dragging a block's edge and releasing it resizes the block", () => {
  const blockId = "block" as EditorRoomItemId;
  const state0: LevelEditorState = produce(
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
        position: { x: 0, y: 0, z: 0 },
      };
      items[blockId] = {
        type: "block",
        config: { style: "organic" },
        position: { x: 1, y: 2, z: 0 },
      };
    },
  );
  const paneElement = document.createElement("div");
  const viewport = new EditorViewport();
  // on the block's top edge, on its +x side:
  const pointingAtBlockEdge: PointingAtItem = {
    roomId: testRoomId,
    scrXy: { x: 0, y: 0 },
    world: {
      itemId: blockId,
      position: {
        x: 2 * blockSizePx.x,
        y: 2.5 * blockSizePx.y,
        z: blockSizePx.z,
      },
      onItem: {
        face: { x: 0, y: 0, z: 1 },
        edge: betweenUpAndLeft,
      },
    },
  };
  const roomState = loadEditorRoom(
    state0.campaignInProgress.rooms[testRoomId] as EditorRoomJson,
  );
  const handler = new PointerToolHandler();
  // two blocks along x, on the screen:
  const pointerTwoBlocksAlong = projectWorldXyzToScreenXy({
    x: 2 * blockSizePx.x,
    y: 0,
    z: 0,
  });

  const state1Released = reduceLevelEditorActions(
    state0,
    // the pointer goes down on the block's edge:
    handler.handleMouseDown({
      openRoomId: testOpenRoomId,
      roomState,
      mouseEvent: { button: 0 } as MouseEvent,
      viewport,
      pointingAt: pointingAtBlockEdge,
    }),
    // drags it two blocks along x:
    handler.handleMouseMove({
      openRoomId: testOpenRoomId,
      roomState,
      mouseEvent: {
        clientX: pointerTwoBlocksAlong.x,
        clientY: pointerTwoBlocksAlong.y,
        currentTarget: paneElement,
        metaKey: false,
        shiftKey: false,
      } as Partial<MouseEvent> as MouseEvent,
      viewport,
      pointingAt: pointingAtBlockEdge,
      pointingAtChanged: true,
    }),
    // and releases it there:
    handler.handleMouseUp({
      openRoomId: testOpenRoomId,
      roomState,
      mouseEvent: { button: 0 } as MouseEvent,
      viewport,
      pointingAt: pointingAtBlockEdge,
      isClick: false,
    }),
  );

  expect<Xyz>(
    getJsonItemTimes(
      state1Released.campaignInProgress.rooms[testRoomId].items[blockId],
    ),
  ).toEqual<Xyz>({ x: 3, y: 1, z: 1 });
});

test("a block dragged against another like it and released there is joined to it", () => {
  const draggedBlockId = "draggedBlock" as EditorRoomItemId;
  const state0: LevelEditorState = produce(
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
        position: { x: 0, y: 0, z: 0 },
      };
      items[draggedBlockId] = {
        type: "block",
        config: { style: "organic" },
        position: { x: 1, y: 2, z: 0 },
      };
      items["otherBlock" as EditorRoomItemId] = {
        type: "block",
        config: { style: "organic" },
        position: { x: 3, y: 2, z: 0 },
      };
    },
  );
  const paneElement = document.createElement("div");
  const viewport = new EditorViewport();
  const pointingAtBlock: PointingAtItem = {
    roomId: testRoomId,
    scrXy: { x: 0, y: 0 },
    world: {
      itemId: draggedBlockId,
      position: { x: 1.5 * blockSizePx.x, y: 2.5 * blockSizePx.y, z: 0 },
      onItem: { face: { x: 0, y: 0, z: 1 } },
    },
  };
  const roomState = loadEditorRoom(
    state0.campaignInProgress.rooms[testRoomId] as EditorRoomJson,
  );
  const handler = new PointerToolHandler();

  const state1Released = reduceLevelEditorActions(
    state0,
    // the pointer goes down on the block:
    handler.handleMouseDown({
      openRoomId: testOpenRoomId,
      roomState,
      mouseEvent: { button: 0 } as MouseEvent,
      viewport,
      pointingAt: pointingAtBlock,
    }),
    // drags it a block along x, against the other:
    handler.handleMouseMove({
      openRoomId: testOpenRoomId,
      roomState,
      mouseEvent: {
        clientX: -blockSizePx.x,
        clientY: -blockSizePx.x / 2,
        currentTarget: paneElement,
        metaKey: false,
        shiftKey: false,
      } as Partial<MouseEvent> as MouseEvent,
      viewport,
      pointingAt: pointingAtBlock,
      pointingAtChanged: true,
    }),
    // and releases it there:
    handler.handleMouseUp({
      openRoomId: testOpenRoomId,
      roomState,
      mouseEvent: { button: 0 } as MouseEvent,
      viewport,
      pointingAt: pointingAtBlock,
      isClick: false,
    }),
  );

  expect(
    Object.values(state1Released.campaignInProgress.rooms[testRoomId].items)
      .filter(({ type }) => type === "block")
      .map((block) => ({
        position: block.position,
        times: getJsonItemTimes(block),
      })),
  ).toEqual([{ position: { x: 2, y: 2, z: 0 }, times: { x: 2, y: 1, z: 1 } }]);
});

test("releasing a drag records it as one undoable move", () => {
  const blockId = "block" as EditorRoomItemId;
  const state0: LevelEditorState = produce(
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
        position: { x: 0, y: 0, z: 0 },
      };
      items[blockId] = {
        type: "block",
        config: { style: "organic" },
        position: { x: 1, y: 2, z: 0 },
      };
    },
  );
  const paneElement = document.createElement("div");
  const viewport = new EditorViewport();
  const pointingAtBlock: PointingAtItem = {
    roomId: testRoomId,
    scrXy: { x: 0, y: 0 },
    world: {
      itemId: blockId,
      position: { x: 1.5 * blockSizePx.x, y: 2.5 * blockSizePx.y, z: 0 },
      onItem: { face: { x: 0, y: 0, z: 1 } },
    },
  };
  const roomState = loadEditorRoom(
    state0.campaignInProgress.rooms[testRoomId] as EditorRoomJson,
  );
  const handler = new PointerToolHandler();

  const state1Released = reduceLevelEditorActions(
    state0,
    // the pointer goes down on the block:
    handler.handleMouseDown({
      openRoomId: testOpenRoomId,
      roomState,
      mouseEvent: { button: 0 } as MouseEvent,
      viewport,
      pointingAt: pointingAtBlock,
    }),
    // drags it a block along x:
    handler.handleMouseMove({
      openRoomId: testOpenRoomId,
      roomState,
      mouseEvent: {
        clientX: -blockSizePx.x,
        clientY: -blockSizePx.x / 2,
        currentTarget: paneElement,
        metaKey: false,
        shiftKey: false,
      } as Partial<MouseEvent> as MouseEvent,
      viewport,
      pointingAt: pointingAtBlock,
      pointingAtChanged: true,
    }),
    // and releases it there:
    handler.handleMouseUp({
      openRoomId: testOpenRoomId,
      roomState,
      mouseEvent: { button: 0 } as MouseEvent,
      viewport,
      pointingAt: pointingAtBlock,
      isClick: false,
    }),
  );

  expect(
    state1Released.history[testRoomId]?.undo.map(({ description }) =>
      description.kind === "itemAction" ?
        { verb: description.verb, itemIds: description.items.map(([id]) => id) }
      : description.kind,
    ),
  ).toEqual([{ verb: "↖ Move", itemIds: [blockId] }]);
});

test.for([
  {
    name: "undoing it in either room undoes it in both",
    afterDrop: [] as ReducibleAction[],
    inSourceRoom: [undo()],
    expectedBlockRooms: { source: true, other: false },
  },
  {
    name: "hovering its undo entry in either room previews undoing it in both",
    afterDrop: [],
    // the only entry in the room's undo history:
    inSourceRoom: [undoHovered(1)],
    expectedBlockRooms: { source: true, other: false },
  },
  {
    name: "undoing then redoing it in either room redoes it in both",
    afterDrop: [],
    inSourceRoom: [undo(), redo()],
    expectedBlockRooms: { source: false, other: true },
  },
  {
    name: "once the other room has changed since, undoing it in one room undoes it only there",
    inSourceRoom: [undo()],
    afterDrop: [
      changeToRoom("otherRoomId" as EditorRoomId),
      changeWallsFloorsLocked(false),
      // anything done in the other room since:
      setSelectedItemsInRoom({ jsonItemIds: ["floor" as EditorRoomItemId] }),
      deleteSelected({ timestamp: 0 }),
      changeToRoom(testRoomId),
    ],
    expectedBlockRooms: { source: true, other: true },
  },
])(
  "after dragging a block into another room's pane, $name",
  ({ afterDrop, inSourceRoom, expectedBlockRooms }) => {
    const otherRoomId = "otherRoomId" as EditorRoomId;
    const otherOpenRoomId = "openRoom-other" as OpenRoomId;
    const blockId = "block" as EditorRoomItemId;
    const floor: EditorRoomJson["items"][EditorRoomItemId] = {
      type: "floor",
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
    };
    const state0: LevelEditorState = produce(
      editorStateWithOneRoomWithNoItems,
      (draft) => {
        const { rooms } = draft.campaignInProgress;
        rooms[testRoomId].items["floor" as EditorRoomItemId] = floor;
        rooms[testRoomId].items[blockId] = {
          type: "block",
          config: { style: "organic" },
          position: { x: 1, y: 2, z: 0 },
        };
        rooms[otherRoomId] = {
          ...rooms[testRoomId],
          id: otherRoomId,
          items: { ["floor" as EditorRoomItemId]: floor },
        };
        draft.layout.nodes[otherOpenRoomId] = {
          ...openRoomDefaults,
          id: otherOpenRoomId,
          roomId: otherRoomId,
          subRoomId: "*",
          editable: true,
        };
      },
    );
    const paneElement = document.createElement("div");
    const viewport = new EditorViewport();
    const grabbedAt: Xyz = {
      x: 1.5 * blockSizePx.x,
      y: 2.5 * blockSizePx.y,
      z: 0,
    };
    const pointingAtBlock: PointingAtItem = {
      roomId: testRoomId,
      scrXy: { x: 0, y: 0 },
      world: {
        itemId: blockId,
        position: grabbedAt,
        onItem: { face: { x: 0, y: 0, z: 1 } },
      },
    };
    const sourceRoomState = loadEditorRoom(
      state0.campaignInProgress.rooms[testRoomId] as EditorRoomJson,
    );
    const otherRoomState = loadEditorRoom(
      state0.campaignInProgress.rooms[otherRoomId] as EditorRoomJson,
    );
    const handler = new PointerToolHandler();
    // two blocks along x and one along y from where it was grabbed:
    const pointerInOtherPane = projectWorldXyzToScreenXy(
      addXyz(grabbedAt, { x: 2 * blockSizePx.x, y: blockSizePx.y }),
    );
    const pointingAtNothingInOtherRoom = {
      roomId: otherRoomId,
      scrXy: pointerInOtherPane,
      world: undefined,
    };

    const state1Undone = reduceLevelEditorActions(
      state0,
      // the pointer goes down on the block:
      handler.handleMouseDown({
        openRoomId: testOpenRoomId,
        roomState: sourceRoomState,
        mouseEvent: { button: 0 } as MouseEvent,
        viewport,
        pointingAt: pointingAtBlock,
      }),
      // drags it a block along x in its own pane:
      handler.handleMouseMove({
        openRoomId: testOpenRoomId,
        roomState: sourceRoomState,
        mouseEvent: {
          clientX: -blockSizePx.x,
          clientY: -blockSizePx.x / 2,
          currentTarget: paneElement,
          metaKey: false,
          shiftKey: false,
        } as Partial<MouseEvent> as MouseEvent,
        viewport,
        pointingAt: pointingAtBlock,
        pointingAtChanged: true,
      }),
      // on over the other room's pane:
      itemGrabOverOpenRoom({ openRoomId: otherOpenRoomId, timestamp: 0 }),
      handler.handleMouseMove({
        openRoomId: otherOpenRoomId,
        roomState: otherRoomState,
        mouseEvent: {
          clientX: pointerInOtherPane.x,
          clientY: pointerInOtherPane.y,
          currentTarget: paneElement,
          metaKey: false,
          shiftKey: false,
        } as Partial<MouseEvent> as MouseEvent,
        viewport,
        pointingAt: pointingAtNothingInOtherRoom,
        pointingAtChanged: true,
      }),
      // where it is released:
      handler.handleMouseUp({
        openRoomId: otherOpenRoomId,
        roomState: otherRoomState,
        mouseEvent: { button: 0 } as MouseEvent,
        viewport,
        pointingAt: pointingAtNothingInOtherRoom,
        isClick: false,
      }),
      ...afterDrop,
      // then, in the room it came from:
      ...inSourceRoom,
    );

    expect({
      source:
        selectRoomJsonWithPreviews(
          { levelEditor: state1Undone } as EditorRootState,
          testRoomId,
        )?.items[blockId] !== undefined,
      other:
        selectRoomJsonWithPreviews(
          { levelEditor: state1Undone } as EditorRootState,
          otherRoomId,
        )?.items[blockId] !== undefined,
    }).toEqual(expectedBlockRooms);
  },
);
