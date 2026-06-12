import { type DirectionXy4, type Xy, type Xyz } from "../utils/vectors/vectors";

/**
 * mirrors sit at 45° to the orthogonal axes - the orientation is the
 * (xy-diagonal) direction the mirror's plane runs along, modulo 180°:
 *
 *  * "awayLeft" - the mirror runs along the awayLeft↔towardsRight diagonal
 *  * "awayRight" - the mirror runs along the awayRight↔towardsLeft diagonal
 */
export const mirrorOrientations = ["awayLeft", "awayRight"] as const;
export type MirrorOrientation = (typeof mirrorOrientations)[number];

/** the orientation a mirror moves to when it is flipped (rotated 90°) */
export const flippedMirrorOrientation = (
  orientation: MirrorOrientation,
): MirrorOrientation => (orientation === "awayLeft" ? "awayRight" : "awayLeft");

const reflections = {
  // mirror plane along the (1,1) diagonal - swaps x↔y, preserving sign:
  awayLeft: {
    left: "away",
    away: "left",
    right: "towards",
    towards: "right",
  },
  // mirror plane along the (-1,1) diagonal - swaps x↔y, inverting sign:
  awayRight: {
    left: "towards",
    towards: "left",
    right: "away",
    away: "right",
  },
} as const satisfies Record<
  MirrorOrientation,
  Record<DirectionXy4, DirectionXy4>
>;

/**
 * the direction a light beam continues in after hitting a mirror. Mirrors
 * are reflective on both sides, so every incoming direction reflects
 */
export const reflectedBeamDirection = (
  /**
   * the orientation of the mirror being hit
   */
  orientation: MirrorOrientation,
  /**
   * the direction the beam was travelling in when it hit the mirror
   */
  beamDirection: DirectionXy4,
): DirectionXy4 => reflections[orientation][beamDirection];

/**
 * a facing vector as seen in a mirror: reflected in the mirror's plane.
 * The same operation as beam reflection, but works for any vector (eg, the
 * eight playable facings, not just the four axis-aligned beam directions)
 */
const reflectedFacingVector = (
  orientation: MirrorOrientation,
  /** the facing of the item being reflected */
  facing: Xyz,
): Xyz =>
  orientation === "awayLeft" ?
    // plane along the (1,1) diagonal - swaps x↔y, preserving sign:
    { x: facing.y, y: facing.x, z: facing.z }
    // plane along the (-1,1) diagonal - swaps x↔y, inverting sign:
  : { x: -facing.y, y: -facing.x, z: facing.z };

/**
 * a facing vector, reflected if it is being rendered as a mirror reflection,
 * otherwise returned unchanged. Reflections are only ever shown in the face-on
 * (awayRight) pane, so the orientation is fixed - item renderers call this to
 * flip themselves, without each call site needing its own `isReflection` check.
 */
export const maybeReflectedVector = (facing: Xy, isReflection: boolean): Xy =>
  isReflection ?
    reflectedFacingVector("awayRight", { ...facing, z: 0 })
  : facing;
