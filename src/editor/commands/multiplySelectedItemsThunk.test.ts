import { produce } from "immer";
import { expect, test } from "vitest";

import { iterateRoomJsonItemsWithIds } from "../../model/RoomJsonItemIterators";
import { unitVectors } from "../../utils/vectors/unitVectors";
import { type Xyz } from "../../utils/vectors/vectors";
import {
  type EditorJsonItemUnion,
  type EditorRoomItemId,
} from "../editorTypes";
import { selectCurrentEditingRoomJsonWithPreviews } from "../slice/levelEditorSelectors";
import {
  commitPendingNudge,
  type LevelEditorState,
} from "../slice/levelEditorSlice";
import { loadEditorRoom } from "../slice/loadEditorRoom";
import { type MultiplyType } from "../slice/multiplyPlan";
import { existingLayoutNode } from "../slice/PaneLayout";
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  type ReducibleAction,
  testOpenRoomId,
  testRoomId,
} from "../slice/reducers/__test__/storeStates";
import { multiplySelectedItemsThunk } from "./multiplySelectedItemsThunk";

const monkeyId = "monkey" as EditorRoomItemId;
const monkey: EditorJsonItemUnion = {
  type: "monster",
  position: { x: 1, y: 1, z: 0 },
  config: {
    which: "monkey",
    activated: "off",
    startDirection: "towards",
    movement: "patrol-randomly-xy4",
  },
};

const stateWithSelectedMonkeyOnFloor: LevelEditorState = produce(
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
    room.items[monkeyId] = monkey;
    existingLayoutNode(draft.layout, testOpenRoomId).selectedJsonItemIds = [
      monkeyId,
    ];
  },
);

/**
 * a multiply thunk for each press, each checking collisions in the room as it
 * is previewed by then - and then the pause that commits them
 */
const multiplyPresses = (
  directions: Xyz[],
  multiplyType: MultiplyType = "multiplyOrGrow",
): ReducibleAction[] => [
  ...directions.map(
    (direction): ReducibleAction =>
      (dispatch, getState) =>
        dispatch(
          multiplySelectedItemsThunk(
            direction,
            multiplyType,
            loadEditorRoom(
              selectCurrentEditingRoomJsonWithPreviews(getState()),
            ),
          ),
        ),
  ),
  commitPendingNudge(),
];

const monsterPositions = (state: LevelEditorState): Xyz[] =>
  iterateRoomJsonItemsWithIds(
    state.campaignInProgress.rooms[testRoomId].items,
    "monster",
  )
    .map(([, { position }]) => position)
    .toArray()
    .sort((a, b) => a.x - b.x || a.y - b.y || a.z - b.z);

test("multiplying a monster three times along x then three along y makes a 4×4 square of them", () => {
  const state0 = stateWithSelectedMonkeyOnFloor;
  const state1 = reduceLevelEditorActions(
    state0,
    ...multiplyPresses([
      unitVectors.left,
      unitVectors.left,
      unitVectors.left,
      unitVectors.away,
      unitVectors.away,
      unitVectors.away,
    ]),
  );

  expect<Xyz[]>(monsterPositions(state1)).toEqual<Xyz[]>(
    [1, 2, 3, 4].flatMap((x) => [1, 2, 3, 4].map((y) => ({ x, y, z: 0 }))),
  );
});

test("multiplying selects the copies along with the originals", () => {
  const state0 = stateWithSelectedMonkeyOnFloor;
  const state1 = reduceLevelEditorActions(
    state0,
    ...multiplyPresses([unitVectors.left]),
  );

  expect(
    existingLayoutNode(state1.layout, testOpenRoomId).selectedJsonItemIds,
  ).toHaveLength(2);
});

test("each of several scattered selected items gets its own copy", () => {
  const otherMonkeyId = "otherMonkey" as EditorRoomItemId;
  const state0: LevelEditorState = produce(
    stateWithSelectedMonkeyOnFloor,
    (draft) => {
      draft.campaignInProgress.rooms[testRoomId].items[otherMonkeyId] = {
        ...monkey,
        position: { x: 5, y: 4, z: 0 },
      };
      existingLayoutNode(draft.layout, testOpenRoomId).selectedJsonItemIds = [
        monkeyId,
        otherMonkeyId,
      ];
    },
  );

  const state1 = reduceLevelEditorActions(
    state0,
    ...multiplyPresses([unitVectors.away]),
  );

  expect<Xyz[]>(monsterPositions(state1)).toEqual<Xyz[]>([
    { x: 1, y: 1, z: 0 },
    { x: 1, y: 2, z: 0 },
    { x: 5, y: 4, z: 0 },
    { x: 5, y: 5, z: 0 },
  ]);
});

test("a copy that would collide is left out, while the others are still made", () => {
  const otherMonkeyId = "otherMonkey" as EditorRoomItemId;
  const state0: LevelEditorState = produce(
    stateWithSelectedMonkeyOnFloor,
    (draft) => {
      const room = draft.campaignInProgress.rooms[testRoomId];
      room.items[otherMonkeyId] = { ...monkey, position: { x: 5, y: 4, z: 0 } };
      room.items["block" as EditorRoomItemId] = {
        type: "block",
        position: { x: 5, y: 5, z: 0 },
        config: { style: "organic" },
      };
      existingLayoutNode(draft.layout, testOpenRoomId).selectedJsonItemIds = [
        monkeyId,
        otherMonkeyId,
      ];
    },
  );

  const state1 = reduceLevelEditorActions(
    state0,
    ...multiplyPresses([unitVectors.away]),
  );

  expect<Xyz[]>(monsterPositions(state1)).toEqual<Xyz[]>([
    { x: 1, y: 1, z: 0 },
    { x: 1, y: 2, z: 0 },
    { x: 5, y: 4, z: 0 },
  ]);
});

test("a copy that would be off the floor is left out", () => {
  const state0 = stateWithSelectedMonkeyOnFloor;
  const state1 = reduceLevelEditorActions(
    state0,
    ...multiplyPresses([unitVectors.right, unitVectors.right]),
  );

  expect<Xyz[]>(monsterPositions(state1)).toEqual<Xyz[]>([
    { x: 0, y: 1, z: 0 },
    { x: 1, y: 1, z: 0 },
  ]);
});

test("shrinking a line of copies removes its trailing item", () => {
  const state0 = stateWithSelectedMonkeyOnFloor;
  const state1 = reduceLevelEditorActions(
    state0,
    ...multiplyPresses([unitVectors.left, unitVectors.left]),
    ...multiplyPresses([unitVectors.left], "removeOrShrink"),
  );

  expect<Xyz[]>(monsterPositions(state1)).toEqual<Xyz[]>([
    { x: 2, y: 1, z: 0 },
    { x: 3, y: 1, z: 0 },
  ]);
});

test("shrinking never removes the last item of a line", () => {
  const state0 = stateWithSelectedMonkeyOnFloor;
  const state1 = reduceLevelEditorActions(
    state0,
    ...multiplyPresses([unitVectors.left], "removeOrShrink"),
  );

  expect<Xyz[]>(monsterPositions(state1)).toEqual<Xyz[]>([
    { x: 1, y: 1, z: 0 },
  ]);
});

test("multiplying a block and a monster together grows the block and copies the monster, as one undoable edit", () => {
  const blockId = "block" as EditorRoomItemId;
  const state0: LevelEditorState = produce(
    stateWithSelectedMonkeyOnFloor,
    (draft) => {
      draft.campaignInProgress.rooms[testRoomId].items[blockId] = {
        type: "block",
        position: { x: 1, y: 4, z: 0 },
        config: { style: "organic" },
      };
      existingLayoutNode(draft.layout, testOpenRoomId).selectedJsonItemIds = [
        monkeyId,
        blockId,
      ];
      draft.autoCoalesce = false;
    },
  );

  const state1 = reduceLevelEditorActions(
    state0,
    ...multiplyPresses([unitVectors.left]),
  );

  const room = state1.campaignInProgress.rooms[testRoomId];
  expect({
    blockConfig: room.items[blockId]?.config,
    monsterCount: monsterPositions(state1).length,
    undoEntries: state1.history[testRoomId]?.undo.length,
  }).toEqual({
    blockConfig: { style: "organic", times: { x: 2 } },
    monsterCount: 2,
    undoEntries: 1,
  });
});

test("multiplying repeatedly before pausing is one undoable edit", () => {
  const state0 = stateWithSelectedMonkeyOnFloor;
  const state1 = reduceLevelEditorActions(
    state0,
    ...multiplyPresses([unitVectors.left, unitVectors.left, unitVectors.away]),
  );

  expect(state1.history[testRoomId]?.undo).toHaveLength(1);
});

test("shrinking straight after multiplying is a separate undoable edit", () => {
  const state0 = stateWithSelectedMonkeyOnFloor;
  const state1 = reduceLevelEditorActions(
    state0,
    ...multiplyPresses([unitVectors.left, unitVectors.left]).slice(0, -1),
    ...multiplyPresses([unitVectors.left], "removeOrShrink"),
  );

  expect(state1.history[testRoomId]?.undo).toHaveLength(2);
});
