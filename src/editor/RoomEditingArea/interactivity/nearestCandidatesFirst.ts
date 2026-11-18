import { projectWorldXyzToScreenXy } from "../../../game/render/projections";
import {
  lengthXy,
  lengthXyz,
  subXy,
  subXyz,
  type Xy,
  type Xyz,
} from "../../../utils/vectors/vectors";

/**
 * how far (in blocks) a placement searches around where the pointer is, when
 * nothing fits there
 */
export const placementReachBlocks = 2;

/**
 * the multiples of `step` from `from` to `to` (inclusive), in the direction of
 * `to`
 */
const stepsTowards = (from: number, to: number, step: number): number[] =>
  Array.from(
    { length: Math.round(Math.abs(to - from) / step) + 1 },
    (_, index) => from + Math.sign(to - from) * index * step,
  );

/**
 * the candidates for sliding: every step in the rectangle between where the
 * items come from and where they are pointed to, at the target's height -
 * leaving out where they come from (staying put would undo the move, rather
 * than follow it) unless that is the target too
 */
export const slideCandidates = (from: Xyz, target: Xyz, step: number): Xyz[] =>
  stepsTowards(from.x, target.x, step)
    .flatMap((x) =>
      stepsTowards(from.y, target.y, step).map((y) => ({ x, y, z: target.z })),
    )
    .filter(
      ({ x, y }) =>
        (x === target.x && y === target.y) || x !== from.x || y !== from.y,
    );

/**
 * the candidates around a target: every step within `reach` of it in x and y,
 * at its height
 */
export const candidatesAround = (
  target: Xyz,
  step: number,
  reach: number,
): Xyz[] =>
  stepsTowards(target.x - reach, target.x + reach, step).flatMap((x) =>
    stepsTowards(target.y - reach, target.y + reach, step).map((y) => ({
      x,
      y,
      z: target.z,
    })),
  );

/**
 * candidates in the order to try them: closest on screen to the target first,
 * then closest to it in the world - so a placement that can't go where it is
 * pointed goes as near to there as it can
 */
export const nearestCandidatesFirst = (
  candidates: Xyz[],
  target: Xyz,
  cameraAngle: Xy,
): Xyz[] => {
  const targetOnScreen = projectWorldXyzToScreenXy(target, cameraAngle);
  return candidates
    .map((candidate) => ({
      candidate,
      screenDistance: lengthXy(
        subXy(
          projectWorldXyzToScreenXy(candidate, cameraAngle),
          targetOnScreen,
        ),
      ),
      worldDistance: lengthXyz(subXyz(candidate, target)),
    }))
    .sort(
      (a, b) =>
        a.screenDistance - b.screenDistance ||
        a.worldDistance - b.worldDistance,
    )
    .map(({ candidate }) => candidate);
};
