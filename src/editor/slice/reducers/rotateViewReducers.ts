import {
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import {
  cameraAngleBase,
  quarterTurnAnticlockwise,
  quarterTurnClockwise,
} from "../../../utils/vectors/cameraAngleVectors";
import {
  rotateXy,
  rotationVectorsByDirectionXy4,
} from "../../../utils/vectors/rotateXy";
import { type DirectionXy4, type Xy } from "../../../utils/vectors/vectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { type OpenRoom, type OpenRoomId } from "../OpenRoom";
import {
  findLayoutNode,
  selectActiveOpenRoomFromLevelEditorState,
} from "../PaneLayout";

/**
 * turn an open room's view to a new angle; its framing no longer fits, so it
 * is fitted afresh
 */
const rotateOpenRoomInPlace = (openRoom: OpenRoom, cameraAngle: Xy) => {
  openRoom.cameraAngle = cameraAngle;
  openRoom.view = undefined;
};

export const rotateViewReducers = {
  /** rotate the active open room's view a quarter-turn clockwise */
  rotateViewClockwise(_state) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    const openRoom = selectActiveOpenRoomFromLevelEditorState(state);
    rotateOpenRoomInPlace(
      openRoom,
      rotateXy(openRoom.cameraAngle, quarterTurnClockwise),
    );
  },
  /** rotate the active open room's view a quarter-turn anticlockwise */
  rotateViewAnticlockwise(_state) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    const openRoom = selectActiveOpenRoomFromLevelEditorState(state);
    rotateOpenRoomInPlace(
      openRoom,
      rotateXy(openRoom.cameraAngle, quarterTurnAnticlockwise),
    );
  },
  /**
   * rotate the active open room's view to the angle named by where world
   * "away" appears on screen - the label the compass between the rotate
   * buttons shows (eg "away" = the base angle)
   */
  rotateViewTo(
    _state,
    { payload: awayAppearsAs }: PayloadAction<DirectionXy4>,
  ) {
    // DO REMOVE CAST - for some reason, a severe typescript performance issue was narrowed
    // down specifically to the WritableDraft<> type here - immer was making ts slow when we assigned to
    // the wrapped type. Since the normal type isn't readonly, this wrapping isn't needed anyway
    const state = _state as LevelEditorState;
    rotateOpenRoomInPlace(
      selectActiveOpenRoomFromLevelEditorState(state),
      rotationVectorsByDirectionXy4[awayAppearsAs],
    );
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const rotateViewSelectors = {
  /**
   * the angle an open room is viewed from
   */
  selectOpenRoomCameraAngle(state: LevelEditorState, openRoomId: OpenRoomId) {
    const openRoom = findLayoutNode(state.layout, openRoomId);
    // check the room wasn't closed (in case we have a stale openRoomId reference)
    if (openRoom === undefined) {
      return cameraAngleBase;
    }
    return openRoom.cameraAngle;
  },
} satisfies SliceSelectors<LevelEditorState>;
