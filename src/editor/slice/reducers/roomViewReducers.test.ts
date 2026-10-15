import { produce } from "immer";
import { expect, test } from "vitest";

import { type EditorRoomId } from "../../editorTypes";
import { type EditorRoomView } from "../EditorRoomView";
import {
  changeToRoom,
  cursorRoomViewChanged,
  cursorRoomViewPanned,
  rotateViewClockwise,
  selectCursorRoomView,
} from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
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
    cursorRoomViewChanged(someView),
    changeToRoom(roomB),
  );

  expect(selectCursorRoomView({ levelEditor: state })).toBeUndefined();
});

test("switching back to a tab restores its view", () => {
  const state = reduceLevelEditorActions(
    baseState,
    cursorRoomViewChanged(someView),
    changeToRoom(roomB),
    cursorRoomViewChanged({ zoom: 5, pan: { x: 0, y: 0 } }),
    changeToRoom(testRoomId),
  );

  expect<EditorRoomView | undefined>(
    selectCursorRoomView({ levelEditor: state }),
  ).toEqual<EditorRoomView>(someView);
});

test("panning moves the cursor room's view", () => {
  const state = reduceLevelEditorActions(
    baseState,
    cursorRoomViewChanged(someView),
    cursorRoomViewPanned({ x: 1, y: -1 }),
  );

  expect<EditorRoomView | undefined>(
    selectCursorRoomView({ levelEditor: state }),
  ).toEqual<EditorRoomView>({ zoom: 3, pan: { x: 11, y: 19 } });
});

test("panning a room not yet framed does nothing", () => {
  const state = reduceLevelEditorActions(
    baseState,
    cursorRoomViewPanned({ x: 1, y: -1 }),
  );

  expect(selectCursorRoomView({ levelEditor: state })).toBeUndefined();
});

test("rotating drops the view, so the room is fitted afresh", () => {
  const state = reduceLevelEditorActions(
    baseState,
    cursorRoomViewChanged(someView),
    rotateViewClockwise(),
  );

  expect(selectCursorRoomView({ levelEditor: state })).toBeUndefined();
});
