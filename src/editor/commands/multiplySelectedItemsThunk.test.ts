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
import {
  editorStateWithOneRoomWithNoItems,
  reduceLevelEditorActions,
  type ReducibleAction,
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
    draft.selectedJsonItemIdsByRoom[testRoomId] = [monkeyId];
  },
);

/**
 * a multiply thunk for each press, each checking collisions in the room as it
 * is previewed by then - and then the pause that commits them
 */
const multiplyPresses = (
  directions: Xyz[],
  multiplyType: "multiply" | "shrink" = "multiply",
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
  const result = reduceLevelEditorActions(
    stateWithSelectedMonkeyOnFloor,
    ...multiplyPresses([
      unitVectors.left,
      unitVectors.left,
      unitVectors.left,
      unitVectors.away,
      unitVectors.away,
      unitVectors.away,
    ]),
  );

  expect<Xyz[]>(monsterPositions(result)).toEqual<Xyz[]>(
    [1, 2, 3, 4].flatMap((x) => [1, 2, 3, 4].map((y) => ({ x, y, z: 0 }))),
  );
});

test("multiplying selects the copies along with the originals", () => {
  const result = reduceLevelEditorActions(
    stateWithSelectedMonkeyOnFloor,
    ...multiplyPresses([unitVectors.left]),
  );

  expect(result.selectedJsonItemIdsByRoom[testRoomId]).toHaveLength(2);
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
      draft.selectedJsonItemIdsByRoom[testRoomId] = [monkeyId, otherMonkeyId];
    },
  );

  const result = reduceLevelEditorActions(
    state0,
    ...multiplyPresses([unitVectors.away]),
  );

  expect<Xyz[]>(monsterPositions(result)).toEqual<Xyz[]>([
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
      draft.selectedJsonItemIdsByRoom[testRoomId] = [monkeyId, otherMonkeyId];
    },
  );

  const result = reduceLevelEditorActions(
    state0,
    ...multiplyPresses([unitVectors.away]),
  );

  expect<Xyz[]>(monsterPositions(result)).toEqual<Xyz[]>([
    { x: 1, y: 1, z: 0 },
    { x: 1, y: 2, z: 0 },
    { x: 5, y: 4, z: 0 },
  ]);
});

test("a copy that would be off the floor is left out", () => {
  const result = reduceLevelEditorActions(
    stateWithSelectedMonkeyOnFloor,
    ...multiplyPresses([unitVectors.right, unitVectors.right]),
  );

  expect<Xyz[]>(monsterPositions(result)).toEqual<Xyz[]>([
    { x: 0, y: 1, z: 0 },
    { x: 1, y: 1, z: 0 },
  ]);
});

test("shrinking a line of copies removes its trailing item", () => {
  const result = reduceLevelEditorActions(
    stateWithSelectedMonkeyOnFloor,
    ...multiplyPresses([unitVectors.left, unitVectors.left]),
    ...multiplyPresses([unitVectors.left], "shrink"),
  );

  expect<Xyz[]>(monsterPositions(result)).toEqual<Xyz[]>([
    { x: 2, y: 1, z: 0 },
    { x: 3, y: 1, z: 0 },
  ]);
});

test("shrinking never removes the last item of a line", () => {
  const result = reduceLevelEditorActions(
    stateWithSelectedMonkeyOnFloor,
    ...multiplyPresses([unitVectors.left], "shrink"),
  );

  expect<Xyz[]>(monsterPositions(result)).toEqual<Xyz[]>([
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
      draft.selectedJsonItemIdsByRoom[testRoomId] = [monkeyId, blockId];
      draft.autoCoalesce = false;
    },
  );

  const result = reduceLevelEditorActions(
    state0,
    ...multiplyPresses([unitVectors.left]),
  );

  const room = result.campaignInProgress.rooms[testRoomId];
  expect({
    blockConfig: room.items[blockId]?.config,
    monsterCount: monsterPositions(result).length,
    undoEntries: result.history[testRoomId]?.undo.length,
  }).toEqual({
    blockConfig: { style: "organic", times: { x: 2 } },
    monsterCount: 2,
    undoEntries: 1,
  });
});

test("multiplying repeatedly before pausing is one undoable edit", () => {
  const result = reduceLevelEditorActions(
    stateWithSelectedMonkeyOnFloor,
    ...multiplyPresses([unitVectors.left, unitVectors.left, unitVectors.away]),
  );

  expect(result.history[testRoomId]?.undo).toHaveLength(1);
});

test("shrinking straight after multiplying is a separate undoable edit", () => {
  const result = reduceLevelEditorActions(
    stateWithSelectedMonkeyOnFloor,
    ...multiplyPresses([unitVectors.left, unitVectors.left]).slice(0, -1),
    ...multiplyPresses([unitVectors.left], "shrink"),
  );

  expect(result.history[testRoomId]?.undo).toHaveLength(2);
});
