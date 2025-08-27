import { describe, expect, test } from "vitest";

import { type DrawOrderComparable } from "./DrawOrderComparable";
import { zComparator } from "./zComparator";
const unitCube = { x: 1, y: 1, z: 1 };

expect.extend({
  toBeInFrontOf(received: DrawOrderComparable, expected: DrawOrderComparable) {
    const { isNot } = this;
    return {
      // do not alter your "pass" based on isNot. Vitest does it for you
      pass: zComparator(received, expected) > 0,

      message: () =>
        `${received.id} is${isNot ? "" : " not"} in front of ${expected.id}`,
    };
  },
  toBeBehind(received: DrawOrderComparable, expected: DrawOrderComparable) {
    const { isNot } = this;
    return {
      // do not alter your "pass" based on isNot. Vitest does it for you
      pass: zComparator(received, expected) < 0,
      message: () =>
        `${received.id} is${isNot ? "" : " not"} behind ${expected.id}`,
    };
  },
  toHaveNoOrderPreferenceWith(
    received: DrawOrderComparable,
    expected: DrawOrderComparable,
  ) {
    const { isNot } = this;
    const result = zComparator(received, expected) === 0;
    return {
      // do not alter your "pass" based on isNot. Vitest does it for you
      pass: result,
      message: () =>
        `${received.id} ${
          isNot ? "has no order preference with"
          : result ? "is in front of"
          : "is behind"
        } ${expected.id} but expected no order preference`,
    };
  },
});

test("zComparator detects behind in x", () => {
  const behind: DrawOrderComparable = {
    id: "b",
    state: { position: { x: 1, y: 0, z: 0 } },
    aabb: unitCube,
  };
  const inFront: DrawOrderComparable = {
    id: "f",
    state: { position: { x: 0, y: 0, z: 0 } },
    aabb: unitCube,
  };

  expect(behind).toBeBehind(inFront);
  expect(inFront).toBeInFrontOf(behind);
});

test("zComparator detects behind in y", () => {
  const behind: DrawOrderComparable = {
    id: "b",
    state: { position: { x: 0, y: 1, z: 0 } },
    aabb: unitCube,
  };
  const inFront: DrawOrderComparable = {
    id: "f",
    state: { position: { x: 0, y: 0, z: 0 } },
    aabb: unitCube,
  };

  expect(behind).toBeBehind(inFront);
  expect(inFront).toBeInFrontOf(behind);
});

test("zComparator detects on top in z", () => {
  const bottom: DrawOrderComparable = {
    id: "b",
    state: { position: { x: 0, y: 0, z: 0 } },
    aabb: unitCube,
  };
  const top: DrawOrderComparable = {
    id: "f",
    state: { position: { x: 0, y: 0, z: 1 } },
    aabb: unitCube,
  };

  expect(bottom).toBeBehind(top);
  expect(top).toBeInFrontOf(bottom);
});

describe("items with fixedZIndex have no preference in ordering", () => {
  test("high fixed z index on first item", () => {
    const bottom: DrawOrderComparable = {
      id: "b",
      state: { position: { x: 0, y: 0, z: 0 } },
      aabb: unitCube,
      fixedZIndex: 100,
    };
    const top: DrawOrderComparable = {
      id: "f",
      state: { position: { x: 0, y: 0, z: 1 } },
      aabb: unitCube,
    };

    expect(bottom).toHaveNoOrderPreferenceWith(top);
    expect(top).toHaveNoOrderPreferenceWith(bottom);
  });
  test("negative fixed z index on second item", () => {
    const bottom: DrawOrderComparable = {
      id: "b",
      state: { position: { x: 0, y: 0, z: 0 } },
      aabb: unitCube,
    };
    const top: DrawOrderComparable = {
      id: "f",
      state: { position: { x: 0, y: 0, z: 1 } },
      aabb: unitCube,
      fixedZIndex: -1,
    };

    expect(bottom).toHaveNoOrderPreferenceWith(top);
    expect(top).toHaveNoOrderPreferenceWith(bottom);
  });
});

test("zComparator gives no order preference for non-visually-overlapping diagonally left/right in x,y", () => {
  const right: DrawOrderComparable = {
    id: "b",
    state: { position: { x: 0, y: 1, z: 0 } },
    aabb: unitCube,
  };
  const left: DrawOrderComparable = {
    id: "f",
    state: { position: { x: 1, y: 0, z: 0 } },
    aabb: unitCube,
  };

  expect(right).toHaveNoOrderPreferenceWith(left);
  expect(left).toHaveNoOrderPreferenceWith(right);
});

test("zComparator order preference for slightly-visually-overlapping diagonally left/right in x,y (x-overlap)", () => {
  const right: DrawOrderComparable = {
    id: "b",
    state: { position: { x: 0, y: 1, z: 0 } },
    aabb: unitCube,
  };
  const left: DrawOrderComparable = {
    id: "f",
    state: { position: { x: 0.9, y: 0, z: 0 } },
    aabb: unitCube,
  };

  expect(right).toBeBehind(left);
  expect(left).toBeInFrontOf(right);
});

test("zComparator order preference for slightly-visually-overlapping diagonally left/right in x,y (y-overlap)", () => {
  const right: DrawOrderComparable = {
    id: "b",
    state: { position: { x: 0, y: 0.9, z: 0 } },
    aabb: unitCube,
  };
  const left: DrawOrderComparable = {
    id: "f",
    state: { position: { x: 1, y: 0, z: 0 } },
    aabb: unitCube,
  };

  expect(right).toBeInFrontOf(left);
  expect(left).toBeBehind(right);
});

test("zComparator gives a preference for non-visually-overlapping  but adjacent along y axis - coincident in x,z (eg, wall/floor case)", () => {
  // these are adjacent, along their diagonally-rendered edges

  const wall: DrawOrderComparable = {
    id: "wall",
    state: { position: { x: 1, y: 0, z: 1 } },
    aabb: unitCube,
  };
  const floor: DrawOrderComparable = {
    id: "floor",
    state: { position: { x: 0, y: 0, z: 0 } },
    aabb: unitCube,
  };

  expect(wall).toBeInFrontOf(floor);
  expect(floor).toBeBehind(wall);
});

test("zComparator gives no preference for not-quite-adjacent in x,z when the gap is bigger", () => {
  // these are adjacent, along their diagonally-rendered edges

  const wall: DrawOrderComparable = {
    id: "wall",
    state: { position: { x: 1, y: 0, z: 1.1 } },
    aabb: unitCube,
  };
  const floor: DrawOrderComparable = {
    id: "floor",
    state: { position: { x: 0, y: 0, z: 0 } },
    aabb: unitCube,
  };

  expect(wall).toHaveNoOrderPreferenceWith(floor);
  expect(floor).toHaveNoOrderPreferenceWith(wall);
});

test("zComparator gives order preference for slightly-visually-overlapping diagonally adjacent in x,z (x-overlap)", () => {
  // these are adjacent, along their diagonally-rendered edges

  const backTop: DrawOrderComparable = {
    id: "b",
    state: { position: { x: 0.9, y: 0, z: 1 } },
    aabb: unitCube,
  };
  const frontLow: DrawOrderComparable = {
    id: "f",
    state: { position: { x: 0, y: 0, z: 0 } },
    aabb: unitCube,
  };

  expect(backTop).toBeInFrontOf(frontLow);
  expect(frontLow).toBeBehind(backTop);
});

test("zComparator gives order preference for slightly-visually-overlapping diagonally adjacent in x,z (z-overlap)", () => {
  // these are adjacent, along their diagonally-rendered edges

  const backTop: DrawOrderComparable = {
    id: "b",
    state: { position: { x: 1, y: 0, z: 0.9 } },
    aabb: unitCube,
  };
  const frontLow: DrawOrderComparable = {
    id: "f",
    state: { position: { x: 0, y: 0, z: 0 } },
    aabb: unitCube,
  };

  expect(backTop).toBeBehind(frontLow);
  expect(frontLow).toBeInFrontOf(backTop);
});

test("zComparator gives a preference for non-visually-overlapping  but adjacent along x axis - coincident in y,z (eg, wall/floor case)", () => {
  // these are adjacent, along their diagonally-rendered edges

  const wall: DrawOrderComparable = {
    id: "wall",
    state: { position: { x: 0, y: 1, z: 1 } },
    aabb: unitCube,
  };
  const floor: DrawOrderComparable = {
    id: "floor",
    state: { position: { x: 0, y: 0, z: 0 } },
    aabb: unitCube,
  };

  expect(wall).toBeInFrontOf(floor);
  expect(floor).toBeBehind(wall);
});

test("zComparator gives order preference for slightly-visually-overlapping diagonally adjacent in y,z (y-overlap)", () => {
  // these are adjacent, along their diagonally-rendered edges, but slightly visually overlapping:

  const leftTop: DrawOrderComparable = {
    id: "b",
    state: { position: { x: 0, y: 0.9, z: 1 } },
    aabb: unitCube,
  };
  const rightLow: DrawOrderComparable = {
    id: "f",
    state: { position: { x: 0, y: 0, z: 0 } },
    aabb: unitCube,
  };

  expect(leftTop).toBeInFrontOf(rightLow);
  expect(rightLow).toBeBehind(leftTop);
});

test("zComparator gives no order preference for slightly-visually-overlapping diagonally adjacent in y,z (z-overlap)", () => {
  // these are adjacent, along their diagonally-rendered edges

  const leftTop: DrawOrderComparable = {
    id: "b",
    state: { position: { x: 0, y: 1, z: 0.9 } },
    aabb: unitCube,
  };
  const rightLow: DrawOrderComparable = {
    id: "f",
    state: { position: { x: 0, y: 0, z: 0 } },
    aabb: unitCube,
  };

  expect(leftTop).toBeBehind(rightLow);
  expect(rightLow).toBeInFrontOf(leftTop);
});
