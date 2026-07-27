import { expect, test } from "vitest";

import { quarterCameraAngles } from "../../../utils/vectors/cameraAngleVectors";
import { type Xy, type Xyz } from "../../../utils/vectors/vectors";
import { type RenderBoxes } from "../renderBox/makeItemRenderBoxAtCameraAngle";
import { geometryAngleAtQuarterOffset } from "./__test__/geometryAngleAtQuarterOffset";
import { makeLcg } from "./__test__/makeLcg";
import { populatedBroadPhase } from "./__test__/populatedBroadPhase";
import { shapes } from "./__test__/shapes";
import { type DrawOrderComparable } from "./DrawOrderComparable";
import { projectAabbAxes } from "./projectAabbCorners";
import {
  NO_OVERLAP,
  OVERLAP,
  visuallyOverlaps,
  type VisuallyOverlapsReturn,
} from "./visuallyOverlaps";
import { zComparator } from "./zComparator";
import {
  zComparatorOfVisuallyOverlapping,
  zComparatorOfVisuallyOverlappingByMtv,
} from "./zComparatorOfVisuallyOverlapping";

/**
 * pins the draw-order geometry DECISIONS at the four quarter camera angles
 * over a large randomised set of box pairs, so the geometry kernel can be
 * generalised to continuous angles with proof that nothing changes at the
 * angles the game settles at.
 *
 * decisions are pinned, not raw projection values: the per-axis projection
 * intervals (and which slot/sign a world family lands in) legitimately change
 * representation when the kernel generalises, so the snapshots record only
 * what the renderer acts on:
 *
 * - the visuallyOverlaps class collapsed to overlap/adjacent/none. The
 *   ADJACENT_X/ADJACENT_Y sub-label names the gapped axis in the current
 *   labelling scheme (which swaps at odd quarter turns when families become
 *   world-labelled), so the sub-label is representation, not a decision -
 *   the decision it feeds is the zComparator sign, pinned below
 * - the sign of zComparator (through a populated DrawOrderBroadPhase, physical boxes)
 * - the zComparatorOfVisuallyOverlapping tri-state (1 / -1 / 2-undecided)
 * - the zComparatorOfVisuallyOverlappingByMtv value
 *
 * the generated pair geometry is snapshotted too, so any drift in the
 * generator is caught directly rather than silently re-pinning different
 * inputs.
 */

/**
 * gaps for face-abutting pairs: touching, small, and clearly separated (the
 * projected hexagons still overlap for all of these - abutting faces share a
 * visible face region - so these pin the fine x/y ordering rules)
 */
const faceGaps = [0, 0.05, 0.2];
/**
 * gaps applied on BOTH axes of a diagonal seam, so the projected gap on the
 * seam's family axis is twice this: 0 pins exact adjacency, 0.02 (projected
 * 0.04) is comfortably inside the 0.1px adjacency tolerance, 0.2 (projected
 * 0.4) comfortably outside - chosen away from the floating-point knife edge
 * at exactly 0.1
 */
const seamGaps = [0, 0.02, 0.2];

const categoryNames = [
  "overlapping",
  "face-abut-x",
  "face-abut-y",
  "stacked",
  "inside",
  "disjoint",
  "seam-x-run",
  "seam-y-run",
  "random",
];

type PinnedPair = {
  pairId: string;
  category: string;
  a: DrawOrderComparable;
  b: DrawOrderComparable;
};

const makePairs = (pairCount: number): PinnedPair[] => {
  const random = makeLcg(1);
  const pairs: PinnedPair[] = [];

  for (let i = 0; i < pairCount; i++) {
    const category = i % categoryNames.length;
    const aShape = shapes[i % shapes.length];
    const bShapeRaw = shapes[Math.floor(random() * shapes.length)];

    // positions strictly positive and grid-ish with continuous jitter mixed in
    const aPos: Xyz = {
      x: 1 + Math.floor(random() * 8) * 16,
      y: 1 + Math.floor(random() * 8) * 16,
      z: 1 + Math.floor(random() * 3) * 16,
    };

    let bPos: Xyz;
    let bShape: Xyz = bShapeRaw;

    switch (category) {
      case 0: {
        // overlapping in 3d - fine comparator often undecided, mtv decides
        bPos = {
          x: aPos.x + (0.2 + random() * 0.5) * aShape.x,
          y: aPos.y + (0.2 + random() * 0.5) * aShape.y,
          z: aPos.z + (0.2 + random() * 0.5) * aShape.z,
        };
        break;
      }
      case 1: {
        // abutting a's +x face (visually overlapping via the shared face)
        const gap = faceGaps[Math.floor(random() * faceGaps.length)];
        bPos = {
          x: aPos.x + aShape.x + gap,
          y: aPos.y + (random() - 0.5) * 8,
          z: aPos.z + (random() - 0.5) * 8,
        };
        break;
      }
      case 2: {
        // abutting a's +y face
        const gap = faceGaps[Math.floor(random() * faceGaps.length)];
        bPos = {
          x: aPos.x + (random() - 0.5) * 8,
          y: aPos.y + aShape.y + gap,
          z: aPos.z + (random() - 0.5) * 8,
        };
        break;
      }
      case 3: {
        // stacked on top (pins the fine z rule)
        const gap = faceGaps[Math.floor(random() * faceGaps.length)];
        bPos = {
          x: aPos.x + (random() - 0.5) * 8,
          y: aPos.y + (random() - 0.5) * 8,
          z: aPos.z + aShape.z + gap,
        };
        break;
      }
      case 4: {
        // strictly inside a (fine comparator undecided, mtv decides)
        bPos = {
          x: aPos.x + 0.3 * aShape.x,
          y: aPos.y + 0.3 * aShape.y,
          z: aPos.z + 0.3 * aShape.z,
        };
        bShape = {
          x: aShape.x * 0.4,
          y: aShape.y * 0.4,
          z: aShape.z * 0.4,
        };
        break;
      }
      case 5: {
        // far apart - no overlap anywhere
        bPos = {
          x: aPos.x + 200 + random() * 100,
          y: aPos.y + 200 + random() * 100,
          z: 1 + random() * 64,
        };
        break;
      }
      case 6: {
        // diagonal seam running in world-x: b behind-and-above a, meeting
        // along the projected edge (the wall-along-floor case)
        const gap = seamGaps[Math.floor(random() * seamGaps.length)];
        bPos = {
          x: aPos.x + random() * 0.5 * aShape.x,
          y: aPos.y + aShape.y + gap,
          z: aPos.z + aShape.z + gap,
        };
        break;
      }
      case 7: {
        // diagonal seam running in world-y
        const gap = seamGaps[Math.floor(random() * seamGaps.length)];
        bPos = {
          x: aPos.x + aShape.x + gap,
          y: aPos.y + random() * 0.5 * aShape.y,
          z: aPos.z + aShape.z + gap,
        };
        break;
      }
      default: {
        // anywhere in the room volume
        bPos = {
          x: 1 + random() * 256,
          y: 1 + random() * 256,
          z: 1 + random() * 96,
        };
        break;
      }
    }

    pairs.push({
      pairId: `#${String(i).padStart(3, "0")}`,
      category: categoryNames[category],
      a: {
        id: `a${i}`,
        state: { position: aPos },
        aabb: aShape,
      },
      b: {
        id: `b${i}`,
        state: { position: bPos },
        aabb: bShape,
      },
    });
  }
  return pairs;
};

const pairs = makePairs(324);

const fmtXyz = ({ x, y, z }: Xyz) => `(${x},${y},${z})`;

const collapseOverlapClass = (
  classification: VisuallyOverlapsReturn,
): "adjacent" | "none" | "overlap" =>
  classification === OVERLAP ? "overlap"
  : classification === NO_OVERLAP ? "none"
  : "adjacent";

const decisionLine = (
  { pairId, a, b }: PinnedPair,
  cameraAngle: Xy,
): string => {
  const aProj = projectAabbAxes({}, a.state.position, a.aabb, cameraAngle);
  const bProj = projectAabbAxes({}, b.state.position, b.aabb, cameraAngle);
  const overlapClass = collapseOverlapClass(visuallyOverlaps(aProj, bProj));

  const renderBoxes: RenderBoxes<DrawOrderComparable> = new Map();
  const broadPhase = populatedBroadPhase(
    new Set([a, b]),
    renderBoxes,
    cameraAngle,
  );
  const cmpSign = Math.sign(zComparator(a, b, broadPhase, renderBoxes));

  const fine = zComparatorOfVisuallyOverlapping(
    a.state.position,
    a.aabb,
    b.state.position,
    b.aabb,
    cameraAngle,
  );
  const mtv = zComparatorOfVisuallyOverlappingByMtv(
    a.state.position,
    a.aabb,
    b.state.position,
    b.aabb,
    cameraAngle,
  );

  return `${pairId} class=${overlapClass} cmp=${cmpSign} fine=${fine} mtv=${mtv}`;
};

test("generated pair geometry is stable", () => {
  expect(
    pairs
      .map(
        ({ pairId, category, a, b }) =>
          `${pairId} ${category} a@${fmtXyz(a.state.position)}+${fmtXyz(a.aabb)} b@${fmtXyz(b.state.position)}+${fmtXyz(b.aabb)}`,
      )
      .join("\n"),
  ).toMatchSnapshot();
});

test.for(quarterCameraAngles)(
  "pinned draw-order decisions at camera angle ($x,$y)",
  (cameraAngle) => {
    expect(
      pairs.map((pair) => decisionLine(pair, cameraAngle)).join("\n"),
    ).toMatchSnapshot();
  },
);

/**
 * categories whose front/back order is fixed by a genuine world-axis
 * separation (an abutting face, a stacked z gap, a diagonal seam, or full
 * disjointness), so it must NOT change as the camera rotates within a quarter.
 * The overlapping / inside / random categories are decided by the MTV rung,
 * which legitimately flips mid-turn (see sweptAngleEdgeFlip), so they are
 * excluded.
 */
const angleInvariantCategories = new Set([
  "face-abut-x",
  "face-abut-y",
  "stacked",
  "disjoint",
  "seam-x-run",
  "seam-y-run",
]);

const cmpSignAt = (
  { a, b }: PinnedPair,
  quarterAngle: Xy,
  geometryAngle: Xy,
) => {
  const renderBoxes: RenderBoxes<DrawOrderComparable> = new Map();
  const broadPhase = populatedBroadPhase(
    new Set([a, b]),
    renderBoxes,
    quarterAngle,
    geometryAngle,
  );
  return Math.sign(zComparator(a, b, broadPhase, renderBoxes));
};

/**
 * mid-transition invariance: with participation quantised to the quarter but
 * the draw-order geometry projected ±20° into the turn, an axis-separated
 * pair's front/back order must not REVERSE. A genuine +1<->-1 flip is the
 * stale mid-rotation ordering bug - eg a wall seam that inverts against the
 * floor it abuts once the angle leaves the exact quarter (the thin seam line
 * Jim spotted). A pair may drop to or rise from 0 (unordered) as its projected
 * seam shrinks to a point or its silhouettes part off-quarter: point contact
 * carries no occlusion area, so that boundary has no visible order to keep -
 * only a sign reversal is a defect.
 */
test.for(quarterCameraAngles)(
  "axis-separated pairs never reverse front/back ±20° off the quarter ($x,$y)",
  (quarterAngle) => {
    const offenders: string[] = [];
    for (const pair of pairs) {
      if (!angleInvariantCategories.has(pair.category)) {
        continue;
      }
      const settledSign = cmpSignAt(pair, quarterAngle, quarterAngle);
      for (const offsetDegrees of [20, -20]) {
        const offSign = cmpSignAt(
          pair,
          quarterAngle,
          geometryAngleAtQuarterOffset(quarterAngle, offsetDegrees),
        );
        if (settledSign !== 0 && offSign !== 0 && settledSign !== offSign) {
          offenders.push(
            `${pair.pairId} ${pair.category} settled=${settledSign} ${offsetDegrees > 0 ? "+" : ""}${offsetDegrees}°=${offSign}`,
          );
        }
      }
    }
    expect(offenders).toEqual([]);
  },
);
