import { describe, expect, test } from "vitest";

import { Graph } from "../../../utils/graph/Graph";
import { cameraAngleBase } from "../../../utils/vectors/cameraAngleVectors";
import { collisionItemWithIndex } from "../../collision/aabbCollision";
import { SpatialIndex } from "../../physics/gridSpace/SpatialIndex";
import { type RenderBox } from "../renderBox/makeItemRenderBoxAtCameraAngle";
import { populatedBroadPhase } from "./__test__/populatedBroadPhase";
import { type DrawOrderComparable } from "./DrawOrderComparable";
import { updateZEdges } from "./updateZEdges";

const noRenderBoxes = new Map<DrawOrderComparable, RenderBox | undefined>();

const makeItems = <T extends Record<string, DrawOrderComparable>>(
  itemDefs: T,
): { set: Set<DrawOrderComparable>; items: T } => ({
  set: new Set(Object.values(itemDefs)),
  items: itemDefs,
});

/**
 * the graph's edges as `"back->front"` strings in the graph's node order,
 * with the broken ones marked - the shape the inline snapshots pin
 */
const edgeIds = (edges: Graph<DrawOrderComparable>): string[] => {
  const result: string[] = [];
  for (let i = 0; i < edges.nodeCount; i++) {
    const behind = edges.nodeAt(i);
    edges.forEachEdgeFrom(behind, (front, broken) => {
      result.push(`${behind.id}->${front.id}${broken ? " [broken]" : ""}`);
    });
  }
  return result;
};

/** one node's outgoing edges as [front, broken] pairs */
const edgesFrom = (
  graph: Graph<DrawOrderComparable>,
  item: DrawOrderComparable,
): Array<[DrawOrderComparable, boolean]> => {
  const result: Array<[DrawOrderComparable, boolean]> = [];
  graph.forEachEdgeFrom(item, (front, broken) => {
    result.push([front, broken]);
  });
  return result;
};

test("detects behind in x", () => {
  const { set } = makeItems({
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
  });

  const broadPhase = populatedBroadPhase(set);

  const edges = new Graph<DrawOrderComparable>();
  updateZEdges(set, broadPhase, edges, noRenderBoxes);
  // front => behind
  expect(edgeIds(edges)).toMatchInlineSnapshot(`
    [
      "2->1",
      "3->2",
      "4->3",
    ]
  `);
  // no cyclic dependencies
  expect(() => edges.topologicalSortInPlace()).not.toThrow();
});

test("detects behind in y", () => {
  const { set } = makeItems({
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
  });

  const broadPhase = populatedBroadPhase(set);

  const relations = new Graph<DrawOrderComparable>();
  updateZEdges(set, broadPhase, relations, noRenderBoxes);
  // front => behind
  expect(edgeIds(relations)).toMatchInlineSnapshot(`
    [
      "2->1",
      "3->2",
      "4->3",
    ]
  `);
  // no cyclic dependencies
  expect(() => relations.topologicalSortInPlace()).not.toThrow();
});

test("detects behind in z (inverted from x and y - higher is in front)", () => {
  const { set } = makeItems({
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
  });

  const broadPhase = populatedBroadPhase(set);

  const relations = new Graph<DrawOrderComparable>();
  updateZEdges(set, broadPhase, relations, noRenderBoxes);
  // front => behind
  expect(edgeIds(relations)).toMatchInlineSnapshot(`
    [
      "1->2",
      "2->3",
      "3->4",
    ]
  `);
  // no cyclic dependencies
  expect(() => relations.topologicalSortInPlace()).not.toThrow();
  relations.topologicalSortInPlace();
});

test("detects as in front if on top and set back while overlapping", () => {
  const { set } = makeItems({
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
  });

  const broadPhase = populatedBroadPhase(set);

  const relations = new Graph<DrawOrderComparable>();
  updateZEdges(set, broadPhase, relations, noRenderBoxes);
  // front => behind - top in front of bottom:
  expect(edgeIds(relations)).toMatchInlineSnapshot(`
    [
      "bottom->top",
    ]
  `);
  // no cyclic dependencies
  expect(() => relations.topologicalSortInPlace()).not.toThrow();
});

test("detects a tall item is front of two smaller items", () => {
  const { set } = makeItems({
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
  });

  const broadPhase = populatedBroadPhase(set);

  const relations = new Graph<DrawOrderComparable>();
  updateZEdges(set, broadPhase, relations, noRenderBoxes);
  expect(edgeIds(relations)).toMatchInlineSnapshot(`
    [
      "smallerTop->tallThinFront",
      "smallerBottom->tallThinFront",
    ]
  `);
  // no cyclic dependencies
  expect(() => relations.topologicalSortInPlace()).not.toThrow();
});

test("a rebuild after items move reflects their new positions", () => {
  const { set, items } = makeItems({
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
  });
  const broadPhase = populatedBroadPhase(set);

  const edges = new Graph<DrawOrderComparable>();
  updateZEdges(set, broadPhase, edges, noRenderBoxes);
  // front => behind
  expect(edgeIds(edges)).toMatchInlineSnapshot(`
    [
      "2->1",
      "3->2",
      "4->3",
    ]
  `);

  // move item 1 to the left - it is now behind all others:
  items[1].state.position.x = 40;
  // move item 2 far away in the sky - it is now not behind/in front of anything:
  items[2].state.position.z = 100;

  broadPhase.updateManyItems(set, noRenderBoxes, cameraAngleBase);
  updateZEdges(set, broadPhase, edges, noRenderBoxes);

  expect(edgeIds(edges)).toMatchInlineSnapshot(`
    [
      "1->4",
      "4->3",
    ]
  `);
});

test("an item moved clear of the others has no edges either way", () => {
  // set up three in a line visually away from us
  // so:       a -behind-> b -behind-> c
  // and:      a -behind-> c
  const { set, items } = makeItems({
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
  });
  const broadPhase = populatedBroadPhase(set);

  const edges = new Graph<DrawOrderComparable>();
  updateZEdges(set, broadPhase, edges, noRenderBoxes);
  // front => behind
  expect(edgeIds(edges)).toMatchInlineSnapshot(`
    [
      "b->c",
      "a->c",
      "a->b",
    ]
  `);

  // move the middle item (b) out - this will need removal of edges both from b and
  // to b
  items.b.state.position.z = 200;
  // move item 2 far away in the sky - it is now not behind/in front of anything:

  broadPhase.updateManyItems(set, noRenderBoxes, cameraAngleBase);
  updateZEdges(set, broadPhase, edges, noRenderBoxes);

  // b is gone - only a =behind-> c remains
  expect(edgeIds(edges)).toMatchInlineSnapshot(`
    [
      "a->c",
    ]
  `);
});

test("a rebuild of items that no longer overlap yields no edges", () => {
  // set up three in a line visually away from us
  // so:       a -behind-> b -behind-> c
  const { set, items } = makeItems({
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
  });
  const broadPhase = populatedBroadPhase(set);

  const edges = new Graph<DrawOrderComparable>();
  updateZEdges(set, broadPhase, edges, noRenderBoxes);
  // front => behind
  expect(edgeIds(edges)).toMatchInlineSnapshot(`
    [
      "b->c",
      "a->b",
    ]
  `);

  // move the middle item (b) out - this will need removal of edges both from b and
  // to b
  items.b.state.position.z = 200;
  // move item 2 far away in the sky - it is now not behind/in front of anything:

  broadPhase.updateManyItems(set, noRenderBoxes, cameraAngleBase);
  updateZEdges(set, broadPhase, edges, noRenderBoxes);

  // b is gone - only a =behind-> c remains
  expect(edgeIds(edges)).toMatchInlineSnapshot(`[]`);
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
    const { set } = makeItems({
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
    });

    const broadPhase = populatedBroadPhase(set);

    const relations = new Graph<DrawOrderComparable>();
    updateZEdges(set, broadPhase, relations, noRenderBoxes);
    expect(() => relations.topologicalSortInPlace()).not.toThrow();
  });

  test("found situation 2 - genuine cyclic dependency - not possible to render without splitting sprites up!", () => {
    const { set, items } = makeItems({
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
    });

    // verify that the items aren't illegally colliding (which would make this test maybe invalid)
    for (const i of set) {
      const index = new SpatialIndex(set.values());
      expect(collisionItemWithIndex(i, index).toArray()).toEqual([]);
    }

    const broadPhase = populatedBroadPhase(set);

    const relations = new Graph<DrawOrderComparable>();
    updateZEdges(set, broadPhase, relations, noRenderBoxes);

    // end result should should express:
    //  pushableBlock -behind-> pickup
    //  pickup -behind-> monster
    //  monster -behind-> pushableBlock
    expect(edgesFrom(relations, items.pushableBlock)).toEqual([
      [items.pickup, false],
    ]);
    expect(edgesFrom(relations, items.pickup)).toEqual([
      [items.monster, false],
    ]);
    expect(edgesFrom(relations, items.monster)).toEqual([
      [items.pushableBlock, false],
    ]);

    expect(() => relations.topologicalSortInPlace()).not.toThrow();
  });
});
