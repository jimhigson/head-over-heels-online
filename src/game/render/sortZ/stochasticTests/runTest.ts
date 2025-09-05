import type { DrawOrderComparable } from "../DrawOrderComparable";
import type { ZGraph } from "../GraphEdges";

import { GridSpatialIndex } from "../../../physics/gridSpace/GridSpatialIndex";
import { updateZEdges } from "../updateZEdges";

export const itemCount = 100;
export const movePercentage = 0.2;
export const frameCount = 100; // round number means divide answer by 100 to get time per frame

type TestItem = DrawOrderComparable & { id: string };
/**
 * generates test items in a grid pattern for benchmarking
 */
const generateItems = (count: number): Record<string, TestItem> => {
  const items: Record<string, TestItem> = {};
  const gridSize = Math.ceil(Math.sqrt(count));

  for (let i = 0; i < count; i++) {
    const x = (i % gridSize) * 2;
    const y = Math.floor(i / gridSize) * 2;
    // deterministic z based on position - creates a wave pattern - values 0 to 5 inclusive
    // (all integers)
    const z = Math.round(Math.sin(i * 0.5) * 2.5 + 2.5);

    const id = `item-${i}`;
    items[id] = {
      id,
      state: {
        position: { x, y, z },
      },
      aabb: { x: 1, y: 1, z: 1 },
      renderAabb: { x: 1, y: 1, z: 1 },
      renderAabbOffset: { x: 0, y: 0, z: 0 },
      fixedZIndex: undefined,
    };
  }

  return items;
};
export const runTest = () => {
  // generate items
  const items = generateItems(itemCount);

  // first call with all items to build initial graph
  const itemArray = Object.values(items);
  const spatialIndex = new GridSpatialIndex(itemArray);
  const zEdgesGraph: ZGraph<string> = updateZEdges(items, spatialIndex);

  // simulate frames:
  for (let f = 0; f < frameCount; f++) {
    // select items to move
    const movedItems = new Set<TestItem>();

    // deterministically select items to move based on movePercentage
    const stepSize = Math.round(1 / movePercentage);
    for (let i = 0; i < itemArray.length; i += stepSize) {
      const item = itemArray[i];
      // move the item up
      const z = Math.round(Math.sin(i + f * 0.5) * 2.5 + 2.5);
      item.state.position.z = z;
      movedItems.add(item);
    }

    // benchmark the incremental update
    updateZEdges(items, spatialIndex, movedItems, zEdgesGraph);
  }
  return zEdgesGraph;
};
