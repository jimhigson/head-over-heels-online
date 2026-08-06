import { describe, expect, test } from "vitest";

import { Graph } from "./Graph";

/**
 * build a graph from `[from, to]` edge pairs. Nodes take their order from
 * first appearance (each pair's `from`, then its `to`)
 */
const graphFromEdges = <N>(edges: ReadonlyArray<readonly [N, N]>): Graph<N> => {
  const nodes = new Set<N>();
  for (const [from, to] of edges) {
    nodes.add(from);
    nodes.add(to);
  }
  const graph = new Graph<N>();
  graph.beginRebuild(nodes);
  for (const [from, to] of edges) {
    graph.addEdge(from, to);
  }
  graph.finalise();
  return graph;
};

const isEdgeBroken = <N>(
  graph: Graph<N>,
  from: N,
  to: N,
): boolean | undefined => {
  let result: boolean | undefined;
  graph.forEachEdgeFrom(from, (to_, broken) => {
    if (to_ === to) {
      result = broken;
    }
  });
  return result;
};

const brokenEdgeCount = <N>(graph: Graph<N>): number => {
  let count = 0;
  for (let i = 0; i < graph.nodeCount; i++) {
    graph.forEachEdgeFrom(graph.nodeAt(i), (_to, broken) => {
      if (broken) {
        count++;
      }
    });
  }
  return count;
};

/** every edge out of `node`, in the order the graph iterates them */
const edgeTargets = <N, E>(graph: Graph<N, E>, node: N): N[] => {
  const targets: N[] = [];
  graph.forEachEdgeFrom(node, (to) => {
    targets.push(to);
  });
  return targets;
};

test("acyclic graphs should be sorted correctly", () => {
  const graph = graphFromEdges([
    ["3", "2"],
    ["2", "1"],
    ["6", "5"],
    ["5", "2"],
    ["5", "4"],
  ]);

  const result = graph.topologicalSortInPlace();

  const validSolutions = [
    ["3", "6", "5", "2", "1", "4"],
    ["3", "6", "5", "2", "4", "1"],
    ["6", "3", "5", "2", "1", "4"],
    ["6", "5", "3", "2", "1", "4"],
    ["6", "5", "3", "2", "4", "1"],
    ["6", "5", "4", "3", "2", "1"],
  ];

  expect(result).toBeOneOf(validSolutions);
});

test("simple cyclic graphs should automatically break cycles", () => {
  const graph = graphFromEdges([
    ["foo", "bar"],
    ["bar", "foo"],
  ]);

  // Should not throw
  const result = graph.topologicalSortInPlace();

  // Should have broken one of the edges
  const fooToBar = isEdgeBroken(graph, "foo", "bar");
  const barToFoo = isEdgeBroken(graph, "bar", "foo");
  expect(fooToBar === true || barToFoo === true).toBe(true);

  // Result should contain both nodes
  expect(result).toHaveLength(2);
  expect(new Set(result)).toEqual(new Set(["foo", "bar"]));
});

test("toposort resets all edges to false on entry", () => {
  const graph = graphFromEdges([
    ["foo", "bar"],
    ["bar", "foo"],
  ]);

  // a first run marks one edge of the cycle broken...
  graph.topologicalSortInPlace();
  expect(brokenEdgeCount(graph)).toBe(1);

  // ...a second run must reset the flags and re-detect the cycle (never
  // accumulate breaks from earlier runs):
  const result = graph.topologicalSortInPlace();
  expect(brokenEdgeCount(graph)).toBe(1);

  const fooToBar = isEdgeBroken(graph, "foo", "bar");
  const barToFoo = isEdgeBroken(graph, "bar", "foo");
  expect(fooToBar === true || barToFoo === true).toBe(true);

  expect(result).toHaveLength(2);
});

test("verify toposort produces valid topological ordering", () => {
  const graph = graphFromEdges([
    ["foo", "bar"],
    ["bar", "ron"],
    ["john", "bar"],
    ["tom", "john"],
    ["ron", "tom"], // Creates a cycle
  ]);

  const result = graph.topologicalSortInPlace();

  // Verify it's a valid topological sort
  const nodeIndex = new Map<string, number>();
  result.forEach((node, index) => nodeIndex.set(node, index));

  // Check all non-broken edges are satisfied (from node should come before to node)
  for (let i = 0; i < graph.nodeCount; i++) {
    const from = graph.nodeAt(i);
    graph.forEachEdgeFrom(from, (to, broken) => {
      if (!broken) {
        // For non-broken edges, from should come before to
        const fromIndex = nodeIndex.get(from);
        const toIndex = nodeIndex.get(to);
        if (fromIndex !== undefined && toIndex !== undefined) {
          expect(fromIndex).toBeLessThan(toIndex);
        }
      }
    });
  }

  // All nodes should be present
  expect(result).toHaveLength(5);
  expect(new Set(result)).toEqual(
    new Set(["foo", "bar", "ron", "john", "tom"]),
  );
});

test("triangular dependency shouldn't throw an error", () => {
  const graph = graphFromEdges([
    ["a", "b"],
    ["a", "c"],
    ["b", "c"],
  ]);

  const result = graph.topologicalSortInPlace();

  expect(result).toEqual(["a", "b", "c"]);
});

test("giant graphs should sort quickly", () => {
  // 100,000 is far beyond what we actually need
  const nodeCount = 100_000;
  const fixture = Array.from(
    { length: nodeCount },
    (_unused, i) => [i, i + 1] as const,
  );
  const graph = graphFromEdges(fixture);

  const start = performance.now();
  const result = graph.topologicalSortInPlace();
  const elapsedMs = performance.now() - start;

  expect(result).toHaveLength(nodeCount + 1); // Ensure all nodes are sorted

  console.log(`⏱️ toposort sorted ${nodeCount} in ${elapsedMs.toFixed(1)}ms`);
  expect(elapsedMs).toBeLessThan(1_000);
});

test("object keys should handle object nodes (not only strings)", () => {
  const o1 = { k1: "v1", nested: { k2: "v2" } };
  const o2 = { k2: "v2" };
  const o3 = { k3: "v3" };

  const graph = graphFromEdges<object>([
    [o1, o2],
    [o2, o3],
  ]);

  const result = graph.topologicalSortInPlace();

  expect(result).toEqual([o1, o2, o3]);
});

describe("adjacency", () => {
  test("rows iterate in ascending node order, whatever order edges were added", () => {
    const graph = new Graph<string>();
    graph.beginRebuild(["a", "b", "c", "d"]);
    graph.addEdge("a", "d");
    graph.addEdge("a", "b");
    graph.addEdge("a", "c");
    graph.finalise();

    expect(edgeTargets(graph, "a")).toEqual(["b", "c", "d"]);
  });

  test("hasEdge finds an edge that was added", () => {
    const graph = new Graph<string>();
    graph.beginRebuild(["a", "b"]);
    graph.addEdge("a", "b");

    expect(graph.hasEdge("a", "b")).toBe(true);
  });

  test("hasEdge is directional", () => {
    const graph = new Graph<string>();
    graph.beginRebuild(["a", "b"]);
    graph.addEdge("a", "b");

    expect(graph.hasEdge("b", "a")).toBe(false);
  });

  test("hasEdge is false for a node that is not in the graph", () => {
    const graph = new Graph<string>();
    graph.beginRebuild(["a", "b"]);
    graph.addEdge("a", "b");

    expect(graph.hasEdge("a", "absent")).toBe(false);
  });

  test("a node not in the graph iterates no edges", () => {
    const graph = new Graph<string>();
    graph.beginRebuild(["a"]);

    expect(edgeTargets(graph, "absent")).toEqual([]);
  });

  test("adding an edge for a node not in the graph throws", () => {
    const graph = new Graph<string>();
    graph.beginRebuild(["a"]);

    expect(() => graph.addEdge("a", "absent")).toThrow();
  });

  test("duplicate edges are kept as written", () => {
    const graph = new Graph<string>();
    graph.beginRebuild(["a", "b"]);
    graph.addEdge("a", "b");
    graph.addEdge("a", "b");

    expect(edgeTargets(graph, "a")).toEqual(["b", "b"]);
  });
});

describe("finalise", () => {
  test("queries finalise the graph themselves when edges are outstanding", () => {
    const graph = new Graph<string>();
    graph.beginRebuild(["a", "b"]);
    graph.addEdge("a", "b");
    // deliberately no finalise() call:
    expect(graph.hasEdge("a", "b")).toBe(true);
  });

  test("an edge added after a query is visible to the next query", () => {
    const graph = new Graph<string>();
    graph.beginRebuild(["a", "b", "c"]);
    graph.addEdge("a", "b");
    graph.hasEdge("a", "b");
    graph.addEdge("a", "c");

    expect(edgeTargets(graph, "a")).toEqual(["b", "c"]);
  });
});

describe("rebuilding", () => {
  test("a rebuild discards the previous generation's edges", () => {
    const graph = new Graph<string>();
    graph.beginRebuild(["a", "b"]);
    graph.addEdge("a", "b");
    graph.finalise();
    graph.beginRebuild(["a", "b"]);
    graph.finalise();

    expect(graph.hasEdge("a", "b")).toBe(false);
  });

  test("a rebuild with a different node set renumbers the nodes", () => {
    const graph = new Graph<string>();
    graph.beginRebuild(["a", "b", "c"]);
    graph.addEdge("c", "a");
    graph.finalise();
    graph.beginRebuild(["c", "b"]);
    graph.addEdge("c", "b");
    graph.finalise();

    expect(graph.nodes).toEqual(["c", "b"]);
  });

  test("a node dropped by a rebuild is no longer known", () => {
    const graph = new Graph<string>();
    graph.beginRebuild(["a", "b"]);
    graph.addEdge("a", "b");
    graph.finalise();
    graph.beginRebuild(["b"]);
    graph.finalise();

    expect(graph.hasEdge("a", "b")).toBe(false);
  });

  test("clear empties the graph", () => {
    const graph = new Graph<string>();
    graph.beginRebuild(["a", "b"]);
    graph.addEdge("a", "b");
    graph.finalise();
    graph.clear();

    expect(graph.nodeCount).toBe(0);
  });
});

describe("buffer growth", () => {
  // the buffers start at 16 nodes / 256 edges and grow by doubling - these
  // sizes push past both, so a mis-sized regrowth shows up as lost edges

  test("holds far more nodes than the initial buffer capacity", () => {
    const nodes = Array.from({ length: 1_000 }, (_unused, i) => `n${i}`);
    const graph = new Graph<string>();
    graph.beginRebuild(nodes);
    graph.finalise();

    expect(graph.nodeCount).toBe(1_000);
  });

  test("holds far more edges than the initial buffer capacity", () => {
    const nodes = Array.from({ length: 1_000 }, (_unused, i) => `n${i}`);
    const graph = new Graph<string>();
    graph.beginRebuild(nodes);
    for (let i = 1; i < nodes.length; i++) {
      graph.addEdge(nodes[0], nodes[i]);
    }
    graph.finalise();

    expect(edgeTargets(graph, nodes[0])).toHaveLength(999);
  });

  test("edges survive a regrowth in ascending order", () => {
    const nodes = Array.from({ length: 400 }, (_unused, i) => `n${i}`);
    const graph = new Graph<string>();
    graph.beginRebuild(nodes);
    // added in descending order, so ordering can only come from the row sort:
    for (let i = nodes.length - 1; i >= 1; i--) {
      graph.addEdge(nodes[0], nodes[i]);
    }
    graph.finalise();

    expect(edgeTargets(graph, nodes[0])).toEqual(nodes.slice(1));
  });
});

describe("edge annotations", () => {
  test("an annotation is given back with its edge", () => {
    const graph = new Graph<string, string>(true);
    graph.beginRebuild(["a", "b"]);
    graph.addAnnotatedEdge("a", "b", "door");
    graph.finalise();

    const seen: Array<[string, string]> = [];
    graph.forEachAnnotatedEdgeFrom("a", (to, annotation) => {
      seen.push([to, annotation]);
    });

    expect(seen).toEqual([["b", "door"]]);
  });

  test("annotations follow their own edge through the row sort", () => {
    const graph = new Graph<string, string>(true);
    graph.beginRebuild(["a", "b", "c", "d"]);
    // added out of node order, so the row sort has to permute them:
    graph.addAnnotatedEdge("a", "d", "to-d");
    graph.addAnnotatedEdge("a", "b", "to-b");
    graph.addAnnotatedEdge("a", "c", "to-c");
    graph.finalise();

    const seen: Array<[string, string]> = [];
    graph.forEachAnnotatedEdgeFrom("a", (to, annotation) => {
      seen.push([to, annotation]);
    });

    expect(seen).toEqual([
      ["b", "to-b"],
      ["c", "to-c"],
      ["d", "to-d"],
    ]);
  });

  test("annotations survive a regrowth of the edge buffers", () => {
    const nodes = Array.from({ length: 400 }, (_unused, i) => `n${i}`);
    const graph = new Graph<string, string>(true);
    graph.beginRebuild(nodes);
    for (let i = nodes.length - 1; i >= 1; i--) {
      graph.addAnnotatedEdge(nodes[0], nodes[i], `edge-to-${nodes[i]}`);
    }
    graph.finalise();

    const seen: string[] = [];
    graph.forEachAnnotatedEdgeFrom(nodes[0], (to, annotation) => {
      if (annotation !== `edge-to-${to}`) {
        seen.push(`${to} carried ${annotation}`);
      }
    });

    expect(seen).toEqual([]);
  });

  test("annotating a graph that was not constructed to annotate throws", () => {
    const graph = new Graph<string, string>();
    graph.beginRebuild(["a", "b"]);

    expect(() => graph.addAnnotatedEdge("a", "b", "door")).toThrow();
  });

  test("reading annotations off a graph that has none throws", () => {
    const graph = new Graph<string, string>();
    graph.beginRebuild(["a", "b"]);
    graph.addEdge("a", "b");

    expect(() => graph.forEachAnnotatedEdgeFrom("a", () => {})).toThrow();
  });
});

describe("scanForEdgeToMatching", () => {
  const graph = new Graph<string>();
  graph.beginRebuild(["a", "b", "c"]);
  graph.addEdge("a", "c");
  graph.addEdge("b", "c");
  graph.finalise();

  test("finds a matching node with an edge to the target", () => {
    expect(graph.scanForEdgeToMatching("c", (from) => from === "a")).toBe(true);
  });

  test("a node that matches but has no edge to the target does not count", () => {
    expect(graph.scanForEdgeToMatching("a", (from) => from === "b")).toBe(
      false,
    );
  });

  test("a node with an edge to the target that does not match does not count", () => {
    expect(graph.scanForEdgeToMatching("c", (from) => from === "unknown")).toBe(
      false,
    );
  });

  test("edges are directional", () => {
    expect(graph.scanForEdgeToMatching("a", (from) => from === "c")).toBe(
      false,
    );
  });
});
