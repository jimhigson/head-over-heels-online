const logCyclicRendering = import.meta.env.VITE_LOG_CYCLIC_RENDERING === "true";

/** colour states for the iterative depth-first toposort */
const white = 0;
const grey = 1;
const black = 2;

/**
 * the draw-order graph: which items draw in front of which others, as flat
 * integer-indexed buffers rebuilt from scratch each frame.
 *
 * Edges run back→front: it is the BACK item of a broken (cyclic) edge that
 * has to act, masking itself with the front item's art.
 *
 * Nodes are held densely in canonical order (the iteration order of the set
 * given to {@link beginRebuild} - in-game, room-item order), and every edge
 * is a pair of dense indices. Adjacency is CSR (row offsets + targets) with
 * a parallel broken-flag array; rows are sorted by ascending canonical index
 * of the target, so the graph's shape is a pure function of the room state -
 * no movement/insertion history can influence tie order or which edge of a
 * cycle gets broken.
 *
 * All buffers (edge staging, CSR, toposort stacks, the output array) are
 * per-instance and reused across frames, growing by doubling and never
 * shrinking: the steady-state rebuild allocates nothing.
 */
export class ZOrderGraph<N> {
  /** dense canonical node list; index = the node's integer id in the graph */
  #nodes: N[] = [];
  #nodeIndex = new Map<N, number>();

  /** staged edges (back, front) as dense-index pairs, before {@link finalise} */
  #edgeFrom = new Int32Array(256);
  #edgeTo = new Int32Array(256);
  #edgeCount = 0;

  /** CSR adjacency: row offsets (n+1), targets and broken flags (edgeCount) */
  #offsets = new Int32Array(0);
  #targets = new Int32Array(256);
  #broken = new Uint8Array(256);
  #cursor = new Int32Array(0);

  /** iterative-DFS state: node colouring and the explicit stack frames */
  #colour = new Uint8Array(0);
  #stackNode = new Int32Array(0);
  #stackEdge = new Int32Array(0);
  /** reused toposort output - valid until the next {@link toposort} call */
  #sorted: N[] = [];

  get nodeCount(): number {
    return this.#nodes.length;
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
   * start a rebuild: adopt the nodes (in the iterable's order, which becomes
   * the canonical order) and discard all edges. Follow with
   * {@link addEdge} calls, then {@link finalise}
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
  }

  /** empty the graph entirely (no nodes, no edges) */
  clear(): void {
    this.#nodes.length = 0;
    this.#nodeIndex.clear();
    this.#edgeCount = 0;
    this.#offsets.fill(0);
  }

  /**
   * stage a directed edge back→front (both must be nodes given to
   * {@link beginRebuild}). Not queryable until {@link finalise}
   */
  addEdge(back: N, front: N): void {
    const backIndex = this.#nodeIndex.get(back);
    const frontIndex = this.#nodeIndex.get(front);
    if (backIndex === undefined || frontIndex === undefined) {
      throw new Error("addEdge with a node not in the graph");
    }
    this.#ensureEdgeCapacity(this.#edgeCount + 1);
    this.#edgeFrom[this.#edgeCount] = backIndex;
    this.#edgeTo[this.#edgeCount] = frontIndex;
    this.#edgeCount++;
  }

  /**
   * build the CSR adjacency from the staged edges: counts pass, prefix sum,
   * fill pass, then each row insertion-sorted by ascending canonical index
   * of the target. All broken flags start false
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
    const targets = this.#targets;

    for (let i = 0; i <= n; i++) {
      cursor[i] = offsets[i];
    }
    for (let e = 0; e < m; e++) {
      targets[cursor[this.#edgeFrom[e]]++] = this.#edgeTo[e];
    }

    // sort each row ascending (rows are short; insertion sort, no allocation):
    for (let i = 0; i < n; i++) {
      const rowStart = offsets[i];
      const rowEnd = offsets[i + 1];
      for (let k = rowStart + 1; k < rowEnd; k++) {
        const value = targets[k];
        let j = k - 1;
        while (j >= rowStart && targets[j] > value) {
          targets[j + 1] = targets[j];
          j--;
        }
        targets[j + 1] = value;
      }
    }

    this.#broken.fill(0, 0, m);
  }

  /** whether the directed edge from→to exists (broken or not) */
  hasEdge(from: N, to: N): boolean {
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
   * iterate the edges out of a node (back→front: the items drawn in front of
   * it), in ascending canonical order, with each edge's broken flag.
   * Allocation-free; a node not in the graph iterates nothing
   */
  forEachEdgeFrom(node: N, cb: (front: N, broken: boolean) => void): void {
    const index = this.#nodeIndex.get(node);
    if (index === undefined) {
      return;
    }
    const offsets = this.#offsets;
    const targets = this.#targets;
    const broken = this.#broken;
    for (let e = offsets[index]; e < offsets[index + 1]; e++) {
      cb(this.#nodes[targets[e]], broken[e] === 1);
    }
  }

  /**
   * iterate only the BROKEN edges out of a node - the cycles that draw order
   * alone cannot honour, which masking resolves instead. Broken edges are a
   * small minority, so filtering inside the walk skips both the callback and
   * the node lookup for everything else.
   * Allocation-free; a node not in the graph iterates nothing
   */
  forEachBrokenEdgeFrom(node: N, cb: (front: N) => void): void {
    const index = this.#nodeIndex.get(node);
    if (index === undefined) {
      return;
    }
    const offsets = this.#offsets;
    const targets = this.#targets;
    const broken = this.#broken;
    for (let e = offsets[index]; e < offsets[index + 1]; e++) {
      if (broken[e] === 1) {
        cb(this.#nodes[targets[e]]);
      }
    }
  }

  /**
   * Topological sort of the whole graph, back to front, breaking any cycles
   * by marking edges broken (mutating this graph's flags - masking reads
   * them via {@link forEachEdgeFrom}).
   *
   * A fork/update of toposort ([git](https://github.com/marcelklehr/toposort),
   * [npm](https://www.npmjs.com/package/toposort)), made iterative over the
   * flat integer-indexed buffers. The original's semantics are kept exactly:
   *  * all broken flags reset on entry
   *  * nodes seeded in REVERSE canonical order
   *  * each node's children iterated in REVERSE row order (rows are
   *    ascending-canonical, so children visit descending)
   *  * reaching an on-path (grey) node marks the edge from the current
   *    parent as broken and skips it
   *  * post-order fills the output from the end, so ties between
   *    unconstrained nodes follow the canonical order
   *
   * Returns a REUSED array - only valid until the next call on this
   * instance.
   */
  toposort(): N[] {
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
          if (logCyclicRendering) {
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
