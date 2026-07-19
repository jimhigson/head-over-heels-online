/**
 * Turns an upscaled binary bitmap into vector outlines that are faithful to
 * the cleanEdge algorithm's INTENT rather than its raster: boundary loops are
 * traced from the bitmap, then staircases whose steps are uniform 1:1, 2:1 or
 * 1:2 (the exact slopes cleanEdge cuts) collapse to single diagonal segments.
 * Irregular steps - deliberate blocky art - stay square.
 */

/** a closed loop of integer grid points, in bitmap (y-down) coordinates */
export type TracedLoop = Array<[number, number]>;

type Point = [number, number];

const pointKey = ([x, y]: Point): number => y * 0x1_00_00 + x;

/**
 * Trace the boundaries of ink regions as closed loops, walking with ink on
 * the left. In the bitmap's y-down coordinates this winds outer boundaries
 * counterclockwise and holes clockwise; flipped to y-up font coordinates
 * that becomes clockwise-outers/anticlockwise-holes, matching the font's
 * rect contours under non-zero fill.
 */
export const traceBitmapToLoops = (bitmap: boolean[][]): TracedLoop[] => {
  const h = bitmap.length;
  const [firstRow] = bitmap;
  const w = firstRow?.length ?? 0;
  const ink = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < w && y < h && bitmap[y][x];

  // directed boundary edges, ink on the left of the direction of travel:
  // keyed by start point; each value is the edge's end point
  const outgoing = new Map<number, Point[]>();
  const addEdge = (from: Point, to: Point) => {
    outgoing.getOrInsertComputed(pointKey(from), () => []).push(to);
  };

  for (let cy = 0; cy < h; cy++) {
    for (let cx = 0; cx < w; cx++) {
      if (!ink(cx, cy)) {
        continue;
      }
      if (!ink(cx, cy + 1)) {
        // bottom side: walk east, ink to the north
        addEdge([cx, cy + 1], [cx + 1, cy + 1]);
      }
      if (!ink(cx, cy - 1)) {
        // top side: walk west, ink to the south
        addEdge([cx + 1, cy], [cx, cy]);
      }
      if (!ink(cx - 1, cy)) {
        // left side: walk south, ink to the east
        addEdge([cx, cy], [cx, cy + 1]);
      }
      if (!ink(cx + 1, cy)) {
        // right side: walk north, ink to the west
        addEdge([cx + 1, cy + 1], [cx + 1, cy]);
      }
    }
  }

  const loops: TracedLoop[] = [];

  for (const [startKey] of outgoing) {
    const candidates = outgoing.get(startKey);
    if (candidates === undefined || candidates.length === 0) {
      continue;
    }
    const start: Point = [
      startKey % 0x1_00_00,
      Math.floor(startKey / 0x1_00_00),
    ];
    const loop: TracedLoop = [];
    let current = start;
    let incomingDir: Point | undefined = undefined;

    for (;;) {
      const nexts = outgoing.get(pointKey(current));
      if (nexts === undefined || nexts.length === 0) {
        break;
      }
      let next: Point;
      if (nexts.length === 1 || incomingDir === undefined) {
        [next] = nexts;
        nexts.splice(0, 1);
      } else {
        // a four-valent vertex (regions touching diagonally): prefer the
        // sharpest left turn, which keeps hugging the same ink region
        const [inX, inY] = incomingDir;
        // left turn of (x,y) in y-down coords is (y,-x)
        const leftDir: Point = [inY, -inX];
        const index = nexts.findIndex(
          ([nx, ny]) =>
            nx - current[0] === leftDir[0] && ny - current[1] === leftDir[1],
        );
        const chosen = index === -1 ? 0 : index;
        next = nexts[chosen];
        nexts.splice(chosen, 1);
      }
      loop.push(current);
      incomingDir = [next[0] - current[0], next[1] - current[1]];
      current = next;
      if (current[0] === start[0] && current[1] === start[1]) {
        break;
      }
    }
    if (loop.length >= 4) {
      loops.push(loop);
    }
  }

  return loops;
};

/** drop vertices where the direction of travel does not change */
const mergeCollinear = (loop: TracedLoop): TracedLoop => {
  const out: TracedLoop = [];
  for (let i = 0; i < loop.length; i++) {
    const prev = loop[(i - 1 + loop.length) % loop.length];
    const here = loop[i];
    const next = loop[(i + 1) % loop.length];
    const inDir = [Math.sign(here[0] - prev[0]), Math.sign(here[1] - prev[1])];
    const outDir = [Math.sign(next[0] - here[0]), Math.sign(next[1] - here[1])];
    if (inDir[0] !== outDir[0] || inDir[1] !== outDir[1]) {
      out.push(here);
    }
  }
  return out;
};

/** the slopes cleanEdge cuts, as (|dx|, |dy|) step shapes in subpixels */
const stairStepShapes: Array<[number, number]> = [
  [1, 1],
  [2, 1],
  [1, 2],
];

/**
 * Collapse maximal staircase alternations into single diagonal segments. A
 * staircase is a maximal run of boundary sub-segments whose per-axis lengths
 * and directions are uniform and whose (horizontal, vertical) step shape is
 * one of cleanEdge's 1:1, 2:1 or 1:2 slopes, lasting at least `minSteps`
 * whole steps. The diagonal is anchored at the MIDPOINTS of the run's first
 * and last sub-segments: that is where cleanEdge's cut line actually
 * crosses, and because maximal runs and segment midpoints are invariant
 * under mirroring and traversal direction, symmetrical glyphs stay
 * symmetrical.
 */
export const collapseStairs = (
  cornerLoop: TracedLoop,
  minSteps: number = 2,
): TracedLoop => {
  const n = cornerLoop.length;
  if (n < 4) {
    return cornerLoop;
  }

  const pt = (i: number): Point => cornerLoop[((i % n) + n) % n];

  /** sub-segment i runs pt(i) -> pt(i+1); corner loops strictly alternate H/V */
  const segDelta = (i: number): Point => {
    const [ax, ay] = pt(i);
    const [bx, by] = pt(i + 1);
    return [bx - ax, by - ay];
  };

  const mid = (i: number): Point => {
    const [ax, ay] = pt(i);
    const [bx, by] = pt(i + 1);
    return [(ax + bx) / 2, (ay + by) / 2];
  };

  /**
   * how many sub-segments, starting at j, form a uniform staircase: every
   * horizontal sub-segment identical, every vertical sub-segment identical,
   * and the (|h|, |v|) shape an allowed slope
   */
  const runLengthFrom = (j: number): number => {
    const [firstDx, firstDy] = segDelta(j);
    const [secondDx, secondDy] = segDelta(j + 1);
    const hDelta: Point = firstDx !== 0 ? [firstDx, 0] : [secondDx, 0];
    const vDelta: Point = firstDx !== 0 ? [0, secondDy] : [0, firstDy];
    if (
      !stairStepShapes.some(
        ([w, h]) => Math.abs(hDelta[0]) === w && Math.abs(vDelta[1]) === h,
      )
    ) {
      return 0;
    }
    let count = 0;
    while (count < n) {
      const [dx, dy] = segDelta(j + count);
      const expected = (count % 2 === 0) === (firstDx !== 0) ? hDelta : vDelta;
      if (dx !== expected[0] || dy !== expected[1]) {
        break;
      }
      count++;
    }
    return count;
  };

  // rotate the scan to start just after a seam (a sub-segment that no run
  // can extend backwards through), so runs never split across the cyclic
  // wrap. A loop with no seam is a perfect repeating diamond - left square
  const isSeam = (j: number): boolean => runLengthFrom(j) < 2;
  let startAt = -1;
  for (let j = 0; j < n; j++) {
    if (isSeam(j)) {
      startAt = j + 1;
      break;
    }
  }
  if (startAt === -1) {
    return cornerLoop;
  }

  const out: TracedLoop = [];
  let i = startAt;
  const end = startAt + n;
  while (i < end) {
    const segCount = Math.min(runLengthFrom(i), end - i);
    if (segCount >= minSteps * 2) {
      // corner into the run, half of its first sub-segment, the diagonal,
      // half of its last sub-segment; the corner after the run is emitted
      // by the following iterations
      out.push(pt(i));
      out.push(mid(i));
      out.push(mid(i + segCount - 1));
      i += segCount;
      continue;
    }
    out.push(pt(i));
    i++;
  }

  return out;
};

/**
 * Merge the tiny axis-aligned connector left where two collapsed diagonals
 * of different slopes meet (cleanEdge's slope-transition raster): a segment
 * of at most one subpixel whose neighbours are BOTH diagonal collapses to
 * its midpoint. Genuine square art is untouched - its segments neighbour
 * other axis-aligned segments.
 */
const smoothSlopeTransitions = (loop: TracedLoop): TracedLoop => {
  const n = loop.length;
  const pt = (i: number): Point => loop[((i % n) + n) % n];
  const isDiagonal = ([ax, ay]: Point, [bx, by]: Point) =>
    ax !== bx && ay !== by;
  const isShortAxisStub = ([ax, ay]: Point, [bx, by]: Point) =>
    (ax === bx || ay === by) && Math.abs(bx - ax) + Math.abs(by - ay) <= 1;

  // a transition corner sits between two collapsed diagonals as
  // [diagonal] -> stub -> CORNER -> stub -> [diagonal]; dropping the corner
  // joins the two stub midpoints into a small connecting diagonal
  return loop.filter((_, i) => {
    const corner = pt(i);
    const before = pt(i - 1);
    const after = pt(i + 1);
    return !(
      isShortAxisStub(before, corner) &&
      isShortAxisStub(corner, after) &&
      isDiagonal(pt(i - 2), before) &&
      isDiagonal(after, pt(i + 2))
    );
  });
};

/**
 * bitmap to simplified vector loops: boundary trace, collinear merge, then
 * uniform staircases collapse to their intended diagonal lines, and the
 * residual single-step notches between differing slopes are smoothed
 */
export const traceSmoothContours = (bitmap: boolean[][]): TracedLoop[] =>
  traceBitmapToLoops(bitmap).map((loop) =>
    smoothSlopeTransitions(collapseStairs(mergeCollinear(loop))),
  );
