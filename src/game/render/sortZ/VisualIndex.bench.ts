import { bench, describe } from "vitest";

import { blockSizePx } from "../../physics/mechanicsConstants";
import { populatedVisualIndex } from "./__test__/populatedVisualIndex";

/**
 * benchmarks the VisualIndex at room sizes from an original-game single room up
 * to large editor-authored multi-rooms, under the per-frame workload the room
 * renderer gives it: 10% of items move each frame, the index is brought up to
 * date, then each moved item's projected neighbourhood is queried (as
 * updateZEdges does).
 */

type BenchItem = {
  id: string;
  state: { position: { x: number; y: number; z: number } };
  aabb: { x: number; y: number; z: number };
};

type Scenario = {
  itemCount: number;
  /** the floor size the items are spread over, in blocks */
  roomBlocks: { x: number; y: number };
  label: string;
};

const scenarios: Scenario[] = [
  { itemCount: 20, roomBlocks: { x: 8, y: 8 }, label: "single room (8×8)" },
  { itemCount: 100, roomBlocks: { x: 24, y: 8 }, label: "triple room (24×8)" },
  { itemCount: 500, roomBlocks: { x: 24, y: 24 }, label: "3×3 rooms (24×24)" },
  {
    itemCount: 1_000,
    roomBlocks: { x: 40, y: 40 },
    label: "5×5 rooms (40×40)",
  },
];

const framesPerRun = 100;
const movedFractionPerFrame = 0.1;

/** deterministic pseudo-random 0..1 so every bench run sees identical layouts */
const makeLcg = (seed: number) => (): number => {
  seed = (seed * 1_664_525 + 1_013_904_223) >>> 0;
  return seed / 2 ** 32;
};

/**
 * item footprint mix, in blocks: 50% single blocks, 25% double-height, and the
 * remaining 25% split equally between 1×3×1, 3×1×1 and 1×1×3. i % 12 gives the
 * mix exactly: 6 singles, 3 double-heights, one of each long shape
 */
const shapeInBlocksForIndex = (
  i: number,
): { x: number; y: number; z: number } => {
  const r = i % 12;
  if (r < 6) {
    return { x: 1, y: 1, z: 1 };
  }
  if (r < 9) {
    return { x: 1, y: 1, z: 2 };
  }
  if (r === 9) {
    return { x: 1, y: 3, z: 1 };
  }
  if (r === 10) {
    return { x: 3, y: 1, z: 1 };
  }
  return { x: 1, y: 1, z: 3 };
};

/**
 * height distribution: half the items on the floor, a quarter one block up, an
 * eighth two blocks up... halving per level up to level 10 (or until the
 * items run out)
 */
const zLevelForIndex = (i: number, itemCount: number): number => {
  let level = 0;
  let bucketStart = 0;
  let bucketSize = Math.ceil(itemCount / 2);
  while (i >= bucketStart + bucketSize && level < 10) {
    bucketStart += bucketSize;
    bucketSize = Math.ceil(bucketSize / 2);
    level++;
  }
  return level;
};

const makeItems = ({ itemCount, roomBlocks }: Scenario): Set<BenchItem> => {
  const random = makeLcg(1);
  const items = new Set<BenchItem>();
  for (let i = 0; i < itemCount; i++) {
    const shape = shapeInBlocksForIndex(i);
    items.add({
      id: `item-${i}`,
      state: {
        position: {
          // on the block grid, anywhere the footprint fits inside the room:
          x: Math.floor(random() * (roomBlocks.x - shape.x)) * blockSizePx.x,
          y: Math.floor(random() * (roomBlocks.y - shape.y)) * blockSizePx.y,
          z: zLevelForIndex(i, itemCount) * blockSizePx.z,
        },
      },
      aabb: {
        x: shape.x * blockSizePx.x,
        y: shape.y * blockSizePx.y,
        z: shape.z * blockSizePx.z,
      },
    });
  }
  return items;
};

for (const scenario of scenarios) {
  const { itemCount, roomBlocks, label } = scenario;

  describe(`${itemCount} items in ${label}`, () => {
    bench("populate from empty", () => {
      populatedVisualIndex(makeItems(scenario));
    });

    // per-frame workload state, reused across bench iterations (the index is
    // long-lived in the real game too):
    const noRenderBoxes = new Map<BenchItem, null>();
    const items = makeItems(scenario);
    const itemsArray = [...items];
    const index = populatedVisualIndex(items);
    const random = makeLcg(2);
    const movedStride = Math.round(1 / movedFractionPerFrame);
    let frame = 0;

    bench(
      `${framesPerRun} frames, ${movedFractionPerFrame * 100}% items moving`,
      () => {
        for (let f = 0; f < framesPerRun; f++, frame++) {
          // move every 10th item, the selection rotating so all items take
          // turns at moving:
          const moved = new Set<BenchItem>();
          for (
            let i = frame % movedStride;
            i < itemsArray.length;
            i += movedStride
          ) {
            const item = itemsArray[i];
            // walk to a new spot on the floor grid (height level kept):
            item.state.position.x =
              Math.floor(random() * (roomBlocks.x - 1)) * blockSizePx.x;
            item.state.position.y =
              Math.floor(random() * (roomBlocks.y - 1)) * blockSizePx.y;
            moved.add(item);
          }

          index.updateManyItems(items, moved, noRenderBoxes);

          // updateZEdges queries each moved item's neighbourhood:
          for (const item of moved) {
            index.getItemProjectedNeighbourhood(item);
          }
        }
      },
    );
  });
}
