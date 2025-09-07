import { expect, test } from "vitest";

import { originXyz } from "../../../utils/vectors/vectors";
import { projectAabbAxes } from "./projectAabbCorners";

const unitCubeSize = { x: 1, y: 1, z: 1 };

test("allAxesProjections for unit cube at origin", () => {
  const projections = projectAabbAxes({}, originXyz, unitCubeSize);

  // projected size is always 2x2x2 for a unit cube

  expect(projections.xAxisProjectionMin).toBeCloseTo(-2);
  expect(projections.xAxisProjectionMax).toBeCloseTo(0);

  expect(projections.yAxisProjectionMin).toBeCloseTo(-2);
  expect(projections.yAxisProjectionMax).toBeCloseTo(0);

  // centred
  expect(projections.zAxisProjectionMin).toBeCloseTo(-1);
  expect(projections.zAxisProjectionMax).toBeCloseTo(1);
});

test("allAxesProjections for unit cube one unit up", () => {
  const projections = projectAabbAxes({}, { x: 0, y: 0, z: 1 }, unitCubeSize);

  // projected size is always 2x2x2 for a unit cube

  expect(projections.xAxisProjectionMin).toBeCloseTo(-3);
  expect(projections.xAxisProjectionMax).toBeCloseTo(-1);

  expect(projections.yAxisProjectionMin).toBeCloseTo(-3);
  expect(projections.yAxisProjectionMax).toBeCloseTo(-1);

  // unchanged from projection at origin - moved in z
  expect(projections.zAxisProjectionMin).toBeCloseTo(-1);
  expect(projections.zAxisProjectionMax).toBeCloseTo(1);
});

test("allAxesProjections for unit cube one unit over in x", () => {
  const projections = projectAabbAxes({}, { x: 1, y: 0, z: 0 }, unitCubeSize);

  // projected size is always 2x2x2 for a unit cube
  // should never change from origin projection in the axis we move in (x)
  expect(projections.xAxisProjectionMin).toBeCloseTo(-2);
  expect(projections.xAxisProjectionMax).toBeCloseTo(0);

  expect(projections.yAxisProjectionMin).toBeCloseTo(-3);
  expect(projections.yAxisProjectionMax).toBeCloseTo(-1);

  // unchanged from projection at origin - moved in z
  expect(projections.zAxisProjectionMin).toBeCloseTo(-2);
  expect(projections.zAxisProjectionMax).toBeCloseTo(0);
});

test("allAxesProjections for 2 in x cuboid at origin", () => {
  const projections = projectAabbAxes({}, originXyz, {
    x: 2,
    y: 1,
    z: 1,
  });

  // projected size is always 3x2x3 for a unit cube

  // should never change from origin projection in the axis we grew in (x)
  expect(projections.xAxisProjectionMin).toBeCloseTo(-2);
  expect(projections.xAxisProjectionMax).toBeCloseTo(0);

  // min is the same as when moved over in x:
  expect(projections.yAxisProjectionMin).toBeCloseTo(-3);
  expect(projections.yAxisProjectionMax).toBeCloseTo(0);

  expect(projections.zAxisProjectionMin).toBeCloseTo(-2);
  expect(projections.zAxisProjectionMax).toBeCloseTo(1);
});

test("floor and wall adjacent on y axis", () => {
  const projectionFloor = projectAabbAxes({}, originXyz, unitCubeSize);

  const projectionWall = projectAabbAxes(
    {},
    { x: 1, y: 0, z: 1 },
    unitCubeSize,
  );

  // not x-adjacent:
  expect(projectionFloor.xAxisProjectionMin).not.toBeCloseTo(
    projectionWall.xAxisProjectionMax,
  );

  // y-adjacent:
  expect(projectionFloor.yAxisProjectionMin).toBeCloseTo(
    projectionWall.yAxisProjectionMax,
  );
});

test("floor and wall adjacent on x axis", () => {
  const projectionFloor = projectAabbAxes({}, originXyz, unitCubeSize);

  const projectionWall = projectAabbAxes(
    {},
    { x: 0, y: 1, z: 1 },
    unitCubeSize,
  );

  // not y-adjacent:
  expect(projectionFloor.yAxisProjectionMin).not.toBeCloseTo(
    projectionWall.yAxisProjectionMax,
  );

  // x-adjacent:
  expect(projectionFloor.xAxisProjectionMin).toBeCloseTo(
    projectionWall.xAxisProjectionMax,
  );
});
