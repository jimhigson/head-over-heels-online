import {
  type PayloadAction,
  type SliceCaseReducers,
  type SliceSelectors,
} from "@reduxjs/toolkit";

import {
  quarterTurnAnticlockwise,
  quarterTurnClockwise,
} from "../../../utils/vectors/cameraAngleVectors";
import {
  rotateXy,
  rotationVectorsByDirectionXy4,
} from "../../../utils/vectors/rotateXy";
import { type DirectionXy4 } from "../../../utils/vectors/vectors";
import { forgetOpenRoomViewsInPlace } from "../inPlaceMutators/forgetOpenRoomViewsInPlace";
import { type LevelEditorState } from "../levelEditorSlice";

export const rotateViewReducers = {
  /** rotate the editor's view of the room a quarter-turn clockwise */
  rotateViewClockwise(state) {
    state.cameraAngle = rotateXy(state.cameraAngle, quarterTurnClockwise);
    forgetOpenRoomViewsInPlace(state);
  },
  /** rotate the editor's view of the room a quarter-turn anticlockwise */
  rotateViewAnticlockwise(state) {
    state.cameraAngle = rotateXy(state.cameraAngle, quarterTurnAnticlockwise);
    forgetOpenRoomViewsInPlace(state);
  },
  /**
   * rotate the editor's view to the angle named by where world "away"
   * appears on screen - the label the compass between the rotate buttons
   * shows (eg "away" = the base angle)
   */
  rotateViewTo(state, { payload: awayAppearsAs }: PayloadAction<DirectionXy4>) {
    state.cameraAngle = rotationVectorsByDirectionXy4[awayAppearsAs];
    forgetOpenRoomViewsInPlace(state);
  },
} satisfies SliceCaseReducers<LevelEditorState>;

export const rotateViewSelectors = {
  selectEditorCameraAngle: (state: LevelEditorState) => state.cameraAngle,
} satisfies SliceSelectors<LevelEditorState>;
