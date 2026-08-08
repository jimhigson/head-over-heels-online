//# allFunctionsCalledOnLoad

import { type Graph } from "../../../utils/graph/Graph";
import { type RenderBoxes } from "../renderBox/makeItemRenderBoxAtCameraAngle";
import { type DrawOrderBroadPhase } from "./DrawOrderBroadPhase";
import { type DrawOrderComparable } from "./DrawOrderComparable";
import { zComparator } from "./zComparator";

/**
 * Extraction of a RoomRenderer responsibility for easier testing as a single
 * exposed function
 *
 * Resets and rebuilds `zEdges` from scratch to hold an updated graph of what is
 * in front of what.
 *
 * Uses the broadPhase to find likely overlaps, runs detailed checks for
 * ordering, and applies to the graph
 */
export const updateZEdges = <TItem extends DrawOrderComparable>(
  /** every item to sort - these become the graph's canonical node order */
  items: ReadonlySet<TItem>,
  /** an up-to-date broad phase containing the items in the items param Set */
  drawOrderBroadPhase: DrawOrderBroadPhase<TItem>,
  /** rebuilt in place from scratch */
  zOrderGraph: Graph<TItem>,
  /** the drawn extents, owned by the caller (in-game, the room renderer) */
  renderBoxes: RenderBoxes<TItem>,
): void => {
  zOrderGraph.beginRebuild(items);
  drawOrderBroadPhase.forEachCandidatePair((itemI, itemJ) => {
    // itemI, itemJ are likely overlaps
    const comparison = zComparator(
      itemI,
      itemJ,
      drawOrderBroadPhase,
      renderBoxes,
    );
    if (comparison === 0) {
      // were a likely overlap, but actually found to have no order preference
      // on full examination
      return;
    }
    if (comparison > 0) {
      zOrderGraph.addEdge(itemJ, itemI);
    } else {
      zOrderGraph.addEdge(itemI, itemJ);
    }
  });
  zOrderGraph.finalise();
};
