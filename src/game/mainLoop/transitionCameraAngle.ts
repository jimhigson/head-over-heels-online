import { rotateXy } from "../../utils/vectors/rotateXy";
import { type Xy } from "../../utils/vectors/vectors";

/**
 * cubic-Hermite easing: h(0)=0, h(1)=1, h'(0)=`startSlope`, h'(1)=0. With
 * startSlope 0 this is smoothstep (slow start, slow end). A retargeted camera
 * rotation passes the slope that carries its angular velocity into the new
 * curve, so the camera's speed is continuous across retargets - it only ever
 * accelerates or decelerates, never steps. A negative startSlope (a cancel
 * while still moving towards the old target) dips below 0 first: the camera
 * overshoots slightly past the reversal point and comes back, as a physical
 * object would
 */
export const hermiteEase = (t: number, startSlope: number): number =>
  startSlope * (t ** 3 - 2 * t ** 2 + t) + (3 * t ** 2 - 2 * t ** 3);

/** d/dt of {@link hermiteEase} */
export const hermiteEaseSlope = (t: number, startSlope: number): number =>
  startSlope * (3 * t ** 2 - 4 * t + 1) + (6 * t - 6 * t ** 2);

/**
 * the continuous camera angle θ(t) to render at while a rotation is playing:
 * `fromAngle` swept along the transition's signed arc, eased. At progress 0
 * it is exactly `fromAngle`, at 1 exactly the arc's endpoint (the discrete
 * targetCameraAngle). The arc is carried on the transition rather than
 * derived from the endpoints, so the camera always turns the way the player
 * pressed - stacked same-direction taps sweep the long way round rather than
 * flipping to the shorter path. Positions, scroll and the draw-order sort all
 * follow this continuous angle; only the quarter-quantised concerns (art,
 * draw-order participation, render boxes) read its nearest quarter instead.
 */
export const transitionCameraAngle = (
  /**
   * the continuous angle the turn started from - a quarter angle for a fresh
   * turn, or any angle when a turn was retargeted mid-rotation
   */
  fromAngle: Xy,
  /** the signed arc the turn sweeps, in radians (positive is anticlockwise) */
  arc: number,
  /** linear time fraction 0..1 */
  linearProgress: number,
  /** initial slope of the easing curve (see {@link hermiteEase}) */
  startSlope: number,
): Xy => {
  const radians = arc * hermiteEase(linearProgress, startSlope);
  return rotateXy(fromAngle, { x: Math.cos(radians), y: Math.sin(radians) });
};
