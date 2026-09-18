import { baselineFromTop, type Contour, px } from "../geometry/fontUnits";
import { type GlyphOutline } from "../geometry/glyphOutline";
import { type VectorPoint, type VectorShape } from "../geometry/glyphOverrides";
import { linesIntersection } from "../geometry/slopes";

const rounded = (value: number) => Math.round(value * 1e6) / 1e6;

/** how far a derived control may sit from the drawn one and still be it, in glyph pixels */
const controlTolerance = 1e-3;

/** a walked point in the space the shapes are authored in */
type WalkedPoint = { at: VectorPoint; onCurve: boolean };

const inGlyphPixels = (point: Contour[number]): VectorPoint => [
  rounded(point[0] / px),
  rounded(baselineFromTop - point[1] / px),
];

/**
 * The contour with an on-curve point put in wherever truetype only implies
 * one. Two consecutive controls mean an on-curve point midway between them,
 * and spelling those out leaves every curve a single control between two
 * ends - the only shape a vector segment can hold.
 */
const impliedPointsSpelledOut = (
  walked: readonly WalkedPoint[],
): WalkedPoint[] => {
  const spelled: WalkedPoint[] = [];
  for (const [index, here] of walked.entries()) {
    spelled.push(here);
    const next = walked[(index + 1) % walked.length];
    if (!here.onCurve && !next.onCurve) {
      spelled.push({
        at: [
          rounded((here.at[0] + next.at[0]) / 2),
          rounded((here.at[1] + next.at[1]) / 2),
        ],
        onCurve: true,
      });
    }
  }
  return spelled;
};

/** the ends of each segment, and the control of the curved ones */
type Segments = {
  points: VectorPoint[];
  controls: (undefined | VectorPoint)[];
};

/**
 * The cycle read as segments: every on-curve point is a vertex, and a control
 * between two of them is that segment's. Reading starts from a vertex, so a
 * contour that opens on a control is rotated to one first.
 */
const segmentsOf = (cycle: readonly WalkedPoint[]): Segments | undefined => {
  const start = cycle.findIndex((point) => point.onCurve);
  if (start === -1) {
    return undefined;
  }
  const fromVertex = [...cycle.slice(start), ...cycle.slice(0, start)];
  const points: VectorPoint[] = [];
  const controls: (undefined | VectorPoint)[] = [];
  for (let index = 0; index < fromVertex.length;) {
    points.push(fromVertex[index].at);
    const next = fromVertex[(index + 1) % fromVertex.length];
    controls.push(next.onCurve ? undefined : next.at);
    index += next.onCurve ? 1 : 2;
  }
  return { points, controls };
};

/**
 * Which segments are curved, and the control of each one the contour's own
 * sides do not already imply.
 *
 * A vector curve takes its control from where its two neighbouring sides
 * cross. Some of the drawn ones already sit there, and those are left to be
 * derived so the shape stays as editable as a hand-drawn one - move a side
 * and its curve follows. The rest are named: a curve that swallowed the run
 * it was cut against has no side left to read that tangent from, and there is
 * no crossing to find.
 */
const curvedSegments = ({
  points,
  controls,
}: Segments): {
  curves: number[];
  named: { [segmentIndex: string]: VectorPoint };
} => {
  const count = points.length;
  const curves: number[] = [];
  const named: { [segmentIndex: string]: VectorPoint } = {};
  for (const [index, control] of controls.entries()) {
    if (control === undefined) {
      continue;
    }
    curves.push(index);
    const vertex = points[index];
    const next = points[(index + 1) % count];
    const before = points[(index - 1 + count) % count];
    const after = points[(index + 2) % count];
    const derived = linesIntersection(
      vertex,
      [vertex[0] - before[0], vertex[1] - before[1]],
      next,
      [after[0] - next[0], after[1] - next[1]],
    );
    if (
      derived === undefined ||
      Math.hypot(derived[0] - control[0], derived[1] - control[1]) >
        controlTolerance
    ) {
      named[String(index)] = control;
    }
  }
  return { curves, named };
};

/**
 * A generated outline as hand-editable shapes, so switching a character into
 * vector mode starts from what it already looks like rather than from
 * nothing.
 *
 * Curves carry over as curved segments, each keeping the control the rules
 * cut it against - derived from the sides either side of it where they imply
 * it, named outright where they cannot. Only a contour drawn entirely of
 * controls has no vertex to start from and no reading as sides at all; the
 * count of those is reported so they can be redrawn with the circle and
 * corner tools instead of going missing unremarked.
 */
export const seedShapes = (
  outline: GlyphOutline,
): { shapes: VectorShape[]; unconverted: number } => {
  const shapes: VectorShape[] = [];
  let unconverted = 0;
  for (const contour of outline.contours) {
    const segments = segmentsOf(
      impliedPointsSpelledOut(
        contour.map((point) => ({
          at: inGlyphPixels(point),
          onCurve: point.length === 2,
        })),
      ),
    );
    if (segments === undefined) {
      unconverted++;
      continue;
    }
    const { curves, named } = curvedSegments(segments);
    shapes.push({
      type: "contour",
      points: segments.points,
      ...(curves.length > 0 ? { curves } : {}),
      ...(Object.keys(named).length > 0 ? { controls: named } : {}),
    });
  }
  return { shapes, unconverted };
};
