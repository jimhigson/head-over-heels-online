import { populatedBroadPhase } from "../__test__/populatedBroadPhase";
import { Graph } from "../../../../utils/graph/Graph";
import { cameraAngleBase } from "../../../../utils/vectors/cameraAngleVectors";
import { type Xy } from "../../../../utils/vectors/vectors";
import { type RenderBox } from "../../renderBox/makeItemRenderBoxAtCameraAngle";
import { type DrawOrderComparable } from "../DrawOrderComparable";
import { updateZEdges } from "../updateZEdges";

export const itemCount = 100;
export const movePercentage = 0.2;
export const frameCount = 100; // round number means divide answer by 100 to get time per frame

export type TestItem = DrawOrderComparable & { id: string };

/**
 * a continuous camera sweep of ~1.5°/frame, as a (cos,sin) unit vector - the
 * angle model for camera-turn scenarios (a 90° turn over ~60 frames)
 */
export const sweptCameraAngleForFrame = (frame: number): Xy => {
  const radians = (frame * 1.5 * Math.PI) / 180;
  return { x: Math.cos(radians), y: Math.sin(radians) };
};

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
        box: { x, y, z, xd: 1, yd: 1, zd: 1 },
      },
      fixedZIndex: undefined,
    });
  }

  return items;
};

export type FrameState = {
  frame: number;
  items: Set<TestItem>;
  zEdges: Graph<TestItem>;
  cameraAngle: Xy;
  renderBoxes: Map<TestItem, RenderBox | undefined>;
};

type RunTestScenario = {
  /**
   * the camera angle for each frame, threaded into the broad phase as its
   * geometry angle. On a frame where this changes, in-world item positions
   * are left untouched - the broad phase re-projects every item's box at
   * the new angle and the whole edge graph is rebuilt from scratch.
   * Default: the base angle on every frame
   */
  angleForFrame?: (frame: number) => Xy;
  /**
   * exercises membership churn: blocks of items leave the set for a stretch
   * of frames and rejoin. Since the broad phase and edge graph are rebuilt
   * from the current item set every frame, rejoining items are simply
   * present again on their next update - no separate "spawned" handling
   */
  membershipChurn?: boolean;
  /** called after each frame's update - assertion hook for oracle tests */
  onFrame?: (frameState: FrameState) => void;
};

export const runTest = (scenario: RunTestScenario = {}) => {
  const { angleForFrame, membershipChurn, onFrame } = scenario;

  // generate items
  const items = generateItems(itemCount);

  // build initial index+graph:
  const noRenderBoxes = new Map<TestItem, RenderBox | undefined>();
  let cameraAngle: Xy = angleForFrame?.(0) ?? cameraAngleBase;
  const broadPhase = populatedBroadPhase(items, noRenderBoxes, cameraAngle);
  const zEdgesGraph = new Graph<TestItem>();
  updateZEdges(items, broadPhase, zEdgesGraph, noRenderBoxes);

  const churnedOut: TestItem[] = [];

  // simulate frames:
  const stepSize = Math.round(1 / movePercentage);
  for (let f = 0; f < frameCount; f++) {
    if (membershipChurn) {
      if (f % 20 === 10) {
        // a block of items leaves the room:
        let i = 0;
        for (const item of items) {
          if (i % 17 === 0) {
            churnedOut.push(item);
            items.delete(item);
          }
          i++;
        }
      } else if (f % 20 === 0 && churnedOut.length > 0) {
        // the block rejoins:
        for (const item of churnedOut) {
          items.add(item);
        }
        churnedOut.length = 0;
      }
    }

    const frameAngle = angleForFrame?.(f) ?? cameraAngle;
    const angleChanged =
      frameAngle.x !== cameraAngle.x || frameAngle.y !== cameraAngle.y;
    if (angleChanged) {
      // the geometry angle is threaded into updateManyItems below; the
      // broad phase re-projects everything at it:
      cameraAngle = frameAngle;
    }

    if (!angleChanged) {
      // deterministically select items to move based on movePercentage
      // (camera-turn frames move nothing in-world - everything only
      // re-projects):
      let i = 0;
      for (const item of items) {
        if (i % stepSize === 0) {
          // move the item up
          const z = Math.round(Math.sin(i + f * 0.5) * 2.5 + 2.5);
          item.state.box = { ...item.state.box, z };
        }
        i++;
      }
    }

    // the per-frame update like the room renderer: bring the broad phase up
    // to date, then rebuild the edges
    broadPhase.updateManyItems(items, noRenderBoxes, cameraAngle);
    updateZEdges(items, broadPhase, zEdgesGraph, noRenderBoxes);

    onFrame?.({
      frame: f,
      items,
      zEdges: zEdgesGraph,
      cameraAngle,
      renderBoxes: noRenderBoxes,
    });
  }
  return zEdgesGraph;
};
