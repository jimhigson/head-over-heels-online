import { produce } from "immer";
import { expect, test } from "vitest";

import { unitVectors } from "../../../utils/vectors/unitVectors";
import { originXyz, type Xyz } from "../../../utils/vectors/vectors";
import type { EditorRoomItemId } from "../../editorTypes";
import {
  commitPendingNudge,
  deleteSelected,
  type LevelEditorState,
  nudgeSelectedItems,
  setSelectedItemsInRoom,
  undo,
} from "../levelEditorSlice";
import { existingLayoutNode } from "../PaneLayout";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  testOpenRoomId,
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
    existingLayoutNode(draft.layout, testOpenRoomId).selection = [
      { jsonItemId: monkeyId, whichEditorGhost: undefined },
    ];
  },
);

const nudge = (positionDelta: Xyz) =>
  nudgeSelectedItems({ positionDelta, timesDelta: originXyz, timestamp: 0 });

const monkeyPosition = (state: LevelEditorState) =>
  state.campaignInProgress.rooms[testRoomId].items[monkeyId]?.position;

test("nudges are previewed, and committed as one edit once they pause", () => {
  const state0 = stateWithSelectedMonkey;
  const state1 = reduceLevelEditorActions(
    state0,
    nudge(unitVectors.left),
    nudge(unitVectors.left),
    nudge(unitVectors.left),
    commitPendingNudge(),
  );

  expect({
    position: monkeyPosition(state1),
    undoEntries: state1.history[testRoomId]?.undo.length,
  }).toEqual({ position: { x: 4, y: 1, z: 0 }, undoEntries: 1 });
});

test("nudges aren't committed while they are still being previewed", () => {
  const state0 = stateWithSelectedMonkey;
  const state1 = reduceLevelEditorActions(
    state0,
    nudge(unitVectors.left),
    nudge(unitVectors.left),
  );

  expect(monkeyPosition(state1)).toEqual<Xyz>({ x: 1, y: 1, z: 0 });
});

test("changing the selection commits the nudges", () => {
  const state0 = stateWithSelectedMonkey;
  const state1 = reduceLevelEditorActions(
    state0,
    nudge(unitVectors.left),
    nudge(unitVectors.left),
    setSelectedItemsInRoom({
      selection: [{ jsonItemId: otherMonkeyId, whichEditorGhost: undefined }],
    }),
  );

  expect({
    position: monkeyPosition(state1),
    pendingEdits: state1.pendingEdits,
  }).toEqual({ position: { x: 3, y: 1, z: 0 }, pendingEdits: undefined });
});

test("undoing while nudges are previewed undoes the nudges", () => {
  const state0 = stateWithSelectedMonkey;
  const state1 = reduceLevelEditorActions(
    state0,
    nudge(unitVectors.left),
    nudge(unitVectors.left),
    undo(),
    commitPendingNudge(),
  );

  expect(monkeyPosition(state1)).toEqual<Xyz>({ x: 1, y: 1, z: 0 });
});

test("deleting while nudges are previewed deletes the nudged item for good", () => {
  const state0 = stateWithSelectedMonkey;
  const state1 = reduceLevelEditorActions(
    state0,
    nudge(unitVectors.left),
    deleteSelected({ timestamp: 0 }),
    commitPendingNudge(),
  );

  expect(monkeyPosition(state1)).toBeUndefined();
});

test("nudging back to where the item started leaves no edit", () => {
  const state0 = stateWithSelectedMonkey;
  const state1 = reduceLevelEditorActions(
    state0,
    nudge(unitVectors.left),
    nudge(unitVectors.right),
    commitPendingNudge(),
  );

  expect(state1.history[testRoomId]?.undo ?? []).toHaveLength(0);
});

test("nudging a selected lift editor ghost down moves its lift's end, not the lift", () => {
  const liftId = "lift" as EditorRoomItemId;
  const state0WithLiftTopSelected = produce(
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
      room.items[liftId] = {
        type: "lift",
        position: { x: 1, y: 1, z: 0 },
        config: { bottom: 0, top: 4 },
      };
      existingLayoutNode(draft.layout, testOpenRoomId).selection = [
        { jsonItemId: liftId, whichEditorGhost: "liftTop" },
      ];
    },
  );
  const state1AfterNudgeDown = reduceLevelEditorActions(
    state0WithLiftTopSelected,
    nudge(unitVectors.down),
    commitPendingNudge(),
  );

  expect(
    state1AfterNudgeDown.campaignInProgress.rooms[testRoomId].items[liftId],
  ).toEqual({
    type: "lift",
    position: { x: 1, y: 1, z: 0 },
    config: { bottom: 0, top: 3 },
  });
});

test("nudging a selected emitter's editor ghost moves the emitter", () => {
  const emitterId = "emitter" as EditorRoomItemId;
  const state0WithEmitterGhostSelected = produce(
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
      room.items[emitterId] = {
        type: "emitter",
        position: { x: 1, y: 1, z: 2 },
        config: {
          emits: { type: "portableBlock", config: { style: "cube" } },
          period: 1_000,
          maximum: null,
        },
      };
      existingLayoutNode(draft.layout, testOpenRoomId).selection = [
        { jsonItemId: emitterId, whichEditorGhost: "emittedItem" },
      ];
    },
  );
  const state1AfterNudgeLeft = reduceLevelEditorActions(
    state0WithEmitterGhostSelected,
    nudge(unitVectors.left),
    commitPendingNudge(),
  );

  expect(
    state1AfterNudgeLeft.campaignInProgress.rooms[testRoomId].items[emitterId]
      ?.position,
  ).toEqual({ x: 2, y: 1, z: 2 });
});
