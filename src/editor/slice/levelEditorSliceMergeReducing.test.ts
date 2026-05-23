import { expect, test } from "vitest";

import { roomGridPositions } from "../../game/components/dialogs/menuDialog/dialogs/map/roomGridPositions";
import { roomJsonMatchers } from "../../model/json/__test__/roomJsonMatchers";
import { iterateRoomJsonItemsWithIds } from "../../model/RoomJson";
import { keys } from "../../utils/entries";
import { type EditorRoomJson } from "../editorTypes";
import { initialLevelEditorSliceState } from "./initialLevelEditorSliceState";
import { selectCursorRoom, selectCursorRoomId } from "./levelEditorSelectors";

expect.extend(roomJsonMatchers);
import { selectIsCoalesceable } from "../EditorMap/CoalesceButton";
import { selectEditorMapData } from "../EditorMap/useEditorMapData";
import {
  changeToRoom,
  coalesceSelectedRooms,
  insertRoom,
  selectAllRooms,
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
  const originalRoomId = selectCursorRoomId(initialLevelEditorSliceState);

  const result = reduceLevelEditorActions(
    initialLevelEditorSliceState,
    insertRoom({ direction: "right" }),
    toggleRoomInSelection({ roomId: originalRoomId, subRoomId: "*" }),
    expectCoalesceable,
    coalesceSelectedRooms(),
    expectValidMapData,
  );
  const roomIds = keys(result.campaignInProgress.rooms);
  expect(roomIds).toEqual([originalRoomId]);

  const room = result.campaignInProgress.rooms[
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

  const { subRoomId: cursorSubRoomId } = selectCursorRoom(result);
  expect
    .soft(() =>
      roomGridPositions({
        campaign: result.campaignInProgress,
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
    const cursorRoomId = selectCursorRoomId(levelEditor);
    const otherRoomIds = keys(levelEditor.campaignInProgress.rooms).filter(
      (id) => id !== cursorRoomId,
    );
    for (const roomId of otherRoomIds.slice(0, n)) {
      dispatch(toggleRoomInSelection({ roomId, subRoomId: "*" }));
    }
  };

test("in a line", () => {
  const originalRoomId = selectCursorRoomId(initialLevelEditorSliceState);

  const result = reduceLevelEditorActions(
    initialLevelEditorSliceState,
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

  const roomIds = keys(result.campaignInProgress.rooms);
  expect(roomIds).toHaveLength(1);

  const [roomId] = roomIds;
  const room = result.campaignInProgress.rooms[roomId] as EditorRoomJson;
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
  const result = reduceLevelEditorActions(
    initialLevelEditorSliceState,
    ...dispatch,
  );

  const roomIds = keys(result.campaignInProgress.rooms);
  expect.soft(roomIds).toHaveLength(1);

  const [cursorRoomId] = roomIds;
  const room = result.campaignInProgress.rooms[cursorRoomId] as EditorRoomJson;
  const floorItems = iterateRoomJsonItemsWithIds(room.items, "floor").toArray();
  const doorItems = iterateRoomJsonItemsWithIds(room.items, "door").toArray();
  const wallItems = iterateRoomJsonItemsWithIds(room.items, "wall").toArray();

  expect.soft(doorItems).toHaveLength(doors);
  expect.soft(floorItems).toHaveLength(floors);
  expect.soft(wallItems).toHaveLength(walls);

  expect.soft(room).toHaveCompletePerimeter();

  const { subRoomId: cursorSubRoomId } = selectCursorRoom(result);
  expect
    .soft(() => [
      ...roomGridPositions({
        campaign: result.campaignInProgress,
        roomId: cursorRoomId,
        subRoomId: cursorSubRoomId,
      }),
    ])
    .not.toThrow();
});
