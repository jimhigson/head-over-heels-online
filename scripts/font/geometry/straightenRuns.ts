import { type PixelPoint } from "./fontUnits";
import { type KernelMatch } from "./kernelRules";

/** one tread of a staircase, in the frame of the edge it belongs to */
type Tread = {
  edge: number;
  along: number;
  height: number;
  /**
   * the matched rule's reaches: how far the line carries past this tread's
   * top and bottom. The rule knows what lies beyond from its own pattern -
   * half a tread to meet an abutting slope at the midpoint of the shared
   * step, a whole cell to land on an abutting straight edge's column - so the
   * run's two outer treads carry the correct reach for its ends. Two runs
   * converging on a shared tip cell each reach half a tread and so meet at a
   * point, with no rule needed for the tip
   */
  topReach: number;
  bottomReach: number;
};

export type DiagonalRun = {
  axis: "horizontal" | "vertical";
  inkOnRight: boolean;
  stepDir: number;
  treads: Tread[];
  /** what the run was told to do where another converges on it */
  tip: string | undefined;
  /** how far a curved run carries past the slope change at its top */
  curveEnd: string | undefined;
  /**
   * how far the line is moved off the middle of the steps, in cells: half a
   * cell either way puts it on the staircase's outer or inner corners, and so
   * on the pixel grid at both its ends
   */
  edgeShift: number;
};

/**
 * The 45 degree run carrying this one's edge on past one of its ends, if
 * there is one: same edge, same direction, abutting tread to tread.
 */
const fortyFiveNeighbour = (
  run: DiagonalRun,
  runs: readonly DiagonalRun[],
  end: "above" | "below",
): DiagonalRun | undefined => {
  const [first] = run.treads;
  const last = run.treads[run.treads.length - 1];
  return runs.find((other) => {
    if (
      other === run ||
      other.axis !== run.axis ||
      other.inkOnRight !== run.inkOnRight ||
      other.stepDir !== run.stepDir ||
      other.treads[0].height !== 1
    ) {
      return false;
    }
    const otherLast = other.treads[other.treads.length - 1];
    const [otherFirst] = other.treads;
    return end === "above" ?
        first.edge === otherLast.edge + run.stepDir &&
          first.along === otherLast.along + otherLast.height
      : otherFirst.edge === last.edge + run.stepDir &&
          otherFirst.along === last.along + last.height;
  });
};

/**
 * The 45 degree run above this one that its curve swallows whole, if it was
 * asked to take one. Only a run whose other end is a plain stop can: with a
 * 45 degree run at both ends the two tangents are parallel and there is no
 * curve to carry anywhere.
 */
const swallowedNeighbour = (
  run: DiagonalRun,
  runs: readonly DiagonalRun[],
): DiagonalRun | undefined =>
  (
    run.curveEnd !== "atCorner" ||
    run.treads[0].height === 1 ||
    fortyFiveNeighbour(run, runs, "below") !== undefined
  ) ?
    undefined
  : fortyFiveNeighbour(run, runs, "above");

/**
 * Gather the treads matched along one edge into runs: consecutive treads that
 * step the same way and abut exactly. A run is one straight line of the
 * outline, which is what lets its two ends be worked out from what the glyph
 * does beyond them rather than from the tread alone.
 */
export const diagonalRuns = (matches: KernelMatch[]): DiagonalRun[] => {
  const runs: DiagonalRun[] = [];
  for (const { x, y, rule, choices } of matches) {
    if (rule.action.type !== "diagonalEdge") {
      continue;
    }
    const { axis, ink, step, treadHeight, topReach, bottomReach } = rule.action;
    const acrossAxis = axis === "vertical";
    const inkOnRight = ink === "right";
    const stepDir = step === "left" ? -1 : 1;
    // an end told how far to carry gives up the column its rule was reaching
    // for: half a tread holds the angle the steps were cut at, none at all
    // leaves the line ending where the blocky edge already did
    const asked =
      choices.runEnd === "halfTread" ? 0.5
      : choices.runEnd === "noFurther" ? 0
      : undefined;
    const tread: Tread = {
      edge: (acrossAxis ? x : y) + (inkOnRight ? 0 : 1),
      along: acrossAxis ? y : x,
      height: treadHeight,
      topReach: asked ?? topReach,
      bottomReach: asked ?? bottomReach,
    };
    const sameEdge = (run: DiagonalRun) =>
      run.axis === axis &&
      run.inkOnRight === inkOnRight &&
      run.stepDir === stepDir;
    // only treads of the same height chain: a run is one straight line at one
    // slope. Where the slope changes the edge continues as a separate run,
    // and the two are joined - or curved together - afterwards
    const after = runs.find((run) => {
      const last = run.treads[run.treads.length - 1];
      return (
        sameEdge(run) &&
        tread.height === last.height &&
        tread.edge === last.edge + stepDir &&
        tread.along === last.along + last.height
      );
    });
    const before = runs.find((run) => {
      const [first] = run.treads;
      return (
        sameEdge(run) &&
        tread.height === first.height &&
        tread.edge === first.edge - stepDir &&
        tread.along + tread.height === first.along
      );
    });
    if (after !== undefined) {
      after.treads.push(tread);
      if (before !== undefined) {
        after.treads.push(...before.treads);
        runs.splice(runs.indexOf(before), 1);
      }
    } else if (before !== undefined) {
      before.treads.unshift(tread);
    } else {
      runs.push({
        axis,
        inkOnRight,
        stepDir,
        treads: [tread],
        tip: choices.tip,
        curveEnd: choices.curveEnd,
        // the edge coordinate counts away from the ink, so adding to it is
        // what grows the stroke whichever side the ink is on
        edgeShift:
          choices.slope === "add" ?
            inkOnRight ? -0.5
            : 0.5
          : choices.slope === "subtract" ?
            inkOnRight ? 0.5
            : -0.5
          : 0,
      });
    }
  }
  return runs;
};

/**
 * Drop any point its two neighbours already run straight through. The traced
 * outline arrives as one point per pixel of every edge, and a line spliced in
 * for a staircase can leave its ends flush with the edge it met, so this is
 * measured rather than taken from the step directions - it has to hold for
 * lines at any angle, not just the rectilinear ones.
 */
export const dropCollinear = (loop: PixelPoint[]): PixelPoint[] => {
  // where two runs converge they are both carried out to the same point, which
  // it then holds only once - a repeat leaves its neighbours no direction to
  // measure against, and both copies would be taken for collinear and lost
  const once = loop.filter((here, index) => {
    const previous = loop[(index - 1 + loop.length) % loop.length];
    return here[0] !== previous[0] || here[1] !== previous[1];
  });
  return once.filter((here, index) => {
    const previous = once[(index - 1 + once.length) % once.length];
    const next = once[(index + 1) % once.length];
    // an off-curve control and the on-curve ends either side of it are curve
    // geometry, not corners - collinearity says nothing about them
    if (here.length === 3 || previous.length === 3 || next.length === 3) {
      return true;
    }
    const cross =
      (here[0] - previous[0]) * (next[1] - here[1]) -
      (here[1] - previous[1]) * (next[0] - here[0]);
    return Math.abs(cross) > 1e-9;
  });
};

/**
 * a straight tangent bounding one end of a curved run, in the run's edge
 * frame: the edge coordinate at `along0` plus how fast it moves per cell of
 * along - 0 for a straight (vertical-in-frame) edge, the step direction for a
 * 45 degree line
 */
type Tangent = { edge0: number; along0: number; slope: number };

export const tangentsIntersection = (
  a: Tangent,
  b: Tangent,
): [number, number] | undefined => {
  if (a.slope === b.slope) {
    return undefined;
  }
  const along =
    (b.edge0 - a.edge0 + a.along0 * a.slope - b.along0 * b.slope) /
    (a.slope - b.slope);
  return [a.edge0 + (along - a.along0) * a.slope, along];
};

/** a stretch of the traced outline, and the line or curve standing in for it */
type Splice = { from: number; length: number; points: PixelPoint[] };

/**
 * The outline with every staircase replaced at once.
 *
 * Two runs meeting at a point - the tip of a chevron, where the edge turns
 * back on itself - share the outline point between them, so each is found in
 * the outline the tracer produced rather than in one already part-replaced:
 * substituting either would move that shared point and leave the other unable
 * to find its own steps. Both replacements simply end where the runs meet,
 * and the repeat is dropped along with the collinear points afterwards.
 */
const spliced = (
  loop: readonly PixelPoint[],
  splices: readonly Splice[],
): PixelPoint[] => {
  if (splices.length === 0) {
    return [...loop];
  }
  const startingAt = new Map(splices.map((splice) => [splice.from, splice]));
  // every point some splice stands for, so the walk knows what it may not
  // simply copy across - and so it can begin somewhere no splice is part way
  // through, which is what lets one wrap past the end of the loop
  const covered = new Set<number>();
  for (const { from, length } of splices) {
    for (let step = 1; step < length; step++) {
      covered.add((from + step) % loop.length);
    }
  }
  const begin = loop.findIndex(
    (_, index) => !covered.has(index) || startingAt.has(index),
  );
  const out: PixelPoint[] = [];
  for (let step = 0; step < loop.length;) {
    const index = (begin + step) % loop.length;
    const splice = startingAt.get(index);
    if (splice === undefined) {
      out.push(loop[index]);
      step++;
      continue;
    }
    out.push(...splice.points);
    // the last point of a run is the first of the next where two meet, so the
    // walk stops one short of the end wherever another splice carries on
    const endsAt = (index + splice.length - 1) % loop.length;
    step += startingAt.has(endsAt) ? splice.length - 1 : splice.length;
  }
  return out;
};

/**
 * Replace each staircase in a traced outline with the single straight line it
 * stands for.
 *
 * A run contributes one line: its angle comes from the treads it steps
 * through, and each of its two ends from where that line crosses whatever the
 * outline does beyond it - a real intersection at whatever angle the two make,
 * or, where two runs converge, the point they both stop at. Splicing the line
 * in where the steps were cuts a ribbon of small triangles off one side of the
 * outline and adds the matching ones to the other, so the ink area is
 * unchanged, and the glyph is left with one side where it had a flight of
 * steps - an arrow becomes a seven-sided shape, a slash a parallelogram.
 */
export const straightenRuns = (
  loop: PixelPoint[],
  runs: DiagonalRun[],
): PixelPoint[] => {
  const splices: Splice[] = [];
  // a run a curve swallows draws nothing of its own: its steps are part of the
  // sweep, and splicing its line in as well would lay a second edge over them
  const swallowed = new Set(
    runs
      .map((run) => swallowedNeighbour(run, runs))
      .filter((run) => run !== undefined),
  );
  for (const run of runs) {
    if (swallowed.has(run)) {
      continue;
    }
    const { axis, stepDir, treads } = run;
    const at = (edge: number, along: number): PixelPoint =>
      axis === "vertical" ? [edge, along] : [along, edge];
    const [first] = treads;
    const last = treads[treads.length - 1];
    const absorbed = swallowedNeighbour(run, runs);
    /** the corner one step past a swallowed run, where its curve now ends */
    const corner =
      absorbed === undefined ? undefined : (
        {
          edge: absorbed.treads[0].edge - stepDir,
          along: absorbed.treads[0].along - 1,
        }
      );

    // the outline carries a point at every pixel boundary it turns at, so the
    // run is found by the exact walk its treads make rather than by counting
    // corners - a tread two cells tall is three points, not two
    const walk = (along: Tread[]): PixelPoint[] => {
      const [walkFirst] = along;
      const points: PixelPoint[] = [at(walkFirst.edge, walkFirst.along)];
      along.forEach((tread, index) => {
        for (let down = 1; down <= tread.height; down++) {
          points.push(at(tread.edge, tread.along + down));
        }
        const next = along[index + 1];
        if (next !== undefined) {
          points.push(at(next.edge, tread.along + tread.height));
        }
      });
      return points;
    };
    const zigzag: PixelPoint[] =
      absorbed === undefined || corner === undefined ?
        walk(treads)
        // the swallowed steps and the step above them are replaced along with
        // this run's own, so the whole sweep is spliced in as one piece
      : [
          at(corner.edge, corner.along),
          at(corner.edge, corner.along + 1),
          ...walk(absorbed.treads),
          ...walk(treads),
        ];

    /**
     * The line a run draws, anchored at the end away from `end` - the end
     * whose reach answers to the edge it abuts, and so the one that fixes
     * where the line sits.
     */
    const lineOf = (other: DiagonalRun, end: "bottom" | "top"): Tangent => {
      const [otherFirst] = other.treads;
      const otherLast = other.treads[other.treads.length - 1];
      return end === "bottom" ?
          {
            edge0:
              otherFirst.edge -
              other.stepDir * otherFirst.topReach +
              other.edgeShift,
            along0: otherFirst.along,
            slope: other.stepDir / otherFirst.height,
          }
        : {
            edge0:
              otherLast.edge +
              other.stepDir * otherLast.bottomReach +
              other.edgeShift,
            along0: otherLast.along + otherLast.height,
            slope: other.stepDir / otherLast.height,
          };
    };

    /**
     * The point where a run converging on this one from the other side
     * crosses it.
     *
     * Two runs meeting at a tip - the apex of a caret, the point of a v -
     * step towards each other, so one has ink on its left and the other on
     * its right, and they share the cell they meet in. Carrying both to where
     * their lines actually cross keeps each at the angle its steps were cut
     * at; stopping each a fixed distance past its last step does not, because
     * the run's far end is carried a different distance to meet whatever it
     * abuts there
     */
    const crossingWith = (end: "bottom" | "top"): PixelPoint | undefined => {
      const mine = end === "top" ? first : last;
      const partner = runs.find((other) => {
        if (
          other === run ||
          other.axis !== axis ||
          other.inkOnRight === run.inkOnRight ||
          other.stepDir === stepDir
        ) {
          return false;
        }
        const theirs =
          end === "top" ?
            other.treads[0]
          : other.treads[other.treads.length - 1];
        return (
          theirs.along === mine.along &&
          theirs.height === mine.height &&
          Math.abs(theirs.edge - mine.edge) === 1
        );
      });
      if (partner === undefined) {
        return undefined;
      }
      // each line is taken from where its run's far end lands, so the apex is
      // solved on the line the run actually draws. Reading it off the treads
      // instead would put it half a step from that line, and the run would
      // leave the apex at one angle and arrive at its far end at another
      const crossing = tangentsIntersection(
        lineOf(run, end),
        lineOf(partner, end),
      );
      return crossing === undefined ? undefined : at(...crossing);
    };

    /**
     * The point where this run's line crosses that of a run reversing back
     * off it - the tip of an arrowhead, where one side of the stroke steps
     * out to a point and straight back again.
     *
     * Unlike two edges meeting at an apex, these two runs are the same edge
     * of the same stroke: they keep the ink on the same side, and their outer
     * treads abut across a corner rather than sharing a cell. Neither run's
     * own reach lands on the tip - one stops short of it and the other runs
     * past, to be cut off at the edge of the glyph - so it is solved for from
     * the two lines instead.
     */
    const reversalWith = (end: "bottom" | "top"): PixelPoint | undefined => {
      const mine = end === "top" ? first : last;
      const partner = runs.find((other) => {
        if (
          other === run ||
          other.axis !== axis ||
          other.inkOnRight !== run.inkOnRight ||
          other.stepDir === stepDir
        ) {
          return false;
        }
        const theirs =
          end === "top" ?
            other.treads[other.treads.length - 1]
          : other.treads[0];
        return (
          // only mirrored slopes make a point: where the edge comes back at a
          // different angle it is the far side of a curve, and carrying both
          // lines to their crossing overshoots it
          theirs.height === mine.height &&
          // the edge either steps across as it turns back - the tip of an
          // arrow - or holds its column either side of the turn, as a chevron does
          Math.abs(theirs.edge - mine.edge) <= 1 &&
          (end === "top" ?
            theirs.along + theirs.height === mine.along
          : theirs.along === mine.along + mine.height)
        );
      });
      if (partner === undefined) {
        return undefined;
      }
      const crossing = tangentsIntersection(
        lineOf(run, end),
        lineOf(partner, end === "top" ? "bottom" : "top"),
      );
      return crossing === undefined ? undefined : at(...crossing);
    };

    const keepsAngle = run.tip !== "halfTread";
    const tipAt = (end: "bottom" | "top") =>
      keepsAngle ? (crossingWith(end) ?? reversalWith(end)) : undefined;
    const { edgeShift } = run;
    const lineHead =
      tipAt("top") ??
      at(first.edge - stepDir * first.topReach + edgeShift, first.along);
    const lineTail =
      tipAt("bottom") ??
      at(
        last.edge + stepDir * last.bottomReach + edgeShift,
        last.along + last.height,
      );

    /**
     * A run steeper than 45 degrees whose edge continues as a 45 degree run
     * is not drawn as a line at all, but as one quadratic between the
     * straight pieces either side of it: tangent to the neighbouring 45
     * degree line at one end, and at the other to the straight edge it leaves
     * from - the junction column where it abuts one, or the vertical through
     * its own outer corner where the edge simply stops. The control point is
     * the tangents' crossing, so a shield's side leaves its vertical, sweeps
     * one curve, and arrives on the 45 degree line into the bottom point.
     */
    const curveReplacement = (): PixelPoint[] | undefined => {
      if (first.height === 1) {
        return undefined;
      }
      const above = fortyFiveNeighbour(run, runs, "above");
      const below = fortyFiveNeighbour(run, runs, "below");
      if (above === undefined && below === undefined) {
        return undefined;
      }
      const aboveTangent = (): Tangent => {
        if (corner !== undefined) {
          // swallowing the 45 degree run puts the curve's end on the corner
          // past it, still tangent to the angle those steps were cut at
          return { edge0: corner.edge, along0: corner.along, slope: stepDir };
        }
        if (above !== undefined) {
          const nLast = above.treads[above.treads.length - 1];
          return {
            edge0: nLast.edge + stepDir * nLast.bottomReach,
            along0: first.along,
            slope: stepDir,
          };
        }
        return {
          edge0: first.edge - stepDir * (first.topReach === 1 ? 1 : 0),
          along0: first.along,
          slope: 0,
        };
      };
      const belowTangent = (): Tangent => {
        if (below !== undefined) {
          const [nFirst] = below.treads;
          return {
            edge0: nFirst.edge - stepDir * nFirst.topReach,
            along0: nFirst.along,
            slope: stepDir,
          };
        }
        return {
          edge0: last.edge + stepDir * (last.bottomReach === 1 ? 1 : 0),
          along0: last.along + last.height,
          slope: 0,
        };
      };
      const top = aboveTangent();
      const bottom = belowTangent();
      const crossing = tangentsIntersection(top, bottom);
      if (crossing === undefined) {
        return undefined;
      }
      const [controlEdge, controlAlong] = crossing;
      // each tangent is anchored where the curve is to meet it, so its own
      // along is where that end of the curve sits
      const [endX, endY] = at(top.edge0, top.along0);
      const [startX, startY] = at(bottom.edge0, bottom.along0);
      return [
        [endX, endY],
        [...at(controlEdge, controlAlong), 0] as PixelPoint,
        [startX, startY],
      ];
    };

    const isAt = (point: PixelPoint, [atX, atY]: PixelPoint) =>
      point.length === 2 && point[0] === atX && point[1] === atY;
    // the outline may be walked either way round, and the run may straddle the
    // point the walk happened to start from
    const startsAt = (from: number, walk: PixelPoint[]): boolean =>
      walk.every((point, step) =>
        isAt(loop[(from + step) % loop.length], point),
      );
    const forwards = loop.findIndex((_, from) => startsAt(from, zigzag));
    const backwards =
      forwards === -1 ?
        loop.findIndex((_, from) => startsAt(from, [...zigzag].reverse()))
      : -1;
    const from = forwards === -1 ? backwards : forwards;
    if (from === -1) {
      continue;
    }
    const replacement = curveReplacement() ?? [lineHead, lineTail];
    splices.push({
      from,
      length: zigzag.length,
      points: forwards === -1 ? [...replacement].reverse() : replacement,
    });
  }
  return spliced(loop, splices);
};
