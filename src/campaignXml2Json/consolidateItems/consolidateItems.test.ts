import { describe, expect, test } from "vitest";
import type { JsonItemUnion } from "../../model/json/JsonItem";
import { consolidateItems } from "./consolidateItems";

test("can consolidate two blocks in y at the origin", () => {
  const items: JsonItemUnion[] = [
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
    },
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 0, y: 1, z: 0 },
    },
  ];

  expect(consolidateItems(items)).toMatchInlineSnapshot(`
    [
      {
        "config": {
          "style": "organic",
          "times": {
            "y": 2,
          },
        },
        "position": {
          "x": 0,
          "y": 0,
          "z": 0,
        },
        "type": "block",
      },
    ]
  `);
});

test("can consolidate two teleporters in y at the origin", () => {
  const items: JsonItemUnion[] = [
    {
      type: "teleporter",
      config: { toRoom: "any", toPosition: { x: 0, y: 0, z: 0 } },
      position: { x: 0, y: 0, z: 0 },
    },
    {
      type: "teleporter",
      // note: config isn't identical: toPosition is different
      config: { toRoom: "any", toPosition: { x: 0, y: 1, z: 0 } },
      position: { x: 0, y: 1, z: 0 },
    },
  ];

  expect(consolidateItems(items)).toMatchInlineSnapshot(`
    [
      {
        "config": {
          "times": {
            "y": 2,
          },
          "toPosition": {
            "x": 0,
            "y": 0,
            "z": 0,
          },
          "toRoom": "any",
        },
        "position": {
          "x": 0,
          "y": 0,
          "z": 0,
        },
        "type": "teleporter",
      },
    ]
  `);
});

test("does not consolidate disappearing blocks", () => {
  // disappearing blocks need to disappear one by one, not as a multiple-block block,
  //so they can't be consolidated

  const items: JsonItemUnion[] = [
    {
      type: "block",
      config: { style: "organic", disappearing: "onStand" },
      position: { x: 0, y: 0, z: 0 },
    },
    {
      type: "block",
      config: { style: "organic", disappearing: "onStand" },
      position: { x: 0, y: 1, z: 0 },
    },
  ];

  expect(consolidateItems(items)).toMatchInlineSnapshot(`
    [
      {
        "config": {
          "disappearing": "onStand",
          "style": "organic",
        },
        "position": {
          "x": 0,
          "y": 0,
          "z": 0,
        },
        "type": "block",
      },
      {
        "config": {
          "disappearing": "onStand",
          "style": "organic",
        },
        "position": {
          "x": 0,
          "y": 1,
          "z": 0,
        },
        "type": "block",
      },
    ]
  `);
});

test("consolidates barriers", () => {
  // disappearing blocks need to disappear one by one, not as a multiple-block block,
  //so they can't be consolidated

  const items: JsonItemUnion[] = [
    {
      type: "barrier",
      config: { axis: "y" },
      position: { x: 0, y: 0, z: 0 },
    },
    {
      type: "barrier",
      config: { axis: "y" },
      position: { x: 0, y: 1, z: 0 },
    },
  ];

  expect(consolidateItems(items)).toMatchInlineSnapshot(`
    [
      {
        "config": {
          "axis": "y",
          "times": {
            "y": 2,
          },
        },
        "position": {
          "x": 0,
          "y": 0,
          "z": 0,
        },
        "type": "barrier",
      },
    ]
  `);
});
test("does not consolidate disappearing barriers", () => {
  // disappearing blocks need to disappear one by one, not as a multiple-block block,
  //so they can't be consolidated

  const items: JsonItemUnion[] = [
    {
      type: "barrier",
      config: { axis: "y", disappearing: "onTouch" },
      position: { x: 0, y: 0, z: 0 },
    },
    {
      type: "barrier",
      config: { axis: "y" },
      position: { x: 0, y: 1, z: 0 },
    },
  ];

  expect(consolidateItems(items)).toMatchInlineSnapshot(`
    [
      {
        "config": {
          "axis": "y",
        },
        "position": {
          "x": 0,
          "y": 1,
          "z": 0,
        },
        "type": "barrier",
      },
      {
        "config": {
          "axis": "y",
          "disappearing": "onTouch",
        },
        "position": {
          "x": 0,
          "y": 0,
          "z": 0,
        },
        "type": "barrier",
      },
    ]
  `);
});

test("does not consolidate two blocks with different config", () => {
  const items: JsonItemUnion[] = [
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
    },
    {
      type: "block",
      config: { style: "artificial" },
      position: { x: 0, y: 1, z: 0 },
    },
  ];

  expect(consolidateItems(items)).toMatchInlineSnapshot(`
    [
      {
        "config": {
          "style": "organic",
        },
        "position": {
          "x": 0,
          "y": 0,
          "z": 0,
        },
        "type": "block",
      },
      {
        "config": {
          "style": "artificial",
        },
        "position": {
          "x": 0,
          "y": 1,
          "z": 0,
        },
        "type": "block",
      },
    ]
  `);
});

test("can consolidate two blocks in y at arbitrary position", () => {
  const items: JsonItemUnion[] = [
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 12, y: 4, z: 8 },
    },
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 12, y: 5, z: 8 },
    },
  ];

  expect(consolidateItems(items)).toMatchInlineSnapshot(`
    [
      {
        "config": {
          "style": "organic",
          "times": {
            "y": 2,
          },
        },
        "position": {
          "x": 12,
          "y": 4,
          "z": 8,
        },
        "type": "block",
      },
    ]
  `);
});

test("can consolidate 8 blocks in x,y,z at arbitrary position", () => {
  const items: JsonItemUnion[] = [
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 12, y: 4, z: 8 },
    },
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 12, y: 5, z: 8 },
    },
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 13, y: 4, z: 8 },
    },
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 13, y: 5, z: 8 },
    },
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 12, y: 4, z: 9 },
    },
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 12, y: 5, z: 9 },
    },
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 13, y: 4, z: 9 },
    },
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 13, y: 5, z: 9 },
    },
  ];

  expect(consolidateItems(items)).toMatchInlineSnapshot(`
    [
      {
        "config": {
          "style": "organic",
          "times": {
            "x": 2,
            "y": 2,
            "z": 2,
          },
        },
        "position": {
          "x": 12,
          "y": 4,
          "z": 8,
        },
        "type": "block",
      },
    ]
  `);
});

test("can consolidate two blocks in z", () => {
  const items: JsonItemUnion[] = [
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
    },
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 1 },
    },
  ];

  expect(consolidateItems(items)).toMatchInlineSnapshot(`
    [
      {
        "config": {
          "style": "organic",
          "times": {
            "z": 2,
          },
        },
        "position": {
          "x": 0,
          "y": 0,
          "z": 0,
        },
        "type": "block",
      },
    ]
  `);
});

test("does not consolidate if a gap between two blocks", () => {
  const items: JsonItemUnion[] = [
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
    },
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 2 },
    },
  ];

  expect(consolidateItems(items)).toMatchInlineSnapshot(`
    [
      {
        "config": {
          "style": "organic",
        },
        "position": {
          "x": 0,
          "y": 0,
          "z": 0,
        },
        "type": "block",
      },
      {
        "config": {
          "style": "organic",
        },
        "position": {
          "x": 0,
          "y": 0,
          "z": 2,
        },
        "type": "block",
      },
    ]
  `);
});

test("ignores non-consolidatable items", () => {
  const items: JsonItemUnion[] = [
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
    },
    {
      type: "monster",
      config: {
        which: "dalek",
        activated: "on",
        movement: "patrol-randomly-diagonal",
      },
      position: { x: 0, y: 0, z: 1 },
    },

    {
      type: "block",
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 2 },
    },
  ];

  expect(consolidateItems(items)).toMatchInlineSnapshot(`
    [
      {
        "config": {
          "style": "organic",
        },
        "position": {
          "x": 0,
          "y": 0,
          "z": 0,
        },
        "type": "block",
      },
      {
        "config": {
          "style": "organic",
        },
        "position": {
          "x": 0,
          "y": 0,
          "z": 2,
        },
        "type": "block",
      },
      {
        "config": {
          "activated": "on",
          "movement": "patrol-randomly-diagonal",
          "which": "dalek",
        },
        "position": {
          "x": 0,
          "y": 0,
          "z": 1,
        },
        "type": "monster",
      },
    ]
  `);
});

test("can consolidate runs of conveyors", () => {
  const items: JsonItemUnion[] = [
    {
      type: "conveyor",
      config: { direction: "right" },
      position: { x: 0, y: 0, z: 0 },
    },
    {
      type: "conveyor",
      config: { direction: "right" },
      position: { x: 1, y: 0, z: 0 },
    },
    {
      type: "conveyor",
      config: { direction: "right" },
      position: { x: 2, y: 0, z: 0 },
    },
    {
      type: "conveyor",
      config: { direction: "away" },
      position: { x: 3, y: 0, z: 0 },
    },
    {
      type: "conveyor",
      config: { direction: "away" },
      position: { x: 3, y: 1, z: 0 },
    },
    {
      type: "conveyor",
      config: { direction: "away" },
      position: { x: 3, y: 2, z: 0 },
    },
  ];

  expect(consolidateItems(items)).toMatchInlineSnapshot(`
    [
      {
        "config": {
          "direction": "right",
          "times": {
            "x": 3,
          },
        },
        "position": {
          "x": 0,
          "y": 0,
          "z": 0,
        },
        "type": "conveyor",
      },
      {
        "config": {
          "direction": "away",
          "times": {
            "y": 3,
          },
        },
        "position": {
          "x": 3,
          "y": 0,
          "z": 0,
        },
        "type": "conveyor",
      },
    ]
  `);
});

describe("walls", () => {
  test("can consolidate two adjacent walls even if their tiles are different", () => {
    const items: JsonItemUnion[] = [
      {
        type: "wall",
        config: { direction: "away", tiles: ["cowboy"] },
        position: { x: 0, y: 0, z: 0 },
      },
      {
        type: "wall",
        config: { direction: "away", tiles: ["book"] },
        position: { x: 0, y: 1, z: 0 },
      },
    ];

    expect(consolidateItems(items)).toMatchInlineSnapshot(`
      [
        {
          "config": {
            "direction": "away",
            "tiles": [
              "cowboy",
              "book",
            ],
            "times": {
              "y": 2,
            },
          },
          "position": {
            "x": 0,
            "y": 0,
            "z": 0,
          },
          "type": "wall",
        },
      ]
    `);
  });
  test("can consolidate many adjacent walls with some tiles in common", () => {
    const items: JsonItemUnion[] = [
      {
        type: "wall",
        config: { direction: "left", tiles: ["cowboy"] },
        position: { x: 0, y: 0, z: 0 },
      },
      {
        type: "wall",
        config: { direction: "left", tiles: ["cowboy"] },
        position: { x: 1, y: 0, z: 0 },
      },
      {
        type: "wall",
        config: { direction: "left", tiles: ["book"] },
        position: { x: 2, y: 0, z: 0 },
      },
      {
        type: "wall",
        config: { direction: "left", tiles: ["book"] },
        position: { x: 3, y: 0, z: 0 },
      },
    ];

    expect(consolidateItems(items)).toMatchInlineSnapshot(`
      [
        {
          "config": {
            "direction": "left",
            "tiles": [
              "cowboy",
              "cowboy",
              "book",
              "book",
            ],
            "times": {
              "x": 4,
            },
          },
          "position": {
            "x": 0,
            "y": 0,
            "z": 0,
          },
          "type": "wall",
        },
      ]
    `);
  });
  test("does not consolidate two adjacent walls even if their sides are different", () => {
    const items: JsonItemUnion[] = [
      {
        type: "wall",
        config: { direction: "left", tiles: ["cowboy"] },
        position: { x: 0, y: 0, z: 0 },
      },
      {
        type: "wall",
        config: { direction: "away", tiles: ["cowboy"] },
        position: { x: 0, y: 1, z: 0 },
      },
    ];

    expect(consolidateItems(items)).toMatchInlineSnapshot(`
      [
        {
          "config": {
            "direction": "left",
            "tiles": [
              "cowboy",
            ],
          },
          "position": {
            "x": 0,
            "y": 0,
            "z": 0,
          },
          "type": "wall",
        },
        {
          "config": {
            "direction": "away",
            "tiles": [
              "cowboy",
            ],
          },
          "position": {
            "x": 0,
            "y": 1,
            "z": 0,
          },
          "type": "wall",
        },
      ]
    `);
  });
});
