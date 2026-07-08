import { type DrawOrderComparable } from "../DrawOrderComparable";
import { type ZGraph } from "../GraphEdges";
import { updateZEdges } from "../updateZEdges";
import { VisualIndex } from "../VisualIndex";

export const itemCount = 100;
export const movePercentage = 0.2;
export const frameCount = 100; // round number means divide answer by 100 to get time per frame

type TestItem = DrawOrderComparable & { id: string };

/**
 * generates test items in a grid pattern for benchmarking
 */
const generateItems = (count: number): Set<TestItem> => {
  const items = new Set<TestItem>();
  const gridSize = Math.ceil(Math.sqrt(count));

  for (let i = 0; i < count; i++) {
    const x = (i % gridSize) * 2;
    const y = Math.floor(i / gridSize) * 2;
    // deterministic z based on position - creates a wave pattern - values 0 to 5 inclusive
    // (all integers)
    const z = Math.round(Math.sin(i * 0.5) * 2.5 + 2.5);

    items.add({
      id: `item-${i}`,
      state: {
        position: { x, y, z },
      },
      aabb: { x: 1, y: 1, z: 1 },
      renderAabb: { x: 1, y: 1, z: 1 },
      renderAabbOffset: { x: 0, y: 0, z: 0 },
      fixedZIndex: undefined,
    });
  }

  return items;
};
export const runTest = () => {
  // generate items
  const items = generateItems(itemCount);

  // build initial index+graph:
  const spatialIndex = new VisualIndex(items.values());
  const zEdgesGraph: ZGraph<TestItem> = new Map();
  updateZEdges(items, spatialIndex, items, zEdgesGraph);

  // simulate frames:
  const stepSize = Math.round(1 / movePercentage);
  for (let f = 0; f < frameCount; f++) {
    // select items to move
    const movedOrResizedItems = new Set<TestItem>();

    // deterministically select items to move based on movePercentage
    let i = 0;
    for (const item of items) {
      if (i % stepSize === 0) {
        // move the item up
        const z = Math.round(Math.sin(i + f * 0.5) * 2.5 + 2.5);
        item.state.position.z = z;
        movedOrResizedItems.add(item);
      }
      i++;
    }

    // benchmark the incremental update like room renderer: get index
    // up to date with moved items, then update the edges
    spatialIndex.updateManyItems(items, movedOrResizedItems);
    updateZEdges(items, spatialIndex, movedOrResizedItems, zEdgesGraph);
  }
  return zEdgesGraph;
};
