import { describe, expect, test } from "vitest";

import {
  addXy,
  type Plane,
  type Xy,
  type Xyz,
} from "../../../utils/vectors/vectors";
import {
  apparentSilhouette,
  blockRoomAtAngle,
  pointerTool,
} from "./__test__/blockRoomAtAngle";
import { pointerIntersectionEdge } from "./pointerIntersectionEdge";

const cameraAngleBase = { x: 1, y: 0 };

describe("at the base camera angle", () => {
  const { block } = blockRoomAtAngle(cameraAngleBase);
  const silhouette = apparentSilhouette(block, cameraAngleBase);

  test("near vertical edge between right and towards faces", () => {
    expect(
      pointerIntersectionEdge(
        block,
        addXy(silhouette.bottomCentre, { x: 0, y: -4 }),
        { x: 0, y: -1, z: 0 },
        pointerTool,
        cameraAngleBase,
      ),
    ).toEqual<Plane>({
      point: { x: -1, y: -1, z: 0 },
      normal: { x: 0, y: 0, z: 1 },
    });
  });

  test("edge between right and up faces", () => {
    expect(
      pointerIntersectionEdge(
        block,
        addXy(silhouette.topRight, { x: -4, y: 2 }),
        { x: -1, y: 0, z: 0 },
        pointerTool,
        cameraAngleBase,
      ),
    ).toEqual<Plane>({
      point: { x: -1, y: 0, z: 1 },
      normal: { x: 0, y: 1, z: 0 },
    });
  });

  test("edge between up and away faces", () => {
    expect(
      pointerIntersectionEdge(
        block,
        addXy(silhouette.topCorner.scr, { x: 4, y: 2 }),
        { x: 0, y: 0, z: 1 },
        pointerTool,
        cameraAngleBase,
      ),
    ).toEqual<Plane>({
      point: { x: 0, y: 1, z: 1 },
      normal: { x: 1, y: 0, z: 0 },
    });
  });
});

describe("at every camera angle, the physical edge plane is returned", () => {
  /**
   * the near vertical silhouette edge, per angle: the physical plane is the
   * base-angle `betweenRightAndTowards` plane rotated back into world space
   */
  const nearVerticalEdgeCases: Array<{
    cameraAngle: Xy;
    apparentTowards: Xyz;
    expectedPlane: Plane;
  }> = [
    {
      cameraAngle: { x: 1, y: 0 },
      apparentTowards: { x: 0, y: -1, z: 0 },
      expectedPlane: {
        point: { x: -1, y: -1, z: 0 },
        normal: { x: 0, y: 0, z: 1 },
      },
    },
    {
      cameraAngle: { x: 0, y: 1 },
      apparentTowards: { x: -1, y: 0, z: 0 },
      expectedPlane: {
        point: { x: -1, y: 1, z: 0 },
        normal: { x: 0, y: 0, z: 1 },
      },
    },
    {
      cameraAngle: { x: -1, y: 0 },
      apparentTowards: { x: 0, y: 1, z: 0 },
      expectedPlane: {
        point: { x: 1, y: 1, z: 0 },
        normal: { x: 0, y: 0, z: 1 },
      },
    },
    {
      cameraAngle: { x: 0, y: -1 },
      apparentTowards: { x: 1, y: 0, z: 0 },
      expectedPlane: {
        point: { x: 1, y: -1, z: 0 },
        normal: { x: 0, y: 0, z: 1 },
      },
    },
  ];

  test.for(nearVerticalEdgeCases)(
    "near vertical edge (camera angle $cameraAngle.x,$cameraAngle.y)",
    ({ cameraAngle, apparentTowards, expectedPlane }) => {
      const { block } = blockRoomAtAngle(cameraAngle);
      const { bottomCentre } = apparentSilhouette(block, cameraAngle);

      expect(
        pointerIntersectionEdge(
          block,
          addXy(bottomCentre, { x: 0, y: -4 }),
          apparentTowards,
          pointerTool,
          cameraAngle,
        ),
      ).toEqual(expectedPlane);
    },
  );

  /**
   * the upper-right silhouette edge of the top face, per angle: the base-angle
   * `betweenUpAndAway` plane rotated back into world space
   */
  const topRightEdgeCases: Array<{
    cameraAngle: Xy;
    expectedPlane: Plane;
  }> = [
    {
      cameraAngle: { x: 1, y: 0 },
      expectedPlane: {
        point: { x: 0, y: 1, z: 1 },
        normal: { x: 1, y: 0, z: 0 },
      },
    },
    {
      cameraAngle: { x: 0, y: 1 },
      expectedPlane: {
        point: { x: 1, y: 0, z: 1 },
        normal: { x: 0, y: -1, z: 0 },
      },
    },
    {
      cameraAngle: { x: -1, y: 0 },
      expectedPlane: {
        point: { x: 0, y: -1, z: 1 },
        normal: { x: -1, y: 0, z: 0 },
      },
    },
    {
      cameraAngle: { x: 0, y: -1 },
      expectedPlane: {
        point: { x: -1, y: 0, z: 1 },
        normal: { x: 0, y: 1, z: 0 },
      },
    },
  ];

  test.for(topRightEdgeCases)(
    "top face's screen-right edge (camera angle $cameraAngle.x,$cameraAngle.y)",
    ({ cameraAngle, expectedPlane }) => {
      const { block } = blockRoomAtAngle(cameraAngle);
      const { topCorner } = apparentSilhouette(block, cameraAngle);

      expect(
        pointerIntersectionEdge(
          block,
          addXy(topCorner.scr, { x: 4, y: 2 }),
          { x: 0, y: 0, z: 1 },
          pointerTool,
          cameraAngle,
        ),
      ).toEqual(expectedPlane);
    },
  );
});
