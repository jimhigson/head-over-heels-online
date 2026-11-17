import { expect, test } from "vitest";

import { roomGridPositions } from "../../model/map/roomGridPositions";
import { sortRoomGridPositions } from "../../model/map/sortRoomGridPositions";
import { initialLevelEditorSliceState } from "../slice/initialLevelEditorSliceState";
import { insertRoomInDirectionThunk } from "../slice/insertRoomInDirectionThunk";
import { selectCursorRoomIdFromLevelEditorState } from "../slice/levelEditorSelectors";
import { reduceLevelEditorActions } from "../slice/reducers/__test__/storeStates";
import { areRoomsCoalesceable } from "./areRoomsCoalesceable";

// each insert moves the cursor to the room it adds, which names it:

test("two rooms side by side are coalesceable", () => {
  const startRoomId = selectCursorRoomIdFromLevelEditorState(
    initialLevelEditorSliceState,
  );
  const state0 = initialLevelEditorSliceState;
  const state1 = reduceLevelEditorActions(
    state0,
    insertRoomInDirectionThunk("right"),
  );
  const rightRoomId = selectCursorRoomIdFromLevelEditorState(state1);

  expect(
    areRoomsCoalesceable(
      [startRoomId, rightRoomId],
      sortRoomGridPositions(
        roomGridPositions({
          campaign: state1.campaignInProgress,
          roomId: startRoomId,
        }).nodes,
      ),
    ).coalesceable,
  ).toBe(true);
});

test("two rooms with a room between them are not coalesceable", () => {
  const startRoomId = selectCursorRoomIdFromLevelEditorState(
    initialLevelEditorSliceState,
  );
  const state0 = initialLevelEditorSliceState;
  const state1 = reduceLevelEditorActions(
    state0,
    insertRoomInDirectionThunk("right"),
    insertRoomInDirectionThunk("right"),
  );
  const furthestRoomId = selectCursorRoomIdFromLevelEditorState(state1);

  expect(
    areRoomsCoalesceable(
      [startRoomId, furthestRoomId],
      sortRoomGridPositions(
        roomGridPositions({
          campaign: state1.campaignInProgress,
          roomId: startRoomId,
        }).nodes,
      ),
    ).coalesceable,
  ).toBe(false);
});

test("two rooms side by side above the start room are coalesceable", () => {
  const startRoomId = selectCursorRoomIdFromLevelEditorState(
    initialLevelEditorSliceState,
  );
  const state0 = initialLevelEditorSliceState;
  const state1WithRoomAbove = reduceLevelEditorActions(
    state0,
    insertRoomInDirectionThunk("up"),
  );
  const aboveRoomId =
    selectCursorRoomIdFromLevelEditorState(state1WithRoomAbove);
  const state2 = reduceLevelEditorActions(
    state1WithRoomAbove,
    insertRoomInDirectionThunk("right"),
  );
  const aboveRightRoomId = selectCursorRoomIdFromLevelEditorState(state2);

  expect(
    areRoomsCoalesceable(
      [aboveRoomId, aboveRightRoomId],
      // laid out from the start room, so the area's first cell is below them:
      sortRoomGridPositions(
        roomGridPositions({
          campaign: state2.campaignInProgress,
          roomId: startRoomId,
        }).nodes,
      ),
    ).coalesceable,
  ).toBe(true);
});

test("rooms next to each other on the plan, but on different levels, are not coalesceable", () => {
  const startRoomId = selectCursorRoomIdFromLevelEditorState(
    initialLevelEditorSliceState,
  );
  const state0 = initialLevelEditorSliceState;
  const state1 = reduceLevelEditorActions(
    state0,
    insertRoomInDirectionThunk("up"),
    insertRoomInDirectionThunk("right"),
  );
  const aboveRightRoomId = selectCursorRoomIdFromLevelEditorState(state1);

  expect(
    areRoomsCoalesceable(
      [startRoomId, aboveRightRoomId],
      sortRoomGridPositions(
        roomGridPositions({
          campaign: state1.campaignInProgress,
          roomId: startRoomId,
        }).nodes,
      ),
    ).coalesceable,
  ).toBe(false);
});
