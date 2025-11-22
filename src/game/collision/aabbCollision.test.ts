import { describe, expect, test } from "vitest";

import type { CollideableItem } from "./aabbCollision";

import { defaultItemProperties } from "../../model/defaultItemProperties";
import { GridSpatialIndex } from "../physics/gridSpace/GridSpatialIndex";
import { collision2Items, collisionItemWithIndex } from "./aabbCollision";

describe("collision1to1", () => {
  test("overlapping items in x collide", () => {
    expect(
      collision2Items(
        {
          id: "itemA",
          state: { position: { x: 0, y: 0, z: 0 } },
          aabb: { x: 1, y: 1, z: 1 },
        },
        {
          id: "itemB",
          state: { position: { x: 0.5, y: 0, z: 0 } },
          aabb: { x: 1, y: 1, z: 1 },
        },
      ),
    ).toBe(true);
  });

  test("overlapping items in y collide", () => {
    expect(
      collision2Items(
        {
          id: "itemA",
          state: { position: { x: 0, y: 0, z: 0 } },
          aabb: { x: 1, y: 1, z: 1 },
        },
        {
          id: "itemB",
          state: { position: { x: 0, y: 0.5, z: 0 } },
          aabb: { x: 1, y: 1, z: 1 },
        },
      ),
    ).toBe(true);
  });

  test("overlapping items in z collide", () => {
    expect(
      collision2Items(
        {
          id: "itemA",
          state: { position: { x: 0, y: 0, z: 0 } },
          aabb: { x: 1, y: 1, z: 1 },
        },
        {
          id: "itemB",
          state: { position: { x: 0, y: 0, z: 0.5 } },
          aabb: { x: 1, y: 1, z: 1 },
        },
      ),
    ).toBe(true);
  });
});

describe("collisionItemWithIndex", () => {
  test("finds the collision items using spatial index", () => {
    const subject: CollideableItem = {
      ...defaultItemProperties,
      id: "subject",
      state: { position: { x: 0, y: 0, z: 0 } },
      aabb: { x: 2, y: 1, z: 1 },
    };

    const colliding1: CollideableItem = {
      ...defaultItemProperties,
      id: "colliding1",
      state: { position: { x: 1.9, y: 0, z: 0 } },
      aabb: { x: 1, y: 1, z: 1 },
    };
    const colliding2: CollideableItem = {
      ...defaultItemProperties,
      id: "colliding2",
      state: { position: { x: 0, y: 0.9, z: 0 } },
      aabb: { x: 2, y: 1, z: 1 },
    };

    const nonColliding1: CollideableItem = {
      ...defaultItemProperties,
      id: "nonColliding1",
      state: { position: { x: 0, y: 0, z: 1 } },
      aabb: { x: 2, y: 1, z: 1 },
    };

    const nonColliding2: CollideableItem = {
      ...defaultItemProperties,
      id: "nonColliding2",
      state: { position: { x: 2, y: 0, z: 0 } },
      aabb: { x: 2, y: 1, z: 1 },
    };

    // Build a real spatial index for the test
    const index = new GridSpatialIndex<string, string, CollideableItem>([
      subject,
      colliding1,
      colliding2,
      nonColliding1,
      nonColliding2,
    ]);

    const actual = collisionItemWithIndex(subject, index);

    expect(actual.map((i) => i.id).toArray()).toEqual([
      "colliding1",
      "colliding2",
    ]);
  });

  test("respects considerItem filter", () => {
    const subject: CollideableItem = {
      ...defaultItemProperties,
      id: "subject",
      state: { position: { x: 0, y: 0, z: 0 } },
      aabb: { x: 2, y: 1, z: 1 },
    };

    const colliding1: CollideableItem = {
      ...defaultItemProperties,
      id: "colliding1",
      state: { position: { x: 1.9, y: 0, z: 0 } },
      aabb: { x: 1, y: 1, z: 1 },
    };
    const colliding2: CollideableItem = {
      ...defaultItemProperties,
      id: "colliding2",
      state: { position: { x: 0, y: 0.9, z: 0 } },
      aabb: { x: 2, y: 1, z: 1 },
    };

    const index = new GridSpatialIndex<string, string, CollideableItem>([
      subject,
      colliding1,
      colliding2,
    ]);

    // Filter out colliding1
    const actual = collisionItemWithIndex(
      subject,
      index,
      (item) => item.id !== "colliding1",
    );

    expect(actual.map((i) => i.id).toArray()).toEqual(["colliding2"]);
  });
});
