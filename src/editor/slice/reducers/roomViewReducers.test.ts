import { produce } from "immer";
import { expect, test } from "vitest";

import { type EditorRoomId } from "../../editorTypes";
import { type EditorRoomView } from "../EditorRoomView";
import {
  changeToRoom,
  paneViewChanged,
  paneViewPanned,
  rotateViewClockwise,
  selectPaneView,
} from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testPaneId,
  testRoomId,
} from "./__test__/storeStates";

const roomB = "roomB" as EditorRoomId;

const baseState = produce(editorStateWithOneRoomWithNoItems, (draft) => {
  const { rooms } = draft.campaignInProgress;
  rooms[roomB] = { ...rooms[testRoomId], id: roomB };
});

const someView: EditorRoomView = { zoom: 3, pan: { x: 10, y: 20 } };

test("a newly opened tab has no view of its own", () => {
  const state = reduceLevelEditorActions(
    baseState,
    paneViewChanged({ paneId: testPaneId, view: someView }),
    changeToRoom(roomB),
  );

  expect(selectPaneView({ levelEditor: state }, testPaneId)).toBeUndefined();
});

test("switching back to a tab restores its view", () => {
  const state = reduceLevelEditorActions(
    baseState,
    paneViewChanged({ paneId: testPaneId, view: someView }),
    changeToRoom(roomB),
    paneViewChanged({
      paneId: testPaneId,
      view: { zoom: 5, pan: { x: 0, y: 0 } },
    }),
    changeToRoom(testRoomId),
  );

  expect<EditorRoomView | undefined>(
    selectPaneView({ levelEditor: state }, testPaneId),
  ).toEqual<EditorRoomView>(someView);
});

test("panning moves the pane's view", () => {
  const state = reduceLevelEditorActions(
    baseState,
    paneViewChanged({ paneId: testPaneId, view: someView }),
    paneViewPanned({ paneId: testPaneId, delta: { x: 1, y: -1 } }),
  );

  expect<EditorRoomView | undefined>(
    selectPaneView({ levelEditor: state }, testPaneId),
  ).toEqual<EditorRoomView>({ zoom: 3, pan: { x: 11, y: 19 } });
});

test("panning a room not yet framed does nothing", () => {
  const state = reduceLevelEditorActions(
    baseState,
    paneViewPanned({ paneId: testPaneId, delta: { x: 1, y: -1 } }),
  );

  expect(selectPaneView({ levelEditor: state }, testPaneId)).toBeUndefined();
});

test("rotating drops the view, so the room is fitted afresh", () => {
  const state = reduceLevelEditorActions(
    baseState,
    paneViewChanged({ paneId: testPaneId, view: someView }),
    rotateViewClockwise(),
  );

  expect(selectPaneView({ levelEditor: state }, testPaneId)).toBeUndefined();
});
