import { describe, expect, test } from "vitest";

import {
  addXyz,
  originXyz,
  subXyz,
  type Xy,
} from "../../../utils/vectors/vectors";
import { type RenderBox } from "../renderBox/makeItemRenderBoxAtCameraAngle";
import { populatedBroadPhase } from "./__test__/populatedBroadPhase";
import { worldBoxToCameraSpace } from "./__test__/worldBoxToCameraSpace";
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

// every test below asserts a draw-order relationship, and that relationship is
// preserved when the scene and camera rotate together. The whole suite is wrapped in
// describe.each(cameraAngles), so each test runs once per camera angle; each assertion
// passes that angle as { whenAtAngle } and is checked at exactly that angle. A wrong
// sign at any angle fails that angle's copy of the test (see orderAtCameraAngle for why
// the base-angle relationship must still hold at every angle).
const cameraAngles: Xy[] = [
  { x: 1, y: 0 }, // no rotation
  { x: 0, y: 1 }, // quarter turn
  { x: -1, y: 0 }, // half turn
  { x: 0, y: -1 }, // three-quarter turn
];

const inverseAngle = ({ x, y }: Xy): Xy => ({ x, y: -y });

const describeAngle = ({ x, y }: Xy) => `camera (${x},${y})`;

/**
 * a sort-test item plus its (base-angle, world-space) render box - the box is
 * a test-local pairing, never an item field; it feeds the renderBoxes map the
 * sort reads from
 */
type TestComparable = DrawOrderComparable & {
  renderBox?: RenderBox;
};

/** rotate a comparable's physical and render boxes about the vertical (z) axis */
const rotateComparable = (item: TestComparable, angle: Xy): TestComparable => {
  const physical = worldBoxToCameraSpace(item.state.position, item.aabb, angle);
  const rotated: TestComparable = {
    ...item,
    state: { position: physical.position },
    aabb: physical.aabb,
  };
  if (item.renderBox === undefined) {
    return rotated;
  }
  const box = worldBoxToCameraSpace(
    addXyz(item.state.position, item.renderBox.renderAabbOffset ?? originXyz),
    item.renderBox.renderAabb,
    angle,
  );
  return {
    ...rotated,
    renderBox: {
      renderAabb: box.aabb,
      renderAabbOffset: subXyz(box.position, physical.position),
    },
  };
};

/**
 * the zComparator order for the pair as viewed at `atAngle`, with the scene rotated to
 * keep the base relationship.
 *
 * metamorphic/symmetry check: the projection at cameraAngle θ is (base projection ∘
 * rotate by θ), so pre-rotating the scene by the inverse angle and then viewing at θ
 * cancels out - the comparator internally rotates by θ again, netting identity. Every
 * angle therefore renders the *identical* screen image (exact - orthogonal quarter
 * turns, no rounding), reached via different internal data (rotated boxes + a different
 * cameraAngle). So the ground-truth front/back order is provably the same as the base
 * angle the test is written in, and asserting it at all four angles exercises the
 * comparator's angle handling (rotatedX/Y, the render boxes, the axis projections)
 * for self-consistency - it catches angle-*asymmetries*, not base-angle bugs shared
 * identically across all angles.
 */
const orderAtCameraAngle = (
  received: TestComparable,
  reference: TestComparable,
  atAngle: Xy,
): number => {
  const inverse = inverseAngle(atAngle);
  const a = rotateComparable(received, inverse);
  const b = rotateComparable(reference, inverse);
  const renderBoxes = new Map<DrawOrderComparable, RenderBox | undefined>([
    [a, a.renderBox],
    [b, b.renderBox],
  ]);
  return zComparator(
    a,
    b,
    populatedBroadPhase(new Set([a, b]), renderBoxes, atAngle),
    renderBoxes,
  );
};

expect.extend({
  toBeInFrontOf(
    received: DrawOrderComparable,
    reference: DrawOrderComparable,
    { whenAtAngle }: { whenAtAngle: Xy },
  ) {
    const { utils } = this;
    const order = orderAtCameraAngle(received, reference, whenAtAngle);
    return {
      // do not alter pass based on isNot. Vitest does it automatically
      pass: order > 0,
      message: () =>
        order > 0 ?
          `expected ${utils.printExpected(received.id)} not to be in front of ${utils.printExpected(reference.id)} at ${describeAngle(whenAtAngle)}`
        : `expected ${utils.printExpected(received.id)} to be in front of ${utils.printExpected(reference.id)} at ${describeAngle(whenAtAngle)} but it ${utils.printReceived(describeOrder(order))}`,
    };
  },
  toBeBehind(
    received: DrawOrderComparable,
    reference: DrawOrderComparable,
    { whenAtAngle }: { whenAtAngle: Xy },
  ) {
    const { utils } = this;
    const order = orderAtCameraAngle(received, reference, whenAtAngle);
    return {
      // do not alter pass based on isNot. Vitest does it automatically
      pass: order < 0,
      message: () =>
        order < 0 ?
          `expected ${utils.printExpected(received.id)} not to be behind ${utils.printExpected(reference.id)} at ${describeAngle(whenAtAngle)}`
        : `expected ${utils.printExpected(received.id)} to be behind ${utils.printExpected(reference.id)} at ${describeAngle(whenAtAngle)} but it ${utils.printReceived(describeOrder(order))}`,
    };
  },
  toHaveNoOrderPreferenceWith(
    received: DrawOrderComparable,
    reference: DrawOrderComparable,
    { whenAtAngle }: { whenAtAngle: Xy },
  ) {
    const { utils } = this;
    const order = orderAtCameraAngle(received, reference, whenAtAngle);
    return {
      // do not alter pass based on isNot. Vitest does it automatically
      pass: order === 0,
      message: () =>
        order === 0 ?
          `expected ${utils.printExpected(received.id)} to have an order preference with ${utils.printExpected(reference.id)} at ${describeAngle(whenAtAngle)}`
        : `expected ${utils.printExpected(received.id)} to have no order preference with ${utils.printExpected(reference.id)} at ${describeAngle(whenAtAngle)} but it ${utils.printReceived(describeOrder(order))}`,
    };
  },
});

describe.each(cameraAngles)("viewed at camera ($x,$y)", (cameraAngle: Xy) => {
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

    expect(behind).toBeBehind(inFront, { whenAtAngle: cameraAngle });
    expect(inFront).toBeInFrontOf(behind, { whenAtAngle: cameraAngle });
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

    expect(behind).toBeBehind(inFront, { whenAtAngle: cameraAngle });
    expect(inFront).toBeInFrontOf(behind, { whenAtAngle: cameraAngle });
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

    expect(bottom).toBeBehind(top, { whenAtAngle: cameraAngle });
    expect(top).toBeInFrontOf(bottom, { whenAtAngle: cameraAngle });
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

      expect(bottom).toHaveNoOrderPreferenceWith(top, {
        whenAtAngle: cameraAngle,
      });
      expect(top).toHaveNoOrderPreferenceWith(bottom, {
        whenAtAngle: cameraAngle,
      });
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

      expect(bottom).toHaveNoOrderPreferenceWith(top, {
        whenAtAngle: cameraAngle,
      });
      expect(top).toHaveNoOrderPreferenceWith(bottom, {
        whenAtAngle: cameraAngle,
      });
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

    expect(right).toHaveNoOrderPreferenceWith(left, {
      whenAtAngle: cameraAngle,
    });
    expect(left).toHaveNoOrderPreferenceWith(right, {
      whenAtAngle: cameraAngle,
    });
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

    expect(right).toBeBehind(left, { whenAtAngle: cameraAngle });
    expect(left).toBeInFrontOf(right, { whenAtAngle: cameraAngle });
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

    expect(right).toBeInFrontOf(left, { whenAtAngle: cameraAngle });
    expect(left).toBeBehind(right, { whenAtAngle: cameraAngle });
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

    expect(wall).toHaveNoOrderPreferenceWith(floor, {
      whenAtAngle: cameraAngle,
    });
    expect(floor).toHaveNoOrderPreferenceWith(wall, {
      whenAtAngle: cameraAngle,
    });
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

    expect(backTop).toBeInFrontOf(frontLow, { whenAtAngle: cameraAngle });
    expect(frontLow).toBeBehind(backTop, { whenAtAngle: cameraAngle });
  });

  describe("wall/floor-like case, meeting along the diagonal line running in the direction of the x axis", () => {
    test("zComparator gives order preference for slightly-visually-overlapping diagonally adjacent in x,z (z-overlap)", () => {
      // these are overlapping, along their diagonally-rendered edges

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

      expect(backTop).toBeBehind(frontLow, { whenAtAngle: cameraAngle });
      expect(frontLow).toBeInFrontOf(backTop, { whenAtAngle: cameraAngle });
    });

    test("wall runs along the floor, puts wall in front of floor", () => {
      // these are adjacent, along their diagonally-rendered edge that runs along the x-axis

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

      expect(wall).toBeInFrontOf(floor, { whenAtAngle: cameraAngle });
      expect(floor).toBeBehind(wall, { whenAtAngle: cameraAngle });
    });
    test("if the wall is a 0-thickness plane and only its zero-length edge runs along the floor, gives no ordering", () => {
      // wall is in the middle of the floor, but its run along the floor's length is zero-length:
      const wall: DrawOrderComparable = {
        id: "wall",
        state: { position: { x: 0.5, y: 1, z: 1 } },
        aabb: { x: 0, y: 1, z: 1 },
      };
      const floor: DrawOrderComparable = {
        id: "floor",
        state: { position: { x: 0, y: 0, z: 0 } },
        aabb: unitCube,
      };

      expect(wall).toHaveNoOrderPreferenceWith(floor, {
        whenAtAngle: cameraAngle,
      });
      expect(floor).toHaveNoOrderPreferenceWith(wall, {
        whenAtAngle: cameraAngle,
      });
    });
  });

  test("zComparator gives order preference for slightly-visually-overlapping diagonally adjacent in y,z (y-overlap)", () => {
    // these are overlapping, along their diagonally-rendered edges, but slightly visually overlapping:

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

    expect(leftTop).toBeInFrontOf(rightLow, { whenAtAngle: cameraAngle });
    expect(rightLow).toBeBehind(leftTop, { whenAtAngle: cameraAngle });
  });

  describe("wall/floor-like case, meeting along the diagonal line running in the direction of the y axis", () => {
    test("zComparator gives order preference for slightly-visually-overlapping diagonally adjacent in y,z (z-overlap)", () => {
      // these are overlapping, along their diagonally-rendered edges

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

      expect(leftTop).toBeBehind(rightLow, { whenAtAngle: cameraAngle });
      expect(rightLow).toBeInFrontOf(leftTop, { whenAtAngle: cameraAngle });
    });

    test("wall runs along the floor, puts wall in front of floor", () => {
      // these are adjacent, along their diagonally-rendered edge that runs along the y-axis

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

      expect(wall).toBeInFrontOf(floor, { whenAtAngle: cameraAngle });
      expect(floor).toBeBehind(wall, { whenAtAngle: cameraAngle });
    });
    test("if the wall is a 0-thickness plane and only its zero-length edge runs along the floor, gives no ordering", () => {
      // wall is in the middle of the floor, but its run along the floor's length is zero-length:
      const wall: DrawOrderComparable = {
        id: "wall",
        state: { position: { x: 1, y: 0.5, z: 1 } },
        aabb: { x: 1, y: 0, z: 1 },
      };
      const floor: DrawOrderComparable = {
        id: "floor",
        state: { position: { x: 0, y: 0, z: 0 } },
        aabb: unitCube,
      };

      expect(wall).toHaveNoOrderPreferenceWith(floor, {
        whenAtAngle: cameraAngle,
      });
      expect(floor).toHaveNoOrderPreferenceWith(wall, {
        whenAtAngle: cameraAngle,
      });
    });
  });

  describe("overlapping renderAABBs", () => {
    type AabbInfo = Pick<TestComparable, "aabb" | "renderBox">;
    const awayOrTowardsWallAabbInfo: AabbInfo = {
      aabb: { x: 8, y: 1, z: 4 },
    };
    const leftOrRightWallAabbInfo: AabbInfo = {
      aabb: { x: 1, y: 8, z: 4 },
    };
    const floorAabbInfo: AabbInfo = {
      aabb: { x: 8, y: 8, z: 1 },
    };
    const headAabbInfo: AabbInfo = {
      aabb: unitCube,
      // character renders slightly bigger than their aabb (on all sides):
      renderBox: {
        renderAabb: { x: 1.2, y: 1.2, z: 1.2 },
        renderAabbOffset: { x: -0.1, y: -0.1, z: -0.1 },
      },
    };

    test("character at far wall", () => {
      const awayWall: DrawOrderComparable = {
        id: "away-wall",
        state: { position: { x: 0, y: 8, z: 0 } },
        ...awayOrTowardsWallAabbInfo,
      };
      const head: TestComparable = {
        id: "head",
        state: { position: { x: 4, y: 7, z: 0 } },
        ...headAabbInfo,
      };

      expect(head).toBeInFrontOf(awayWall, { whenAtAngle: cameraAngle });
      expect(awayWall).toBeBehind(head, { whenAtAngle: cameraAngle });
    });

    test("character at near wall", () => {
      const nearWall: DrawOrderComparable = {
        id: "near-wall",
        state: { position: { x: 0, y: -1, z: 0 } },
        ...awayOrTowardsWallAabbInfo,
      };
      const head: TestComparable = {
        id: "head",
        state: { position: { x: 4, y: 0, z: 0 } },
        ...headAabbInfo,
      };

      expect(nearWall).toBeInFrontOf(head, { whenAtAngle: cameraAngle });
      expect(head).toBeBehind(nearWall, { whenAtAngle: cameraAngle });
    });

    test("character at right wall", () => {
      const rightWall: DrawOrderComparable = {
        id: "right-wall",
        state: { position: { x: 8, y: 0, z: 0 } },
        ...leftOrRightWallAabbInfo,
      };
      const head: TestComparable = {
        id: "head",
        state: { position: { x: 7, y: 4, z: 0 } },
        ...headAabbInfo,
      };

      expect(head).toBeInFrontOf(rightWall, { whenAtAngle: cameraAngle });
      expect(rightWall).toBeBehind(head, { whenAtAngle: cameraAngle });
    });

    test("character at left wall", () => {
      const leftWall: DrawOrderComparable = {
        id: "left-wall",
        state: { position: { x: -1, y: 0, z: 0 } },
        ...leftOrRightWallAabbInfo,
      };
      const head: TestComparable = {
        id: "head",
        state: { position: { x: 0, y: 4, z: 0 } },
        ...headAabbInfo,
      };

      expect(leftWall).toBeInFrontOf(head, { whenAtAngle: cameraAngle });
      expect(head).toBeBehind(leftWall, { whenAtAngle: cameraAngle });
    });

    test("character standing on floor", () => {
      const floor: DrawOrderComparable = {
        id: "floor",
        state: { position: { x: 0, y: 0, z: -1 } },
        ...floorAabbInfo,
      };
      const head: TestComparable = {
        id: "head",
        state: { position: { x: 4, y: 4, z: 0 } },
        ...headAabbInfo,
      };

      expect(head).toBeInFrontOf(floor, { whenAtAngle: cameraAngle });
      expect(floor).toBeBehind(head, { whenAtAngle: cameraAngle });
    });
  });

  describe("original campaign comparisons", () => {
    test("#bookworld1 adjacency anti-flicker", () => {
      const wall: TestComparable = {
        id: "wall@0,8,0",
        aabb: { x: 128, y: 16, z: 9_999 },
        renderBox: {
          renderAabb: { x: 128, y: 0, z: 50 },
          renderAabbOffset: undefined,
        },
        state: { position: { x: 0, y: 128, z: 0 } },
      };
      const block: DrawOrderComparable = {
        id: "extraLanding",
        aabb: { x: 16, y: 16, z: 48 },
        state: { position: { x: 0, y: 64, z: 0 } },
      };

      expect(block).toBeInFrontOf(wall, { whenAtAngle: cameraAngle });
      expect(wall).toBeBehind(block, { whenAtAngle: cameraAngle });
    });

    test("#bookworld7 door in front of floor", () => {
      const doorFrame: TestComparable = {
        id: "door@1,0,4/frameNear",
        aabb: { x: 9, y: 24, z: 48 },
        renderBox: {
          renderAabb: { x: 9, y: 8, z: 48 },
          renderAabbOffset: { x: 0, y: 16, z: 0 },
        },
        state: { position: { x: 16, y: -24, z: 48 } },
      };
      const floor: TestComparable = {
        id: "floor@0,0,0",
        aabb: { x: 64, y: 144.32, z: 36 },
        renderBox: {
          renderAabb: { x: 64, y: 144.32, z: 10 },
          renderAabbOffset: { x: 0, y: 0, z: 26 },
        },
        state: { position: { x: 0, y: -8, z: -36 } },
      };

      expect(doorFrame).toBeInFrontOf(floor, { whenAtAngle: cameraAngle });
      expect(floor).toBeBehind(doorFrame, { whenAtAngle: cameraAngle });
    });

    test("#safari17fish bubbles after hush puppy vanish in front of tower", () => {
      const bubbles: TestComparable = {
        id: "bubbles",
        aabb: { x: 12, y: 12, z: 12 },
        state: { position: { x: 2, y: 66, z: 24 } },
      };
      const tower: TestComparable = {
        id: "b2",
        aabb: { x: 27, y: 11, z: 36 },
        renderBox: {
          renderAabb: { x: 30, y: 14, z: 36 },
          renderAabbOffset: { x: 0, y: 0, z: 0 },
        },
        state: { position: { x: 18, y: 114, z: 0 } },
      };

      expect(bubbles).toBeInFrontOf(tower, { whenAtAngle: cameraAngle });
      expect(tower).toBeBehind(bubbles, { whenAtAngle: cameraAngle });
    });

    test("#penitentiary28 towards-side door legs in front of left-side wall", () => {
      const doorLegs: TestComparable = {
        id: "doorLegs",
        aabb: { x: 32, y: 24, z: 48 },
        renderBox: {
          renderAabb: { x: 32, y: 8, z: 6 },
          renderAabbOffset: { x: 0, y: 16, z: 42 },
        },
        state: { position: { x: 48, y: -24, z: 0 } },
      };
      const wall: TestComparable = {
        id: "wall",
        aabb: { x: 16, y: 48, z: 9_999 },
        renderBox: {
          renderAabb: { x: 0, y: 48, z: 50 },
          renderAabbOffset: undefined,
        },
        state: { position: { x: 128, y: 0, z: 0 } },
      };

      expect(doorLegs).toBeInFrontOf(wall, { whenAtAngle: cameraAngle });
      expect(wall).toBeBehind(doorLegs, { whenAtAngle: cameraAngle });
    });
  });
});
