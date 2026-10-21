import { expect, test } from "vitest";

import { type EditorRoomItemId } from "../../editorTypes";
import { type EditorPaneId } from "../EditorPane";
import { selectCursorRoomSelectedJsonItemIdsFromLevelEditorState } from "../levelEditorSelectors";
import {
  editorPaneActivated,
  editorPaneMounted,
  editorPaneUnmounted,
  newCampaign,
  selectPaneSelectedJsonItemIds,
  setSelectedItemsInRoom,
} from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithOneAwayWall,
  reduceLevelEditorActions,
  testPaneId,
  testRoomId,
  wallItemId,
} from "./__test__/storeStates";

const pickerPaneId = "pickerPane" as EditorPaneId;

const mountPicker = editorPaneMounted({
  paneId: pickerPaneId,
  roomSource: { type: "room", roomId: testRoomId },
  editable: false,
  activate: true,
});

test("a pane mounted to be activated becomes the active pane", () => {
  expect(
    reduceLevelEditorActions(editorStateWithOneRoomWithOneAwayWall, mountPicker)
      .activePaneId,
  ).toBe(pickerPaneId);
});

test("a pane mounted beside an active pane leaves it active", () => {
  expect(
    reduceLevelEditorActions(
      editorStateWithOneRoomWithOneAwayWall,
      editorPaneMounted({
        paneId: pickerPaneId,
        roomSource: { type: "room", roomId: testRoomId },
        editable: false,
      }),
    ).activePaneId,
  ).toBe(testPaneId);
});

test("unmounting the active pane makes another pane active", () => {
  expect(
    reduceLevelEditorActions(
      editorStateWithOneRoomWithOneAwayWall,
      mountPicker,
      editorPaneUnmounted(pickerPaneId),
    ).activePaneId,
  ).toBe(testPaneId);
});

test("selecting selects in the active pane only", () => {
  const state = reduceLevelEditorActions(
    editorStateWithOneRoomWithOneAwayWall,
    mountPicker,
    setSelectedItemsInRoom({ jsonItemIds: [wallItemId] }),
  );
  expect<EditorRoomItemId[][]>([
    selectPaneSelectedJsonItemIds({ levelEditor: state }, pickerPaneId),
    selectPaneSelectedJsonItemIds({ levelEditor: state }, testPaneId),
  ]).toEqual<EditorRoomItemId[][]>([[wallItemId], []]);
});

test("commands see no selection while a pane that doesn't edit is active", () => {
  const state = reduceLevelEditorActions(
    editorStateWithOneRoomWithOneAwayWall,
    setSelectedItemsInRoom({ jsonItemIds: [wallItemId] }),
    mountPicker,
  );
  expect(
    selectCursorRoomSelectedJsonItemIdsFromLevelEditorState(state),
  ).toEqual([]);
});

test("the editing pane's selection is back once it is active again", () => {
  const state = reduceLevelEditorActions(
    editorStateWithOneRoomWithOneAwayWall,
    setSelectedItemsInRoom({ jsonItemIds: [wallItemId] }),
    mountPicker,
    editorPaneActivated(testPaneId),
  );
  expect(
    selectCursorRoomSelectedJsonItemIdsFromLevelEditorState(state),
  ).toEqual([wallItemId]);
});

test("a new campaign keeps the mounted panes, without their selections", () => {
  const state = reduceLevelEditorActions(
    editorStateWithOneRoomWithOneAwayWall,
    setSelectedItemsInRoom({ jsonItemIds: [wallItemId] }),
    newCampaign(),
  );
  expect(state.panes[testPaneId]?.selectedJsonItemIdsByRoom).toEqual({});
});
