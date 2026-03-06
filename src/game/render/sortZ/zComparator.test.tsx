import { describe, expect, test } from "vitest";

import type { ItemInPlayAAbbInfo } from "../../../model/ItemInPlay";

import { GridSpatialIndex } from "../../physics/gridSpace/GridSpatialIndex";
import { type DrawOrderComparable } from "./DrawOrderComparable";
import { zComparator } from "./zComparator";
const unitCube = { x: 1, y: 1, z: 1 };

function describeOrder(order: number) {
  return (
    order > 0 ? "is in front of it"
    : order < 0 ? "is behind it"
    : "has no ordering with it"
  );
}

expect.extend({
  toBeInFrontOf(received: DrawOrderComparable, reference: DrawOrderComparable) {
    const spatialIndex = new GridSpatialIndex([received, reference]);
    const { isNot, utils } = this;
    const order = zComparator(received, reference, spatialIndex);
    return {
      // do not alter your "pass" based on isNot. Vitest does it for you
      pass: order > 0,
      message: () =>
        `expected ${utils.printExpected(received.id)} to be ${isNot ? "not " : ""}in front of ${utils.printExpected(reference.id)} but ${utils.printReceived(describeOrder(order))}`,
    };
  },
  toBeBehind(received: DrawOrderComparable, reference: DrawOrderComparable) {
    const spatialIndex = new GridSpatialIndex([received, reference]);
    const { isNot, utils } = this;
    const order = zComparator(received, reference, spatialIndex);
    return {
      // do not alter your "pass" based on isNot. Vitest does it for you
      pass: order < 0,
      message: () =>
        `expected ${utils.printExpected(received.id)} to be ${isNot ? "not " : ""}behind ${utils.printExpected(reference.id)} but ${utils.printReceived(describeOrder(order))}`,
    };
  },
  toHaveNoOrderPreferenceWith(
    received: DrawOrderComparable,
    reference: DrawOrderComparable,
  ) {
    const spatialIndex = new GridSpatialIndex([received, reference]);
    const { isNot, utils } = this;
    const order = zComparator(received, reference, spatialIndex);
    return {
      // do not alter your "pass" based on isNot. Vitest does it for you
      pass: order === 0,
      message: () =>
        `expected ${utils.printExpected(received.id)} to have ${isNot ? "no " : ""}order preference with ${utils.printExpected(reference.id)} but ${utils.printReceived(describeOrder(order))}`,
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
  //expect(floor).toBeBehind(wall);
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

describe("overlapping renderAABBs", () => {
  const awayOrTowardsWallAabbInfo: ItemInPlayAAbbInfo = {
    aabb: { x: 8, y: 1, z: 4 },
  };
  const leftOrRightWallAabbInfo: ItemInPlayAAbbInfo = {
    aabb: { x: 1, y: 8, z: 4 },
  };
  const floorAabbInfo: ItemInPlayAAbbInfo = {
    aabb: { x: 8, y: 8, z: 1 },
  };
  const headAabbInfo: ItemInPlayAAbbInfo = {
    aabb: unitCube,
    // character renders slightly bigger than their aabb (on all sides):
    renderAabbOffset: { x: -0.1, y: -0.1, z: -0.1 },
    renderAabb: { x: 1.2, y: 1.2, z: 1.2 },
  };

  test("character at far wall", () => {
    const awayWall: DrawOrderComparable = {
      id: "away-wall",
      state: { position: { x: 0, y: 8, z: 0 } },
      ...awayOrTowardsWallAabbInfo,
    };
    const head: DrawOrderComparable = {
      id: "head",
      state: { position: { x: 4, y: 7, z: 0 } },
      ...headAabbInfo,
    };

    expect(head).toBeInFrontOf(awayWall);
    expect(awayWall).toBeBehind(head);
  });

  test("character at near wall", () => {
    const nearWall: DrawOrderComparable = {
      id: "near-wall",
      state: { position: { x: 0, y: -1, z: 0 } },
      ...awayOrTowardsWallAabbInfo,
    };
    const head: DrawOrderComparable = {
      id: "head",
      state: { position: { x: 4, y: 0, z: 0 } },
      ...headAabbInfo,
    };

    expect(nearWall).toBeInFrontOf(head);
    expect(head).toBeBehind(nearWall);
  });

  test("character at right wall", () => {
    const rightWall: DrawOrderComparable = {
      id: "right-wall",
      state: { position: { x: 8, y: 0, z: 0 } },
      ...leftOrRightWallAabbInfo,
    };
    const head: DrawOrderComparable = {
      id: "head",
      state: { position: { x: 7, y: 4, z: 0 } },
      ...headAabbInfo,
    };

    expect(head).toBeInFrontOf(rightWall);
    expect(rightWall).toBeBehind(head);
  });

  test("character at left wall", () => {
    const leftWall: DrawOrderComparable = {
      id: "left-wall",
      state: { position: { x: -1, y: 0, z: 0 } },
      ...leftOrRightWallAabbInfo,
    };
    const head: DrawOrderComparable = {
      id: "head",
      state: { position: { x: 0, y: 4, z: 0 } },
      ...headAabbInfo,
    };

    expect(leftWall).toBeInFrontOf(head);
    expect(head).toBeBehind(leftWall);
  });

  test("character standing on floor", () => {
    const floor: DrawOrderComparable = {
      id: "floor",
      state: { position: { x: 0, y: 0, z: -1 } },
      ...floorAabbInfo,
    };
    const head: DrawOrderComparable = {
      id: "head",
      state: { position: { x: 4, y: 4, z: 0 } },
      ...headAabbInfo,
    };

    expect(head).toBeInFrontOf(floor);
    expect(floor).toBeBehind(head);
  });
});

describe("original campaign comparisons", () => {
  test("#bookworld1 adjacency anti-flicker", () => {
    const wall: DrawOrderComparable = {
      id: "wall@0,8,0",
      aabb: { x: 128, y: 16, z: 9_999 },
      renderAabb: { x: 128, y: 0, z: 50 },
      state: { position: { x: 0, y: 128, z: 0 } },
    };
    const block: DrawOrderComparable = {
      id: "extraLanding",
      aabb: { x: 16, y: 16, z: 48 },
      state: { position: { x: 0, y: 64, z: 0 } },
    };

    expect(block).toBeInFrontOf(wall);
    expect(wall).toBeBehind(block);
  });

  test("#bookworld7 door in front of floor", () => {
    const doorFrame: DrawOrderComparable = {
      id: "door@1,0,4/frameNear",
      aabb: { x: 9, y: 24, z: 48 },
      renderAabb: { x: 9, y: 8, z: 48 },
      renderAabbOffset: { x: 0, y: 16, z: 0 },
      state: { position: { x: 16, y: -24, z: 48 } },
    };
    const floor: DrawOrderComparable = {
      id: "floor@0,0,0",
      aabb: { x: 64, y: 144.32, z: 36 },
      renderAabb: { x: 64, y: 144.32, z: 10 },
      renderAabbOffset: { x: 0, y: 0, z: 26 },
      state: { position: { x: 0, y: -8, z: -36 } },
    };

    expect(doorFrame).toBeInFrontOf(floor);
    expect(floor).toBeBehind(doorFrame);
  });
});
