import { describe, expect, test } from "vitest";
import type { ConsolidatableItemWithId, ItemWithId } from "./consolidateItems";
import { consolidateItems, consolidateItemsMap } from "./consolidateItems";
import { size } from "iter-tools";

describe("blocks", () => {
  test("can consolidate two blocks in y at the origin", () => {
    const items: ConsolidatableItemWithId[] = [
      [
        "block1",
        {
          type: "block",
          config: { style: "organic" },
          position: { x: 0, y: 0, z: 0 },
        },
      ],
      [
        "block2",
        {
          type: "block",
          config: { style: "organic" },
          position: { x: 0, y: 1, z: 0 },
        },
      ],
    ];

    expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
    [
      [
        "block1",
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
      ],
    ]
  `);
  });

  test("can consolidate four blocks in x and y at the origin", () => {
    const items: ConsolidatableItemWithId[] = [
      [
        "block1",
        {
          type: "block",
          config: { style: "organic" },
          position: { x: 0, y: 0, z: 0 },
        },
      ],
      [
        "block2",
        {
          type: "block",
          config: { style: "organic" },
          position: { x: 0, y: 1, z: 0 },
        },
      ],
      [
        "block3",
        {
          type: "block",
          config: { style: "organic" },
          position: { x: 1, y: 0, z: 0 },
        },
      ],
      [
        "block4",
        {
          type: "block",
          config: { style: "organic" },
          position: { x: 1, y: 1, z: 0 },
        },
      ],
    ];

    expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
      [
        [
          "block1",
          {
            "config": {
              "style": "organic",
              "times": {
                "x": 2,
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
        ],
      ]
    `);
  });

  test("can consolidate two blocks that already occupy multiple positions", () => {
    const items: ConsolidatableItemWithId[] = [
      [
        "block1",
        {
          type: "block",
          config: { style: "organic", times: { x: 2, y: 2 } },
          position: { x: 0, y: 0, z: 0 },
        },
      ],
      [
        "block2",
        {
          type: "block",
          config: { style: "organic", times: { x: 2, y: 2 } },
          position: { x: 0, y: 0, z: 1 },
        },
      ],
    ];

    expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
    [
      [
        "block1",
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
            "x": 0,
            "y": 0,
            "z": 0,
          },
          "type": "block",
        },
      ],
    ]
  `);
  });

  test("can consolidate two blocks that already occupy multiple positions, and do not have adjacent positions", () => {
    const items: ConsolidatableItemWithId[] = [
      [
        "block1",
        {
          type: "block",
          config: { style: "organic", times: { x: 2, y: 2 } },
          position: { x: 0, y: 0, z: 0 },
        },
      ],
      [
        "block2",
        {
          type: "block",
          config: { style: "organic", times: { x: 2, y: 2 } },
          position: { x: 0, y: 2, z: 0 },
        },
      ],
    ];

    expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
    [
      [
        "block1",
        {
          "config": {
            "style": "organic",
            "times": {
              "x": 2,
              "y": 4,
            },
          },
          "position": {
            "x": 0,
            "y": 0,
            "z": 0,
          },
          "type": "block",
        },
      ],
    ]
  `);
  });
});

test("can consolidate two teleporters in y at the origin", () => {
  const items: ConsolidatableItemWithId[] = [
    [
      "teleporter1",
      {
        type: "teleporter",
        config: { toRoom: "any", toPosition: { x: 0, y: 0, z: 0 } },
        position: { x: 0, y: 0, z: 0 },
      },
    ],
    [
      "teleporter2",
      {
        type: "teleporter",
        // note: config isn't identical: toPosition is different
        config: { toRoom: "any", toPosition: { x: 0, y: 1, z: 0 } },
        position: { x: 0, y: 1, z: 0 },
      },
    ],
  ];

  expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
    [
      [
        "teleporter1",
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
      ],
    ]
  `);
});

test("does not consolidate disappearing blocks", () => {
  // disappearing blocks need to disappear one by one, not as a multiple-block block,
  //so they can't be consolidated

  const items: ConsolidatableItemWithId[] = [
    [
      "block1",
      {
        type: "block",
        config: { style: "organic", disappearing: { on: "stand" } },
        position: { x: 0, y: 0, z: 0 },
      },
    ],
    [
      "block2",
      {
        type: "block",
        config: { style: "organic", disappearing: { on: "stand" } },
        position: { x: 0, y: 1, z: 0 },
      },
    ],
  ];

  expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
    [
      [
        "block1",
        {
          "config": {
            "disappearing": {
              "on": "stand",
            },
            "style": "organic",
          },
          "position": {
            "x": 0,
            "y": 0,
            "z": 0,
          },
          "type": "block",
        },
      ],
      [
        "block2",
        {
          "config": {
            "disappearing": {
              "on": "stand",
            },
            "style": "organic",
          },
          "position": {
            "x": 0,
            "y": 1,
            "z": 0,
          },
          "type": "block",
        },
      ],
    ]
  `);
});

test("consolidates barriers", () => {
  // disappearing blocks need to disappear one by one, not as a multiple-block block,
  //so they can't be consolidated

  const items: ConsolidatableItemWithId[] = [
    [
      "barrier1",
      {
        type: "barrier",
        config: { axis: "y" },
        position: { x: 0, y: 0, z: 0 },
      },
    ],
    [
      "barrier2",
      {
        type: "barrier",
        config: { axis: "y" },
        position: { x: 0, y: 1, z: 0 },
      },
    ],
  ];

  expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
    [
      [
        "barrier1",
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
      ],
    ]
  `);
});
test("does not consolidate disappearing barriers", () => {
  // disappearing blocks need to disappear one by one, not as a multiple-block block,
  //so they can't be consolidated

  const items: ConsolidatableItemWithId[] = [
    [
      "barrier1",
      {
        type: "barrier",
        config: { axis: "y", disappearing: { on: "touch" } },
        position: { x: 0, y: 0, z: 0 },
      },
    ],
    [
      "barrier2",
      {
        type: "barrier",
        config: { axis: "y", disappearing: { on: "touch" } },
        position: { x: 0, y: 1, z: 0 },
      },
    ],
  ];

  expect(size(consolidateItems(items))).toBe(2);

  expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
    [
      [
        "barrier1",
        {
          "config": {
            "axis": "y",
            "disappearing": {
              "on": "touch",
            },
          },
          "position": {
            "x": 0,
            "y": 0,
            "z": 0,
          },
          "type": "barrier",
        },
      ],
      [
        "barrier2",
        {
          "config": {
            "axis": "y",
            "disappearing": {
              "on": "touch",
            },
          },
          "position": {
            "x": 0,
            "y": 1,
            "z": 0,
          },
          "type": "barrier",
        },
      ],
    ]
  `);
});

test("does not consolidate two blocks with different config", () => {
  const items: ConsolidatableItemWithId[] = [
    [
      "block1",
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 0, z: 0 },
      },
    ],
    [
      "block2",
      {
        type: "block",
        config: { style: "artificial" },
        position: { x: 0, y: 1, z: 0 },
      },
    ],
  ];

  expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
    [
      [
        "block1",
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
      ],
      [
        "block2",
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
      ],
    ]
  `);
});

test("can consolidate two blocks in y at arbitrary position", () => {
  const items: ConsolidatableItemWithId[] = [
    [
      "block1",
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 12, y: 4, z: 8 },
      },
    ],
    [
      "block2",
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 12, y: 5, z: 8 },
      },
    ],
  ];

  expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
    [
      [
        "block1",
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
      ],
    ]
  `);
});

test("can consolidate 8 blocks in x,y,z at arbitrary position", () => {
  const items: ConsolidatableItemWithId[] = [
    [
      "block1",
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 12, y: 4, z: 8 },
      },
    ],
    [
      "block2",
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 12, y: 5, z: 8 },
      },
    ],
    [
      "block3",
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 13, y: 4, z: 8 },
      },
    ],
    [
      "block4",
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 13, y: 5, z: 8 },
      },
    ],
    [
      "block5",
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 12, y: 4, z: 9 },
      },
    ],
    [
      "block6",
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 12, y: 5, z: 9 },
      },
    ],
    [
      "block7",
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 13, y: 4, z: 9 },
      },
    ],
    [
      "block8",
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 13, y: 5, z: 9 },
      },
    ],
  ];

  expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
    [
      [
        "block1",
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
      ],
    ]
  `);
});

test("can consolidate two blocks in z", () => {
  const items: ConsolidatableItemWithId[] = [
    [
      "block1",
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 0, z: 0 },
      },
    ],
    [
      "block2",
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 0, z: 1 },
      },
    ],
  ];

  expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
    [
      [
        "block1",
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
      ],
    ]
  `);
});

test("does not consolidate if a gap between two blocks", () => {
  const items: ConsolidatableItemWithId[] = [
    [
      "block1",
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 0, z: 0 },
      },
    ],
    [
      "block2",
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 0, z: 2 },
      },
    ],
  ];

  expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
    [
      [
        "block1",
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
      ],
      [
        "block2",
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
      ],
    ]
  `);
});

test("ignores non-consolidatable items", () => {
  const items: ItemWithId[] = [
    [
      "block1",
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 0, z: 0 },
      },
    ],
    [
      "dalek1",
      {
        type: "monster",
        config: {
          which: "dalek",
          activated: "on",
          movement: "patrol-randomly-diagonal",
        },
        position: { x: 0, y: 0, z: 1 },
      },
    ],
    [
      "block2",
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 0, z: 2 },
      },
    ],
  ];

  expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
    [
      [
        "block1",
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
      ],
      [
        "block2",
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
      ],
      [
        "dalek1",
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
      ],
    ]
  `);
});

describe("conveyors", () => {
  test("can consolidate runs of conveyors", () => {
    const items: ConsolidatableItemWithId[] = [
      [
        "conveyor1",
        {
          type: "conveyor",
          config: { direction: "right" },
          position: { x: 0, y: 0, z: 0 },
        },
      ],
      [
        "conveyor2",
        {
          type: "conveyor",
          config: { direction: "right" },
          position: { x: 1, y: 0, z: 0 },
        },
      ],
      [
        "conveyor3",
        {
          type: "conveyor",
          config: { direction: "right" },
          position: { x: 2, y: 0, z: 0 },
        },
      ],
      [
        "conveyor4",
        {
          type: "conveyor",
          config: { direction: "away" },
          position: { x: 3, y: 0, z: 0 },
        },
      ],
      [
        "conveyor5",
        {
          type: "conveyor",
          config: { direction: "away" },
          position: { x: 3, y: 1, z: 0 },
        },
      ],
      [
        "conveyor6",
        {
          type: "conveyor",
          config: { direction: "away" },
          position: { x: 3, y: 2, z: 0 },
        },
      ],
    ];

    expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
    [
      [
        "conveyor1",
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
      ],
      [
        "conveyor4",
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
      ],
    ]
  `);
  });
  test("does not consolidate conveyors which are not in-line with their direction", () => {
    const items: ConsolidatableItemWithId[] = [
      [
        "conveyor1",
        {
          type: "conveyor",
          config: { direction: "right" },
          position: { x: 0, y: 0, z: 0 },
        },
      ],
      [
        "conveyor2",
        {
          type: "conveyor",
          config: { direction: "right" },
          position: { x: 0, y: 1, z: 0 },
        },
      ],
    ];

    expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
      [
        [
          "conveyor1",
          {
            "config": {
              "direction": "right",
            },
            "position": {
              "x": 0,
              "y": 0,
              "z": 0,
            },
            "type": "conveyor",
          },
        ],
        [
          "conveyor2",
          {
            "config": {
              "direction": "right",
            },
            "position": {
              "x": 0,
              "y": 1,
              "z": 0,
            },
            "type": "conveyor",
          },
        ],
      ]
    `);
  });
});

describe("walls", () => {
  test("can consolidate two adjacent walls even if their tiles are different", () => {
    const items: ConsolidatableItemWithId[] = [
      [
        "wall1",
        {
          type: "wall",
          config: { direction: "away", tiles: ["cowboy"] },
          position: { x: 0, y: 0, z: 0 },
        },
      ],
      [
        "wall2",
        {
          type: "wall",
          config: { direction: "away", tiles: ["book"] },
          position: { x: 1, y: 0, z: 0 },
        },
      ],
    ];

    expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
      [
        [
          "wall1",
          {
            "config": {
              "direction": "away",
              "tiles": [
                "cowboy",
                "book",
              ],
            },
            "position": {
              "x": 0,
              "y": 0,
              "z": 0,
            },
            "type": "wall",
          },
        ],
      ]
    `);
  });
  test("can consolidate many adjacent walls with some tiles in common", () => {
    const items: ConsolidatableItemWithId[] = [
      [
        "wall1",
        {
          type: "wall",
          config: { direction: "left", tiles: ["cowboy"] },
          position: { x: 0, y: 0, z: 0 },
        },
      ],
      [
        "wall2",
        {
          type: "wall",
          config: { direction: "left", tiles: ["cowboy"] },
          position: { x: 0, y: 1, z: 0 },
        },
      ],
      [
        "wall3",
        {
          type: "wall",
          config: { direction: "left", tiles: ["book"] },
          position: { x: 0, y: 2, z: 0 },
        },
      ],
      [
        "wall4",
        {
          type: "wall",
          config: { direction: "left", tiles: ["book"] },
          position: { x: 0, y: 3, z: 0 },
        },
      ],
    ];

    expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
      [
        [
          "wall1",
          {
            "config": {
              "direction": "left",
              "tiles": [
                "cowboy",
                "cowboy",
                "book",
                "book",
              ],
            },
            "position": {
              "x": 0,
              "y": 0,
              "z": 0,
            },
            "type": "wall",
          },
        ],
      ]
    `);
  });
  test("can consolidate right-facing walls using 'times' if they are invisible since they don't have tiles", () => {
    const items: ConsolidatableItemWithId[] = [
      [
        "rightWall1",
        {
          type: "wall",
          config: { direction: "right" },
          position: { x: 1, y: 0, z: 0 },
        },
      ],
      [
        "rightWall2",
        {
          type: "wall",
          config: { direction: "right" },
          position: { x: 1, y: 1, z: 0 },
        },
      ],
      [
        "rightWall3",
        {
          type: "wall",
          config: { direction: "right" },
          position: { x: 1, y: 2, z: 0 },
        },
      ],
      [
        "rightWall4",
        {
          type: "wall",
          config: { direction: "right" },
          position: { x: 1, y: 3, z: 0 },
        },
      ],
    ];

    expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
      [
        [
          "rightWall1",
          {
            "config": {
              "direction": "right",
              "times": {
                "y": 4,
              },
            },
            "position": {
              "x": 1,
              "y": 0,
              "z": 0,
            },
            "type": "wall",
          },
        ],
      ]
    `);
  });
  test("can consolidate towards-facing walls using 'times' if they are invisible since they don't have tiles", () => {
    const items: ConsolidatableItemWithId[] = [
      [
        "towardsWall1",
        {
          type: "wall",
          config: { direction: "towards" },
          position: { x: 0, y: 2, z: 0 },
        },
      ],
      [
        "towardsWall2",
        {
          type: "wall",
          config: { direction: "towards" },
          position: { x: 1, y: 2, z: 0 },
        },
      ],
      [
        "towardsWall3",
        {
          type: "wall",
          config: { direction: "towards" },
          position: { x: 2, y: 2, z: 0 },
        },
      ],
      [
        "towardsWall4",
        {
          type: "wall",
          config: { direction: "towards" },
          position: { x: 3, y: 2, z: 0 },
        },
      ],
    ];

    expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
      [
        [
          "towardsWall1",
          {
            "config": {
              "direction": "towards",
              "times": {
                "x": 4,
              },
            },
            "position": {
              "x": 0,
              "y": 2,
              "z": 0,
            },
            "type": "wall",
          },
        ],
      ]
    `);
  });
  test("does not consolidate two adjacent walls even if their sides are different", () => {
    const items: ConsolidatableItemWithId[] = [
      [
        "leftWall1",
        {
          type: "wall",
          config: { direction: "left", tiles: ["cowboy"] },
          position: { x: 0, y: 0, z: 0 },
        },
      ],
      [
        "awayWall1",
        {
          type: "wall",
          config: { direction: "away", tiles: ["cowboy"] },
          position: { x: 0, y: 1, z: 0 },
        },
      ],
    ];

    expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
      [
        [
          "leftWall1",
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
        ],
        [
          "awayWall1",
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
        ],
      ]
    `);
  });
  test("consolidates four walls (two blocks each) around a room correctly", () => {
    const items: ConsolidatableItemWithId[] = [
      // towards
      [
        "towardsWall1",
        {
          type: "wall",
          config: { direction: "towards" },
          position: { x: 0, y: 0, z: 0 },
        },
      ],
      [
        "towardsWall2",
        {
          type: "wall",
          config: { direction: "towards" },
          position: { x: 1, y: 0, z: 0 },
        },
      ],
      // right
      [
        "rightWall1",
        {
          type: "wall",
          config: { direction: "right" },
          position: { x: 0, y: 0, z: 0 },
        },
      ],
      [
        "rightWall2",
        {
          type: "wall",
          config: { direction: "right" },
          position: { x: 0, y: 1, z: 0 },
        },
      ],
      // away
      [
        "awayWall1",
        {
          type: "wall",
          config: { direction: "away", tiles: ["hieroglyphics"] },
          position: { x: 0, y: 2, z: 0 },
        },
      ],
      [
        "awayWall2",
        {
          type: "wall",
          config: { direction: "away", tiles: ["sarcophagus"] },
          position: { x: 1, y: 2, z: 0 },
        },
      ],
      // left
      [
        "leftWall1",
        {
          type: "wall",
          config: { direction: "left", tiles: ["cowboy"] },
          position: { x: 1, y: 0, z: 0 },
        },
      ],
      [
        "leftWall2",
        {
          type: "wall",
          config: { direction: "left", tiles: ["book"] },
          position: { x: 1, y: 1, z: 0 },
        },
      ],
    ];

    expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
      [
        [
          "towardsWall1",
          {
            "config": {
              "direction": "towards",
              "times": {
                "x": 2,
              },
            },
            "position": {
              "x": 0,
              "y": 0,
              "z": 0,
            },
            "type": "wall",
          },
        ],
        [
          "rightWall1",
          {
            "config": {
              "direction": "right",
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
        ],
        [
          "awayWall1",
          {
            "config": {
              "direction": "away",
              "tiles": [
                "hieroglyphics",
                "sarcophagus",
              ],
            },
            "position": {
              "x": 0,
              "y": 2,
              "z": 0,
            },
            "type": "wall",
          },
        ],
        [
          "leftWall1",
          {
            "config": {
              "direction": "left",
              "tiles": [
                "cowboy",
                "book",
              ],
            },
            "position": {
              "x": 1,
              "y": 0,
              "z": 0,
            },
            "type": "wall",
          },
        ],
      ]
    `);
  });

  test("consolidates walls with tiles that already occupy multiple positions", () => {
    const items: ConsolidatableItemWithId[] = [
      // left
      [
        "leftWall1",
        {
          type: "wall",
          config: { direction: "left", tiles: ["cowboy", "cowboy"] },
          position: { x: 1, y: 0, z: 0 },
        },
      ],
      [
        "leftWall2",
        {
          type: "wall",
          config: { direction: "left", tiles: ["book", "book"] },
          position: { x: 1, y: 2, z: 0 },
        },
      ],
    ];

    expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
      [
        [
          "leftWall1",
          {
            "config": {
              "direction": "left",
              "tiles": [
                "cowboy",
                "cowboy",
                "book",
                "book",
              ],
            },
            "position": {
              "x": 1,
              "y": 0,
              "z": 0,
            },
            "type": "wall",
          },
        ],
      ]
    `);
  });

  test("consolidates walls with times that already occupy multiple positions", () => {
    const items: ConsolidatableItemWithId[] = [
      // right
      [
        "rightWall1",
        {
          type: "wall",
          config: { direction: "right", times: { y: 2 } },
          position: { x: 1, y: 0, z: 0 },
        },
      ],
      [
        "rightWall2",
        {
          type: "wall",
          config: { direction: "right", times: { y: 2 } },
          position: { x: 1, y: 2, z: 0 },
        },
      ],
    ];

    expect([...consolidateItems(items)]).toMatchInlineSnapshot(`
      [
        [
          "rightWall1",
          {
            "config": {
              "direction": "right",
              "times": {
                "y": 4,
              },
            },
            "position": {
              "x": 1,
              "y": 0,
              "z": 0,
            },
            "type": "wall",
          },
        ],
      ]
    `);
  });
});

test("consolidateItemsMap works with object input/output", () => {
  const itemsMap = {
    block1: {
      type: "block" as const,
      config: { style: "organic" as const },
      position: { x: 0, y: 0, z: 0 },
    },
    block2: {
      type: "block" as const,
      config: { style: "organic" as const },
      position: { x: 0, y: 1, z: 0 },
    },
    wall1: {
      type: "wall" as const,
      config: { direction: "away" as const, tiles: ["book" as const] },
      position: { x: 2, y: 0, z: 0 },
    },
    wall2: {
      type: "wall" as const,
      config: { direction: "away" as const, tiles: ["cowboy" as const] },
      position: { x: 3, y: 0, z: 0 },
    },
  };

  const result = consolidateItemsMap(itemsMap);

  // Check that we get an object back
  expect(typeof result).toBe("object");

  // Check that blocks were consolidated (block2 should be gone)
  expect(result.block1).toBeDefined();
  expect(result.block2).toBeUndefined();

  // Check that the consolidated block has the correct times property
  expect(result.block1).toMatchObject({
    type: "block",
    config: {
      style: "organic",
      times: { y: 2 },
    },
    position: { x: 0, y: 0, z: 0 },
  });

  // Check that walls were consolidated (wall2 should be gone)
  expect(result.wall1).toBeDefined();
  expect(result.wall2).toBeUndefined();

  // Check that the consolidated wall has combined tiles
  expect(result.wall1).toMatchObject({
    type: "wall",
    config: {
      direction: "away",
      tiles: ["book", "cowboy"],
    },
    position: { x: 2, y: 0, z: 0 },
  });
});
