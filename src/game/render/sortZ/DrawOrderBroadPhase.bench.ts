import { bench, describe } from "vitest";

import { cameraAngleBase } from "../../../utils/vectors/cameraAngleVectors";
import { blockSizePx } from "../../physics/mechanicsConstants";
import { type RenderBox } from "../renderBox/makeItemRenderBoxAtCameraAngle";
import { makeLcg } from "./__test__/makeLcg";
import { populatedBroadPhase } from "./__test__/populatedBroadPhase";
import { sweptCameraAngleForFrame } from "./stochasticTests/runTest";

/**
 * benchmarks the DrawOrderBroadPhase at room sizes from an original-game single room up
 * to large editor-authored multi-rooms, under the per-frame workload the room
 * renderer gives it: 10% of items move each frame, the broadPhase is brought up to
 * date, then every candidate pair is consumed (as the z-edge rebuild does).
 */

/** consumes the frame's candidate pairs like the z-edge rebuild does */
const consumeCandidatePairs = <Item>(broadPhase: {
  forEachCandidatePair: (cb: (a: Item, b: Item) => void) => void;
}): void => {
  broadPhase.forEachCandidatePair(() => {
    // no-op: only the iteration itself is under measurement
  });
};

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
      populatedBroadPhase(makeItems(scenario));
    });

    // per-frame workload state, reused across bench iterations (the broadPhase is
    // long-lived in the real game too):
    const noRenderBoxes = new Map<BenchItem, RenderBox | undefined>();
    const items = makeItems(scenario);
    const itemsArray = [...items];
    const broadPhase = populatedBroadPhase(items);
    const random = makeLcg(2);
    const movedStride = Math.round(1 / movedFractionPerFrame);
    let frame = 0;

    bench(
      `${framesPerRun} frames, ${movedFractionPerFrame * 100}% items moving`,
      () => {
        for (let f = 0; f < framesPerRun; f++, frame++) {
          // move every 10th item, the selection rotating so all items take
          // turns at moving:
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
          }

          broadPhase.updateManyItems(items, noRenderBoxes, cameraAngleBase);

          // updateZEdges consumes every candidate pair:
          consumeCandidatePairs(broadPhase);
        }
      },
    );

    // the camera-turn scenario: nothing moves in-world, θ sweeps ~1.5°/frame,
    // every item re-projects every frame: the persistent broadPhase is given the
    // frame's angle as its geometry angle, and every candidate pair is
    // consumed (during a turn the whole graph re-derives):
    const turnItems = makeItems(scenario);
    const turnRenderBoxes = new Map<BenchItem, RenderBox | undefined>();
    const turnBroadPhase = populatedBroadPhase(turnItems, turnRenderBoxes);
    let turnFrame = 0;

    bench(
      `camera turn: ${framesPerRun} frames, θ sweeping, all items re-projected`,
      () => {
        for (let f = 0; f < framesPerRun; f++, turnFrame++) {
          turnBroadPhase.updateManyItems(
            turnItems,
            turnRenderBoxes,
            sweptCameraAngleForFrame(turnFrame),
          );
          consumeCandidatePairs(turnBroadPhase);
        }
      },
    );
  });
}
