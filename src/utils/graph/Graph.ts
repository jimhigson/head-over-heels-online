// the cycle-breaking log is opt-in at build time via the same flag the
// renderer's cyclic-masking logs use:
const logCycleBreaking = import.meta.env.VITE_LOG_CYCLIC_RENDERING === "true";

/** colour states for the iterative depth-first toposort */
const white = 0;
const grey = 1;
const black = 2;

// SMELL: which edge of a cycle gets broken is whichever one the depth-first walk
// happens to reach last - no attempt is made to choose a good one. A heuristic
// could pick the edge whose front is in the fewest other cycles (ideally none),
// so a node is not both masked and acting as a mask

/**
 * A directed graph held as flat integer-indexed buffers, with a topological
 * sort that breaks any cycles it finds.
 *
 * Nodes are held densely in the order given to {@link beginRebuild}, and every
 * edge is a pair of dense indices. Adjacency is compressed sparse row (row
 * offsets + targets), each row sorted by ascending node index. Since the whole
 * structure is rebuilt with nothing kept from the previous generation, its
 * shape is a pure function of the current nodes and edges - no insertion
 * history can influence the order of unconstrained nodes, nor which edge of a
 * cycle gets broken.
 *
 * All buffers (edge staging, the adjacency, the toposort stacks, the sorted
 * output) are per-instance and reused across rebuilds, growing by doubling and
 * never shrinking, so a steady-state rebuild allocates nothing. That matters
 * for the caller that rebuilds every frame (draw ordering); callers that build
 * once can ignore it.
 *
 * Edges optionally carry an annotation of type `E`. A graph constructed
 * without `annotateEdges` has `E` as `never`, which makes
 * {@link addAnnotatedEdge} impossible to call. Annotations are held in their
 * own array so the un-annotated case costs nothing.
 */
export class Graph<N, E = never> {
  /** whether edges carry annotations - fixed for the graph's life */
  readonly #annotateEdges: boolean;

  /** dense node list; index = the node's integer id within this graph */
  #nodes: N[] = [];
  #nodeIndex = new Map<N, number>();

  /** staged edges as dense-index pairs, before {@link finalise} */
  #edgeFrom = new Int32Array(256);
  #edgeTo = new Int32Array(256);
  /** staged annotations, parallel to the staged edges; empty when un-annotated */
  #edgeAnnotation: E[] = [];
  #edgeCount = 0;

  /** whether the adjacency is up to date with the staged edges */
  #finalised = true;

  /** adjacency: row offsets (nodeCount + 1), then targets and broken flags */
  #offsets = new Int32Array(0);
  #targets = new Int32Array(256);
  /** parallel to {@link #targets}: 1 where the toposort had to break the edge */
  #broken = new Uint8Array(256);
  /** parallel to {@link #targets}; empty when un-annotated */
  #annotations: E[] = [];
  #cursor = new Int32Array(0);

  /** iterative-DFS state: node colouring and the explicit stack frames */
  #colour = new Uint8Array(0);
  #stackNode = new Int32Array(0);
  #stackEdge = new Int32Array(0);
  /** reused toposort output - valid until the next call */
  #sorted: N[] = [];

  constructor(
    /**
     * allocate the per-edge annotation storage. Must be given whenever the
     * `E` type parameter is set, since only then can annotations be written
     */
    annotateEdges: boolean = false,
  ) {
    this.#annotateEdges = annotateEdges;
  }

  get nodeCount(): number {
    return this.#nodes.length;
  }

  /**
   * the graph's nodes in their dense order. The returned array is the live
   * internal one - read it now, do not retain it across a rebuild
   */
  get nodes(): ReadonlyArray<N> {
    return this.#nodes;
  }

  nodeAt(i: number): N {
    return this.#nodes[i];
  }

  /** grow the per-node buffers (doubling, never shrinking) to hold n nodes */
  #ensureNodeCapacity(n: number): void {
    if (this.#offsets.length >= n + 1) {
      return;
    }
    let capacity = Math.max(16, this.#offsets.length - 1);
    while (capacity < n) {
      capacity *= 2;
    }
    this.#offsets = new Int32Array(capacity + 1);
    this.#cursor = new Int32Array(capacity + 1);
    this.#colour = new Uint8Array(capacity);
    this.#stackNode = new Int32Array(capacity);
    this.#stackEdge = new Int32Array(capacity);
  }

  #ensureEdgeCapacity(m: number): void {
    if (this.#edgeFrom.length >= m) {
      return;
    }
    let capacity = this.#edgeFrom.length;
    while (capacity < m) {
      capacity *= 2;
    }
    const grownFrom = new Int32Array(capacity);
    grownFrom.set(this.#edgeFrom);
    this.#edgeFrom = grownFrom;
    const grownTo = new Int32Array(capacity);
    grownTo.set(this.#edgeTo);
    this.#edgeTo = grownTo;
  }

  /**
   * start a rebuild: adopt the nodes, in the iterable's order, and discard all
   * edges. Follow with {@link addEdge} / {@link addAnnotatedEdge} calls
   */
  beginRebuild(nodes: Iterable<N>): void {
    this.#nodes.length = 0;
    this.#nodeIndex.clear();
    for (const node of nodes) {
      this.#nodeIndex.set(node, this.#nodes.length);
      this.#nodes.push(node);
    }
    this.#ensureNodeCapacity(this.#nodes.length);
    this.#edgeCount = 0;
    this.#finalised = false;
  }

  /** empty the graph entirely (no nodes, no edges) */
  clear(): void {
    this.#nodes.length = 0;
    this.#nodeIndex.clear();
    this.#edgeCount = 0;
    this.#edgeAnnotation.length = 0;
    this.#offsets.fill(0);
    this.#finalised = true;
  }

  #stageEdge(from: N, to: N): number {
    const fromIndex = this.#nodeIndex.get(from);
    const toIndex = this.#nodeIndex.get(to);
    if (fromIndex === undefined || toIndex === undefined) {
      throw new Error("addEdge with a node not in the graph");
    }
    const staged = this.#edgeCount;
    this.#ensureEdgeCapacity(staged + 1);
    this.#edgeFrom[staged] = fromIndex;
    this.#edgeTo[staged] = toIndex;
    this.#edgeCount = staged + 1;
    this.#finalised = false;
    return staged;
  }

  /**
   * add a directed edge (both ends must be nodes given to
   * {@link beginRebuild}). Duplicate edges are kept as written - dedupe
   * upstream if the caller needs at most one edge per pair
   */
  addEdge(from: N, to: N): void {
    this.#stageEdge(from, to);
  }

  /** {@link addEdge}, carrying an annotation. Only on an annotating graph */
  addAnnotatedEdge(from: N, to: N, annotation: E): void {
    if (import.meta.env.DEV && !this.#annotateEdges) {
      throw new Error(
        "addAnnotatedEdge on a graph constructed without annotateEdges",
      );
    }
    this.#edgeAnnotation[this.#stageEdge(from, to)] = annotation;
  }

  /** fill the adjacency rows from the staged edges, targets only */
  #fillRows(m: number): void {
    const cursor = this.#cursor;
    const targets = this.#targets;
    for (let e = 0; e < m; e++) {
      targets[cursor[this.#edgeFrom[e]]++] = this.#edgeTo[e];
    }
  }

  /** {@link #fillRows}, carrying each edge's annotation across with it */
  #fillRowsAnnotated(m: number): void {
    const cursor = this.#cursor;
    const targets = this.#targets;
    const annotations = this.#annotations;
    const staged = this.#edgeAnnotation;
    for (let e = 0; e < m; e++) {
      const slot = cursor[this.#edgeFrom[e]]++;
      targets[slot] = this.#edgeTo[e];
      annotations[slot] = staged[e];
    }
  }

  /** insertion-sort each row by ascending target (rows are short) */
  #sortRows(n: number): void {
    const offsets = this.#offsets;
    const targets = this.#targets;
    for (let i = 0; i < n; i++) {
      const rowStart = offsets[i];
      const rowEnd = offsets[i + 1];
      for (let k = rowStart + 1; k < rowEnd; k++) {
        const target = targets[k];
        let j = k - 1;
        while (j >= rowStart && targets[j] > target) {
          targets[j + 1] = targets[j];
          j--;
        }
        targets[j + 1] = target;
      }
    }
  }

  /**
   * {@link #sortRows}, permuting the annotations by the same moves - without
   * this an annotation would end up on whichever edge took its slot
   */
  #sortRowsAnnotated(n: number): void {
    const offsets = this.#offsets;
    const targets = this.#targets;
    const annotations = this.#annotations;
    for (let i = 0; i < n; i++) {
      const rowStart = offsets[i];
      const rowEnd = offsets[i + 1];
      for (let k = rowStart + 1; k < rowEnd; k++) {
        const target = targets[k];
        const annotation = annotations[k];
        let j = k - 1;
        while (j >= rowStart && targets[j] > target) {
          targets[j + 1] = targets[j];
          annotations[j + 1] = annotations[j];
          j--;
        }
        targets[j + 1] = target;
        annotations[j + 1] = annotation;
      }
    }
  }

  /**
   * build the adjacency from the staged edges: counts pass, prefix sum, fill
   * pass, then each row sorted. All broken flags start clear.
   *
   * Called for you by any query - call it directly only to keep the work out
   * of the first query's timing
   */
  finalise(): void {
    const n = this.#nodes.length;
    const m = this.#edgeCount;
    const offsets = this.#offsets;
    const cursor = this.#cursor;

    offsets.fill(0, 0, n + 1);
    for (let e = 0; e < m; e++) {
      offsets[this.#edgeFrom[e] + 1]++;
    }
    for (let i = 0; i < n; i++) {
      offsets[i + 1] += offsets[i];
    }

    if (this.#targets.length < m) {
      let capacity = this.#targets.length;
      while (capacity < m) {
        capacity *= 2;
      }
      this.#targets = new Int32Array(capacity);
      this.#broken = new Uint8Array(capacity);
    }

    for (let i = 0; i <= n; i++) {
      cursor[i] = offsets[i];
    }

    // branch once per rebuild, never per edge:
    if (this.#annotateEdges) {
      this.#annotations.length = m;
      this.#fillRowsAnnotated(m);
      this.#sortRowsAnnotated(n);
    } else {
      this.#fillRows(m);
      this.#sortRows(n);
    }

    this.#broken.fill(0, 0, m);
    this.#finalised = true;
  }

  #finaliseIfStale(): void {
    if (!this.#finalised) {
      this.finalise();
    }
  }

  /** whether an edge from→to exists (broken or not) */
  hasEdge(from: N, to: N): boolean {
    this.#finaliseIfStale();
    const fromIndex = this.#nodeIndex.get(from);
    const toIndex = this.#nodeIndex.get(to);
    if (fromIndex === undefined || toIndex === undefined) {
      return false;
    }
    const offsets = this.#offsets;
    const targets = this.#targets;
    for (let e = offsets[fromIndex]; e < offsets[fromIndex + 1]; e++) {
      if (targets[e] === toIndex) {
        return true;
      }
    }
    return false;
  }

  /**
   * whether any node satisfying `matching` has an edge to `node`.
   *
   * Named a scan because that is what it is: the adjacency runs one way only,
   * so answering an incoming question means visiting every node and walking
   * its whole row. Answering it quickly would need the transpose maintained
   * too, doubling the work every rebuild for this one question - so this is
   * for cold callers, and must never be reached from a per-frame path
   */
  scanForEdgeToMatching(node: N, matching: (from: N) => boolean): boolean {
    for (const from of this.nodes) {
      if (matching(from) && this.hasEdge(from, node)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Iterate the edges out of a node, in ascending node order, with each
   * edge's broken flag.
   */
  forEachEdgeFrom(node: N, cb: (to: N, broken: boolean) => void): void {
    // implementation must stay allocation-free; a node not in the
    // graph iterates nothing
    this.#finaliseIfStale();
    const index = this.#nodeIndex.get(node);
    if (index === undefined) {
      return;
    }
    const offsets = this.#offsets;
    const targets = this.#targets;
    for (let e = offsets[index]; e < offsets[index + 1]; e++) {
      cb(this.#nodes[targets[e]], this.#broken[e] === 1);
    }
  }

  /**
   * iterate only the BROKEN edges out of a node - edges in cycles that were
   * chosen to be broken. For most nodes/graphs will iterate zero times
   *
   * Equivalent to forEachEdgeFrom with filtering at call-site, but more
   * efficient since many callbacks are avoided, given most edges are
   * not broken
   */
  forEachBrokenEdgeFrom<C>(
    node: N,
    /**
     * handed back to `cb` untouched. Lets a caller reach its per-iteration
     * state without the callback capturing it, so the callback itself can be
     * created once instead of per iteration
     */
    context: C,
    cb: (to: N, context: C) => void,
  ): void {
    // implementation must stay allocation-free; a node not in the
    // graph iterates nothing
    this.#finaliseIfStale();
    const index = this.#nodeIndex.get(node);
    if (index === undefined) {
      return;
    }
    const offsets = this.#offsets;
    const targets = this.#targets;
    const broken = this.#broken;
    for (let e = offsets[index]; e < offsets[index + 1]; e++) {
      // other than this if, identical to forEachEdgeFrom. Not a brokenOnly
      // param in forEachEdgeFrom to avoid a JUMP on a hot path
      if (broken[e] === 1) {
        cb(this.#nodes[targets[e]], context);
      }
    }
  }

  /**
   * {@link forEachEdgeFrom} with each edge's annotation. Only on an
   * annotating graph
   */
  forEachAnnotatedEdgeFrom(node: N, cb: (to: N, annotation: E) => void): void {
    if (import.meta.env.DEV && !this.#annotateEdges) {
      throw new Error(
        "forEachAnnotatedEdgeFrom on a graph constructed without annotateEdges",
      );
    }
    this.#finaliseIfStale();
    const index = this.#nodeIndex.get(node);
    if (index === undefined) {
      return;
    }
    const offsets = this.#offsets;
    const targets = this.#targets;
    const annotations = this.#annotations;
    for (let e = offsets[index]; e < offsets[index + 1]; e++) {
      cb(this.#nodes[targets[e]], annotations[e]);
    }
  }

  /**
   * every edge in the graph with its annotation, as an iterable so callers can
   * use it in a plain `for...of` - which a generator can `yield` from, unlike
   * a callback. Only on an annotating graph.
   *
   * Allocates: an iterator, plus one object per edge. Cheap enough for a
   * caller that runs once, wrong for a per-frame one - those want
   * {@link forEachAnnotatedEdgeFrom}, which allocates nothing
   */
  *iterateAnnotatedEdges(): Generator<{ from: N; to: N; annotation: E }> {
    if (import.meta.env.DEV && !this.#annotateEdges) {
      throw new Error(
        "iterateAnnotatedEdges on a graph constructed without annotateEdges",
      );
    }
    this.#finaliseIfStale();
    const n = this.#nodes.length;
    for (let i = 0; i < n; i++) {
      const from = this.#nodes[i];
      for (let e = this.#offsets[i]; e < this.#offsets[i + 1]; e++) {
        yield {
          from,
          to: this.#nodes[this.#targets[e]],
          annotation: this.#annotations[e],
        };
      }
    }
  }

  /**
   * Topological sort of the whole graph, breaking any cycles by marking edges
   * broken (read back via {@link forEachBrokenEdgeFrom}).
   *
   *  * all broken flags reset on entry
   *  * nodes seeded in REVERSE node order
   *  * each node's children iterated in REVERSE row order (rows are
   *    ascending, so children visit descending)
   *  * reaching an on-path (grey) node marks the edge from the current
   *    parent as broken and skips it
   *  * post-order fills the output from the end, so ties between
   *    unconstrained nodes follow the node order
   *
   * Returns a REUSED array - only valid until the next call on this
   * instance.
   */
  topologicalSortInPlace(): N[] {
    this.#finaliseIfStale();
    const n = this.#nodes.length;
    const offsets = this.#offsets;
    const targets = this.#targets;
    const broken = this.#broken;
    const colour = this.#colour;
    const stackNode = this.#stackNode;
    const stackEdge = this.#stackEdge;
    const sorted = this.#sorted;

    broken.fill(0, 0, this.#edgeCount);
    colour.fill(white, 0, n);
    sorted.length = n;
    let outCursor = n;

    for (let seed = n - 1; seed >= 0; seed--) {
      if (colour[seed] !== white) {
        continue;
      }
      let sp = 0;
      stackNode[0] = seed;
      stackEdge[0] = offsets[seed + 1];
      colour[seed] = grey;

      while (sp >= 0) {
        const u = stackNode[sp];
        const e = --stackEdge[sp];
        if (e < offsets[u]) {
          // all children done: post-order emit
          colour[u] = black;
          sorted[--outCursor] = this.#nodes[u];
          sp--;
          continue;
        }
        if (broken[e] === 1) {
          continue;
        }
        const v = targets[e];
        if (colour[v] === grey) {
          // cycle: v is on the current path - break the edge u→v and skip
          if (logCycleBreaking) {
            console.log(
              "cycle found, marking edge as broken:",
              this.#nodes[u],
              "->",
              this.#nodes[v],
            );
          }
          broken[e] = 1;
          continue;
        }
        if (colour[v] === black) {
          continue;
        }
        colour[v] = grey;
        sp++;
        stackNode[sp] = v;
        stackEdge[sp] = offsets[v + 1];
      }
    }

    return sorted;
  }
}
