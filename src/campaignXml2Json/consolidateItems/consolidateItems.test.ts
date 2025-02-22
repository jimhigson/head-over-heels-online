import { expect, test } from "vitest";
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
        activated: true,
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
          "activated": true,
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
