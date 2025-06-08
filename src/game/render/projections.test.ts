import { describe, expect, test } from "vitest";
import type { OrthoPlane, Xy, Xyz } from "../../utils/vectors/vectors";
import { originXyz } from "../../utils/vectors/vectors";
import { unprojectScreenXyToWorldXyzOnFace } from "./projections";

describe("unprojectScreenXyToWorldXyzOnFace", () => {
  type TestParams = {
    desc: string;
    screen: Xy;
    itemPosition: Xyz;
    face: OrthoPlane;
  };

  const runTest = ({ face, itemPosition, screen }: TestParams) => {
    expect(
      unprojectScreenXyToWorldXyzOnFace(screen, itemPosition, face),
    ).toMatchSnapshot();
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
          face: "xy",
        },
        {
          desc: "back corner",
          screen: { x: 0, y: -20 },
          itemPosition: originXyz,
          face: "xy",
        },
        {
          desc: "visually left corner",
          screen: { x: -10, y: -15 },
          itemPosition: originXyz,
          face: "xy",
        },
      ])(testDesc, runTest);
    });
  });
});
