import { type ZGraph } from "../GraphEdges";
import { toposort } from "../toposort/toposort";

/** any graph node the dump can name - it only needs a stable string id */
type ZGraphNode = { id: string };

/** the header line the formatter always emits - a distinctive, greppable marker */
const zGraphDumpHeader = "z-order draw graph";

const cloneZGraph = <N>(graph: ZGraph<N>): ZGraph<N> => {
  const clone: ZGraph<N> = new Map();
  for (const [back, fronts] of graph) {
    clone.set(back, new Map(fronts));
  }
  return clone;
};

/**
 * turn the live draw-order graph (`Map{ back => Map{ front => broken } }`) into
 * stable, deterministic, human-diffable text: a header, the toposorted draw
 * order, then the edges sorted by back id then front id. The emitted text
 * format is the stable contract (pinned by the unit test) - if the live
 * graph's representation changes, only the walking here changes; the text must
 * stay the same so dumps from different builds remain diffable against each
 * other.
 */
export const formatZGraph = <N extends ZGraphNode>(
  graph: undefined | ZGraph<N>,
): string => {
  const edges: Array<{ back: string; front: string; broken: boolean }> = [];
  if (graph !== undefined) {
    for (const [back, fronts] of graph) {
      for (const [front, broken] of fronts) {
        edges.push({ back: back.id, front: front.id, broken });
      }
    }
  }
  edges.sort((a, b) =>
    a.back < b.back ? -1
    : a.back > b.back ? 1
    : a.front < b.front ? -1
    : a.front > b.front ? 1
    : 0,
  );

  // toposort mutates the graph's broken flags, so run it on a clone to leave
  // the live graph untouched:
  const order =
    graph === undefined ?
      []
    : toposort(cloneZGraph(graph)).map((node) => node.id);

  const brokenCount = edges.filter((edge) => edge.broken).length;

  const lines = [
    zGraphDumpHeader,
    `${order.length} nodes, ${edges.length} edges (${brokenCount} broken)`,
    "",
    "draw order (back to front):",
    ...order.map((id, i) => `  ${i}: ${id}`),
    "",
    "edges (back -> front):",
    ...edges.map(
      ({ back, front, broken }) =>
        `  ${back} -> ${front}${broken ? "  [broken]" : ""}`,
    ),
  ];

  return lines.join("\n");
};

/**
 * developer dump: format the graph, log the text to the console, and return
 * it. Only reachable via the cheats-gated dynamic import, so none of this
 * lands in the production bundle.
 */
export const dumpZGraph = <N extends ZGraphNode>(
  graph: undefined | ZGraph<N>,
): string => {
  const text = formatZGraph(graph);
  console.log(text);
  return text;
};
