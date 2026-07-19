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
 * Collapse maximal runs of uniform staircase steps into single diagonal
 * segments. A run qualifies when consecutive corner-to-corner steps repeat
 * the same (dx, dy) shape - one of cleanEdge's 1:1, 2:1 or 1:2 slopes - for
 * at least `minSteps` steps.
 */
export const collapseStairs = (
  cornerLoop: TracedLoop,
  minSteps: number = 3,
): TracedLoop => {
  const n = cornerLoop.length;
  if (n < 4) {
    return cornerLoop;
  }

  // between consecutive corners the boundary moves by an L-step; the loop
  // alternates H and V movement by construction (corners only)
  const step = (i: number): Point => {
    const [ax, ay] = cornerLoop[i];
    const [bx, by] = cornerLoop[(i + 2) % n];
    return [bx - ax, by - ay];
  };

  const sameStep = ([ax, ay]: Point, [bx, by]: Point) => ax === bx && ay === by;

  const isDiagonalStep = ([dx, dy]: Point) =>
    stairStepShapes.some(
      ([w, h]) => Math.abs(dx) === w && Math.abs(dy) === h,
    ) &&
    dx !== 0 &&
    dy !== 0;

  // mark corners interior to a qualifying run for removal
  const keep = new Array<boolean>(n).fill(true);
  let i = 0;
  while (i < n) {
    const s = step(i);
    if (!isDiagonalStep(s)) {
      i++;
      continue;
    }
    // extend the run of identical corner-to-corner steps
    let count = 1;
    while (
      count < Math.floor(n / 2) &&
      sameStep(step((i + count * 2) % n), s)
    ) {
      count++;
    }
    if (count >= minSteps) {
      // drop every corner strictly inside the run (the zig-zag vertices and
      // the intermediate on-line corners), keeping the run's two endpoints
      for (let k = 1; k < count * 2; k++) {
        keep[(i + k) % n] = false;
      }
      i += count * 2;
    } else {
      i += 2;
    }
  }

  return cornerLoop.filter((_, index) => keep[index]);
};

/**
 * bitmap to simplified vector loops: boundary trace, collinear merge, then
 * uniform staircases collapse to their intended diagonal lines
 */
export const traceSmoothContours = (bitmap: boolean[][]): TracedLoop[] =>
  traceBitmapToLoops(bitmap).map((loop) =>
    collapseStairs(mergeCollinear(loop)),
  );
