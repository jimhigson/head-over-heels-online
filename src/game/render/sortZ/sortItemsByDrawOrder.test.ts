import { describe, expect, test } from "vitest";
import type { DrawOrderComparable } from "./zComparator";
import { zPairs } from "./sortItemsByDrawOrder";
import toposort from "toposort";

test("detects behind in x", () => {
  const items: DrawOrderComparable[] = [
    {
      id: "1",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 0, z: 0 } },
    },
    {
      id: "2",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 10, y: 0, z: 0 } },
    },
    {
      id: "3",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 20, y: 0, z: 0 } },
    },
    {
      id: "4",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 30, y: 0, z: 0 } },
    },
  ];

  const result = zPairs(items);
  expect(result).toHaveLength(3);
  expect(result).toEqual(
    expect.arrayContaining([
      // [behind,  front]
      ["2", "1"],
      ["3", "2"],
      ["4", "3"],
    ]),
  );
  // no cyclic dependencies
  expect(() => toposort(result)).not.toThrow();
});

test("detects behind in y", () => {
  const items: DrawOrderComparable[] = [
    {
      id: "1",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 0, z: 0 } },
    },
    {
      id: "2",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 10, z: 0 } },
    },
    {
      id: "3",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 20, z: 0 } },
    },
    {
      id: "4",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 30, z: 0 } },
    },
  ];

  const result = zPairs(items);
  expect(result).toHaveLength(3);
  expect(result).toEqual(
    expect.arrayContaining([
      // [behind,  front]
      ["2", "1"],
      ["3", "2"],
      ["4", "3"],
    ]),
  );
  // no cyclic dependencies
  expect(() => toposort(result)).not.toThrow();
});

test("detects behind in z (inverted from x and y - higher is in front)", () => {
  const items: DrawOrderComparable[] = [
    {
      id: "1",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 0, z: 0 } },
    },
    {
      id: "2",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 0, z: 10 } },
    },
    {
      id: "3",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 0, z: 20 } },
    },
    {
      id: "4",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 0, z: 30 } },
    },
  ];

  const result = zPairs(items);
  expect(result).toHaveLength(3);
  expect(result).toEqual(
    expect.arrayContaining([
      // [behind,  front]
      ["1", "2"],
      ["2", "3"],
      ["3", "4"],
    ]),
  );
  // no cyclic dependencies
  expect(() => toposort(result)).not.toThrow();
});

test("detects as in front if on top and set back while overlapping", () => {
  const items: DrawOrderComparable[] = [
    {
      id: "bottom",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 0, z: 0 } },
    },
    {
      id: "top",
      aabb: { x: 10, y: 10, z: 10 },
      renders: true,
      state: { position: { x: 9, y: 9, z: 10 } },
    },
  ];

  const result = zPairs(items);
  expect(result).toHaveLength(1);
  expect(result).toEqual(
    expect.arrayContaining([
      // [behind,  front]
      ["bottom", "top"],
    ]),
  );
  // no cyclic dependencies
  expect(() => toposort(result)).not.toThrow();
});

test("detects a tall item is front of two smaller items", () => {
  const items: DrawOrderComparable[] = [
    {
      id: "tallThinFront",
      aabb: { x: 1, y: 0, z: 10 },
      renders: true,
      state: { position: { x: 0, y: 0, z: 0 } },
    },
    {
      id: "smallerTop",
      aabb: { x: 1, y: 1, z: 1 },
      renders: true,
      state: { position: { x: 0, y: 0, z: 9 } },
    },
    {
      id: "smallerBottom",
      aabb: { x: 1, y: 1, z: 1 },
      renders: true,
      state: { position: { x: 0, y: 0, z: 0 } },
    },
  ];

  const result = zPairs(items);
  expect(result).toHaveLength(2);
  expect(result).toEqual(
    expect.arrayContaining([
      // [behind,  front]
      ["smallerTop", "tallThinFront"],
      ["smallerBottom", "tallThinFront"],
    ]),
  );
  // no cyclic dependencies
  expect(() => toposort(result)).not.toThrow();
});

test.todo("uses renderaabb if there is one", () => {
  //
});

describe("cyclic dependencies", () => {
  test("found situation 1 - 3 items", () => {
    /*
   circular reference:
   from toposort stack trace:
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
    const items: DrawOrderComparable[] = [
      {
        id: "heels",
        state: { position: { x: 5, y: 8, z: 10 } },
        aabb: { x: 10, y: 10, z: 10 },
        renders: true,
      },
      {
        id: "cube",
        state: { position: { x: 0, y: 10, z: 0 } },
        aabb: { x: 5, y: 5, z: 10 },
        renders: true,
      },
      {
        id: "conveyor",
        state: { position: { x: 0, y: 0, z: 0 } },
        aabb: { x: 10, y: 10, z: 10 },
        renders: true,
      },
    ];

    const result = zPairs(items);
    expect(result).toHaveLength(2);
    expect(() => toposort(result)).not.toThrow();
  });

  test.only("found situation 2 - 4 items", () => {
    const items: DrawOrderComparable[] = [
      {
        id: "movableBlock@2,6,0:Z15GVb5",
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
      {
        id: "baddie@1,7,0:Z2jz06D",
        state: {
          position: {
            x: 32.7,
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
      {
        id: "pickup@4,6,10:Zki5mP",
        state: {
          position: {
            x: 47.9,
            y: 111.4,
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
    ];

    const relations = zPairs(items);

    console.log(relations);

    //expect(result).toHaveLength(2);
    expect(() => toposort(relations)).not.toThrow();
  });
});
