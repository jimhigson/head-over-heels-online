import { produce } from "immer";
import { expect, test } from "vitest";

import { unitVectors } from "../../../utils/vectors/unitVectors";
import { originXyz, type Xyz } from "../../../utils/vectors/vectors";
import { type EditorRoomItemId } from "../../editorTypes";
import {
  commitPendingNudge,
  deleteSelected,
  type LevelEditorState,
  nudgeSelectedItems,
  setSelectedItemsInRoom,
  undo,
} from "../levelEditorSlice";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testRoomId,
} from "./__test__/storeStates";

const monkeyId = "monkey" as EditorRoomItemId;
const otherMonkeyId = "otherMonkey" as EditorRoomItemId;

const stateWithSelectedMonkey: LevelEditorState = produce(
  editorStateWithOneRoomWithNoItems,
  (draft) => {
    const room = draft.campaignInProgress.rooms[testRoomId];
    room.items["floor" as EditorRoomItemId] = {
      type: "floor",
      position: { x: 0, y: 0, z: 0 },
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 8, y: 8 },
      },
    };
    for (const [id, x] of [
      [monkeyId, 1],
      [otherMonkeyId, 5],
    ] as const) {
      room.items[id] = {
        type: "monster",
        position: { x, y: 1, z: 0 },
        config: {
          which: "monkey",
          activated: "off",
          startDirection: "towards",
          movement: "patrol-randomly-xy4",
        },
      };
    }
    draft.selectedJsonItemIdsByRoom[testRoomId] = [monkeyId];
  },
);

const nudge = (positionDelta: Xyz) =>
  nudgeSelectedItems({ positionDelta, timesDelta: originXyz, timestamp: 0 });

const monkeyPosition = (state: LevelEditorState) =>
  state.campaignInProgress.rooms[testRoomId].items[monkeyId]?.position;

test("nudges are previewed, and committed as one edit once they pause", () => {
  const result = reduceLevelEditorActions(
    stateWithSelectedMonkey,
    nudge(unitVectors.left),
    nudge(unitVectors.left),
    nudge(unitVectors.left),
    commitPendingNudge(),
  );

  expect({
    position: monkeyPosition(result),
    undoEntries: result.history[testRoomId]?.undo.length,
  }).toEqual({ position: { x: 4, y: 1, z: 0 }, undoEntries: 1 });
});

test("nudges aren't committed while they are still being previewed", () => {
  const result = reduceLevelEditorActions(
    stateWithSelectedMonkey,
    nudge(unitVectors.left),
    nudge(unitVectors.left),
  );

  expect(monkeyPosition(result)).toEqual<Xyz>({ x: 1, y: 1, z: 0 });
});

test("changing the selection commits the nudges", () => {
  const result = reduceLevelEditorActions(
    stateWithSelectedMonkey,
    nudge(unitVectors.left),
    nudge(unitVectors.left),
    setSelectedItemsInRoom({ jsonItemIds: [otherMonkeyId] }),
  );

  expect({
    position: monkeyPosition(result),
    pendingEdits: result.pendingEdits,
  }).toEqual({ position: { x: 3, y: 1, z: 0 }, pendingEdits: undefined });
});

test("undoing while nudges are previewed undoes the nudges", () => {
  const result = reduceLevelEditorActions(
    stateWithSelectedMonkey,
    nudge(unitVectors.left),
    nudge(unitVectors.left),
    undo(),
    commitPendingNudge(),
  );

  expect(monkeyPosition(result)).toEqual<Xyz>({ x: 1, y: 1, z: 0 });
});

test("deleting while nudges are previewed deletes the nudged item for good", () => {
  const result = reduceLevelEditorActions(
    stateWithSelectedMonkey,
    nudge(unitVectors.left),
    deleteSelected({ timestamp: 0 }),
    commitPendingNudge(),
  );

  expect(monkeyPosition(result)).toBeUndefined();
});

test("nudging back to where the item started leaves no edit", () => {
  const result = reduceLevelEditorActions(
    stateWithSelectedMonkey,
    nudge(unitVectors.left),
    nudge(unitVectors.right),
    commitPendingNudge(),
  );

  expect(result.history[testRoomId]?.undo ?? []).toHaveLength(0);
});
