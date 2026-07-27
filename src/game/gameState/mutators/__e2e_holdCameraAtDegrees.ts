import { quarterCameraAngles } from "../../../utils/vectors/cameraAngleVectors";
import { type GameState } from "../GameState";

/**
 * the transition's stored progress is linear; smoothstep (hermiteEase with
 * zero start slope) is applied at render time. Invert it so a hold lands on
 * the exact requested angle
 */
const progressForSweptFraction = (eased: number): number =>
  0.5 - Math.sin(Math.asin(1 - 2 * eased) / 3);

/**
 * hold the camera at an arbitrary angle (degrees anticlockwise from the base
 * view, any value - normalised into [0, 360) so negatives and past-a-full-turn
 * angles work, eg −40° == 320°): the settled quarter below the angle is set as
 * the transition's from-angle and a held transition towards the next quarter
 * carries the remainder. An exact quarter settles there (releasing any hold).
 *
 * a developer/debugging tool: exposed on `window.__e2e_holdCameraAtDegrees` so
 * the angle can be driven from the browser console or automation.
 */
export const __e2e_holdCameraAtDegrees = <RoomId extends string>(
  gameState: GameState<RoomId>,
  degrees: number,
): void => {
  const wrappedDegrees = ((degrees % 360) + 360) % 360;
  const quarterIndex = Math.floor(wrappedDegrees / 90);
  const remainderDegrees = wrappedDegrees - quarterIndex * 90;

  if (remainderDegrees === 0) {
    // exactly on a quarter - settle there with no transition:
    gameState.targetCameraAngle = quarterCameraAngles[quarterIndex];
    gameState.cameraTransition = undefined;
    gameState._e2e_cameraTransitionHold = undefined;
    return;
  }

  const progress = progressForSweptFraction(remainderDegrees / 90);
  gameState.targetCameraAngle = quarterCameraAngles[(quarterIndex + 1) % 4];
  gameState.cameraTransition = {
    fromAngle: quarterCameraAngles[quarterIndex],
    // one anticlockwise quarter turn:
    arc: Math.PI / 2,
    progress,
    durationMs: 500,
    startSlope: 0,
  };
  gameState._e2e_cameraTransitionHold = progress;
};
