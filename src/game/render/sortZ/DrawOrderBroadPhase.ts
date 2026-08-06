import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import { type Xy, type Xyz } from "../../../utils/vectors/vectors";
import { type Indexable } from "../../physics/gridSpace/SpatialIndex";
import {
  type RenderBox,
  type RenderBoxableItem,
  type RenderBoxes,
} from "../renderBox/makeItemRenderBoxAtCameraAngle";
import { participatesInDrawOrder } from "./fixedZIndexes";
import { projectAabbAxes, type ProjectionOnAxes } from "./projectAabbCorners";

// reused scratch for the render-box world position (render offset applied), to
// avoid a per-item allocation each frame. Only one item is projected at a time
// (single-threaded), so module-level is safe.
const renderOffsetPos: Xyz = { x: 0, y: 0, z: 0 };

// reused scratch for the physical size triple read out of the item's box when
// it has no render box (same single-threaded safety as above):
const physicalSizeScratch: Xyz = { x: 0, y: 0, z: 0 };

// reused scratch the projection maths writes into before the values land in
// the flat per-item storage:
const projectionScratch = {} as ProjectionOnAxes;

/**
 * the adjacency tolerance the broad phase must include: candidate generation
 * widens intervals by this much so pairs within the fine phase's
 * `visuallyAdjacentMinimumOverlap` (−0.1 px) gap are never missed.
 * Under-return would be a correctness bug; over-return is safe (the fine
 * phase returns 0 and no edge is created)
 */
const adjacencySlackPx = 0.1;

/** flat projection layout: 6 float64 slots per item */
const xMinSlot = 0;
const xMaxSlot = 1;
const yMinSlot = 2;
const yMaxSlot = 3;
const zMinSlot = 4;
const zMaxSlot = 5;

/**
 * Indexes each item by where it draws on screen: an item projects to a hexagon,
 * bounded on three screen axes (the world-x, world-y and world-z direction
 * families). Two hexagons overlap only if they overlap on all three.
 *
 * Broad phase: sweep-and-prune on the z-family axis (the screen-x silhouette) -
 * persistent sorted endpoint arrays fixed up by insertion sort each frame
 * (O(n + swaps) under coherent motion, which covers both settled play and
 * camera turns), with candidates filtered immediately by the other two family
 * intervals. All three filters are widened by the 0.1 px adjacency tolerance.
 * Surviving pairs land in a pooled pair buffer, served to the consumer (the
 * z-edge rebuild) via {@link forEachCandidatePair} - each pair exactly once.
 *
 * All storage is flat and persistent (dense item array, Float64Array
 * projections at 6 values per item, Int32Array endpoints/active-set/pairs),
 * growing by doubling and never shrinking - the per-frame path allocates
 * nothing. Projections are re-derived for every item on every
 * {@link updateManyItems} call, unconditionally, at the continuous geometry
 * angle - there is no moved-tracking in the projection path.
 */
export class DrawOrderBroadPhase<
  Item extends RenderBoxableItem & Indexable = UnionOfAllItemInPlayTypes,
> {
  /**
   * the quarter angle governing draw-order participation (hidden walls,
   * fixed-z items). Changed via {@link setQuarterAngle} at the turn's
   * midpoint flip, so the persistent buffers survive it
   */
  #quarterAngle: Xy;

  /**
   * the continuous render angle θ that projections are currently computed
   * for; follows the angle passed to {@link updateManyItems} each tick. The
   * same object is mutated in place (no per-frame allocation), so consumers
   * must read it synchronously and never store it
   */
  #geometryAngle: Xy;

  /** participating items, dense, in the caller's (room) iteration order */
  #items: Item[] = [];
  /** reverse lookup into {@link #items}; rebuilt only when membership changes */
  #itemIndex = new Map<Item, number>();

  /** 6 slots per item: x/y/z-family interval min/max (exact, unwidened) */
  #projections = new Float64Array(0);

  /**
   * sweep endpoints on the z-family axis, 2 per item: a min endpoint holds
   * the exact interval min, a max endpoint the max plus the adjacency slack
   * (single-sided widening ⇒ pairs within the 0.1 px gap stay candidates).
   * `#endpointValues` and `#endpointMeta` are parallel; meta packs
   * `(denseIndex << 1) | isMax`. The arrays keep their sorted permutation
   * across frames; values are refreshed then fixed up by insertion sort
   */
  #endpointValues = new Float64Array(0);
  #endpointMeta = new Int32Array(0);

  /** sweep active set: a stack of dense indices with swap-removal ... */
  #active = new Int32Array(0);
  /** ... and each dense index's position in it, valid while it is active */
  #activePos = new Int32Array(0);

  /** candidate pairs from the sweep, 2 slots per pair, doubling growth */
  #pairs = new Int32Array(256);
  #pairCount = 0;

  /**
   * two-slot ring served by {@link getItemAxesProjections} - lets a caller
   * hold projections for a pair (as the z-comparator does) without any
   * per-call allocation. A returned object is only valid until the
   * next-but-one call
   */
  #projectionReadScratch: [ProjectionOnAxes, ProjectionOnAxes] = [
    {} as ProjectionOnAxes,
    {} as ProjectionOnAxes,
  ];
  #projectionReadRing = 0;

  constructor(quarterAngle: Xy) {
    this.#quarterAngle = quarterAngle;
    // no geometry has been derived yet: NaN can never equal a render angle,
    // so a fresh broad phase always reads as geometry-stale and the first
    // tick re-derives every projection (the angle is written by
    // updateManyItems):
    this.#geometryAngle = { x: NaN, y: NaN };
  }

  get geometryAngle(): Xy {
    return this.#geometryAngle;
  }

  get quarterAngle(): Xy {
    return this.#quarterAngle;
  }

  /**
   * switch which quarter angle decides draw-order participation. No explicit
   * invalidation is needed: {@link updateManyItems} evaluates participation
   * afresh every call, so any item that starts or stops participating at the
   * new angle is picked up by its membership check
   */
  setQuarterAngle(quarterAngle: Xy): void {
    this.#quarterAngle = quarterAngle;
  }

  /** grow the flat buffers (doubling, never shrinking) to hold `n` items */
  #ensureCapacity(n: number): void {
    if (this.#projections.length >= n * 6) {
      return;
    }
    let capacity = Math.max(16, this.#projections.length / 6);
    while (capacity < n) {
      capacity *= 2;
    }
    this.#projections = new Float64Array(capacity * 6);
    this.#endpointValues = new Float64Array(capacity * 2);
    this.#endpointMeta = new Int32Array(capacity * 2);
    this.#active = new Int32Array(capacity);
    this.#activePos = new Int32Array(capacity);
  }

  #growPairs(): void {
    const grown = new Int32Array(this.#pairs.length * 2);
    grown.set(this.#pairs);
    this.#pairs = grown;
  }

  /**
   * rebuild the dense item array and reverse lookup from the caller's item
   * set (participating items only, in the set's iteration order), and reset
   * the endpoint permutation. Runs only when membership changed
   */
  #rebuildMembership(items: ReadonlySet<Item>): void {
    this.#itemIndex.clear();
    this.#items.length = 0;
    for (const item of items) {
      if (!participatesInDrawOrder(item, this.#quarterAngle)) {
        // fixed-z items (including hidden walls, which have very tall physical
        // colliders) are never draw-order sorted - keeping them out of the
        // index entirely means neighbourhoods stay clean:
        continue;
      }
      this.#itemIndex.set(item, this.#items.length);
      this.#items.push(item);
    }
    const n = this.#items.length;
    this.#ensureCapacity(n);
    for (let i = 0; i < n; i++) {
      this.#endpointMeta[2 * i] = i << 1;
      this.#endpointMeta[2 * i + 1] = (i << 1) | 1;
    }
  }

  /** project one item's render box into its flat slots at the geometry angle */
  #projectItem(i: number, renderBox: RenderBox | undefined): void {
    const item = this.#items[i];
    const { box } = item.state;
    const offset = renderBox?.renderAabbOffset;
    let worldPos: Xyz;
    if (offset === undefined) {
      worldPos = box;
    } else {
      renderOffsetPos.x = box.x + offset.x;
      renderOffsetPos.y = box.y + offset.y;
      renderOffsetPos.z = box.z + offset.z;
      worldPos = renderOffsetPos;
    }
    let bb = renderBox?.renderAabb;
    if (bb === undefined) {
      physicalSizeScratch.x = box.xd;
      physicalSizeScratch.y = box.yd;
      physicalSizeScratch.z = box.zd;
      bb = physicalSizeScratch;
    }

    projectAabbAxes(projectionScratch, worldPos, bb, this.#geometryAngle);
    const o = i * 6;
    const p = this.#projections;
    p[o + xMinSlot] = projectionScratch.xAxisProjectionMin;
    p[o + xMaxSlot] = projectionScratch.xAxisProjectionMax;
    p[o + yMinSlot] = projectionScratch.yAxisProjectionMin;
    p[o + yMaxSlot] = projectionScratch.yAxisProjectionMax;
    p[o + zMinSlot] = projectionScratch.zAxisProjectionMin;
    p[o + zMaxSlot] = projectionScratch.zAxisProjectionMax;
  }

  /**
   * endpoint ordering: ascending value, and at equal values min endpoints
   * before max endpoints, so intervals touching exactly at the widened
   * boundary still count as overlapping (the tolerance is inclusive)
   */
  #endpointBefore(
    valueA: number,
    metaA: number,
    valueB: number,
    metaB: number,
  ): boolean {
    return valueA < valueB || (valueA === valueB && (metaA & 1) < (metaB & 1));
  }

  /**
   * per-frame endpoint fix-up: nearly sorted already under coherent motion.
   * Stable (shifts only while the inserted element sorts strictly before),
   * so runs of equal keys keep their permutation and cost nothing per frame
   */
  #insertionSortEndpoints(m: number): void {
    const values = this.#endpointValues;
    const metas = this.#endpointMeta;
    for (let k = 1; k < m; k++) {
      const value = values[k];
      const meta = metas[k];
      let j = k - 1;
      while (j >= 0 && this.#endpointBefore(value, meta, values[j], metas[j])) {
        values[j + 1] = values[j];
        metas[j + 1] = metas[j];
        j--;
      }
      values[j + 1] = value;
      metas[j + 1] = meta;
    }
  }

  /**
   * full endpoint sort for membership changes (the permutation was reset, so
   * the array is far from sorted): in-place heapsort over the parallel
   * arrays - O(m log m), no allocation, no recursion
   */
  #heapsortEndpoints(m: number): void {
    const values = this.#endpointValues;
    const metas = this.#endpointMeta;
    const siftDown = (start: number, end: number) => {
      let root = start;
      for (;;) {
        let child = 2 * root + 1;
        if (child > end) {
          return;
        }
        if (
          child + 1 <= end &&
          this.#endpointBefore(
            values[child],
            metas[child],
            values[child + 1],
            metas[child + 1],
          )
        ) {
          child++;
        }
        if (
          this.#endpointBefore(
            values[root],
            metas[root],
            values[child],
            metas[child],
          )
        ) {
          const swapValue = values[root];
          values[root] = values[child];
          values[child] = swapValue;
          const swapMeta = metas[root];
          metas[root] = metas[child];
          metas[child] = swapMeta;
          root = child;
        } else {
          return;
        }
      }
    };
    for (let start = (m - 2) >> 1; start >= 0; start--) {
      siftDown(start, m - 1);
    }
    for (let end = m - 1; end > 0; end--) {
      const [swapValue] = values;
      values[0] = values[end];
      values[end] = swapValue;
      const [swapMeta] = metas;
      metas[0] = metas[end];
      metas[end] = swapMeta;
      siftDown(0, end - 1);
    }
  }

  /**
   * Bring the broad phase up to date:
   *  * reconcile membership (dense arrays rebuilt only when it changed)
   *  * re-derive EVERY item's projection at the geometry angle
   *  * refresh + fix up the sweep endpoints
   *  * sweep once, filling the pooled candidate-pair buffer
   */
  updateManyItems(
    items: ReadonlySet<Item>,
    /** the drawn extents, owned by the caller (in-game, the room renderer) */
    renderBoxes: RenderBoxes<Item>,
    /**
     * the continuous render angle θ to project at: the settled quarter
     * vector in normal play, the swept θ(t) during a camera transition
     */
    geometryAngle: Xy,
  ): void {
    this.#geometryAngle.x = geometryAngle.x;
    this.#geometryAngle.y = geometryAngle.y;

    // membership: count the participating items and detect any difference
    // from the dense array
    let participatingCount = 0;
    let membershipChanged = false;
    for (const item of items) {
      if (!participatesInDrawOrder(item, this.#quarterAngle)) {
        continue;
      }
      participatingCount++;
      if (!membershipChanged && this.#itemIndex.get(item) === undefined) {
        membershipChanged = true;
      }
    }
    if (participatingCount !== this.#items.length) {
      membershipChanged = true;
    }
    if (membershipChanged) {
      this.#rebuildMembership(items);
    }

    const n = this.#items.length;
    const p = this.#projections;

    // projections: every item, every call, at the current geometry angle:
    for (let i = 0; i < n; i++) {
      this.#projectItem(i, renderBoxes.get(this.#items[i]));
    }

    // refresh endpoint values in their current (near-sorted) permutation:
    const values = this.#endpointValues;
    const metas = this.#endpointMeta;
    const m = 2 * n;
    for (let e = 0; e < m; e++) {
      const meta = metas[e];
      const i = meta >> 1;
      values[e] =
        (meta & 1) === 1 ?
          p[i * 6 + zMaxSlot] + adjacencySlackPx
        : p[i * 6 + zMinSlot];
    }
    if (membershipChanged) {
      this.#heapsortEndpoints(m);
    } else {
      this.#insertionSortEndpoints(m);
    }

    this.#sweep(n);
  }

  /** one sweep over the sorted endpoints → the frame's candidate pairs */
  #sweep(n: number): void {
    const p = this.#projections;
    const metas = this.#endpointMeta;
    const active = this.#active;
    const activePos = this.#activePos;
    const m = 2 * n;

    let activeCount = 0;
    this.#pairCount = 0;

    for (let e = 0; e < m; e++) {
      const meta = metas[e];
      const i = meta >> 1;
      if ((meta & 1) === 0) {
        // a min endpoint: i overlaps every active item on the (widened) sweep
        // axis; filter immediately by the other two family intervals (both
        // widened by the adjacency slack):
        const iBase = i * 6;
        const ixMin = p[iBase + xMinSlot];
        const ixMax = p[iBase + xMaxSlot];
        const iyMin = p[iBase + yMinSlot];
        const iyMax = p[iBase + yMaxSlot];
        for (let a = 0; a < activeCount; a++) {
          const j = active[a];
          const jBase = j * 6;
          if (
            ixMin <= p[jBase + xMaxSlot] + adjacencySlackPx &&
            p[jBase + xMinSlot] <= ixMax + adjacencySlackPx &&
            iyMin <= p[jBase + yMaxSlot] + adjacencySlackPx &&
            p[jBase + yMinSlot] <= iyMax + adjacencySlackPx
          ) {
            if (this.#pairCount * 2 + 2 > this.#pairs.length) {
              this.#growPairs();
            }
            this.#pairs[this.#pairCount * 2] = i;
            this.#pairs[this.#pairCount * 2 + 1] = j;
            this.#pairCount++;
          }
        }
        activePos[i] = activeCount;
        active[activeCount++] = i;
      } else {
        // a max endpoint: swap-remove i from the active set
        const pos = activePos[i];
        const last = active[--activeCount];
        active[pos] = last;
        activePos[last] = pos;
      }
    }
  }

  /**
   * iterate the current frame's broad-phase candidate pairs - every pair of
   * items whose projected hexagons overlap (or are within the adjacency
   * tolerance) on all three family axes. Each unordered pair is given
   * EXACTLY ONCE, in the sweep's deterministic discovery order.
   * Allocation-free. Requires the broad phase to be up to date
   * ({@link updateManyItems})
   */
  forEachCandidatePair(cb: (a: Item, b: Item) => void): void {
    const pairs = this.#pairs;
    const items = this.#items;
    const pairCount = this.#pairCount;
    for (let k = 0; k < pairCount; k++) {
      cb(items[pairs[2 * k]], items[pairs[2 * k + 1]]);
    }
  }

  /**
   * Get the axes projections for a participating item. Returns undefined if
   * the item does not participate in the draw order.
   *
   * The returned object is served from a two-slot ring (no per-call
   * allocation): it stays valid until the next-but-one call, which lets a
   * caller hold a pair of projections at once (as the z-comparator does) -
   * anything needing more must copy the values out.
   */
  getItemAxesProjections(item: Item): ProjectionOnAxes | undefined {
    const idx = this.#itemIndex.get(item);
    if (idx === undefined) {
      return undefined;
    }
    const scratch = this.#projectionReadScratch[this.#projectionReadRing];
    this.#projectionReadRing ^= 1;
    const o = idx * 6;
    const p = this.#projections;
    scratch.xAxisProjectionMin = p[o + xMinSlot];
    scratch.xAxisProjectionMax = p[o + xMaxSlot];
    scratch.yAxisProjectionMin = p[o + yMinSlot];
    scratch.yAxisProjectionMax = p[o + yMaxSlot];
    scratch.zAxisProjectionMin = p[o + zMinSlot];
    scratch.zAxisProjectionMax = p[o + zMaxSlot];
    return scratch;
  }
}
