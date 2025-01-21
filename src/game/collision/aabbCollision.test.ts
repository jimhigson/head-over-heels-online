import { expect, test, describe } from "vitest";
import type { Collideable } from "./aabbCollision";
import { collision1to1, collision1toMany } from "./aabbCollision";
import { defaultItemProperties } from "../../model/defaultItemProperties";

describe("collision1to1", () => {
  test("overlapping items in x collide", () => {
    expect(
      collision1to1(
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
      collision1to1(
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
      collision1to1(
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

describe("collision1toMany", () => {
  console.log(process.version);

  test("finds the collision items", () => {
    const subject: Collideable = {
      ...defaultItemProperties,
      id: "subject",
      state: { position: { x: 0, y: 0, z: 0 } },
      aabb: { x: 2, y: 1, z: 1 },
    };

    const colliding1: Collideable = {
      ...defaultItemProperties,
      id: "colliding1",
      state: { position: { x: 1.9, y: 0, z: 0 } },
      aabb: { x: 1, y: 1, z: 1 },
    };
    const colliding2: Collideable = {
      ...defaultItemProperties,
      id: "colliding2",
      state: { position: { x: 0, y: 0.9, z: 0 } },
      aabb: { x: 2, y: 1, z: 1 },
    };

    const nonColliding1: Collideable = {
      ...defaultItemProperties,
      id: "nonColliding1",
      state: { position: { x: 0, y: 0, z: 1 } },
      aabb: { x: 2, y: 1, z: 1 },
    };

    const nonColliding2: Collideable = {
      ...defaultItemProperties,
      id: "nonColliding2",
      state: { position: { x: 2, y: 0, z: 0 } },
      aabb: { x: 2, y: 1, z: 1 },
    };

    const actual = collision1toMany(subject, [
      subject,
      colliding1,
      colliding2,
      nonColliding1,
      nonColliding2,
    ]);

    expect([...actual].map((i) => i.id)).toEqual(["colliding1", "colliding2"]);
  });
});
