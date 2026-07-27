//# allFunctionsCalledOnLoad

import { type RenderBoxes } from "../renderBox/makeItemRenderBoxAtCameraAngle";
import { type DrawOrderBroadPhase } from "./DrawOrderBroadPhase";
import { type DrawOrderComparable } from "./DrawOrderComparable";
import { zComparator } from "./zComparator";
import { type ZOrderGraph } from "./ZOrderGraph";

/**
 * rebuilds `zEdges` from scratch to hold what draws in front of what.
 *
 * Thin by design: the broad phase's sweep supplies each broad-phase
 * candidate pair exactly once, the comparator classifies it, and nonzero
 * classifications append a back→front edge. Fixed-z items (including
 * hidden walls) never appear - they are excluded from the broad phase by the
 * participation filter at its quarter angle.
 *
 * The graph is rebuilt in place (same instance, reused buffers): callers
 * sharing it by reference (the item render contexts) always see the
 * current frame's edges. Edges start unbroken; the toposort marks cyclic
 * edges broken afterwards.
 */
export const updateZEdges = <TItem extends DrawOrderComparable>(
  /** every item to sort - these become the graph's canonical node order */
  items: ReadonlySet<TItem>,
  /** an up-to-date broad phase containing the items in the items param Set */
  broadPhase: DrawOrderBroadPhase<TItem>,
  /** rebuilt in place from scratch */
  zEdges: ZOrderGraph<TItem>,
  /** the drawn extents, owned by the caller (in-game, the room renderer) */
  renderBoxes: RenderBoxes<TItem>,
): void => {
  zEdges.beginRebuild(items);
  broadPhase.forEachCandidatePair((itemI, itemJ) => {
    const comparison = zComparator(itemI, itemJ, broadPhase, renderBoxes);
    if (comparison === 0) {
      return;
    }
    if (comparison > 0) {
      zEdges.addEdge(itemJ, itemI);
    } else {
      zEdges.addEdge(itemI, itemJ);
    }
  });
  zEdges.finalise();
};
