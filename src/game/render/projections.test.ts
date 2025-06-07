import { describe, expect, test } from "vitest";
import type { OrthoPlane, Xy, Xyz } from "../../utils/vectors/vectors";
import { originXyz } from "../../utils/vectors/vectors";
import { unprojectScreenXyToWorldXyzOnFace } from "./projections";

const smallCubeAabb: Xyz = {
  x: 10,
  y: 10,
  z: 10,
};

describe("unprojectScreenXyToWorldXyzOnFace", () => {
  type TestParams = {
    desc: string;
    screen: Xy;
    itemPosition: Xyz;
    itemAabb: Xyz;
    face: OrthoPlane;
    expected: Xyz;
  };

  const runTest = ({
    face,
    itemPosition,
    itemAabb,
    screen,
    expected,
  }: TestParams) => {
    expect(
      unprojectScreenXyToWorldXyzOnFace(screen, itemPosition, itemAabb, face),
    ).toMatchObject({
      x: expect.closeTo(expected.x, 6),
      y: expect.closeTo(expected.y, 6),
      z: expect.closeTo(expected.z, 6),
    });
  };
  const testDesc =
    "$desc : unprojectScreenXyToWorldXyzOnFace(screen=$screen, position=$itemPosition, aabb=$itemAabb, face=$face) = $expected";

  describe("xy(top) face", () => {
    describe("item at origin", () => {
      test.each<TestParams>([
        {
          desc: "front corner",
          screen: { x: 0, y: -10 },
          itemPosition: originXyz,
          itemAabb: smallCubeAabb,
          face: "xy",
          expected: { x: 0, y: 0, z: 10 },
        },
        {
          desc: "back corner",
          screen: { x: 0, y: -20 },
          itemPosition: originXyz,
          itemAabb: smallCubeAabb,
          face: "xy",
          expected: { x: 10, y: 10, z: 10 },
        },
        {
          desc: "visually left corner",
          screen: { x: -10, y: -15 },
          itemPosition: originXyz,
          itemAabb: smallCubeAabb,
          face: "xy",
          expected: { x: 10, y: 0, z: 10 },
        },
      ])(testDesc, runTest);
    });
  });
});
