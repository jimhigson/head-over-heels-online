import { expect, test } from "vitest";

import { graphEdgeStrings } from "../__test__/graphEdgeStrings";
import { quarterCameraAngles } from "../../../../utils/vectors/cameraAngleVectors";
import { bruteForceZEdges } from "./bruteForceZEdges";
import {
  type FrameState,
  runTest,
  sweptCameraAngleForFrame,
  type TestItem,
} from "./runTest";

/**
 * asserts, on every frame of a stochastic run, that the pipeline's zEdges
 * graph (built from the broad phase's sweep-and-prune candidate pairs) is
 * identical - as an edge SET - to the brute-force all-pairs oracle at the
 * frame's angle: ie that the sweep drops no pair that would have made an
 * edge. Broken flags are excluded (they belong to toposort, not edge
 * finding).
 *
 * scenarios cover the four quarter angles (validating the oracle against
 * the pipeline's settled-play behaviour), a continuously swept θ across
 * frames (the camera-turn model), and membership churn (items leaving and
 * rejoining mid-run) - alone and combined.
 */

/**
 * asserts the toposorted order is a valid linear extension of the graph:
 * every UNBROKEN edge's back item must come before its front item. Broken
 * (cyclic) edges are exempt - breaking them is exactly how a cyclic graph
 * gets an order at all
 */
const assertOrderIsValidLinearExtension = (
  zEdges: FrameState["zEdges"],
  frameLabel: string,
) => {
  const order = zEdges.topologicalSortInPlace();
  const position = new Map<TestItem, number>();
  for (let i = 0; i < order.length; i++) {
    position.set(order[i], i);
  }
  for (let i = 0; i < zEdges.nodeCount; i++) {
    const back = zEdges.nodeAt(i);
    zEdges.forEachEdgeFrom(back, (front, broken) => {
      if (!broken) {
        expect(
          position.get(back)!,
          `${frameLabel}: unbroken edge ${back.id}->${front.id} violated by the toposorted order`,
        ).toBeLessThan(position.get(front)!);
      }
    });
  }
};

const assertMatchesOracle = ({
  frame,
  items,
  zEdges,
  cameraAngle,
  renderBoxes,
}: FrameState) => {
  const oracle = bruteForceZEdges(items, cameraAngle, renderBoxes);
  const frameLabel = `frame ${frame} at angle (${cameraAngle.x},${cameraAngle.y})`;
  expect(graphEdgeStrings(zEdges), frameLabel).toEqual(
    graphEdgeStrings(oracle),
  );
  assertOrderIsValidLinearExtension(zEdges, frameLabel);
};

test.for(quarterCameraAngles)(
  "pipeline zEdges equal the brute-force oracle at quarter angle ($x,$y)",
  (cameraAngle) => {
    runTest({
      angleForFrame: () => cameraAngle,
      onFrame: assertMatchesOracle,
    });
  },
);

test("pipeline zEdges equal the brute-force oracle with θ swept continuously across frames", () => {
  runTest({
    angleForFrame: sweptCameraAngleForFrame,
    onFrame: assertMatchesOracle,
  });
});

test("pipeline zEdges equal the brute-force oracle with membership churn", () => {
  runTest({
    membershipChurn: true,
    onFrame: assertMatchesOracle,
  });
});

test("pipeline zEdges equal the brute-force oracle with churn during a continuous sweep", () => {
  runTest({
    angleForFrame: sweptCameraAngleForFrame,
    membershipChurn: true,
    onFrame: assertMatchesOracle,
  });
});
