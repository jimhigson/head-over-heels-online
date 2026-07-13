import { type Xyz } from "../utils/vectors/vectors";

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

/**
 * a vector as seen in a mirror: reflected in the mirror's plane. Works for any
 * vector - the four axis-aligned light-beam directions, or the eight playable
 * facings. Mirrors are reflective on both sides, so every incoming vector
 * reflects
 */
export const reflectedFacingVector = (
  orientation: MirrorOrientation,
  /** the vector (beam direction or facing) being reflected */
  facing: Xyz,
): Xyz =>
  orientation === "awayLeft" ?
    // plane along the (1,1) diagonal - swaps x↔y, preserving sign:
    { x: facing.y, y: facing.x, z: facing.z }
    // plane along the (-1,1) diagonal - swaps x↔y, inverting sign:
  : { x: -facing.y, y: -facing.x, z: facing.z };
