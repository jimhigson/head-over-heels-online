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
  const state = reduceLevelEditorActions(
    initialLevelEditorSliceState,
    insertRoomInDirectionThunk("right"),
  );
  const rightRoomId = selectCursorRoomIdFromLevelEditorState(state);

  expect(
    areRoomsCoalesceable(
      [startRoomId, rightRoomId],
      sortRoomGridPositions(
        roomGridPositions({
          campaign: state.campaignInProgress,
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
  const state = reduceLevelEditorActions(
    initialLevelEditorSliceState,
    insertRoomInDirectionThunk("right"),
    insertRoomInDirectionThunk("right"),
  );
  const furthestRoomId = selectCursorRoomIdFromLevelEditorState(state);

  expect(
    areRoomsCoalesceable(
      [startRoomId, furthestRoomId],
      sortRoomGridPositions(
        roomGridPositions({
          campaign: state.campaignInProgress,
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
  const withRoomAbove = reduceLevelEditorActions(
    initialLevelEditorSliceState,
    insertRoomInDirectionThunk("up"),
  );
  const aboveRoomId = selectCursorRoomIdFromLevelEditorState(withRoomAbove);
  const state = reduceLevelEditorActions(
    withRoomAbove,
    insertRoomInDirectionThunk("right"),
  );
  const aboveRightRoomId = selectCursorRoomIdFromLevelEditorState(state);

  expect(
    areRoomsCoalesceable(
      [aboveRoomId, aboveRightRoomId],
      // laid out from the start room, so the area's first cell is below them:
      sortRoomGridPositions(
        roomGridPositions({
          campaign: state.campaignInProgress,
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
  const state = reduceLevelEditorActions(
    initialLevelEditorSliceState,
    insertRoomInDirectionThunk("up"),
    insertRoomInDirectionThunk("right"),
  );
  const aboveRightRoomId = selectCursorRoomIdFromLevelEditorState(state);

  expect(
    areRoomsCoalesceable(
      [startRoomId, aboveRightRoomId],
      sortRoomGridPositions(
        roomGridPositions({
          campaign: state.campaignInProgress,
          roomId: startRoomId,
        }).nodes,
      ),
    ).coalesceable,
  ).toBe(false);
});
