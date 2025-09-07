import { objectValues } from "iter-tools-es";
import { describe, expect, test } from "vitest";

import type { DrawOrderComparable } from "./DrawOrderComparable";

import { collisionItemWithIndex } from "../../collision/aabbCollision";
import { GridSpatialIndex } from "../../physics/gridSpace/GridSpatialIndex";
import { toposort } from "./toposort/toposort";
import { updateZEdges } from "./updateZEdges";

type TestItems = Record<string, DrawOrderComparable>;

test("detects behind in x", () => {
  const items: TestItems = {
    1: {
      id: "1",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 0, y: 0, z: 0 } },
    },
    2: {
      id: "2",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 10, y: 0, z: 0 } },
    },
    3: {
      id: "3",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 20, y: 0, z: 0 } },
    },
    4: {
      id: "4",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 30, y: 0, z: 0 } },
    },
  };

  const spatialIndex = new GridSpatialIndex(objectValues(items));

  const edges = updateZEdges(items, spatialIndex);
  // front => behind
  expect(edges).toMatchInlineSnapshot(`
    Map {
      "2" => Map {
        "1" => false,
      },
      "3" => Map {
        "2" => false,
      },
      "4" => Map {
        "3" => false,
      },
    }
  `);
  // no cyclic dependencies
  expect(() => toposort(edges)).not.toThrow();
});

test("detects behind in y", () => {
  const items: TestItems = {
    1: {
      id: "1",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 0, y: 0, z: 0 } },
    },
    2: {
      id: "2",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 0, y: 10, z: 0 } },
    },
    3: {
      id: "3",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 0, y: 20, z: 0 } },
    },
    4: {
      id: "4",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 0, y: 30, z: 0 } },
    },
  };

  const spatialIndex = new GridSpatialIndex(objectValues(items));

  const relations = updateZEdges(items, spatialIndex);
  // front => behind
  expect(relations).toMatchInlineSnapshot(`
    Map {
      "2" => Map {
        "1" => false,
      },
      "3" => Map {
        "2" => false,
      },
      "4" => Map {
        "3" => false,
      },
    }
  `);
  // no cyclic dependencies
  expect(() => toposort(relations)).not.toThrow();
});

test("detects behind in z (inverted from x and y - higher is in front)", () => {
  const items: TestItems = {
    1: {
      id: "1",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 0, y: 0, z: 0 } },
    },
    2: {
      id: "2",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 0, y: 0, z: 10 } },
    },
    3: {
      id: "3",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 0, y: 0, z: 20 } },
    },
    4: {
      id: "4",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 0, y: 0, z: 30 } },
    },
  };

  const spatialIndex = new GridSpatialIndex(objectValues(items));

  const relations = updateZEdges(items, spatialIndex);
  // front => behind
  expect(relations).toMatchInlineSnapshot(`
    Map {
      "1" => Map {
        "2" => false,
      },
      "2" => Map {
        "3" => false,
      },
      "3" => Map {
        "4" => false,
      },
    }
  `);
  // no cyclic dependencies
  expect(() => toposort(relations)).not.toThrow();
  toposort(relations);
});

test("detects as in front if on top and set back while overlapping", () => {
  const items: TestItems = {
    bottom: {
      id: "bottom",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 0, y: 0, z: 0 } },
    },
    top: {
      id: "top",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 9, y: 9, z: 10 } },
    },
  };

  const spatialIndex = new GridSpatialIndex(objectValues(items));

  const relations = updateZEdges(items, spatialIndex);
  // front => behind - top in front of bottom:
  expect(relations).toMatchInlineSnapshot(`
    Map {
      "bottom" => Map {
        "top" => false,
      },
    }
  `);
  // no cyclic dependencies
  expect(() => toposort(relations)).not.toThrow();
});

test("detects a tall item is front of two smaller items", () => {
  const items: TestItems = {
    tallThinFront: {
      id: "tallThinFront",
      aabb: { x: 1, y: 0, z: 10 },

      state: { position: { x: 0, y: 0, z: 0 } },
    },
    smallerTop: {
      id: "smallerTop",
      aabb: { x: 1, y: 1, z: 1 },

      state: { position: { x: 0, y: 0, z: 9 } },
    },
    smallerBottom: {
      id: "smallerBottom",
      aabb: { x: 1, y: 1, z: 1 },

      state: { position: { x: 0, y: 0, z: 0 } },
    },
    // should be ignored for the results:
    unrelatedFarAway: {
      id: "unrelatedFarAway",
      aabb: { x: 1, y: 1, z: 1 },

      state: { position: { x: 20, y: 0, z: 0 } },
    },
  };

  const spatialIndex = new GridSpatialIndex(objectValues(items));

  const relations = updateZEdges(items, spatialIndex);
  expect(relations).toMatchInlineSnapshot(`
    Map {
      "smallerTop" => Map {
        "tallThinFront" => false,
      },
      "smallerBottom" => Map {
        "tallThinFront" => false,
      },
    }
  `);
  // no cyclic dependencies
  expect(() => toposort(relations)).not.toThrow();
});

test.todo("uses renderaabb if there is one", () => {
  //
});

test("incremental updates requiring both removal and addition of edges", () => {
  const items: TestItems = {
    1: {
      id: "1",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 0, y: 0, z: 0 } },
    },
    2: {
      id: "2",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 10, y: 0, z: 0 } },
    },
    3: {
      id: "3",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 20, y: 0, z: 0 } },
    },
    4: {
      id: "4",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 30, y: 0, z: 0 } },
    },
  };
  const spatialIndex = new GridSpatialIndex(objectValues(items));

  const edges = updateZEdges(items, spatialIndex);
  // front => behind
  expect(edges).toMatchInlineSnapshot(`
    Map {
      "2" => Map {
        "1" => false,
      },
      "3" => Map {
        "2" => false,
      },
      "4" => Map {
        "3" => false,
      },
    }
  `);

  // move item 1 to the left - it is now behind all others:
  items[1].state.position.x = 40;
  // move item 2 far away in the sky - it is now not behind/in front of anything:
  items[2].state.position.z = 100;

  updateZEdges(items, spatialIndex, new Set([items[1], items[2]]), edges);

  expect(edges).toMatchInlineSnapshot(`
    Map {
      "4" => Map {
        "3" => false,
      },
      "1" => Map {
        "4" => false,
      },
    }
  `);
});

test("incremental updates requiring removal of outbound and inbound edges", () => {
  // set up three in a line visually away from us
  // so:       a -behind-> b -behind-> c
  // and:      a -behind-> c
  const items: TestItems = {
    c: {
      id: "c",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 0, y: 0, z: 20 } },
    },
    b: {
      id: "b",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 10, y: 10, z: 10 } },
    },
    a: {
      id: "a",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 20, y: 20, z: 0 } },
    },
  };
  const spatialIndex = new GridSpatialIndex(objectValues(items));

  const edges = updateZEdges(items, spatialIndex);
  // front => behind
  expect(edges).toMatchInlineSnapshot(`
    Map {
      "b" => Map {
        "c" => false,
      },
      "a" => Map {
        "c" => false,
        "b" => false,
      },
    }
  `);

  // move the middle item (b) out - this will need removal of edges both from b and
  // to b
  items.b.state.position.z = 200;
  // move item 2 far away in the sky - it is now not behind/in front of anything:

  updateZEdges(items, spatialIndex, new Set([items.b]), edges);

  // b is gone - only a =behind-> c remains
  expect(edges).toMatchInlineSnapshot(`
    Map {
      "a" => Map {
        "c" => false,
      },
    }
  `);
});

test("incremental updates can completely empty the graph", () => {
  // set up three in a line visually away from us
  // so:       a -behind-> b -behind-> c
  const items: TestItems = {
    c: {
      id: "c",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 0, y: 0, z: 0 } },
    },
    b: {
      id: "b",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 10, y: 10, z: 0 } },
    },
    a: {
      id: "a",
      aabb: { x: 10, y: 10, z: 10 },

      state: { position: { x: 20, y: 20, z: 0 } },
    },
  };
  const spatialIndex = new GridSpatialIndex(objectValues(items));

  const edges = updateZEdges(items, spatialIndex);
  // front => behind
  expect(edges).toMatchInlineSnapshot(`
    Map {
      "b" => Map {
        "c" => false,
      },
      "a" => Map {
        "b" => false,
      },
    }
  `);

  // move the middle item (b) out - this will need removal of edges both from b and
  // to b
  items.b.state.position.z = 200;
  // move item 2 far away in the sky - it is now not behind/in front of anything:

  updateZEdges(items, spatialIndex, new Set([items.b]), edges);

  // b is gone - only a =behind-> c remains
  expect(edges).toMatchInlineSnapshot(`Map {}`);
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
      },
      cube: {
        id: "cube",
        state: { position: { x: 0, y: 10, z: 0 } },
        aabb: { x: 5, y: 5, z: 10 },
      },
      conveyor: {
        id: "conveyor",
        state: { position: { x: 0, y: 0, z: 0 } },
        aabb: { x: 10, y: 10, z: 10 },
      },
    };

    const spatialIndex = new GridSpatialIndex(objectValues(items));

    const relations = updateZEdges(items, spatialIndex);
    expect(() => toposort(relations)).not.toThrow();
  });

  test("found situation 2 - genuine cyclic dependency - not possible to render without splitting sprites up!", () => {
    const items: TestItems = {
      pushableBlock: {
        id: "pushableBlock",
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
      },
      monster: {
        id: "monster",
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
      },
    } as const;

    // verify that the items aren't illegally colliding (which would make this test maybe invalid)
    for (const i of Object.values(items)) {
      const index = new GridSpatialIndex(objectValues(items));
      expect(collisionItemWithIndex(i, index).toArray()).toEqual([]);
    }

    const spatialIndex = new GridSpatialIndex(objectValues(items));

    const relations = updateZEdges(items, spatialIndex);

    // end result should should express:
    //  pushableBlock -behind-> pickup
    //  pickup -behind-> monster
    //  monster -behind-> pushableBlock
    expect(relations.get("pushableBlock")?.entries().toArray()).toEqual([
      ["pickup", false],
    ]);
    expect(relations.get("pickup")?.entries().toArray()).toEqual([
      ["monster", false],
    ]);
    expect(relations.get("monster")?.entries().toArray()).toEqual([
      ["pushableBlock", false],
    ]);

    expect(() => toposort(relations)).not.toThrow();
  });
});
