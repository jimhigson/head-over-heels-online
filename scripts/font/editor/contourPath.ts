import { baselineFromTop, type Contour, px } from "../geometry/fontUnits";

type PathPoint = { x: number; y: number; onCurve: boolean };

/** a font-unit contour back into the glyph pixels the art is drawn in */
const inGlyphPixels = (contour: Contour): PathPoint[] =>
  contour.map((point) => ({
    x: point[0] / px,
    y: baselineFromTop - point[1] / px,
    onCurve: point.length === 2,
  }));

const midpoint = (a: PathPoint, b: PathPoint): PathPoint => ({
  x: (a.x + b.x) / 2,
  y: (a.y + b.y) / 2,
  onCurve: true,
});

/**
 * an svg path for one contour, in glyph pixels.
 *
 * TrueType implies an on-curve point midway between any two consecutive
 * off-curve ones, so a run of controls is a single smooth spline rather than a
 * series of separate curves. Drawing the implied points out is what makes the
 * circles and slots come out round here exactly as they do in the built font.
 */
export const contourPath = (contour: Contour): string => {
  const points = inGlyphPixels(contour);
  if (points.length === 0) {
    return "";
  }
  const firstOnCurve = points.findIndex((point) => point.onCurve);
  const start =
    firstOnCurve === -1 ?
      midpoint(points[points.length - 1], points[0])
    : points[firstOnCurve];
  const from = firstOnCurve === -1 ? 0 : firstOnCurve + 1;

  const segments = [`M ${start.x} ${start.y}`];
  let pendingControl: PathPoint | undefined;
  const curveTo = (control: PathPoint, to: PathPoint) =>
    segments.push(`Q ${control.x} ${control.y} ${to.x} ${to.y}`);

  for (let step = 0; step < points.length; step++) {
    const point = points[(from + step) % points.length];
    if (point.onCurve) {
      if (pendingControl === undefined) {
        segments.push(`L ${point.x} ${point.y}`);
      } else {
        curveTo(pendingControl, point);
        pendingControl = undefined;
      }
      continue;
    }
    if (pendingControl !== undefined) {
      curveTo(pendingControl, midpoint(pendingControl, point));
    }
    pendingControl = point;
  }
  if (pendingControl !== undefined) {
    curveTo(pendingControl, start);
  }
  segments.push("Z");
  return segments.join(" ");
};

export const contoursPath = (contours: Contour[]): string =>
  contours.map(contourPath).join(" ");
