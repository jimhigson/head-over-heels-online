import seedrandom from "seedrandom";
import { expect, test } from "vitest";

import { roomJsonMatchers } from "../../model/json/__test__/roomJsonMatchers";
import { roomGridPositions } from "../../model/map/roomGridPositions";
import { sortRoomGridPositions } from "../../model/map/sortRoomGridPositions";
import { roomJsonItemsIterable } from "../../model/RoomJson";
import { keys } from "../../utils/entries";
import { type DirectionXy4 } from "../../utils/vectors/vectors";
import { areRoomsCoalesceable } from "../EditorMap/areRoomsCoalesceable";
import { type EditorRoomId, type EditorRoomJson } from "../editorTypes";
import { initialLevelEditorSliceState } from "./initialLevelEditorSliceState";
import { selectCursorRoom, selectCursorRoomId } from "./levelEditorSelectors";
import {
  coalesceSelectedRooms,
  insertRoom,
  selectAllRooms,
  toggleRoomInSelection,
} from "./levelEditorSlice";
import {
  reduceLevelEditorActions,
  type ReducibleAction,
} from "./reducers/__test__/storeStates";

expect.extend(roomJsonMatchers);

const directions: DirectionXy4[] = ["left", "right", "away", "towards"];

const solveMapGeometry = (state: typeof initialLevelEditorSliceState) => {
  const { roomId, subRoomId } = selectCursorRoom(state);
  const positions = roomGridPositions({
    campaign: state.campaignInProgress,
    roomId,
    subRoomId,
  }).nodes;
  return sortRoomGridPositions(positions);
};

const assertNoDuplicateGridPositions = (
  state: typeof initialLevelEditorSliceState,
) => {
  const gridPositions = solveMapGeometry(state);
  const seen = new Map<string, string>();
  for (const spec of Object.values(gridPositions)) {
    const key = `${spec.gridPosition.x},${spec.gridPosition.y},${spec.gridPosition.z}`;
    const label = `${spec.roomId}/${spec.subRoomId}`;
    const existing = seen.get(key);
    if (existing !== undefined) {
      throw new Error(
        `duplicate grid position ${key}: ${existing} and ${label}`,
      );
    }
    seen.set(key, label);
  }
};

const roomFloorArea = (room: EditorRoomJson): number => {
  let area = 0;
  for (const item of roomJsonItemsIterable(room)) {
    if (item.type === "floor") {
      area += item.config.times.x * item.config.times.y;
    }
  }
  return area;
};

const totalFloorArea = (
  state: typeof initialLevelEditorSliceState,
  roomIds: readonly EditorRoomId[],
): number =>
  roomIds.reduce(
    (sum, id) =>
      sum + roomFloorArea(state.campaignInProgress.rooms[id] as EditorRoomJson),
    0,
  );

const assertCompletePerimeters = (
  state: typeof initialLevelEditorSliceState,
) => {
  for (const [roomId, room] of Object.entries(state.campaignInProgress.rooms)) {
    expect(
      room,
      `room ${roomId} should have complete perimeter`,
    ).toHaveCompletePerimeter();
  }
};

const seeds = Array.from({ length: 1_024 }, (_, i) => [i]);

test.for(seeds)("fuzz insert+coalesce (seed %i)", ([seed]) => {
  const rng = seedrandom(String(seed));
  const pick = <T>(arr: readonly T[]): T => arr[Math.floor(rng() * arr.length)];
  const maxCoalesceSteps = 8;
  let coalesceSteps = 0;

  let state = initialLevelEditorSliceState;

  const totalSteps = 4 + Math.floor(rng() * 12);

  for (let step = 0; step < totalSteps; step++) {
    const roomCount = keys(state.campaignInProgress.rooms).length;
    const action = rng();

    if (action < 0.6) {
      // insert a room in a random direction from the current room
      const direction = pick(directions);
      state = reduceLevelEditorActions(state, insertRoom({ direction }));
    } else if (
      action < 0.8 &&
      roomCount >= 2 &&
      coalesceSteps < maxCoalesceSteps
    ) {
      // select some adjacent rooms and coalesce them
      const gridPositions = solveMapGeometry(state);
      const allRoomIds = keys(state.campaignInProgress.rooms);
      const floorAreaBefore = totalFloorArea(state, allRoomIds);

      // select all then coalesce
      const actions: ReducibleAction[] = [selectAllRooms()];

      const coalesceResult = areRoomsCoalesceable(allRoomIds, gridPositions);

      if (!coalesceResult.coalesceable) {
        // not all rooms are coalesceable (different z-levels etc), try selecting a subset
        // pick 2-3 rooms and try
        const count = Math.min(allRoomIds.length, 2 + Math.floor(rng() * 2));
        const cursorRoomId = selectCursorRoomId(state);

        // start from cursor, add adjacent rooms
        actions.length = 0;
        const roomIdsToSelect = [cursorRoomId];

        for (const spec of Object.values(gridPositions)) {
          if (roomIdsToSelect.length >= count) {
            break;
          }
          const roomId = spec.roomId as EditorRoomId;
          if (!roomIdsToSelect.includes(roomId)) {
            roomIdsToSelect.push(roomId);
          }
        }

        for (const roomId of roomIdsToSelect) {
          if (roomId !== cursorRoomId) {
            actions.push(toggleRoomInSelection({ roomId, subRoomId: "*" }));
          }
        }

        // re-check coalescability after selecting subset
        state = reduceLevelEditorActions(state, ...actions);
        const subsetGridPositions = solveMapGeometry(state);
        const subsetResult = areRoomsCoalesceable(
          state.selectedRoomIds,
          subsetGridPositions,
        );

        if (!subsetResult.coalesceable) {
          continue;
        }

        state = reduceLevelEditorActions(state, coalesceSelectedRooms());
        coalesceSteps++;
      } else {
        state = reduceLevelEditorActions(
          state,
          ...actions,
          coalesceSelectedRooms(),
        );
        coalesceSteps++;
      }

      // after coalesce, verify invariants
      assertNoDuplicateGridPositions(state);
      assertCompletePerimeters(state);

      const floorAreaAfter = totalFloorArea(
        state,
        keys(state.campaignInProgress.rooms),
      );
      expect(
        floorAreaAfter,
        `step ${step} (seed ${seed}): floor area should be preserved after coalesce`,
      ).toBe(floorAreaBefore);
    } else if (roomCount >= 2) {
      // navigate to a different room
      const allRoomIds = keys(state.campaignInProgress.rooms);
      const otherRoomId = pick(
        allRoomIds.filter((id) => id !== selectCursorRoomId(state)),
      );
      if (otherRoomId) {
        state = reduceLevelEditorActions(state, ((dispatch, getState) => {
          const room =
            getState().levelEditor.campaignInProgress.rooms[otherRoomId];
          const subRoomId =
            room?.meta?.subRooms ? Object.keys(room.meta.subRooms)[0] : "*";
          dispatch({
            type: "levelEditor/changeToRoom",
            payload: { roomId: otherRoomId, subRoomId },
          } as never);
        }) satisfies ReducibleAction);
      }
    }

    // verify map geometry solves after every step
    expect(
      () => solveMapGeometry(state),
      `step ${step} (seed ${seed}): map geometry should solve`,
    ).not.toThrow();
    assertNoDuplicateGridPositions(state);
  }

  // final invariants
  for (const [roomId, room] of Object.entries(state.campaignInProgress.rooms)) {
    expect(room as EditorRoomJson, `room ${roomId}`).toHaveCompletePerimeter();
  }
});
