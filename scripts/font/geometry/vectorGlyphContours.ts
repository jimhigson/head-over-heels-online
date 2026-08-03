import {
  type Contour,
  type PixelPoint,
  toFontUnits,
  twiceSignedArea,
} from "./fontUnits";
import {
  type CornerCut,
  cornerCutKind,
  type VectorContour,
  type VectorPoint,
  type VectorShape,
} from "./glyphOverrides";
import { circleContour, cornerRadiusPx } from "./kernelShapes";
import { linesIntersection } from "./slopes";

/** how far a chamfer cuts back along each of the two edges it joins, in pixels */
const chamferReachPx = 1;

/** a rounded corner is drawn as this many quadratic segments */
const cornerArcSegments = 2;

const unit = ([x, y]: VectorPoint): VectorPoint => {
  const length = Math.hypot(x, y);
  return length === 0 ? [0, 0] : [x / length, y / length];
};

const at = (index: number, points: readonly VectorPoint[]): VectorPoint =>
  points[((index % points.length) + points.length) % points.length];

/**
 * the geometry that replaces a sharp corner: a straight cut across it, or an
 * arc meeting both its edges tangentially. Both reach back along each edge by
 * the same amount the kernel rules use, so hand-drawn and generated corners
 * are the same shape
 */
const cornerGeometry = (
  vertex: VectorPoint,
  towardsPrevious: VectorPoint,
  towardsNext: VectorPoint,
  cut: CornerCut,
): PixelPoint[] => {
  const treatment = cornerCutKind(cut);
  const radius = typeof cut === "string" ? cornerRadiusPx : cut.radiusPx;
  const back = unit(towardsPrevious);
  const forth = unit(towardsNext);
  const halfAngle =
    Math.acos(
      Math.min(Math.max(back[0] * forth[0] + back[1] * forth[1], -1), 1),
    ) / 2;
  const reach =
    treatment === "chamfer" ? chamferReachPx : radius / Math.tan(halfAngle);
  const start: PixelPoint = [
    vertex[0] + back[0] * reach,
    vertex[1] + back[1] * reach,
  ];
  const end: PixelPoint = [
    vertex[0] + forth[0] * reach,
    vertex[1] + forth[1] * reach,
  ];
  if (treatment === "chamfer") {
    return [start, end];
  }

  const bisector = unit([back[0] + forth[0], back[1] + forth[1]]);
  const centreDistance = radius / Math.sin(halfAngle);
  const centre: VectorPoint = [
    vertex[0] + bisector[0] * centreDistance,
    vertex[1] + bisector[1] * centreDistance,
  ];
  const angleOf = ([x, y]: VectorPoint) =>
    Math.atan2(y - centre[1], x - centre[0]);
  const from = angleOf(start);
  const to = angleOf(end);
  // the arc is the short way round: whichever direction sweeps less than half
  // a turn is the one that stays outside the shape's two edges
  const sweep = ((to - from + 3 * Math.PI) % (2 * Math.PI)) - Math.PI;
  const step = sweep / cornerArcSegments;
  const onCircle = (angle: number, atRadius: number): PixelPoint => [
    centre[0] + atRadius * Math.cos(angle),
    centre[1] + atRadius * Math.sin(angle),
  ];
  const controlRadius = radius / Math.cos(Math.abs(step) / 2);

  const points: PixelPoint[] = [start];
  for (let i = 0; i < cornerArcSegments; i++) {
    const [controlX, controlY] = onCircle(
      from + step * (i + 0.5),
      controlRadius,
    );
    points.push([controlX, controlY, 0]);
    points.push(
      i === cornerArcSegments - 1 ?
        end
      : onCircle(from + step * (i + 1), radius),
    );
  }
  return points;
};

/**
 * A hand-authored contour walked into drawable points. Each vertex
 * contributes either itself or the corner treatment standing in for it, and
 * each curved segment an off-curve control where its two neighbouring sides
 * cross - so a curve always leaves one straight side and arrives on the next
 * without a tangent discontinuity, and the outline holds no angle that was
 * not drawn.
 */
export const contourPixelPoints = (contour: VectorContour): PixelPoint[] => {
  const { points, curves = [], corners = {}, controls = {} } = contour;
  const walked: PixelPoint[] = [];
  for (const [index, vertex] of points.entries()) {
    const previous = at(index - 1, points);
    const next = at(index + 1, points);
    const treatment = corners[String(index)];
    if (treatment === undefined) {
      walked.push([vertex[0], vertex[1]]);
    } else {
      walked.push(
        ...cornerGeometry(
          vertex,
          [previous[0] - vertex[0], previous[1] - vertex[1]],
          [next[0] - vertex[0], next[1] - vertex[1]],
          treatment,
        ),
      );
    }
    if (curves.includes(index)) {
      const named = controls[String(index)];
      const beforeStart = at(index - 1, points);
      const afterEnd = at(index + 2, points);
      const control =
        named ??
        linesIntersection(
          vertex,
          [vertex[0] - beforeStart[0], vertex[1] - beforeStart[1]],
          next,
          [afterEnd[0] - next[0], afterEnd[1] - next[1]],
        );
      if (control !== undefined) {
        walked.push([control[0], control[1], 0]);
      }
    }
  }
  return walked;
};

/** even-odd point-in-polygon */
const contains = (
  polygon: readonly VectorPoint[],
  [x, y]: VectorPoint,
): boolean => {
  let inside = false;
  for (let i = 0; i < polygon.length; i++) {
    const [x1, y1] = polygon[i];
    const [x2, y2] = polygon[(i + 1) % polygon.length];
    if (y1 > y !== y2 > y && x < x1 + ((y - y1) / (y2 - y1)) * (x2 - x1)) {
      inside = !inside;
    }
  }
  return inside;
};

/**
 * a point strictly inside a simple polygon: the midpoint of its first side,
 * stepped a hair towards whichever face of that side is the inside. A side's
 * midpoint is never a vertex, so one of the two faces always is
 */
const interiorPoint = (polygon: readonly VectorPoint[]): VectorPoint => {
  const [start] = polygon;
  const end = polygon[1] ?? start;
  const midpoint: VectorPoint = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
  ];
  const along = unit([end[0] - start[0], end[1] - start[1]]);
  const nudge = 1e-4;
  const oneSide: VectorPoint = [
    midpoint[0] - along[1] * nudge,
    midpoint[1] + along[0] * nudge,
  ];
  return contains(polygon, oneSide) ? oneSide : (
      [midpoint[0] + along[1] * nudge, midpoint[1] - along[0] * nudge]
    );
};

/**
 * Hand-authored shapes as font contours.
 *
 * The shapes are authored under the even-odd rule - a contour inside another
 * is a hole, however either is wound - which is the rule that matches how the
 * shapes are drawn and read. TrueType fills non-zero, so each contour is
 * wound here by how deeply it nests: an even depth adds ink, an odd depth
 * takes it away.
 */
export const vectorGlyphContours = (
  shapes: readonly VectorShape[],
): Contour[] => {
  const contours = shapes.filter((shape) => shape.type === "contour");
  const depthOf = (contour: VectorContour): number => {
    const inside = interiorPoint(contour.points);
    return contours.filter(
      (other) => other !== contour && contains(other.points, inside),
    ).length;
  };

  const drawn = contours.map((contour): Contour => {
    const walked = contourPixelPoints(contour);
    const addsInk = depthOf(contour) % 2 === 0;
    // the y flip into font units negates the signed area, so a contour that
    // encloses positive area as drawn is the one non-zero fill adds
    const positiveAreaAsDrawn = twiceSignedArea(contour.points) > 0;
    const inDrawnOrder = walked.map(toFontUnits);
    return positiveAreaAsDrawn === addsInk ? inDrawnOrder : (
        [...inDrawnOrder].reverse()
      );
  });

  const holes = shapes
    .filter((shape) => shape.type === "circle")
    .map(({ cell: [col, row] }) => circleContour(col, row, true));

  return [...drawn, ...holes];
};
