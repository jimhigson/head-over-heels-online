import { describe, expect, test } from "vitest";
import { zComparator } from "./zComparator";
import { type DrawOrderComparable } from "./DrawOrderComparable";
const unitCube = { x: 1, y: 1, z: 1 };

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

  expect(zComparator(behind, inFront)).toBeLessThan(0);
  expect(zComparator(inFront, behind)).toBeGreaterThan(0);
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

  expect(zComparator(behind, inFront)).toBeLessThan(0);
  expect(zComparator(inFront, behind)).toBeGreaterThan(0);
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

  expect(zComparator(bottom, top)).toBeLessThan(0);
  expect(zComparator(top, bottom)).toBeGreaterThan(0);
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

    expect(zComparator(bottom, top)).toBe(0);
    expect(zComparator(top, bottom)).toBe(0);
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

    expect(zComparator(bottom, top)).toBe(0);
    expect(zComparator(top, bottom)).toBe(0);
  });
});

test("zComparator gives no order preference for non-overlapping diagonally left/right in x,y", () => {
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

  expect(zComparator(right, left)).toEqual(0);
  expect(zComparator(left, right)).toEqual(0);
});

test("zComparator order preference for slightly-overlapping diagonally left/right in x,y (x-overlap)", () => {
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

  expect(zComparator(right, left)).toBeLessThan(0);
  expect(zComparator(left, right)).toBeGreaterThan(0);
});

test("zComparator order preference for slightly-overlapping diagonally left/right in x,y (y-overlap)", () => {
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

  expect(zComparator(right, left)).toBeGreaterThan(0);
  expect(zComparator(left, right)).toBeLessThan(0);
});

test("zComparator gives no order preference for non-overlapping diagonally adjacent in x,z", () => {
  // these are adjacent, along their diagonally-rendered edges

  const backTop: DrawOrderComparable = {
    id: "b",
    state: { position: { x: 1, y: 0, z: 1 } },
    aabb: unitCube,
  };
  const frontLow: DrawOrderComparable = {
    id: "f",
    state: { position: { x: 0, y: 0, z: 0 } },
    aabb: unitCube,
  };

  expect(zComparator(backTop, frontLow)).toEqual(0);
  expect(zComparator(frontLow, backTop)).toEqual(0);
});

test("zComparator gives order preference for slightly-overlapping diagonally adjacent in x,z (x-overlap)", () => {
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

  expect(zComparator(backTop, frontLow)).toBeGreaterThan(0);
  expect(zComparator(frontLow, backTop)).toBeLessThan(0);
});

test("zComparator gives order preference for slightly-overlapping diagonally adjacent in x,z (z-overlap)", () => {
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

  expect(zComparator(backTop, frontLow)).toBeLessThan(0);
  expect(zComparator(frontLow, backTop)).toBeGreaterThan(0);
});

test("zComparator gives no order preference for non-overlapping diagonally adjacent in y,z", () => {
  // these are adjacent, along their diagonally-rendered edges

  const leftTop: DrawOrderComparable = {
    id: "b",
    state: { position: { x: 0, y: 1, z: 1 } },
    aabb: unitCube,
  };
  const rightLow: DrawOrderComparable = {
    id: "f",
    state: { position: { x: 0, y: 0, z: 0 } },
    aabb: unitCube,
  };

  expect(zComparator(leftTop, rightLow)).toEqual(0);
  expect(zComparator(rightLow, leftTop)).toEqual(0);
});

test("zComparator gives no order preference for slightly-overlapping diagonally adjacent in y,z (y-overlap)", () => {
  // these are adjacent, along their diagonally-rendered edges

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

  expect(zComparator(leftTop, rightLow)).toBeGreaterThan(0);
  expect(zComparator(rightLow, leftTop)).toBeLessThan(0);
});

test("zComparator gives no order preference for slightly-overlapping diagonally adjacent in y,z (z-overlap)", () => {
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

  expect(zComparator(leftTop, rightLow)).toBeLessThan(0);
  expect(zComparator(rightLow, leftTop)).toBeGreaterThan(0);
});

test("edge case with equal y due to floating point error", () => {
  /* 
  cyc. dependency due to cube being in front of heels when should have no preference:

  cube @{"x":0,"y":96,"z":0} bb:{"x":12,"y":12,"z":12} --in-front-of--> 
	heels @{"x":12,"y":92.431,"z":12} bb:{"x":12,"y":12,"z":12} --in-front-of--> 
	conveyor@0,5,0:24hKaE @{"x":0,"y":80,"z":0} bb:{"x":16,"y":16,"z":12} --in-front-of--> 
	cube @{"x":0,"y":96,"z":0} bb:{"x":12,"y":12,"z":12}

  which calculated as:
  min/max: {
    a: {
      x: { min: 68.431, max: 92.431 },
      xS: { min: -128.43099999999998, max: -104.43099999999998 },
      yS: { min: -47.99999999999999, max: -23.999999999999993 }  <-- should have been 48, 24
    },
    b: {
      x: { min: 84, max: 108 },
      xS: { min: -120, max: -96 },
      yS: { min: -24, max: 0 }
    }
  }

  */

  const cube: DrawOrderComparable = {
    id: "cube",
    state: { position: { x: 0, y: 96, z: 0 } },
    aabb: { x: 12, y: 12, z: 12 },
  };
  const heels: DrawOrderComparable = {
    id: "heels",
    state: { position: { x: 12, y: 92.431, z: 12 } },
    aabb: { x: 12, y: 12, z: 12 },
  };

  expect(zComparator(heels, cube)).toBe(0);
  expect(zComparator(cube, heels)).toBe(0);
});
