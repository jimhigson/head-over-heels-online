import { type GameState } from "../gameState/GameState";
import { startCameraRotation } from "./tickCameraTransition";

/**
 * read once per render tick, outside the physics sub-ticks (like swopping) - a
 * tap of either camera-rotate action begins (or, mid-turn, retargets) a
 * rotation transition. The discrete {@link GameState.targetCameraAngle} target
 * updates immediately; the render animates via {@link
 * GameState.cameraTransition}. Returns whether an input was consumed.
 */
export const rotateCameraIfInput = <RoomId extends string>(
  gameState: GameState<RoomId>,
) => {
  const { inputStateTracker } = gameState;

  if (inputStateTracker.currentActionPress("rotateCameraClockwise") === "tap") {
    startCameraRotation(gameState, "clockwise");
    return true;
  }
  if (
    inputStateTracker.currentActionPress("rotateCameraAnticlockwise") === "tap"
  ) {
    startCameraRotation(gameState, "anticlockwise");
    return true;
  }
  return false;
};
