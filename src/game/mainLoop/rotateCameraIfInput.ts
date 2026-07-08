import {
  quarterTurnAnticlockwise,
  quarterTurnClockwise,
  rotateXy,
} from "../../utils/vectors/rotateXy";
import { type GameState } from "../gameState/GameState";

/**
 * read once per render tick, outside the physics sub-ticks (like swopping) - a
 * tap of either camera-rotate action turns the stored camera angle a quarter-turn.
 * The room renderer rebuilds itself when it sees the angle change
 * (needsNewRoomRenderer), so nothing else needs to be marked dirty here.
 */
export const rotateCameraIfInput = <RoomId extends string>(
  gameState: GameState<RoomId>,
) => {
  const { inputStateTracker } = gameState;
  const currentAngle = gameState.cameraAngle;

  if (inputStateTracker.currentActionPress("rotateCameraClockwise") === "tap") {
    gameState.cameraAngle = rotateXy(currentAngle, quarterTurnClockwise);
    return true;
  }
  if (
    inputStateTracker.currentActionPress("rotateCameraAnticlockwise") === "tap"
  ) {
    gameState.cameraAngle = rotateXy(currentAngle, quarterTurnAnticlockwise);
    return true;
  }
  return false;
};
