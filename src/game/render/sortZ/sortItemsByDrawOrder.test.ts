import { describe, expect, test } from "vitest";
import type { DrawOrderComparable } from "./zComparator";
import { sortByZPairs, zPairs } from "./sortItemsByDrawOrder";
import { collision1toMany } from "@/game/collision/aabbCollision";

type TestItems = Record<string, DrawOrderComparable>;

test("detects behind in x", () => {
  const items: TestItems = {
    1: {
      id: "1",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 0, z: 0 } },
    },
    2: {
      id: "2",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 10, y: 0, z: 0 } },
    },
    3: {
      id: "3",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 20, y: 0, z: 0 } },
    },
    4: {
      id: "4",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 30, y: 0, z: 0 } },
    },
  };

  const relations = zPairs(Object.values(items));
  expect(relations).toHaveLength(3);
  expect(relations).toEqual(
    expect.arrayContaining([
      // [behind,  front]
      ["2", "1"],
      ["3", "2"],
      ["4", "3"],
    ]),
  );
  // no cyclic dependencies
  expect(() => sortByZPairs(relations, items)).not.toThrow();
});

test("detects behind in y", () => {
  const items: TestItems = {
    1: {
      id: "1",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 0, z: 0 } },
    },
    2: {
      id: "2",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 10, z: 0 } },
    },
    3: {
      id: "3",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 20, z: 0 } },
    },
    4: {
      id: "4",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 30, z: 0 } },
    },
  };

  const relations = zPairs(Object.values(items));
  expect(relations).toHaveLength(3);
  expect(relations).toEqual(
    expect.arrayContaining([
      // [behind,  front]
      ["2", "1"],
      ["3", "2"],
      ["4", "3"],
    ]),
  );
  // no cyclic dependencies
  expect(() => sortByZPairs(relations, items)).not.toThrow();
});

test("detects behind in z (inverted from x and y - higher is in front)", () => {
  const items: TestItems = {
    1: {
      id: "1",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 0, z: 0 } },
    },
    2: {
      id: "2",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 0, z: 10 } },
    },
    3: {
      id: "3",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 0, z: 20 } },
    },
    4: {
      id: "4",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 0, z: 30 } },
    },
  };

  const relations = zPairs(Object.values(items));
  expect(relations).toHaveLength(3);
  expect(relations).toEqual(
    expect.arrayContaining([
      // [behind,  front]
      ["1", "2"],
      ["2", "3"],
      ["3", "4"],
    ]),
  );
  // no cyclic dependencies
  expect(() => sortByZPairs(relations, items)).not.toThrow();
  expect(sortByZPairs(relations, items).impossible).toBe(false);
});

test("detects as in front if on top and set back while overlapping", () => {
  const items: TestItems = {
    bottom: {
      id: "bottom",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 0, z: 0 } },
    },
    top: {
      id: "top",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 9, y: 9, z: 10 } },
    },
  };

  const relations = zPairs(Object.values(items));
  expect(relations).toHaveLength(1);
  expect(relations).toEqual(
    expect.arrayContaining([
      // [behind,  front]
      ["bottom", "top"],
    ]),
  );
  // no cyclic dependencies
  expect(() => sortByZPairs(relations, items)).not.toThrow();
  expect(sortByZPairs(relations, items).impossible).toBe(false);
});

test("detects a tall item is front of two smaller items", () => {
  const items: TestItems = {
    tallThinFront: {
      id: "tallThinFront",
      aabb: { x: 1, y: 0, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 0, z: 0 } },
    },
    smallerTop: {
      id: "smallerTop",
      aabb: { x: 1, y: 1, z: 1 },
      renders: true,
      state: { position: { x: 0, y: 0, z: 9 } },
    },
    smallerBottom: {
      id: "smallerBottom",
      aabb: { x: 1, y: 1, z: 1 },
      renders: true,
      state: { position: { x: 0, y: 0, z: 0 } },
    },
  };

  const relations = zPairs(Object.values(items));
  expect(relations).toHaveLength(2);
  expect(relations).toEqual(
    expect.arrayContaining([
      // [behind,  front]
      ["smallerTop", "tallThinFront"],
      ["smallerBottom", "tallThinFront"],
    ]),
  );
  // no cyclic dependencies
  expect(() => sortByZPairs(relations, items)).not.toThrow();
  expect(sortByZPairs(relations, items).impossible).toBe(false);
});

test.todo("uses renderaabb if there is one", () => {
  //
});

describe("cyclic dependencies", () => {
  test("found situation 1 - 3 items", () => {
    /*
   circular reference:
   from sortByZPairs stack trace:
      cube 
        -behind-> conveyor 
            -behind-> heels 
                -behind-> cube
  
    extracted from logs:
	conveyor (@ {"x":0,"y":80,"z":0} # {"x":16,"y":16,"z":12}) is behind heels (@ {"x":12,"y":95.48399999999998,"z":12} # {"x":12,"y":12,"z":12})
	cube (@ {"x":0,"y":96,"z":0} # {"x":12,"y":12,"z":12}) is behind conveyor (@ {"x":0,"y":80,"z":0} # {"x":16,"y":16,"z":12})
	heels (@ {"x":12,"y":95.48399999999998,"z":12} # {"x":12,"y":12,"z":12}) is behind cube (@ {"x":0,"y":96,"z":0} # {"x":12,"y":12,"z":12})
  */

    // simplified:
    // note - heels should not be behind cube, but is if we take simple rectangular projection bounding areas on screen
    // to be used for detecting overlap between items
    const items: TestItems = {
      heels: {
        id: "heels",
        state: { position: { x: 5, y: 8, z: 10 } },
        aabb: { x: 10, y: 10, z: 10 },
        renders: true,
      },
      cube: {
        id: "cube",
        state: { position: { x: 0, y: 10, z: 0 } },
        aabb: { x: 5, y: 5, z: 10 },
        renders: true,
      },
      conveyor: {
        id: "conveyor",
        state: { position: { x: 0, y: 0, z: 0 } },
        aabb: { x: 10, y: 10, z: 10 },
        renders: true,
      },
    };

    const relations = zPairs(Object.values(items));
    expect(relations).toHaveLength(2);
    expect(() => sortByZPairs(relations, items)).not.toThrow();
    expect(sortByZPairs(relations, items).impossible).toBe(false);
  });

  test("found situation 2 - genuine cyclic dependency - not possible to render without splitting sprites up!", () => {
    const items: TestItems = {
      movableBlock: {
        id: "movableBlock",
        state: {
          position: {
            x: 32,
            y: 96,
            z: 0,
          },
        },
        aabb: {
          x: 16,
          y: 16,
          z: 12,
        },
        renders: true,
      },
      baddie: {
        id: "baddie",
        state: {
          position: {
            x: 32.5,
            y: 114,
            z: 0,
          },
        },
        aabb: {
          x: 12,
          y: 12,
          z: 24,
        },
        renders: true,
      },
      pickup: {
        id: "pickup",
        state: {
          position: {
            x: 47.9,
            y: 110,
            z: 12,
          },
        },
        aabb: {
          x: 12,
          y: 12,
          z: 12,
        },
        renders: true,
      },
    };

    // verify that the items aren't illegally colliding (which would make this test maybe invalid)
    for (const i of Object.values(items)) {
      expect(collision1toMany(i, Object.values(items))).toEqual([]);
    }

    const relations = zPairs(Object.values(items));

    expect(relations).toMatchInlineSnapshot(`
      [
        [
          "baddie",
          "movableBlock",
        ],
        [
          "movableBlock",
          "pickup",
        ],
        [
          "pickup",
          "baddie",
        ],
      ]
    `);

    expect(() => sortByZPairs(relations, items)).not.toThrow();
    expect(sortByZPairs(relations, items).impossible).toBe(true);
  });
});
