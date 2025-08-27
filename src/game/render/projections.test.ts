import { describe, expect, test } from "vitest";

import { unprojectScreenXyToWorldXyz } from "./projections";

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
