// @vitest-environment happy-dom
import { produce } from "immer";
import { expect, test } from "vitest";

import { blockSizePx } from "../../../../model/blockSizePx";
import { type EditorRootState } from "../../../../store/store";
import { type Xyz } from "../../../../utils/vectors/vectors";
import {
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../../../editorTypes";
import { selectCurrentEditingRoomJsonWithPreviews } from "../../../slice/levelEditorSelectors";
import { type LevelEditorState } from "../../../slice/levelEditorSlice";
import { loadEditorRoom } from "../../../slice/loadEditorRoom";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testOpenRoomId,
  testRoomId,
} from "../../../slice/reducers/__test__/storeStates";
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
