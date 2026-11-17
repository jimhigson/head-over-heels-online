import { produce } from "immer";
import { expect, test } from "vitest";

import { roomJsonMatchers } from "../../model/json/__test__/roomJsonMatchers";
import { type VerificationCampaign } from "../../model/json/verification/verificationTypes";
import { verifyCampaign } from "../../model/json/verification/verifyCampaign";
import { roomGridPositions } from "../../model/map/roomGridPositions";
import { isWholeRoomSubRooms } from "../../model/RoomJson";
import { iterateRoomJsonItemsWithIds } from "../../model/RoomJsonItemIterators";
import { keys } from "../../utils/entries";
import {
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../editorTypes";
import { initialLevelEditorSliceState } from "./initialLevelEditorSliceState";
import {
  selectCursorRoomFromLevelEditorState,
  selectCursorRoomIdFromLevelEditorState,
} from "./levelEditorSelectors";

expect.extend(roomJsonMatchers);
import { selectIsCoalesceable } from "../EditorMap/CoalesceButton";
import { selectEditorMapData } from "../EditorMap/useEditorMapData";
import {
  changeToRoom,
  coalesceSelectedRooms,
  insertRoom,
  selectAllRooms,
  setRoomAboveOrBelow,
  toggleRoomInSelection,
} from "./levelEditorSlice";
import {
  reduceLevelEditorActions,
  type ReducibleAction,
} from "./reducers/__test__/storeStates";

const expectCoalesceable: ReducibleAction = (_dispatch, getState) => {
  expect(selectIsCoalesceable(getState())).toBe(true);
};

const expectValidMapData: ReducibleAction = (_dispatch, getState) => {
  const mapData = selectEditorMapData(getState());
  expect(mapData.isError).toBe(false);
};

test("insert room right, select both, coalesce", () => {
  const state0 = initialLevelEditorSliceState;
  const originalRoomId = selectCursorRoomIdFromLevelEditorState(state0);

  const state1 = reduceLevelEditorActions(
    state0,
    insertRoom({ direction: "right" }),
    toggleRoomInSelection({ roomId: originalRoomId, subRoomId: "*" }),
    expectCoalesceable,
    coalesceSelectedRooms(),
    expectValidMapData,
  );
  const roomIds = keys(state1.campaignInProgress.rooms);
  expect(roomIds).toEqual([originalRoomId]);

  const room = state1.campaignInProgress.rooms[
    originalRoomId
  ] as EditorRoomJson;
  const floors = iterateRoomJsonItemsWithIds(room.items, "floor").toArray();
  const walls = iterateRoomJsonItemsWithIds(room.items, "wall").toArray();
  const doors = iterateRoomJsonItemsWithIds(room.items, "door").toArray();

  expect.soft(floors).toHaveLength(1);
  const [[, floor]] = floors;
  expect.soft(floor.config.times).toEqual({ x: 16, y: 8 });

  expect.soft(walls).toHaveLength(4);
  expect.soft(doors).toHaveLength(0);

  const { subRoomId: cursorSubRoomId } =
    selectCursorRoomFromLevelEditorState(state1);
  expect
    .soft(() =>
      roomGridPositions({
        campaign: state1.campaignInProgress,
        roomId: originalRoomId,
        subRoomId: cursorSubRoomId,
      }),
    )
    .not.toThrow();
});

const selectFirstNNonCursorRoomsThunk =
  (n: number): ReducibleAction =>
  (dispatch, getState) => {
    const { levelEditor } = getState();
    const cursorRoomId = selectCursorRoomIdFromLevelEditorState(levelEditor);
    const otherRoomIds = keys(levelEditor.campaignInProgress.rooms).filter(
      (id) => id !== cursorRoomId,
    );
    for (const roomId of otherRoomIds.slice(0, n)) {
      dispatch(toggleRoomInSelection({ roomId, subRoomId: "*" }));
    }
  };

test("in a line", () => {
  const state0 = initialLevelEditorSliceState;
  const originalRoomId = selectCursorRoomIdFromLevelEditorState(state0);

  const state1 = reduceLevelEditorActions(
    state0,
    insertRoom({ direction: "right" }),
    insertRoom({ direction: "right" }),
    insertRoom({ direction: "right" }),
    // 4 rooms in a line: room_0 → room_1 → room_2 → room_3 (cursor)
    // coalesce room_2 + room_3
    toggleRoomInSelection({ roomId: "room_2" as never, subRoomId: "*" }),
    expectCoalesceable,
    coalesceSelectedRooms(),
    expectValidMapData,
    // coalesce room_0 + room_1
    changeToRoom({ roomId: originalRoomId, subRoomId: "*" }),
    toggleRoomInSelection({ roomId: "room_1" as never, subRoomId: "*" }),
    expectCoalesceable,
    coalesceSelectedRooms(),
    expectValidMapData,
    // finally coalesce the two merged rooms
    selectAllRooms(),
    expectCoalesceable,
    coalesceSelectedRooms(),
    expectValidMapData,
  );

  const roomIds = keys(state1.campaignInProgress.rooms);
  expect(roomIds).toHaveLength(1);

  const [roomId] = roomIds;
  const room = state1.campaignInProgress.rooms[roomId] as EditorRoomJson;
  expect(room).toHaveCompletePerimeter();
});

test.for<{
  name: string;
  doors: number;
  walls: number;
  floors: number;
  dispatch: ReducibleAction[];
}>([
  {
    name: "W-shaped room",
    doors: 0,
    walls: 10,
    floors: 3,
    dispatch: [
      insertRoom({ direction: "right" }),
      insertRoom({ direction: "away" }),
      insertRoom({ direction: "right" }),
      insertRoom({ direction: "away" }),
      selectAllRooms(),
      expectCoalesceable,
      coalesceSelectedRooms(),
      expectValidMapData,
    ],
  },
  {
    name: "O-shaped room",
    doors: 0,
    walls: 8,
    floors: 4,
    dispatch: [
      insertRoom({ direction: "right" }),
      insertRoom({ direction: "right" }),
      insertRoom({ direction: "away" }),
      insertRoom({ direction: "away" }),
      insertRoom({ direction: "left" }),
      insertRoom({ direction: "left" }),
      insertRoom({ direction: "towards" }),
      insertRoom({ direction: "towards" }),
      selectAllRooms(),
      expectCoalesceable,
      coalesceSelectedRooms(),
      expectValidMapData,
    ],
  },
  {
    name: "8x8 room with 2x8 corridor",
    doors: 0,
    walls: 4,
    floors: 1,
    dispatch: [
      insertRoom({ direction: "right", roomSize: { x: 2, y: 8 } }),
      selectAllRooms(),
      expectCoalesceable,
      coalesceSelectedRooms(),
    ],
  },
  {
    name: "L-shaped room becomes a square",
    doors: 0,
    // one big square at the end
    walls: 4,
    floors: 1,
    dispatch: [
      insertRoom({ direction: "right" }),
      insertRoom({ direction: "away" }),
      insertRoom({ direction: "left" }),
      selectFirstNNonCursorRoomsThunk(2),
      expectCoalesceable,
      coalesceSelectedRooms(),
      expectValidMapData,
      selectAllRooms(),
      expectCoalesceable,
      coalesceSelectedRooms(),
      expectValidMapData,
    ],
  },
])("$name", ({ doors, walls, floors, dispatch }) => {
  const state0 = initialLevelEditorSliceState;
  const state1 = reduceLevelEditorActions(state0, ...dispatch);

  const roomIds = keys(state1.campaignInProgress.rooms);
  expect.soft(roomIds).toHaveLength(1);

  const [cursorRoomId] = roomIds;
  const room = state1.campaignInProgress.rooms[cursorRoomId] as EditorRoomJson;
  const floorItems = iterateRoomJsonItemsWithIds(room.items, "floor").toArray();
  const doorItems = iterateRoomJsonItemsWithIds(room.items, "door").toArray();
  const wallItems = iterateRoomJsonItemsWithIds(room.items, "wall").toArray();

  expect.soft(doorItems).toHaveLength(doors);
  expect.soft(floorItems).toHaveLength(floors);
  expect.soft(wallItems).toHaveLength(walls);

  expect.soft(room).toHaveCompletePerimeter();

  const { subRoomId: cursorSubRoomId } =
    selectCursorRoomFromLevelEditorState(state1);
  expect
    .soft(
      () =>
        roomGridPositions({
          campaign: state1.campaignInProgress,
          roomId: cursorRoomId,
          subRoomId: cursorSubRoomId,
        }).nodes,
    )
    .not.toThrow();
});

test("coalescing rooms below a room that has a room above does not break map geometry", () => {
  const state0 = initialLevelEditorSliceState;
  const state1 = reduceLevelEditorActions(
    state0,
    // two rooms going away from the start room, on the ground floor
    insertRoom({ direction: "away" }),
    insertRoom({ direction: "away" }),
    // drop down a floor, creating a room below at z=-1 (cursor follows it)
    setRoomAboveOrBelow({ direction: "below", createNew: true }),
    // two more rooms towards the viewer, all on the z=-1 floor
    insertRoom({ direction: "towards" }),
    insertRoom({ direction: "towards" }),
    // add a room above the last z=-1 room, back up at z=0
    setRoomAboveOrBelow({ direction: "above", createNew: true }),
    // select the three rooms at z=-1 and coalesce them into one big room
    changeToRoom({ roomId: "room_3" as never, subRoomId: "*" }),
    toggleRoomInSelection({ roomId: "room_4" as never, subRoomId: "*" }),
    toggleRoomInSelection({ roomId: "room_5" as never, subRoomId: "*" }),
    expectCoalesceable,
    coalesceSelectedRooms(),
  );

  const { roomId, subRoomId } = selectCursorRoomFromLevelEditorState(state1);

  const specs = roomGridPositions({
    campaign: state1.campaignInProgress,
    roomId,
    subRoomId,
  }).nodes;

  // the rooms form a closed loop (away, away, down, towards, towards, up), so on
  // the map they should be a single ring of six cells: no two cells sharing a
  // grid position, and each cell connected (by a door/open boundary or an
  // above/below link) to exactly two others
  const distinctPositions = new Set(
    specs.map(({ gridPosition: { x, y, z } }) => `${x},${y},${z}`),
  );

  expect
    .soft(distinctPositions.size, "no two cells share a grid position")
    .toBe(specs.length);
  expect.soft(specs.length, "six cells in the map").toBe(6);

  for (const spec of specs) {
    const subRooms =
      state1.campaignInProgress.rooms[spec.roomId]?.meta?.subRooms;
    const holder =
      subRooms === undefined ? undefined
      : isWholeRoomSubRooms(subRooms) ? subRooms["*"]
      : subRooms[spec.subRoomId];
    const verticalLinks = (holder?.above ? 1 : 0) + (holder?.below ? 1 : 0);
    const horizontalLinks = (
      ["left", "right", "away", "towards"] as const
    ).filter(
      (boundaryDirection) => spec.boundaries[boundaryDirection] !== "wall",
    ).length;

    expect
      .soft(
        verticalLinks + horizontalLinks,
        `cell ${spec.roomId}/${spec.subRoomId} should connect to two others`,
      )
      .toBe(2);
  }
});

test("merging two rooms below a room that is above one of them does not break map geometry", () => {
  const state0 = initialLevelEditorSliceState;
  const state1 = reduceLevelEditorActions(
    state0,
    // one room going away from the start room
    insertRoom({ direction: "away" }),
    // a room above it, back up at z=0 + 1
    setRoomAboveOrBelow({ direction: "above", createNew: true }),
    // select the two ground-floor rooms and coalesce them into one big room
    changeToRoom({ roomId: "room_0" as never, subRoomId: "*" }),
    toggleRoomInSelection({ roomId: "room_1" as never, subRoomId: "*" }),
    expectCoalesceable,
    coalesceSelectedRooms(),
  );

  const { roomId, subRoomId } = selectCursorRoomFromLevelEditorState(state1);

  expect(
    () =>
      roomGridPositions({
        campaign: state1.campaignInProgress,
        roomId,
        subRoomId,
      }).nodes,
  ).not.toThrow();
});

test("coalescing rooms leaves the links of doors in unrelated rooms alone", () => {
  // two rooms side by side, made from the same template so they share item ids:
  const state0TwoRooms = reduceLevelEditorActions(
    initialLevelEditorSliceState,
    insertRoom({ direction: "right" }),
  );
  const cursorRoomId = selectCursorRoomIdFromLevelEditorState(state0TwoRooms);
  const [otherRoomId] = keys(state0TwoRooms.campaignInProgress.rooms).filter(
    (id) => id !== cursorRoomId,
  );
  // an id both rooms have, so merging must rename the other room's copy:
  const [sharedItemId] = keys(
    state0TwoRooms.campaignInProgress.rooms[otherRoomId].items,
  ).filter(
    (id) =>
      state0TwoRooms.campaignInProgress.rooms[cursorRoomId].items[id] !==
      undefined,
  );

  // a door elsewhere, leading to an unrelated room's door that happens to
  // have that same id:
  const unrelatedRoomId = "unrelated" as EditorRoomId;
  const unrelatedDoorId = "unrelatedDoor" as EditorRoomItemId;
  const state1WithUnrelatedRoom = produce(state0TwoRooms, (draft) => {
    draft.campaignInProgress.rooms[unrelatedRoomId] = {
      id: unrelatedRoomId,
      planet: "blacktooth",
      color: { hue: "cyan", shade: "basic" },
      items: {
        [unrelatedDoorId]: {
          type: "door",
          position: { x: 0, y: 3, z: 0 },
          config: {
            direction: "right",
            toRoom: "elsewhere" as EditorRoomId,
            toDoor: sharedItemId,
          },
        },
      },
    };
  });

  const state2 = reduceLevelEditorActions(
    state1WithUnrelatedRoom,
    toggleRoomInSelection({ roomId: otherRoomId, subRoomId: "*" }),
    expectCoalesceable,
    coalesceSelectedRooms(),
  );

  const unrelatedDoor =
    state2.campaignInProgress.rooms[unrelatedRoomId].items[unrelatedDoorId];
  expect(unrelatedDoor?.type === "door" && unrelatedDoor.config.toDoor).toBe(
    sharedItemId,
  );
});

test("merging two rooms that each have a door to the same room leaves those links unambiguous", () => {
  // a two-cell room, from merging a room and the one inserted beside it:
  const state0TwoCellRoom = reduceLevelEditorActions(
    initialLevelEditorSliceState,
    insertRoom({ direction: "right" }),
    toggleRoomInSelection({
      roomId: selectCursorRoomIdFromLevelEditorState(
        initialLevelEditorSliceState,
      ),
      subRoomId: "*",
    }),
    coalesceSelectedRooms(),
  );
  const twoCellRoomId =
    selectCursorRoomIdFromLevelEditorState(state0TwoCellRoom);
  const [firstCellId, secondCellId] = keys(
    state0TwoCellRoom.campaignInProgress.rooms[twoCellRoomId].meta?.subRooms ??
      {},
  );

  // a room inserted away from each of its cells, so each links to it once:
  const state1WithRoomAwayFromFirstCell = reduceLevelEditorActions(
    state0TwoCellRoom,
    changeToRoom({ roomId: twoCellRoomId, subRoomId: firstCellId }),
    insertRoom({ direction: "away" }),
  );
  const awayFromFirstCellRoomId = selectCursorRoomIdFromLevelEditorState(
    state1WithRoomAwayFromFirstCell,
  );
  const state2BeforeMerge = reduceLevelEditorActions(
    state1WithRoomAwayFromFirstCell,
    changeToRoom({ roomId: twoCellRoomId, subRoomId: secondCellId }),
    insertRoom({ direction: "away" }),
  );

  const state3AfterMerge = reduceLevelEditorActions(
    state2BeforeMerge,
    toggleRoomInSelection({ roomId: awayFromFirstCellRoomId, subRoomId: "*" }),
    coalesceSelectedRooms(),
  );

  const issueMessages = (state: typeof initialLevelEditorSliceState) =>
    verifyCampaign(state.campaignInProgress as VerificationCampaign).map(
      ({ msg }) => msg,
    );
  expect(issueMessages(state3AfterMerge)).toEqual(
    issueMessages(state2BeforeMerge),
  );
});
