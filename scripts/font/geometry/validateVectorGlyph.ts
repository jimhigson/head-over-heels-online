import {
  type VectorContour,
  type VectorPoint,
  type VectorShape,
} from "./glyphOverrides";
import { slopeOf } from "./slopes";
import { snapGrid } from "./vectorEdits";

export type VectorProblem = {
  shape: number;
  /** the side or corner the problem is at, where there is one */
  index?: number;
  message: string;
};

const at = (points: readonly VectorPoint[], index: number): VectorPoint =>
  points[((index % points.length) + points.length) % points.length];

const onGrid = (value: number) =>
  Math.abs(value / snapGrid - Math.round(value / snapGrid)) < 1e-9;

/** whether two segments cross anywhere other than at a shared end */
const segmentsCross = (
  [aX, aY]: VectorPoint,
  [bX, bY]: VectorPoint,
  [cX, cY]: VectorPoint,
  [dX, dY]: VectorPoint,
): boolean => {
  const determinant = (bX - aX) * (dY - cY) - (bY - aY) * (dX - cX);
  if (determinant === 0) {
    return false;
  }
  const alongFirst =
    ((cX - aX) * (dY - cY) - (cY - aY) * (dX - cX)) / determinant;
  const alongSecond =
    ((cX - aX) * (bY - aY) - (cY - aY) * (bX - aX)) / determinant;
  const strictlyWithin = (t: number) => t > 1e-9 && t < 1 - 1e-9;
  return strictlyWithin(alongFirst) && strictlyWithin(alongSecond);
};

const contourProblems = (
  contour: VectorContour,
  shape: number,
): VectorProblem[] => {
  const { points, curves = [], corners = {} } = contour;
  const problems: VectorProblem[] = [];

  for (const [index, point] of points.entries()) {
    if (!onGrid(point[0]) || !onGrid(point[1])) {
      problems.push({
        shape,
        index,
        message: `corner ${index} at ${point.join(", ")} is off the ${snapGrid} pixel grid`,
      });
    }
  }

  // a side aimed off the preferred slopes is not a fault - the editor names
  // the ones that are on them and leaves the rest to the author's judgement
  for (const index of curves) {
    if (curves.includes(index - 1) || curves.includes(index + 1)) {
      problems.push({
        shape,
        index,
        message: `side ${index} curves into another curve, so it has no straight side to leave tangentially`,
      });
    }
  }

  for (const [pointIndex, treatment] of Object.entries(corners)) {
    const index = Number(pointIndex);
    const before = slopeOf(at(points, index - 1), at(points, index));
    const after = slopeOf(at(points, index), at(points, index + 1));
    if (before === undefined || after === undefined) {
      continue;
    }
    if (
      treatment === "chamfer" &&
      before[0] * after[0] + before[1] * after[1] !== 0
    ) {
      problems.push({
        shape,
        index,
        message: `corner ${index} is chamfered but is not a right angle`,
      });
    }
  }

  for (let first = 0; first < points.length; first++) {
    for (let second = first + 2; second < points.length; second++) {
      if (first === 0 && second === points.length - 1) {
        continue;
      }
      if (
        segmentsCross(
          at(points, first),
          at(points, first + 1),
          at(points, second),
          at(points, second + 1),
        )
      ) {
        problems.push({
          shape,
          index: first,
          message: `side ${first} crosses side ${second}`,
        });
      }
    }
  }

  return problems;
};

/**
 * Everything wrong with a hand-drawn glyph, as messages meant to be read.
 * The editor cannot always prevent these - a side turned to a new slope can
 * leave a corner off the grid, and a shape dragged far enough will fold
 * through itself - so they are reported rather than silently corrected: the
 * author decides what the shape should have been.
 */
export const validateVectorGlyph = (
  shapes: readonly VectorShape[],
): VectorProblem[] =>
  shapes.flatMap((shape, index) =>
    shape.type === "contour" ? contourProblems(shape, index) : [],
  );
