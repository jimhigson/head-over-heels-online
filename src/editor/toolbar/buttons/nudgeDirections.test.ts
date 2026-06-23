import { describe, expect, test } from "vitest";

import { type Xy } from "../../../utils/vectors/vectors";
import {
  apparentGrowArgs,
  apparentMoveVector,
  apparentNudgeAxis,
  apparentShrinkArgs,
} from "./nudgeDirections";

const cameraAngleBase: Xy = { x: 1, y: 0 };

describe("at the base camera angle (matches the pre-rotation behaviour)", () => {
  test("move left is +x", () => {
    expect(apparentMoveVector("left", cameraAngleBase)).toEqual({
      x: 1,
      y: 0,
      z: 0,
    });
  });

  test("move right is -x", () => {
    expect(apparentMoveVector("right", cameraAngleBase)).toEqual({
      x: -1,
      y: 0,
      z: 0,
    });
  });

  test("move away is +y", () => {
    expect(apparentMoveVector("away", cameraAngleBase)).toEqual({
      x: 0,
      y: 1,
      z: 0,
    });
  });

  test("move towards is -y", () => {
    expect(apparentMoveVector("towards", cameraAngleBase)).toEqual({
      x: 0,
      y: -1,
      z: 0,
    });
  });

  test("grow left extends on the +x side", () => {
    expect(apparentGrowArgs("left", cameraAngleBase)).toEqual({
      timesDelta: { x: 1 },
    });
  });

  test("grow right extends on the -x side", () => {
    expect(apparentGrowArgs("right", cameraAngleBase)).toEqual({
      posVector: { x: -1, y: 0, z: 0 },
      timesDelta: { x: 1 },
    });
  });

  test("grow towards extends on the -y side", () => {
    expect(apparentGrowArgs("towards", cameraAngleBase)).toEqual({
      posVector: { x: 0, y: -1, z: 0 },
      timesDelta: { y: 1 },
    });
  });

  test("shrink right pulls the far edge in", () => {
    expect(apparentShrinkArgs("right", cameraAngleBase)).toEqual({
      timesDelta: { x: -1 },
    });
  });

  test("shrink left pulls the near edge in", () => {
    expect(apparentShrinkArgs("left", cameraAngleBase)).toEqual({
      posVector: { x: 1, y: 0, z: 0 },
      timesDelta: { x: -1 },
    });
  });

  test("shrink away pulls the towards edge in", () => {
    expect(apparentShrinkArgs("away", cameraAngleBase)).toEqual({
      posVector: { x: 0, y: 1, z: 0 },
      timesDelta: { y: -1 },
    });
  });

  test("the left/right buttons act on the x axis", () => {
    expect(apparentNudgeAxis("left", cameraAngleBase)).toBe("x");
  });

  test("the away/towards buttons act on the y axis", () => {
    expect(apparentNudgeAxis("towards", cameraAngleBase)).toBe("y");
  });
});

describe("at rotated camera angles, the physical axes follow the view", () => {
  /**
   * pressing ← always moves the item towards the screen's upper-left: the
   * world direction that renders there at each angle
   */
  test.for([
    { cameraAngle: { x: 1, y: 0 }, expected: { x: 1, y: 0, z: 0 } },
    { cameraAngle: { x: 0, y: 1 }, expected: { x: 0, y: -1, z: 0 } },
    { cameraAngle: { x: -1, y: 0 }, expected: { x: -1, y: 0, z: 0 } },
    { cameraAngle: { x: 0, y: -1 }, expected: { x: 0, y: 1, z: 0 } },
  ])(
    "move left (camera angle $cameraAngle.x,$cameraAngle.y)",
    ({ cameraAngle, expected }) => {
      expect(apparentMoveVector("left", cameraAngle)).toEqual(expected);
    },
  );

  test("at 90°, grow left extends on the -y side", () => {
    expect(apparentGrowArgs("left", { x: 0, y: 1 })).toEqual({
      posVector: { x: 0, y: -1, z: 0 },
      timesDelta: { y: 1 },
    });
  });

  test("at 90°, shrink left acts on the y axis", () => {
    expect(apparentShrinkArgs("left", { x: 0, y: 1 })).toEqual({
      timesDelta: { y: -1 },
    });
  });

  test("at 180°, move left is -x (mirrored)", () => {
    expect(apparentMoveVector("left", { x: -1, y: 0 })).toEqual({
      x: -1,
      y: 0,
      z: 0,
    });
  });

  test("at 180°, grow left extends on the -x side", () => {
    expect(apparentGrowArgs("left", { x: -1, y: 0 })).toEqual({
      posVector: { x: -1, y: 0, z: 0 },
      timesDelta: { x: 1 },
    });
  });

  test("at 90°, the left/right buttons act on the y axis", () => {
    expect(apparentNudgeAxis("left", { x: 0, y: 1 })).toBe("y");
  });

  test("at 90°, the away/towards buttons act on the x axis", () => {
    expect(apparentNudgeAxis("away", { x: 0, y: 1 })).toBe("x");
  });
});
