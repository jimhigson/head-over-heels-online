import { describe, expect, test } from "vitest";

import { allCameraAngles } from "../../utils/vectors/rotateXy";
import { type Xyz } from "../../utils/vectors/vectors";
import {
  projectWorldXyzToScreenXy,
  unprojectScreenXyToWorldXyz,
  unprojectScreenXyToWorldXyzOnFace,
} from "./projections";

/* define some places using the normal vector to the plane */
const xyPlane = { x: 0, y: 0, z: 1 };
const xzPlane = { x: 0, y: 1, z: 0 };
const yzPlane = { x: 1, y: 0, z: 0 };

describe("unprojectScreenXyToWorldXyzOnFace", () => {
  // these tests are half-tdd and work by capturing the working of a
  // known-working (validated empirically) system in snapshots but can
  // be used to check future refactors don't break things that were
  // already working

  describe("xy(top) face", () => {
    test("point1", () => {
      expect(unprojectScreenXyToWorldXyz(xyPlane, { x: 0, y: -10 })).toEqual({
        x: expect.closeTo(10),
        y: expect.closeTo(10),
        z: expect.closeTo(0),
      });
    });

    test("point2", () => {
      expect(unprojectScreenXyToWorldXyz(xyPlane, { x: 0, y: -20 })).toEqual({
        x: expect.closeTo(20),
        y: expect.closeTo(20),
        z: expect.closeTo(0),
      });
    });

    test("point3", () => {
      expect(unprojectScreenXyToWorldXyz(xyPlane, { x: -10, y: -15 })).toEqual({
        x: expect.closeTo(20),
        y: expect.closeTo(10),
        z: expect.closeTo(0),
      });
    });
  });

  describe("xz (towards) face", () => {
    test("point1", () => {
      expect(unprojectScreenXyToWorldXyz(xzPlane, { x: 0, y: -10 })).toEqual({
        x: expect.closeTo(0),
        y: expect.closeTo(0),
        z: expect.closeTo(10),
      });
    });

    test("point2", () => {
      expect(unprojectScreenXyToWorldXyz(xzPlane, { x: 0, y: -20 })).toEqual({
        x: expect.closeTo(0),
        y: expect.closeTo(0),
        z: expect.closeTo(20),
      });
    });

    test("point3", () => {
      expect(unprojectScreenXyToWorldXyz(xzPlane, { x: -10, y: -15 })).toEqual({
        x: expect.closeTo(10),
        y: expect.closeTo(0),
        z: expect.closeTo(10),
      });
    });
  });

  describe("yz (towards) face", () => {
    test("point1", () => {
      expect(unprojectScreenXyToWorldXyz(yzPlane, { x: 0, y: -10 })).toEqual({
        x: expect.closeTo(0),
        y: expect.closeTo(0),
        z: expect.closeTo(10),
      });
    });

    test("point2", () => {
      expect(unprojectScreenXyToWorldXyz(yzPlane, { x: 0, y: -20 })).toEqual({
        x: expect.closeTo(0),
        y: expect.closeTo(0),
        z: expect.closeTo(20),
      });
    });

    test("point3", () => {
      expect(unprojectScreenXyToWorldXyz(yzPlane, { x: -10, y: -15 })).toEqual({
        x: expect.closeTo(0),
        y: expect.closeTo(-10),
        z: expect.closeTo(20),
      });
    });
  });
});

describe("unprojectScreenXyToWorldXyzOnFace at every camera angle", () => {
  /**
   * projecting a world point on a face to the screen, then unprojecting the
   * screen point back onto the same face, recovers the original world point -
   * at any camera angle
   */
  const roundTripCases: Array<{
    describeFace: string;
    pointOnPlane: Xyz;
    plane: Xyz;
    worldPoint: Xyz;
  }> = [
    {
      describeFace: "top (xy) face",
      pointOnPlane: { x: 0, y: 0, z: 24 },
      plane: { x: 0, y: 0, z: 1 },
      worldPoint: { x: 16, y: 32, z: 24 },
    },
    {
      describeFace: "right (yz) face",
      pointOnPlane: { x: 16, y: 0, z: 0 },
      plane: { x: -1, y: 0, z: 0 },
      worldPoint: { x: 16, y: 8, z: 10 },
    },
    {
      describeFace: "towards (xz) face",
      pointOnPlane: { x: 0, y: 32, z: 0 },
      plane: { x: 0, y: -1, z: 0 },
      worldPoint: { x: 12, y: 32, z: 20 },
    },
    {
      describeFace: "away (xz) face",
      pointOnPlane: { x: 0, y: 48, z: 0 },
      plane: { x: 0, y: 1, z: 0 },
      worldPoint: { x: 20, y: 48, z: 4 },
    },
  ];

  test.for(
    allCameraAngles.flatMap((cameraAngle) =>
      roundTripCases.map((roundTripCase) => ({
        cameraAngle,
        ...roundTripCase,
      })),
    ),
  )(
    "$describeFace round-trips (camera angle $cameraAngle.x,$cameraAngle.y)",
    ({ cameraAngle, pointOnPlane, plane, worldPoint }) => {
      const scr = projectWorldXyzToScreenXy(worldPoint, cameraAngle);
      expect(
        unprojectScreenXyToWorldXyzOnFace(
          pointOnPlane,
          plane,
          scr,
          cameraAngle,
        ),
      ).toEqual({
        x: expect.closeTo(worldPoint.x),
        y: expect.closeTo(worldPoint.y),
        z: expect.closeTo(worldPoint.z),
      });
    },
  );
});
