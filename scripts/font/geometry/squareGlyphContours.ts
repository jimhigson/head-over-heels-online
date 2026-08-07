import { baselineFromTop, type Contour, px } from "./fontUnits";

/**
 * Trace a glyph's ink into rectilinear outline contours: one boundary loop per
 * connected ink region (wound clockwise in y-up font space) plus a counter-wound
 * (anticlockwise) inner loop around each enclosed gap. Unlike a bag of disjoint
 * rectangles, this gives each glyph the topology a real font has - one
 * continuous boundary per region with true counters - so a platform rasteriser
 * that grid-fits each contour edge cannot swallow a 1px counter by rounding two
 * independent rectangles' facing edges together (which is what filled the
 * shield/rotate holes under DirectWrite and CoreText). It also needs far fewer
 * points than one rectangle per horizontal run.
 *
 * varLib's default (normal) master uses these as drawn; the double-height master
 * scales every y by 2 - the identical point sequence, so gvar interpolation is
 * exact.
 */
export const squareGlyphContours = (
  bitmap: boolean[][],
  /** named only so a failed self-check can say which glyph it was */
  char: string,
): Contour[] => {
  const height = bitmap.length;
  const [firstRow] = bitmap;
  const width = firstRow?.length ?? 0;
  const ink = (col: number, row: number): boolean =>
    col >= 0 && row >= 0 && col < width && row < height && bitmap[row][col];

  // Every unit edge between an ink cell and a non-ink cell, directed so the ink
  // is on its left in the pixel grid's y-down space (cell (col,row)'s top-left
  // corner is lattice point (col,row)). Walking these keeps ink on the left, so
  // a region's outer boundary comes out anticlockwise in y-down - which is
  // clockwise once y is flipped to font space at the end.
  type Edge = { sx: number; sy: number; ex: number; ey: number; used: boolean };
  const edges: Edge[] = [];
  const addEdge = (sx: number, sy: number, ex: number, ey: number) =>
    edges.push({ sx, sy, ex, ey, used: false });
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (!ink(col, row)) {
        continue;
      }
      if (!ink(col - 1, row)) {
        addEdge(col, row, col, row + 1);
      } // left → down
      if (!ink(col, row + 1)) {
        addEdge(col, row + 1, col + 1, row + 1);
      } // bottom → right
      if (!ink(col + 1, row)) {
        addEdge(col + 1, row + 1, col + 1, row);
      } // right → up
      if (!ink(col, row - 1)) {
        addEdge(col + 1, row, col, row);
      } // top → left
    }
  }

  const key = (x: number, y: number) => `${x},${y}`;
  const outgoing = new Map<string, Edge[]>();
  for (const e of edges) {
    const list = outgoing.get(key(e.sx, e.sy));
    if (list === undefined) {
      outgoing.set(key(e.sx, e.sy), [e]);
    } else {
      list.push(e);
    }
  }

  const heading = (e: Edge) =>
    key(Math.sign(e.ex - e.sx), Math.sign(e.ey - e.sy));
  // heading after a left turn in y-down screen space:
  const afterLeft: Record<string, string> = {
    "1,0": "0,-1", // right → up
    "0,1": "1,0", // down → right
    "-1,0": "0,1", // left → down
    "0,-1": "-1,0", // up → left
  };
  // at a pinch (two ink cells meeting only at a diagonal corner) two loops pass
  // through the point; continue with the sharpest available left turn so the
  // loops stay separate and never cross:
  const turnPreference = (h: string) => [
    afterLeft[h],
    h,
    afterLeft[afterLeft[afterLeft[h]]],
  ];

  const collapseCollinear = (loop: Array<[number, number]>) => {
    const corners: Array<[number, number]> = [];
    const n = loop.length;
    for (let i = 0; i < n; i++) {
      const [ax, ay] = loop[(i + n - 1) % n];
      const [x, y] = loop[i];
      const [bx, by] = loop[(i + 1) % n];
      if (
        key(Math.sign(x - ax), Math.sign(y - ay)) !==
        key(Math.sign(bx - x), Math.sign(by - y))
      ) {
        corners.push([x, y]);
      }
    }
    return corners;
  };

  const latticeLoops: Array<Array<[number, number]>> = [];
  for (const first of edges) {
    if (first.used) {
      continue;
    }
    const loop: Array<[number, number]> = [];
    let e: Edge | undefined = first;
    while (e !== undefined && !e.used) {
      e.used = true;
      loop.push([e.sx, e.sy]);
      const candidates = outgoing.get(key(e.ex, e.ey)) ?? [];
      let next: Edge | undefined;
      for (const want of turnPreference(heading(e))) {
        next = candidates.find((c) => !c.used && heading(c) === want);
        if (next !== undefined) {
          break;
        }
      }
      e = next;
    }
    latticeLoops.push(collapseCollinear(loop));
  }

  // Build-time proof the traced outline reproduces the source ink exactly under
  // the non-zero winding rule (the rule TrueType fills glyf with): a pixel is
  // inside the outline iff it was ink. Catches any tracing or winding error.
  const windingAt = (px0: number, py0: number) => {
    let winding = 0;
    for (const loop of latticeLoops) {
      for (let i = 0; i < loop.length; i++) {
        const [x1, y1] = loop[i];
        const [x2, y2] = loop[(i + 1) % loop.length];
        const isLeft = (x2 - x1) * (py0 - y1) - (px0 - x1) * (y2 - y1);
        if (y1 <= py0) {
          if (y2 > py0 && isLeft > 0) {
            winding++;
          }
        } else if (y2 <= py0 && isLeft < 0) {
          winding--;
        }
      }
    }
    return winding;
  };
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (ink(col, row) !== (windingAt(col + 0.5, row + 0.5) !== 0)) {
        throw new Error(
          `outline trace for glyph "${char}" does not reproduce its ink at cell (${col},${row})`,
        );
      }
    }
  }

  // to font units, flipping y (bitmap y-down → font y-up, baseline at y=0):
  return latticeLoops.map((loop) =>
    loop.map(([cx, cy]): [number, number] => [
      cx * px,
      (baselineFromTop - cy) * px,
    ]),
  );
};
