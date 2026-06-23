import { describe, expect, test } from "vitest";

import { type Plane, type Xy, type Xyz } from "../../../utils/vectors/vectors";
import {
  betweenLeftAndTowards,
  betweenRightAndAway,
  betweenRightAndDown,
  betweenRightAndTowards,
  betweenRightAndUp,
  betweenTowardsAndDown,
  betweenTowardsAndUp,
  betweenUpAndAway,
  betweenUpAndLeft,
} from "./pointerIntersectionEdge";
import { resizeCursorForPointingAt } from "./resizeCursorForPointingAt";

const cameraAngleBase = { x: 1, y: 0 };

describe("at the base camera angle", () => {
  test("the top-far corner gives the up/down resize cursor", () => {
    expect(
      resizeCursorForPointingAt(
        { face: { x: 0, y: 0, z: 1 }, corner: { x: 1, y: 1, z: 1 } },
        cameraAngleBase,
      ),
    ).toBe("cursor-n-resize");
  });

  test("other corners give no resize cursor", () => {
    expect(
      resizeCursorForPointingAt(
        { face: { x: 0, y: -1, z: 0 }, corner: { x: 0, y: 0, z: 0 } },
        cameraAngleBase,
      ),
    ).toBeUndefined();
  });

  test("no corner or edge gives no resize cursor", () => {
    expect(
      resizeCursorForPointingAt(
        { face: { x: 0, y: 0, z: 1 } },
        cameraAngleBase,
      ),
    ).toBeUndefined();
  });

  const baseEdgeCursorCases: Array<{
    edgeName: string;
    edge: Plane;
    expectedCursor: `cursor-${string}`;
  }> = [
    {
      edgeName: "betweenRightAndAway",
      edge: betweenRightAndAway,
      expectedCursor: "cursor-e-resize",
    },
    {
      edgeName: "betweenRightAndTowards",
      edge: betweenRightAndTowards,
      expectedCursor: "cursor-s-resize",
    },
    {
      edgeName: "betweenLeftAndTowards",
      edge: betweenLeftAndTowards,
      expectedCursor: "cursor-w-resize",
    },
    {
      edgeName: "betweenRightAndUp",
      edge: betweenRightAndUp,
      expectedCursor: "cursor-ne-resize",
    },
    {
      edgeName: "betweenUpAndAway",
      edge: betweenUpAndAway,
      expectedCursor: "cursor-ne-resize",
    },
    {
      edgeName: "betweenTowardsAndUp",
      edge: betweenTowardsAndUp,
      expectedCursor: "cursor-nw-resize",
    },
    {
      edgeName: "betweenUpAndLeft",
      edge: betweenUpAndLeft,
      expectedCursor: "cursor-nw-resize",
    },
    {
      edgeName: "betweenRightAndDown",
      edge: betweenRightAndDown,
      expectedCursor: "cursor-se-resize",
    },
    {
      edgeName: "betweenTowardsAndDown",
      edge: betweenTowardsAndDown,
      expectedCursor: "cursor-sw-resize",
    },
  ];

  test.for(baseEdgeCursorCases)(
    "$edgeName edge gives $expectedCursor",
    ({ edge, expectedCursor }) => {
      expect(
        resizeCursorForPointingAt(
          { face: { x: 0, y: -1, z: 0 }, edge },
          cameraAngleBase,
        ),
      ).toBe(expectedCursor);
    },
  );
});

describe("at every camera angle", () => {
  /**
   * the nearest vertical edge of a block: whichever physical edge that is at
   * the current angle, the cursor is always the up/down (s-resize) arrow
   */
  const nearVerticalEdgeCases: Array<{ cameraAngle: Xy; physicalEdge: Plane }> =
    [
      {
        cameraAngle: { x: 1, y: 0 },
        physicalEdge: {
          point: { x: -1, y: -1, z: 0 },
          normal: { x: 0, y: 0, z: 1 },
        },
      },
      {
        cameraAngle: { x: 0, y: 1 },
        physicalEdge: {
          point: { x: -1, y: 1, z: 0 },
          normal: { x: 0, y: 0, z: 1 },
        },
      },
      {
        cameraAngle: { x: -1, y: 0 },
        physicalEdge: {
          point: { x: 1, y: 1, z: 0 },
          normal: { x: 0, y: 0, z: 1 },
        },
      },
      {
        cameraAngle: { x: 0, y: -1 },
        physicalEdge: {
          point: { x: 1, y: -1, z: 0 },
          normal: { x: 0, y: 0, z: 1 },
        },
      },
    ];

  test.for(nearVerticalEdgeCases)(
    "nearest vertical edge always gives the up/down cursor (camera angle $cameraAngle.x,$cameraAngle.y)",
    ({ cameraAngle, physicalEdge }) => {
      expect(
        resizeCursorForPointingAt(
          { face: { x: 0, y: -1, z: 0 }, edge: physicalEdge },
          cameraAngle,
        ),
      ).toBe("cursor-s-resize");
    },
  );

  /**
   * the corner appearing at the top of the screen: whichever physical corner
   * that is at the current angle, it gives the n-resize cursor
   */
  const apparentTopCornerCases: Array<{
    cameraAngle: Xy;
    physicalCorner: Xyz;
  }> = [
    { cameraAngle: { x: 1, y: 0 }, physicalCorner: { x: 1, y: 1, z: 1 } },
    { cameraAngle: { x: 0, y: 1 }, physicalCorner: { x: 1, y: 0, z: 1 } },
    { cameraAngle: { x: -1, y: 0 }, physicalCorner: { x: 0, y: 0, z: 1 } },
    { cameraAngle: { x: 0, y: -1 }, physicalCorner: { x: 0, y: 1, z: 1 } },
  ];

  test.for(apparentTopCornerCases)(
    "the apparent top corner gives the n-resize cursor (camera angle $cameraAngle.x,$cameraAngle.y)",
    ({ cameraAngle, physicalCorner }) => {
      expect(
        resizeCursorForPointingAt(
          { face: { x: 0, y: 0, z: 1 }, corner: physicalCorner },
          cameraAngle,
        ),
      ).toBe("cursor-n-resize");
    },
  );

  test("the physical (1,1,1) corner is not the apparent top at 180°, so gives no cursor", () => {
    expect(
      resizeCursorForPointingAt(
        { face: { x: 0, y: 0, z: 1 }, corner: { x: 1, y: 1, z: 1 } },
        { x: -1, y: 0 },
      ),
    ).toBeUndefined();
  });

  /**
   * the top face's screen-right silhouette edge: always the ne-resize cursor,
   * whichever physical edge it is
   */
  const apparentTopRightEdgeCases: Array<{
    cameraAngle: Xy;
    physicalEdge: Plane;
  }> = [
    {
      cameraAngle: { x: 1, y: 0 },
      physicalEdge: {
        point: { x: 0, y: 1, z: 1 },
        normal: { x: 1, y: 0, z: 0 },
      },
    },
    {
      cameraAngle: { x: 0, y: 1 },
      physicalEdge: {
        point: { x: 1, y: 0, z: 1 },
        normal: { x: 0, y: -1, z: 0 },
      },
    },
    {
      cameraAngle: { x: -1, y: 0 },
      physicalEdge: {
        point: { x: 0, y: -1, z: 1 },
        normal: { x: -1, y: 0, z: 0 },
      },
    },
    {
      cameraAngle: { x: 0, y: -1 },
      physicalEdge: {
        point: { x: -1, y: 0, z: 1 },
        normal: { x: 0, y: 1, z: 0 },
      },
    },
  ];

  test.for(apparentTopRightEdgeCases)(
    "top face's screen-right edge always gives the ne-resize cursor (camera angle $cameraAngle.x,$cameraAngle.y)",
    ({ cameraAngle, physicalEdge }) => {
      expect(
        resizeCursorForPointingAt(
          { face: { x: 0, y: 0, z: 1 }, edge: physicalEdge },
          cameraAngle,
        ),
      ).toBe("cursor-ne-resize");
    },
  );
});
