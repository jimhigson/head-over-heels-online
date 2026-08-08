import { type UnionOfAllItemInPlayTypes } from "../../../../model/ItemInPlay";
import { epsilon } from "../../../../utils/epsilon";
import { type XyzBox } from "../../../../utils/vectors/vectors";
import { type CollideableItem } from "../../../collision/aabbCollision";

/**
 * a coverer that may carry a shadowOffset - its footprint for coverage is its position
 * shifted by the xy part of that offset (where its shadow falls). castsWholeShadows marks
 * which casters are eligible to wholly shadow an item beneath them.
 */
export type Caster = Pick<
  UnionOfAllItemInPlayTypes,
  "castsWholeShadows" | "id" | "shadowOffset"
> & {
  state: { box: Readonly<XyzBox> };
};

// scratch reused across calls to avoid per-frame allocation in the render loop. Safe as
// module state because these functions are only ever called synchronously and reset their
// scratch at the start of each call (no reentrancy):
const xEdges: number[] = [];
const yEdges: number[] = [];
const ascending = (a: number, b: number) => a - b;
const wholeShadowCasterPool: Caster[] = [];

// a coverer must overhang the target on at least this many sides to count as a genuine
// overhang rather than an item flush inside a same-level wall/stack:
const minOverhangSides = 2;

/**
 * true iff the union of `coverers[0..count)`'s xy footprints fully covers `target`'s, and
 * the target is overhung (some coverer's edge extends beyond the target's) on at least
 * {@link minOverhangSides} of its four sides. The overhang requirement distinguishes a
 * genuine overhang from an item flush inside a same-level wall/stack, which should not count.
 *
 * Works by coordinate compression: the coverers' clipped edges partition the target into
 * cells that are each wholly covered or wholly uncovered by any one coverer, so coverage is
 * decided by testing each cell's midpoint. Coverer counts are tiny in practice, so the
 * O(cells × coverers) scan is cheap; the design optimises for zero per-call allocation.
 */
const unionOfFootprintsCoversTarget = (
  target: CollideableItem,
  coverers: readonly Caster[],
  count: number,
): boolean => {
  const targetMinX = target.state.box.x;
  const targetMinY = target.state.box.y;
  const targetMaxX = targetMinX + target.state.box.xd;
  const targetMaxY = targetMinY + target.state.box.yd;

  xEdges.length = 0;
  yEdges.length = 0;
  xEdges.push(targetMinX, targetMaxX);
  yEdges.push(targetMinY, targetMaxY);

  let overhangsLeft = false;
  let overhangsRight = false;
  let overhangsNear = false;
  let overhangsFar = false;
  let anyOverlap = false;

  for (let i = 0; i < count; i++) {
    const coverer = coverers[i];
    // the coverer's footprint falls where its shadow does - its position shifted by the xy
    // part of its shadowOffset:
    const covererMinX = coverer.state.box.x + (coverer.shadowOffset?.x ?? 0);
    const covererMinY = coverer.state.box.y + (coverer.shadowOffset?.y ?? 0);
    const covererMaxX = covererMinX + coverer.state.box.xd;
    const covererMaxY = covererMinY + coverer.state.box.yd;

    // only the part of the coverer within the target contributes to covering it:
    const clippedMinX = Math.max(covererMinX, targetMinX);
    const clippedMaxX = Math.min(covererMaxX, targetMaxX);
    const clippedMinY = Math.max(covererMinY, targetMinY);
    const clippedMaxY = Math.min(covererMaxY, targetMaxY);

    if (
      clippedMaxX - clippedMinX <= epsilon ||
      clippedMaxY - clippedMinY <= epsilon
    ) {
      // does not overlap the target's interior, so contributes nothing
      continue;
    }
    anyOverlap = true;

    if (covererMinX < targetMinX - epsilon) {
      overhangsLeft = true;
    }
    if (covererMaxX > targetMaxX + epsilon) {
      overhangsRight = true;
    }
    if (covererMinY < targetMinY - epsilon) {
      overhangsNear = true;
    }
    if (covererMaxY > targetMaxY + epsilon) {
      overhangsFar = true;
    }

    xEdges.push(clippedMinX, clippedMaxX);
    yEdges.push(clippedMinY, clippedMaxY);
  }

  if (!anyOverlap) {
    return false;
  }

  const overhangSides =
    (overhangsLeft ? 1 : 0) +
    (overhangsRight ? 1 : 0) +
    (overhangsNear ? 1 : 0) +
    (overhangsFar ? 1 : 0);
  if (overhangSides < minOverhangSides) {
    return false;
  }

  xEdges.sort(ascending);
  yEdges.sort(ascending);

  // every cell between consecutive edges must be covered by some coverer:
  for (let i = 0; i < xEdges.length - 1; i++) {
    const cellMinX = xEdges[i];
    const cellMaxX = xEdges[i + 1];
    if (cellMaxX - cellMinX <= epsilon) {
      continue;
    }
    const midX = (cellMinX + cellMaxX) / 2;

    for (let j = 0; j < yEdges.length - 1; j++) {
      const cellMinY = yEdges[j];
      const cellMaxY = yEdges[j + 1];
      if (cellMaxY - cellMinY <= epsilon) {
        continue;
      }
      const midY = (cellMinY + cellMaxY) / 2;

      let covered = false;
      for (let k = 0; k < count; k++) {
        const coverer = coverers[k];
        const covererMinX =
          coverer.state.box.x + (coverer.shadowOffset?.x ?? 0);
        const covererMinY =
          coverer.state.box.y + (coverer.shadowOffset?.y ?? 0);
        if (
          midX > covererMinX &&
          midX < covererMinX + coverer.state.box.xd &&
          midY > covererMinY &&
          midY < covererMinY + coverer.state.box.yd
        ) {
          covered = true;
          break;
        }
      }
      if (!covered) {
        return false;
      }
    }
  }

  return true;
};

/**
 * true iff the whole-shadow casters among `castersAbove` (those with castsWholeShadows)
 * together cover `receiver`'s footprint and overhang it on enough sides - ie the receiver is
 * wholly within their shadow and should be tinted as such. Non-whole-shadow casters are
 * ignored.
 */
export const wholeShadowCastersCoverReceiver = (
  castersAbove: Iterable<Caster>,
  receiver: CollideableItem,
): boolean => {
  let count = 0;
  for (const caster of castersAbove) {
    if (caster.castsWholeShadows === true) {
      wholeShadowCasterPool[count] = caster;
      count++;
    }
  }

  const result =
    count > 0 &&
    unionOfFootprintsCoversTarget(receiver, wholeShadowCasterPool, count);

  // free memory retainers on items:
  wholeShadowCasterPool.length = 0;

  return result;
};
