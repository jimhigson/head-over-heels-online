import { produce } from "immer";
import { expect, test } from "vitest";

import { type EditorRoomId } from "../../editorTypes";
import { type EditorRoomView } from "../EditorRoomView";
import {
  changeToRoom,
  openRoomViewChanged,
  openRoomViewPanned,
  rotateViewClockwise,
  selectFrontOpenRoomId,
  selectOpenRoomView,
} from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testOpenRoomId,
  testRoomId,
} from "./__test__/storeStates";

const roomB = "roomB" as EditorRoomId;

const baseState = produce(editorStateWithOneRoomWithNoItems, (draft) => {
  const { rooms } = draft.campaignInProgress;
  rooms[roomB] = { ...rooms[testRoomId], id: roomB };
});

const someView: EditorRoomView = { zoom: 3, pan: { x: 10, y: 20 } };

test("a newly opened tab has no view of its own", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    openRoomViewChanged({ openRoomId: testOpenRoomId, view: someView }),
    changeToRoom(roomB),
  );

  expect(
    selectOpenRoomView(
      { levelEditor: state1 },
      selectFrontOpenRoomId({ levelEditor: state1 }),
    ),
  ).toBeUndefined();
});

test("switching back to a tab restores its view", () => {
  const state0 = baseState;
  const state1OnRoomB = reduceLevelEditorActions(
    state0,
    openRoomViewChanged({ openRoomId: testOpenRoomId, view: someView }),
    changeToRoom(roomB),
  );
  const state2 = reduceLevelEditorActions(
    state1OnRoomB,
    openRoomViewChanged({
      openRoomId: selectFrontOpenRoomId({ levelEditor: state1OnRoomB }),
      view: { zoom: 5, pan: { x: 0, y: 0 } },
    }),
    changeToRoom(testRoomId),
  );

  expect<EditorRoomView | undefined>(
    selectOpenRoomView({ levelEditor: state2 }, testOpenRoomId),
  ).toEqual<EditorRoomView>(someView);
});

test("panning moves the open room's view", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    openRoomViewChanged({ openRoomId: testOpenRoomId, view: someView }),
    openRoomViewPanned({ openRoomId: testOpenRoomId, delta: { x: 1, y: -1 } }),
  );

  expect<EditorRoomView | undefined>(
    selectOpenRoomView({ levelEditor: state1 }, testOpenRoomId),
  ).toEqual<EditorRoomView>({ zoom: 3, pan: { x: 11, y: 19 } });
});

test("panning a room not yet framed does nothing", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    openRoomViewPanned({ openRoomId: testOpenRoomId, delta: { x: 1, y: -1 } }),
  );

  expect(
    selectOpenRoomView({ levelEditor: state1 }, testOpenRoomId),
  ).toBeUndefined();
});

test("rotating drops the view, so the room is fitted afresh", () => {
  const state0 = baseState;
  const state1 = reduceLevelEditorActions(
    state0,
    openRoomViewChanged({ openRoomId: testOpenRoomId, view: someView }),
    rotateViewClockwise(),
  );

  expect(
    selectOpenRoomView({ levelEditor: state1 }, testOpenRoomId),
  ).toBeUndefined();
});
