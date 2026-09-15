import {
  nearestQuarterAngle,
  quarterTurnAnticlockwise,
  quarterTurnClockwise,
} from "../../utils/vectors/cameraAngleVectors";
import { rotateXy } from "../../utils/vectors/rotateXy";
import { type Xy } from "../../utils/vectors/vectors";
import { type GameState } from "../gameState/GameState";
import {
  hermiteEase,
  hermiteEaseSlope,
  transitionCameraAngle,
} from "./transitionCameraAngle";

/**
 * how long a full 90° rotation transition takes, in game-speed-scaled ms: the
 * transition advances on the scaled clock, so at the default 1.2 game speed
 * this plays in 500ms of real time
 */
export const cameraTransitionDurationMs = 600;

const halfPi = Math.PI / 2;

export type CameraRotationDirection = "anticlockwise" | "clockwise";

/**
 * the camera-transition-relevant slice of the {@link GameState} - the state
 * machine touches only these fields, so it can be exercised in isolation
 */
export type CameraTransitionCarrier = Pick<
  GameState,
  "cameraTransition" | "targetCameraAngle"
>;

const rotationForDirection = {
  clockwise: quarterTurnClockwise,
  anticlockwise: quarterTurnAnticlockwise,
} as const satisfies {
  [D in CameraRotationDirection]: Xy;
};

/**
 * where the camera is and how it is moving right now - the starting conditions
 * a newly begun turn continues from, so its speed is never stepped
 */
const cameraMotionNow = (gameState: CameraTransitionCarrier) => {
  const { cameraTransition } = gameState;

  if (cameraTransition === undefined) {
    return {
      fromAngle: gameState.targetCameraAngle,
      remainingArc: 0,
      angularVelocity: 0,
    };
  }

  const {
    fromAngle: oldFromAngle,
    arc: oldArc,
    progress,
    durationMs,
    startSlope,
  } = cameraTransition;

  return {
    fromAngle: transitionCameraAngle(
      oldFromAngle,
      oldArc,
      progress,
      startSlope,
    ),
    /** the arc still left to sweep of the turn being retargeted, in radians */
    remainingArc: oldArc * (1 - hermiteEase(progress, startSlope)),
    /** the camera's current angular velocity, in radians per ms */
    angularVelocity:
      (oldArc * hermiteEaseSlope(progress, startSlope)) / durationMs,
  };
};

/**
 * begin a rotation transition towards a quarter-turn from its current angle
 */
export const startCameraRotation = (
  gameState: CameraTransitionCarrier,
  targetCameraDirection: CameraRotationDirection,
) => {
  const { fromAngle, remainingArc, angularVelocity } =
    cameraMotionNow(gameState);

  gameState.targetCameraAngle = rotateXy(
    gameState.targetCameraAngle,
    rotationForDirection[targetCameraDirection],
  );

  const arc =
    remainingArc +
    (targetCameraDirection === "anticlockwise" ? halfPi : -halfPi);
  if (Math.abs(arc) < 1e-6) {
    // a cancel tapped before any movement - already at the target:
    gameState.cameraTransition = undefined;
    return;
  }
  const durationMs =
    cameraTransitionDurationMs * Math.min(1, Math.abs(arc) / halfPi);
  gameState.cameraTransition = {
    fromAngle,
    arc,
    progress: 0,
    durationMs,
    // in progress-curve units: the slope that renders the current angular
    // velocity at t=0 of the new curve (negative for a cancel - the camera is
    // still moving away from the new target and must decelerate first).
    // `|| 0` normalises the -0 a zero velocity gives over a negative arc:
    startSlope: (angularVelocity * durationMs) / arc || 0,
  };
};

/**
 * begin a free spin that sweeps `turns` whole revolutions and settles back on
 * {@link CameraTransitionCarrier.targetCameraAngle} - a turn already in flight
 * is folded in, so the spin ends on the settled quarter angle either way.
 *
 * Whole revolutions only: consumers that interpolate a transition read its
 * endpoint as the target angle, so a spin that landed elsewhere would render
 * against the wrong endpoint.
 */
export const startCameraSpin = (
  gameState: CameraTransitionCarrier,
  turns: number,
  /** how long the spin sweeps for, in game-speed-scaled ms */
  durationMs: number,
) => {
  const { fromAngle, remainingArc, angularVelocity } =
    cameraMotionNow(gameState);

  const arc = remainingArc - turns * 2 * Math.PI;

  gameState.cameraTransition = {
    fromAngle,
    arc,
    progress: 0,
    durationMs,
    startSlope: (angularVelocity * durationMs) / arc || 0,
  };
};

/**
 * the quarter angle the camera is visually closest to right now: the settled
 * {@link GameState.targetCameraAngle} when no transition is playing, or the nearest
 * quarter of the continuous interpolated angle mid-turn. Camera-relative
 * input maps through this (not the discrete target), so controls flip at the
 * visual midpoint of a turn rather than the instant it starts
 */
export const currentQuarterCameraAngle = (
  gameState: CameraTransitionCarrier,
): Xy => {
  const { cameraTransition } = gameState;
  if (cameraTransition === undefined) {
    return gameState.targetCameraAngle;
  }
  return nearestQuarterAngle(
    transitionCameraAngle(
      cameraTransition.fromAngle,
      cameraTransition.arc,
      cameraTransition.progress,
      cameraTransition.startSlope,
    ),
  );
};

/**
 * advance the active camera transition by one frame. Progress is linear time
 * (0→1 over the transition's `durationMs`); easing is applied at render time.
 * On completion the transition is cleared.
 *
 * Returns true while a transition is (still) active after this step - callers
 * use this to re-project every item's position.
 */
export const tickCameraTransition = (
  gameState: CameraTransitionCarrier,
  deltaMS: number,
): boolean => {
  const { cameraTransition } = gameState;
  if (cameraTransition === undefined) {
    return false;
  }

  cameraTransition.progress += deltaMS / cameraTransition.durationMs;

  if (cameraTransition.progress < 1) {
    return true;
  }

  // the transition completed this frame:
  gameState.cameraTransition = undefined;
  return false;
};
