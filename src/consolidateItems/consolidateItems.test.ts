import { describe, expect, test } from "vitest";
import { consolidateItemsMap } from "./consolidateItems";
import type { JsonItem, JsonItemUnion } from "../model/json/JsonItem";
import { readFileSync } from "fs";

// Custom matcher for testing consolidation results
declare module "vitest" {
  interface Assertion {
    toContainConsolidatedItems<T extends JsonItemUnion>(
      expectedItems: T[],
    ): void;
  }
}

expect.extend({
  toContainConsolidatedItems<T extends JsonItemUnion>(
    received: T[],
    expectedItems: T[],
  ) {
    const pass = expectedItems.every((expectedItem) =>
      received.some((receivedItem) => {
        try {
          // Use expect's deep equality check which supports matchers like expect.closeTo
          expect(receivedItem).toEqual(expectedItem);
          return true;
        } catch {
          return false;
        }
      }),
    );

    return {
      pass,
      message: () =>
        pass ?
          `Expected not to contain all items`
        : `Expected to contain all items:\n${JSON.stringify(
            expectedItems,
            null,
            2,
          )}\n\nReceived:\n${JSON.stringify(received, null, 2)}`,
    };
  },
});

describe("blocks", () => {
  test("can consolidate two blocks in y at the origin", () => {
    const items: Record<string, JsonItem<"block">> = {
      block1: {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 0, z: 0 },
      },
      block2: {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 1, z: 0 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(1);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"block">>([
      {
        type: "block",
        config: {
          style: "organic",
          times: {
            y: 2,
          },
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
    ]);
  });

  describe("fractional positions", () => {
    test("can consolidate two blocks on fractional grid position in x", () => {
      const items: Record<string, JsonItem<"block">> = {
        block1: {
          type: "block",
          config: { style: "organic" },
          position: { x: 0.5, y: 0, z: 0 },
        },
        block2: {
          type: "block",
          config: { style: "organic" },
          position: { x: 0.5, y: 1, z: 0 },
        },
      };

      const result = consolidateItemsMap(items);
      const resultValues = Object.values(result);

      expect(resultValues).toHaveLength(1);
      expect(resultValues).toContainConsolidatedItems<JsonItem<"block">>([
        {
          type: "block",
          config: {
            style: "organic",
            times: {
              y: 2,
            },
          },
          position: {
            x: 0.5,
            y: 0,
            z: 0,
          },
        },
      ]);
    });

    test("can consolidate two blocks on fractional grid position by 16ths in x", () => {
      const items: Record<string, JsonItem<"block">> = {
        block1: {
          type: "block",
          config: { style: "organic" },
          position: { x: 1 / 16, y: 0, z: 0 },
        },
        block2: {
          type: "block",
          config: { style: "organic" },
          position: { x: 1 / 16, y: 1, z: 0 },
        },
      };

      const result = consolidateItemsMap(items);
      const resultValues = Object.values(result);

      expect(resultValues).toHaveLength(1);
      expect(resultValues).toContainConsolidatedItems<JsonItem<"block">>([
        {
          type: "block",
          config: {
            style: "organic",
            times: {
              y: 2,
            },
          },
          position: {
            x: expect.closeTo(1 / 16),
            y: 0,
            z: 0,
          },
        },
      ]);
    });

    test("can consolidate two blocks on fractional grid position by 3 16ths in x", () => {
      const items: Record<string, JsonItem<"block">> = {
        block1: {
          type: "block",
          config: { style: "organic" },
          position: { x: 3 / 16, y: 0, z: 0 },
        },
        block2: {
          type: "block",
          config: { style: "organic" },
          position: { x: 3 / 16, y: 1, z: 0 },
        },
      };

      const result = consolidateItemsMap(items);
      const resultValues = Object.values(result);

      expect(resultValues).toHaveLength(1);
      expect(resultValues).toContainConsolidatedItems<JsonItem<"block">>([
        {
          type: "block",
          config: {
            style: "organic",
            times: {
              y: 2,
            },
          },
          position: {
            x: expect.closeTo(3 / 16),
            y: 0,
            z: 0,
          },
        },
      ]);
    });

    test("can consolidate two blocks on fractional grid position in x and y", () => {
      const items: Record<string, JsonItem<"block">> = {
        block1: {
          type: "block",
          config: { style: "organic" },
          position: { x: 7 / 16, y: 9 / 16, z: 0 },
        },
        block2: {
          type: "block",
          config: { style: "organic" },
          position: { x: 7 / 16, y: 9 / 16 + 1, z: 0 },
        },
      };

      const result = consolidateItemsMap(items);
      const resultValues = Object.values(result);

      expect(resultValues).toHaveLength(1);
      expect(resultValues).toContainConsolidatedItems<JsonItem<"block">>([
        {
          type: "block",
          config: {
            style: "organic",
            times: {
              y: 2,
            },
          },
          position: {
            x: expect.closeTo(7 / 16),
            y: expect.closeTo(9 / 16),
            z: 0,
          },
        },
      ]);
    });

    test("does not consolidate two blocks on fractional grid positions that only partially overlap but differ in x", () => {
      const items: Record<string, JsonItem<"block">> = {
        block1: {
          type: "block",
          config: { style: "organic" },
          position: { x: 0, y: 0, z: 0 },
        },
        block2: {
          type: "block",
          config: { style: "organic" },
          position: { x: 0.5, y: 1, z: 0 },
        },
      };

      const result = consolidateItemsMap(items);
      const resultValues = Object.values(result);

      // has not changed anything:
      expect(resultValues).toHaveLength(2);
      expect(result).toEqual(items);
    });

    test("does not consolidate two blocks on fractional grid positions that only partially overlap but differ in y", () => {
      const items: Record<string, JsonItem<"block">> = {
        block1: {
          type: "block",
          config: { style: "organic" },
          position: { x: 0, y: 0, z: 0 },
        },
        block2: {
          type: "block",
          config: { style: "organic" },
          position: { x: 1, y: 0.5, z: 0 },
        },
      };

      const result = consolidateItemsMap(items);
      const resultValues = Object.values(result);

      // has not changed anything:
      expect(resultValues).toHaveLength(2);
      expect(result).toEqual(items);
    });
  });

  test("can consolidate four blocks in x and y at the origin", () => {
    const items: Record<string, JsonItem<"block">> = {
      block1: {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 0, z: 0 },
      },
      block2: {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 1, z: 0 },
      },
      block3: {
        type: "block",
        config: { style: "organic" },
        position: { x: 1, y: 0, z: 0 },
      },
      block4: {
        type: "block",
        config: { style: "organic" },
        position: { x: 1, y: 1, z: 0 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(1);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"block">>([
      {
        type: "block",
        config: {
          style: "organic",
          times: {
            x: 2,
            y: 2,
          },
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
    ]);
  });

  test("can consolidate two blocks that already occupy multiple positions", () => {
    const items: Record<string, JsonItem<"block">> = {
      block1: {
        type: "block",
        config: { style: "organic", times: { x: 2, y: 2 } },
        position: { x: 0, y: 0, z: 0 },
      },
      block2: {
        type: "block",
        config: { style: "organic", times: { x: 2, y: 2 } },
        position: { x: 0, y: 0, z: 1 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(1);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"block">>([
      {
        type: "block",
        config: {
          style: "organic",
          times: {
            x: 2,
            y: 2,
            z: 2,
          },
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
    ]);
  });

  test("can consolidate two blocks that already occupy multiple positions, and are adjacent but positions are two blocks away", () => {
    const items: Record<string, JsonItem<"block">> = {
      block1: {
        type: "block",
        config: { style: "organic", times: { x: 2, y: 2 } },
        position: { x: 0, y: 0, z: 0 },
      },
      block2: {
        type: "block",
        config: { style: "organic", times: { x: 2, y: 2 } },
        position: { x: 0, y: 2, z: 0 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(1);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"block">>([
      {
        type: "block",
        config: {
          style: "organic",
          times: {
            x: 2,
            y: 4,
          },
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
    ]);
  });

  test("can consolidate a double block (in x) and two singles into a quadruple block", () => {
    const items: Record<string, JsonItem<"block">> = {
      block1: {
        type: "block",
        config: { style: "organic", times: { x: 2 } },
        position: { x: 0, y: 0, z: 0 },
      },
      block2: {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 0, z: 1 },
      },
      block3: {
        type: "block",
        config: { style: "organic" },
        position: { x: 1, y: 0, z: 1 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(1);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"block">>([
      {
        type: "block",
        config: {
          style: "organic",
          times: {
            x: 2,
            z: 2,
          },
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
    ]);
  });

  test("can consolidate a double block (in y) and two singles into a quadruple block", () => {
    const items: Record<string, JsonItem<"block">> = {
      block1: {
        type: "block",
        config: { style: "organic", times: { y: 2 } },
        position: { x: 1, y: 0, z: 0 },
      },
      block2: {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 0, z: 0 },
      },
      block3: {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 1, z: 0 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(1);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"block">>([
      {
        type: "block",
        config: {
          style: "organic",
          times: {
            x: 2,
            y: 2,
          },
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
    ]);
  });

  test("can consolidate a double block and a single that form a 3-long vertical line", () => {
    const items: Record<string, JsonItem<"block">> = {
      block1: {
        type: "block",
        config: { style: "organic", times: { z: 2 } },
        position: { x: 0, y: 0, z: 0 },
      },
      block2: {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 0, z: 2 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(1);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"block">>([
      {
        type: "block",
        config: {
          style: "organic",
          times: {
            z: 3,
          },
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
    ]);
  });

  test("does not consolidate a double block and a single that form an L shape", () => {
    const items: Record<string, JsonItem<"block">> = {
      block1: {
        type: "block",
        config: { style: "organic", times: { y: 2 } },
        position: { x: 1, y: 0, z: 0 },
      },
      block2: {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 1, z: 0 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(2);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"block">>([
      {
        type: "block",
        config: { style: "organic", times: { y: 2 } },
        position: { x: 1, y: 0, z: 0 },
      },
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 1, z: 0 },
      },
    ]);
  });

  test("does not consolidate a double *deadly* block and a single that form an upside-down L shape", () => {
    const items: Record<string, JsonItem<"deadlyBlock">> = {
      deadlyBlock1: {
        type: "deadlyBlock",
        config: { style: "volcano", times: { z: 2 } },
        position: { x: 0, y: 0, z: 0 },
      },
      deadlyBlock2: {
        type: "deadlyBlock",
        config: { style: "volcano" },
        position: { x: 0, y: 1, z: 1 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(2);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"deadlyBlock">>([
      {
        type: "deadlyBlock",
        config: { style: "volcano", times: { z: 2 } },
        position: { x: 0, y: 0, z: 0 },
      },
      {
        type: "deadlyBlock",
        config: { style: "volcano" },
        position: { x: 0, y: 1, z: 1 },
      },
    ]);
  });

  test("consolidates three single *deadly* blocks that form an upside-down L shape into two output blocks", () => {
    const items: Record<string, JsonItem<"deadlyBlock">> = {
      "deadlyBlock@0,0,0": {
        type: "deadlyBlock",
        config: { style: "volcano" },
        position: { x: 0, y: 0, z: 0 },
      },
      "deadlyBlock@0,1,1": {
        type: "deadlyBlock",
        config: {
          style: "volcano",
        },
        position: {
          x: 0,
          y: 1,
          z: 1,
        },
      },
      "deadlyBlock@0,0,1": {
        type: "deadlyBlock",
        config: {
          style: "volcano",
        },
        position: {
          x: 0,
          y: 0,
          z: 1,
        },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(2);

    expect(resultValues).toContainConsolidatedItems<JsonItem<"deadlyBlock">>([
      {
        type: "deadlyBlock",
        config: { style: "volcano", times: { z: 2 } },
        position: { x: 0, y: 0, z: 0 },
      },
      {
        type: "deadlyBlock",
        config: { style: "volcano" },
        position: { x: 0, y: 1, z: 1 },
      },
    ]);
  });

  test("does not consolidate a double block and a single that form a stood-up L shape", () => {
    const items: Record<string, JsonItem<"block">> = {
      block1: {
        type: "block",
        config: { style: "organic", times: { y: 2 } },
        position: { x: 0, y: 0, z: 0 },
      },
      block2: {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 1, z: 1 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(2);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"block">>([
      {
        type: "block",
        config: { style: "organic", times: { y: 2 } },
        position: { x: 0, y: 0, z: 0 },
      },
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 1, z: 1 },
      },
    ]);
  });

  test("does not consolidate L-shape deadly blocks when a wall is present at the empty corner", () => {
    const items: Record<string, JsonItem<"deadlyBlock"> | JsonItem<"wall">> = {
      "deadlyBlock@0,0,0": {
        type: "deadlyBlock",
        config: { style: "volcano" },
        position: { x: 0, y: 0, z: 0 },
      },
      "deadlyBlock@0,0,1": {
        type: "deadlyBlock",
        config: { style: "volcano" },
        position: { x: 0, y: 0, z: 1 },
      },
      "deadlyBlock@0,1,1": {
        type: "deadlyBlock",
        config: { style: "volcano" },
        position: { x: 0, y: 1, z: 1 },
      },
      "wall@0,1,0": {
        type: "wall",
        config: { direction: "right" },
        position: { x: 0, y: 1, z: 0 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(3);

    expect(resultValues).toContainConsolidatedItems<
      JsonItem<"deadlyBlock"> | JsonItem<"wall">
    >([
      {
        type: "deadlyBlock",
        config: { style: "volcano", times: { z: 2 } },
        position: { x: 0, y: 0, z: 0 },
      },
      {
        type: "deadlyBlock",
        config: { style: "volcano" },
        position: { x: 0, y: 1, z: 1 },
      },
      {
        type: "wall",
        config: { direction: "right" },
        position: { x: 0, y: 1, z: 0 },
      },
    ]);
  });

  test("can consolidate a quad block and two doubles into a 8x block", () => {
    const items: Record<string, JsonItem<"block">> = {
      block1: {
        type: "block",
        config: { style: "organic", times: { x: 2, y: 2 } },
        position: { x: 0, y: 0, z: 0 },
      },
      block2: {
        type: "block",
        config: { style: "organic", times: { x: 2 } },
        position: { x: 0, y: 0, z: 1 },
      },
      block3: {
        type: "block",
        config: { style: "organic", times: { x: 2 } },
        position: { x: 0, y: 1, z: 1 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(1);
    expect(resultValues).toContainConsolidatedItems([
      {
        type: "block",
        config: {
          style: "organic",
          times: {
            x: 2,
            y: 2,
            z: 2,
          },
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
    ]);
  });
});

describe("teleporters", () => {
  test("can consolidate two teleporters in y at the origin", () => {
    const items: Record<string, JsonItem<"teleporter">> = {
      teleporter1: {
        type: "teleporter",
        config: { toRoom: "any", toPosition: { x: 0, y: 0, z: 0 } },
        position: { x: 0, y: 0, z: 0 },
      },
      teleporter2: {
        type: "teleporter",
        config: { toRoom: "any", toPosition: { x: 0, y: 1, z: 0 } },
        position: { x: 0, y: 1, z: 0 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(1);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"teleporter">>([
      {
        type: "teleporter",
        config: {
          times: {
            y: 2,
          },
          toPosition: {
            x: 0,
            y: 0,
            z: 0,
          },
          toRoom: "any",
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
    ]);
  });

  test("can consolidate a block of two teleporters with another adjacent teleporter", () => {
    const items: Record<string, JsonItem<"teleporter">> = {
      teleporter1: {
        type: "teleporter",
        config: {
          toRoom: "any",
          toPosition: { x: 0, y: 0, z: 0 },
          times: { x: 2 },
        },
        position: { x: 0, y: 0, z: 0 },
      },
      teleporter2: {
        type: "teleporter",
        config: { toRoom: "any", toPosition: { x: 2, y: 0, z: 0 } },
        position: { x: 2, y: 0, z: 0 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(1);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"teleporter">>([
      {
        type: "teleporter",
        config: {
          times: {
            x: 3,
          },
          toPosition: {
            x: 0,
            y: 0,
            z: 0,
          },
          toRoom: "any",
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
    ]);
  });

  test("does not consolidate vertically stacked teleporters", () => {
    const items: Record<string, JsonItem<"teleporter">> = {
      teleporter1: {
        type: "teleporter",
        config: {
          toRoom: "any",
          toPosition: { x: 0, y: 0, z: 0 },
        },
        position: { x: 0, y: 0, z: 0 },
      },
      teleporter2: {
        type: "teleporter",
        config: { toRoom: "any", toPosition: { x: 2, y: 0, z: 0 } },
        position: { x: 0, y: 0, z: 1 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(2);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"teleporter">>([
      {
        type: "teleporter",
        config: {
          toPosition: {
            x: 0,
            y: 0,
            z: 0,
          },
          toRoom: "any",
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
      {
        type: "teleporter",
        config: {
          toPosition: {
            x: 2,
            y: 0,
            z: 0,
          },
          toRoom: "any",
        },
        position: {
          x: 0,
          y: 0,
          z: 1,
        },
      },
    ]);
  });
});

test("does not consolidate disappearing blocks", () => {
  const items: Record<string, JsonItem<"block">> = {
    block1: {
      type: "block",
      config: { style: "organic", disappearing: { on: "stand" } },
      position: { x: 0, y: 0, z: 0 },
    },
    block2: {
      type: "block",
      config: { style: "organic", disappearing: { on: "stand" } },
      position: { x: 0, y: 1, z: 0 },
    },
  };

  const result = consolidateItemsMap(items);
  const resultValues = Object.values(result);

  expect(resultValues).toHaveLength(2);
  expect(resultValues).toContainConsolidatedItems<JsonItem<"block">>([
    {
      type: "block",
      config: {
        disappearing: {
          on: "stand",
        },
        style: "organic",
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
    {
      type: "block",
      config: {
        disappearing: {
          on: "stand",
        },
        style: "organic",
      },
      position: {
        x: 0,
        y: 1,
        z: 0,
      },
    },
  ]);
});

test("consolidates barriers", () => {
  const items: Record<string, JsonItem<"barrier">> = {
    barrier1: {
      type: "barrier",
      config: { axis: "y" },
      position: { x: 0, y: 0, z: 0 },
    },
    barrier2: {
      type: "barrier",
      config: { axis: "y" },
      position: { x: 0, y: 1, z: 0 },
    },
  };

  const result = consolidateItemsMap(items);
  const resultValues = Object.values(result);

  expect(resultValues).toHaveLength(1);
  expect(resultValues).toContainConsolidatedItems<JsonItem<"barrier">>([
    {
      type: "barrier",
      config: {
        axis: "y",
        times: {
          y: 2,
        },
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
  ]);
});

test("does not consolidate disappearing barriers", () => {
  const items: Record<string, JsonItem<"barrier">> = {
    barrier1: {
      type: "barrier",
      config: { axis: "y", disappearing: { on: "touch" } },
      position: { x: 0, y: 0, z: 0 },
    },
    barrier2: {
      type: "barrier",
      config: { axis: "y", disappearing: { on: "touch" } },
      position: { x: 0, y: 1, z: 0 },
    },
  };

  const result = consolidateItemsMap(items);
  const resultValues = Object.values(result);

  expect(resultValues).toHaveLength(2);
  expect(resultValues).toContainConsolidatedItems<JsonItem<"barrier">>([
    {
      type: "barrier",
      config: {
        axis: "y",
        disappearing: {
          on: "touch",
        },
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
    {
      type: "barrier",
      config: {
        axis: "y",
        disappearing: {
          on: "touch",
        },
      },
      position: {
        x: 0,
        y: 1,
        z: 0,
      },
    },
  ]);
});

test("does not consolidate two blocks with different config", () => {
  const items: Record<string, JsonItem<"block">> = {
    block1: {
      type: "block",
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
    },
    block2: {
      type: "block",
      config: { style: "artificial" },
      position: { x: 0, y: 1, z: 0 },
    },
  };

  const result = consolidateItemsMap(items);
  const resultValues = Object.values(result);

  expect(resultValues).toHaveLength(2);
  expect(resultValues).toContainConsolidatedItems<JsonItem<"block">>([
    {
      type: "block",
      config: {
        style: "organic",
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
    {
      type: "block",
      config: {
        style: "artificial",
      },
      position: {
        x: 0,
        y: 1,
        z: 0,
      },
    },
  ]);
});

test("can consolidate two blocks in y at arbitrary position", () => {
  const items: Record<string, JsonItem<"block">> = {
    block1: {
      type: "block",
      config: { style: "organic" },
      position: { x: 12, y: 4, z: 8 },
    },
    block2: {
      type: "block",
      config: { style: "organic" },
      position: { x: 12, y: 5, z: 8 },
    },
  };

  const result = consolidateItemsMap(items);
  const resultValues = Object.values(result);

  expect(resultValues).toHaveLength(1);
  expect(resultValues).toContainConsolidatedItems<JsonItem<"block">>([
    {
      type: "block",
      config: {
        style: "organic",
        times: {
          y: 2,
        },
      },
      position: {
        x: 12,
        y: 4,
        z: 8,
      },
    },
  ]);
});

test("can consolidate 8 blocks in x,y,z at arbitrary (non-origin) position", () => {
  const items: Record<string, JsonItem<"block">> = {
    block1: {
      type: "block",
      config: { style: "organic" },
      position: { x: 12, y: 4, z: 8 },
    },
    block2: {
      type: "block",
      config: { style: "organic" },
      position: { x: 12, y: 5, z: 8 },
    },
    block3: {
      type: "block",
      config: { style: "organic" },
      position: { x: 13, y: 4, z: 8 },
    },
    block4: {
      type: "block",
      config: { style: "organic" },
      position: { x: 13, y: 5, z: 8 },
    },
    block5: {
      type: "block",
      config: { style: "organic" },
      position: { x: 12, y: 4, z: 9 },
    },
    block6: {
      type: "block",
      config: { style: "organic" },
      position: { x: 12, y: 5, z: 9 },
    },
    block7: {
      type: "block",
      config: { style: "organic" },
      position: { x: 13, y: 4, z: 9 },
    },
    block8: {
      type: "block",
      config: { style: "organic" },
      position: { x: 13, y: 5, z: 9 },
    },
  };

  const result = consolidateItemsMap(items);
  const resultValues = Object.values(result);

  expect(resultValues).toHaveLength(1);
  expect(resultValues).toContainConsolidatedItems<JsonItem<"block">>([
    {
      type: "block",
      config: {
        style: "organic",
        times: {
          x: 2,
          y: 2,
          z: 2,
        },
      },
      position: {
        x: 12,
        y: 4,
        z: 8,
      },
    },
  ]);
});

test("can consolidate two blocks in z", () => {
  const items: Record<string, JsonItem<"block">> = {
    block1: {
      type: "block",
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
    },
    block2: {
      type: "block",
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 1 },
    },
  };

  const result = consolidateItemsMap(items);
  const resultValues = Object.values(result);

  expect(resultValues).toHaveLength(1);
  expect(resultValues).toContainConsolidatedItems<JsonItem<"block">>([
    {
      type: "block",
      config: {
        style: "organic",
        times: {
          z: 2,
        },
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
  ]);
});

test("does not consolidate if a gap between two blocks", () => {
  const items: Record<string, JsonItem<"block">> = {
    block1: {
      type: "block",
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
    },
    block2: {
      type: "block",
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 2 },
    },
  };

  const result = consolidateItemsMap(items);
  const resultValues = Object.values(result);

  expect(resultValues).toHaveLength(2);
  expect(resultValues).toContainConsolidatedItems<JsonItem<"block">>([
    {
      type: "block",
      config: {
        style: "organic",
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
    {
      type: "block",
      config: {
        style: "organic",
      },
      position: {
        x: 0,
        y: 0,
        z: 2,
      },
    },
  ]);
});

test("ignores non-consolidatable items", () => {
  const items: Record<string, JsonItem<"block"> | JsonItem<"monster">> = {
    block1: {
      type: "block",
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
    },
    dalek1: {
      type: "monster",
      config: {
        which: "dalek",
        activated: "on",
        movement: "patrol-randomly-diagonal",
      },
      position: { x: 0, y: 0, z: 1 },
    },
    block2: {
      type: "block",
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 2 },
    },
  };

  const result = consolidateItemsMap(items);
  const resultValues = Object.values(result);

  expect(resultValues).toHaveLength(3);
  expect(resultValues).toContainConsolidatedItems<
    JsonItem<"block"> | JsonItem<"monster">
  >([
    {
      type: "block",
      config: {
        style: "organic",
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
    {
      type: "block",
      config: {
        style: "organic",
      },
      position: {
        x: 0,
        y: 0,
        z: 2,
      },
    },
    {
      type: "monster",
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: {
        x: 0,
        y: 0,
        z: 1,
      },
    },
  ]);
});

describe("conveyors", () => {
  test("can consolidate runs of conveyors", () => {
    const items: Record<string, JsonItem<"conveyor">> = {
      conveyor1: {
        type: "conveyor",
        config: { direction: "right" },
        position: { x: 0, y: 0, z: 0 },
      },
      conveyor2: {
        type: "conveyor",
        config: { direction: "right" },
        position: { x: 1, y: 0, z: 0 },
      },
      conveyor3: {
        type: "conveyor",
        config: { direction: "right" },
        position: { x: 2, y: 0, z: 0 },
      },
      conveyor4: {
        type: "conveyor",
        config: { direction: "away" },
        position: { x: 3, y: 0, z: 0 },
      },
      conveyor5: {
        type: "conveyor",
        config: { direction: "away" },
        position: { x: 3, y: 1, z: 0 },
      },
      conveyor6: {
        type: "conveyor",
        config: { direction: "away" },
        position: { x: 3, y: 2, z: 0 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(2);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"conveyor">>([
      {
        type: "conveyor",
        config: {
          direction: "right",
          times: {
            x: 3,
          },
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
      {
        type: "conveyor",
        config: {
          direction: "away",
          times: {
            y: 3,
          },
        },
        position: {
          x: 3,
          y: 0,
          z: 0,
        },
      },
    ]);
  });

  test("does not consolidate conveyors which are not in-line with their direction", () => {
    const items: Record<string, JsonItem<"conveyor">> = {
      conveyor1: {
        type: "conveyor",
        config: { direction: "right" },
        position: { x: 0, y: 0, z: 0 },
      },
      conveyor2: {
        type: "conveyor",
        config: { direction: "right" },
        position: { x: 0, y: 1, z: 0 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(2);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"conveyor">>([
      {
        type: "conveyor",
        config: {
          direction: "right",
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
      {
        type: "conveyor",
        config: {
          direction: "right",
        },
        position: {
          x: 0,
          y: 1,
          z: 0,
        },
      },
    ]);
  });
});

describe("walls", () => {
  test("can consolidate two adjacent walls even if their tiles are different", () => {
    const items: Record<string, JsonItem<"wall">> = {
      wall1: {
        type: "wall",
        config: { direction: "away", tiles: ["cowboy"] },
        position: { x: 0, y: 0, z: 0 },
      },
      wall2: {
        type: "wall",
        config: { direction: "away", tiles: ["book"] },
        position: { x: 1, y: 0, z: 0 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(1);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"wall">>([
      {
        type: "wall",
        config: {
          direction: "away",
          tiles: ["cowboy", "book"],
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
    ]);
  });

  test("can consolidate many adjacent walls with some tiles in common", () => {
    const items: Record<string, JsonItem<"wall">> = {
      wall1: {
        type: "wall",
        config: { direction: "left", tiles: ["cowboy"] },
        position: { x: 0, y: 0, z: 0 },
      },
      wall2: {
        type: "wall",
        config: { direction: "left", tiles: ["cowboy"] },
        position: { x: 0, y: 1, z: 0 },
      },
      wall3: {
        type: "wall",
        config: { direction: "left", tiles: ["book"] },
        position: { x: 0, y: 2, z: 0 },
      },
      wall4: {
        type: "wall",
        config: { direction: "left", tiles: ["book"] },
        position: { x: 0, y: 3, z: 0 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(1);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"wall">>([
      {
        type: "wall",
        config: {
          direction: "left",
          tiles: ["cowboy", "cowboy", "book", "book"],
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
    ]);
  });

  test("can consolidate right-facing walls using 'times' if they are invisible since they don't have tiles", () => {
    const items: Record<string, JsonItem<"wall">> = {
      rightWall1: {
        type: "wall",
        config: { direction: "right" },
        position: { x: 1, y: 0, z: 0 },
      },
      rightWall2: {
        type: "wall",
        config: { direction: "right" },
        position: { x: 1, y: 1, z: 0 },
      },
      rightWall3: {
        type: "wall",
        config: { direction: "right" },
        position: { x: 1, y: 2, z: 0 },
      },
      rightWall4: {
        type: "wall",
        config: { direction: "right" },
        position: { x: 1, y: 3, z: 0 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(1);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"wall">>([
      {
        type: "wall",
        config: {
          direction: "right",
          times: {
            y: 4,
          },
        },
        position: {
          x: 1,
          y: 0,
          z: 0,
        },
      },
    ]);
  });

  test("can consolidate towards-facing walls using 'times' if they are invisible since they don't have tiles", () => {
    const items: Record<string, JsonItem<"wall">> = {
      towardsWall1: {
        type: "wall",
        config: { direction: "towards" },
        position: { x: 0, y: 2, z: 0 },
      },
      towardsWall2: {
        type: "wall",
        config: { direction: "towards" },
        position: { x: 1, y: 2, z: 0 },
      },
      towardsWall3: {
        type: "wall",
        config: { direction: "towards" },
        position: { x: 2, y: 2, z: 0 },
      },
      towardsWall4: {
        type: "wall",
        config: { direction: "towards" },
        position: { x: 3, y: 2, z: 0 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(1);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"wall">>([
      {
        type: "wall",
        config: {
          direction: "towards",
          times: {
            x: 4,
          },
        },
        position: {
          x: 0,
          y: 2,
          z: 0,
        },
      },
    ]);
  });

  test("does not consolidate two adjacent walls if their direction is different", () => {
    const items: Record<string, JsonItem<"wall">> = {
      leftWall1: {
        type: "wall",
        config: { direction: "left", tiles: ["cowboy"] },
        position: { x: 0, y: 0, z: 0 },
      },
      awayWall1: {
        type: "wall",
        config: { direction: "away", tiles: ["cowboy"] },
        position: { x: 0, y: 1, z: 0 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(2);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"wall">>([
      {
        type: "wall",
        config: {
          direction: "left",
          tiles: ["cowboy"],
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
      {
        type: "wall",
        config: {
          direction: "away",
          tiles: ["cowboy"],
        },
        position: {
          x: 0,
          y: 1,
          z: 0,
        },
      },
    ]);
  });

  test("consolidates four walls (two blocks each) around a room correctly", () => {
    const items: Record<string, JsonItem<"wall">> = {
      // towards
      towardsWall1: {
        type: "wall",
        config: { direction: "towards" },
        position: { x: 0, y: 0, z: 0 },
      },
      towardsWall2: {
        type: "wall",
        config: { direction: "towards" },
        position: { x: 1, y: 0, z: 0 },
      },
      // right
      rightWall1: {
        type: "wall",
        config: { direction: "right" },
        position: { x: 0, y: 0, z: 0 },
      },
      rightWall2: {
        type: "wall",
        config: { direction: "right" },
        position: { x: 0, y: 1, z: 0 },
      },
      // away
      awayWall1: {
        type: "wall",
        config: { direction: "away", tiles: ["hieroglyphics"] },
        position: { x: 0, y: 2, z: 0 },
      },
      awayWall2: {
        type: "wall",
        config: { direction: "away", tiles: ["sarcophagus"] },
        position: { x: 1, y: 2, z: 0 },
      },
      // left
      leftWall1: {
        type: "wall",
        config: { direction: "left", tiles: ["cowboy"] },
        position: { x: 1, y: 0, z: 0 },
      },
      leftWall2: {
        type: "wall",
        config: { direction: "left", tiles: ["book"] },
        position: { x: 1, y: 1, z: 0 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(4);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"wall">>([
      {
        type: "wall",
        config: {
          direction: "towards",
          times: {
            x: 2,
          },
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
      {
        type: "wall",
        config: {
          direction: "right",
          times: {
            y: 2,
          },
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      },
      {
        type: "wall",
        config: {
          direction: "away",
          tiles: ["hieroglyphics", "sarcophagus"],
        },
        position: {
          x: 0,
          y: 2,
          z: 0,
        },
      },
      {
        type: "wall",
        config: {
          direction: "left",
          tiles: ["cowboy", "book"],
        },
        position: {
          x: 1,
          y: 0,
          z: 0,
        },
      },
    ]);
  });

  test("consolidates walls with tiles that already occupy multiple positions", () => {
    const items: Record<string, JsonItem<"wall">> = {
      leftWall1: {
        type: "wall",
        config: { direction: "left", tiles: ["cowboy", "cowboy"] },
        position: { x: 1, y: 0, z: 0 },
      },
      leftWall2: {
        type: "wall",
        config: { direction: "left", tiles: ["book", "book"] },
        position: { x: 1, y: 2, z: 0 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(1);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"wall">>([
      {
        type: "wall",
        config: {
          direction: "left",
          tiles: ["cowboy", "cowboy", "book", "book"],
        },
        position: {
          x: 1,
          y: 0,
          z: 0,
        },
      },
    ]);
  });

  test("consolidates walls with times that already occupy multiple positions", () => {
    const items: Record<string, JsonItem<"wall">> = {
      // right
      rightWall1: {
        type: "wall",
        config: { direction: "right", times: { y: 2 } },
        position: { x: 1, y: 0, z: 0 },
      },
      rightWall2: {
        type: "wall",
        config: { direction: "right", times: { y: 2 } },
        position: { x: 1, y: 2, z: 0 },
      },
    };

    const result = consolidateItemsMap(items);
    const resultValues = Object.values(result);

    expect(resultValues).toHaveLength(1);
    expect(resultValues).toContainConsolidatedItems<JsonItem<"wall">>([
      {
        type: "wall",
        config: {
          direction: "right",
          times: {
            y: 4,
          },
        },
        position: {
          x: 1,
          y: 0,
          z: 0,
        },
      },
    ]);
  });
});

test("handles items with negative positions", () => {
  const items: Record<string, JsonItem<"floor"> | JsonItem<"wall">> = {
    floor1: {
      type: "floor",
      position: { x: -2, y: 0, z: 0 }, // Negative x position
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 10, y: 8 },
      },
    },
    wall1: {
      type: "wall",
      position: { x: 4, y: 8, z: 0 },
      config: {
        direction: "away",
        tiles: ["plain", "plain", "plain", "plain"],
      },
    },
    wall2: {
      type: "wall",
      position: { x: 4, y: 0, z: 0 },
      config: {
        direction: "towards",
        times: { x: 4 },
      },
    },
  };

  const result = consolidateItemsMap(items);
  const resultValues = Object.values(result);

  expect(resultValues).toHaveLength(3);
});

test("consolidates adjacent left walls with same direction", () => {
  const items: Record<string, JsonItem<"wall">> = {
    leftWallTop: {
      type: "wall",
      position: { x: 4, y: 0, z: 0 },
      config: {
        direction: "left",
        tiles: ["plain", "armour"], // 2 tiles from y:0 to y:2
      },
    },
    leftWallMiddle: {
      type: "wall",
      position: { x: 4, y: 2, z: 0 },
      config: {
        direction: "left",
        tiles: ["armour"], // 1 tile from y:2 to y:3
      },
    },
  };

  const result = consolidateItemsMap(items);
  const resultValues = Object.values(result);

  expect(resultValues).toHaveLength(1);
  expect(resultValues).toContainConsolidatedItems<JsonItem<"wall">>([
    {
      type: "wall",
      config: {
        direction: "left",
        tiles: ["plain", "armour", "armour"],
      },
      position: { x: 4, y: 0, z: 0 },
    },
  ]);
});

test("consolidateItems does not mutate input", () => {
  // Create a representative scenario with various item types
  const originalItems: Record<
    string,
    | JsonItem<"block">
    | JsonItem<"teleporter">
    | JsonItem<"wall">
    | JsonItem<"monster">
  > = {
    // Blocks that should consolidate
    block1: {
      type: "block",
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
    },
    block2: {
      type: "block",
      config: { style: "organic" },
      position: { x: 0, y: 1, z: 0 },
    },
    // Teleporters with different toPositions
    teleporter1: {
      type: "teleporter",
      config: { toRoom: "room1", toPosition: { x: 5, y: 5, z: 0 } },
      position: { x: 2, y: 0, z: 0 },
    },
    teleporter2: {
      type: "teleporter",
      config: { toRoom: "room1", toPosition: { x: 5, y: 6, z: 0 } },
      position: { x: 2, y: 1, z: 0 },
    },
    // Walls with tiles that should consolidate
    wall1: {
      type: "wall",
      config: { direction: "away", tiles: ["book", "cowboy"] },
      position: { x: 4, y: 0, z: 0 },
    },
    wall2: {
      type: "wall",
      config: { direction: "away", tiles: ["shield"] },
      position: { x: 5, y: 0, z: 0 },
    },
    // More walls with tiles that should consolidate (same direction)
    wall4: {
      type: "wall",
      config: { direction: "left", tiles: ["hieroglyphics"] },
      position: { x: 7, y: 2, z: 0 },
    },
    wall5: {
      type: "wall",
      config: { direction: "left", tiles: ["sarcophagus", "book"] },
      position: { x: 7, y: 3, z: 0 },
    },
    // Wall with times property
    wall3: {
      type: "wall",
      config: { direction: "right", times: { y: 2 } },
      position: { x: 6, y: 0, z: 0 },
    },
    // Non-consolidatable item
    monster1: {
      type: "monster",
      config: {
        which: "dalek",
        activated: "on",
        movement: "patrol-randomly-diagonal",
      },
      position: { x: 3, y: 3, z: 0 },
    },
  };

  // Create a deep clone using structuredClone
  const clonedItems = structuredClone(originalItems);

  // Run consolidation on the clone
  const result = consolidateItemsMap(clonedItems);

  // Check that consolidation happened (should have fewer items)
  expect(Object.keys(result).length).toBeLessThan(
    Object.keys(originalItems).length,
  );

  // Now check that the cloned input was not mutated
  expect(clonedItems).toEqual(originalItems);

  // Specifically check that config objects weren't mutated
  Object.entries(clonedItems).forEach(([key, clonedItemData]) => {
    const originalItemData = originalItems[key];

    expect(clonedItemData).toEqual(originalItemData);

    // Check that config objects are still separate references
    if ("config" in clonedItemData && "config" in originalItemData) {
      expect(clonedItemData.config).not.toBe(originalItemData.config);
    }
  });
});

describe("actual room items", () => {
  test("safari2", () => {
    const result = consolidateItemsMap(
      JSON.parse(
        readFileSync(
          "./src/consolidateItems/__test__/safari2Input.json",
          "utf-8",
        ),
      ),
    );

    expect(result).toMatchSnapshot();
  });
});
