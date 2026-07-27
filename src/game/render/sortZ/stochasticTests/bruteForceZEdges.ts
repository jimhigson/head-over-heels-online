import { populatedBroadPhase } from "../__test__/populatedBroadPhase";
import { addEdge, type Graph } from "../../../../utils/graph/Graph";
import { nearestQuarterAngle } from "../../../../utils/vectors/cameraAngleVectors";
import { type Xy } from "../../../../utils/vectors/vectors";
import { type Indexable } from "../../../physics/gridSpace/CellIndex";
import {
  type RenderBoxableItem,
  type RenderBoxes,
} from "../../renderBox/makeItemRenderBoxAtCameraAngle";
import { type DrawOrderComparable } from "../DrawOrderComparable";
import { zComparator } from "../zComparator";

/**
 * brute-force reference for the draw-order graph: runs the real
 * {@link zComparator} on ALL pairs of items over a freshly-populated broad
 * phase at the given angle, and builds the back→front edge graph from
 * scratch.
 *
 * The one thing it does differently from the real pipeline is pair
 * enumeration - all pairs, where the pipeline takes the sweep-and-prune
 * candidates - so asserting the two produce identical edge SETS every frame
 * is exactly a test that the broad phase drops no pair that would have made
 * an edge (broken flags excluded - they belong to toposort).
 */
export const bruteForceZEdges = <
  TItem extends DrawOrderComparable & Indexable & RenderBoxableItem,
>(
  items: ReadonlySet<TItem>,
  cameraAngle: Xy,
  /** the drawn extents, owned by the caller */
  renderBoxes: RenderBoxes<TItem>,
): Graph<TItem, boolean> => {
  // participation on the nearest quarter, geometry at the continuous angle -
  // the same split the room renderer's live broadPhase uses:
  const broadPhase = populatedBroadPhase(
    items,
    renderBoxes,
    nearestQuarterAngle(cameraAngle),
    cameraAngle,
  );
  const graph: Graph<TItem, boolean> = new Map();

  const itemsArray = [...items];
  for (let i = 0; i < itemsArray.length; i++) {
    for (let j = i + 1; j < itemsArray.length; j++) {
      const comparison = zComparator(
        itemsArray[i],
        itemsArray[j],
        broadPhase,
        renderBoxes,
      );
      if (comparison === 0) {
        continue;
      }
      const front = comparison > 0 ? itemsArray[i] : itemsArray[j];
      const back = comparison > 0 ? itemsArray[j] : itemsArray[i];
      addEdge(graph, back, front, false);
    }
  }
  return graph;
};
