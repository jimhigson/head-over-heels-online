import { expect, test } from "vitest";
import { collision1to1 } from "./aabbCollision";

test("overlapping items in x collide", () => {
  expect(
    collision1to1(
      {
        id: "itemA",
        position: { x: 0, y: 0, z: 0 },
        aabb: { x: 1, y: 1, z: 1 },
      },
      {
        id: "itemB",
        position: { x: 0.5, y: 0, z: 0 },
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
        position: { x: 0, y: 0, z: 0 },
        aabb: { x: 1, y: 1, z: 1 },
      },
      {
        id: "itemB",
        position: { x: 0, y: 0.5, z: 0 },
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
        position: { x: 0, y: 0, z: 0 },
        aabb: { x: 1, y: 1, z: 1 },
      },
      {
        id: "itemB",
        position: { x: 0, y: 0, z: 0.5 },
        aabb: { x: 1, y: 1, z: 1 },
      },
    ),
  ).toBe(true);
});

test("cant test for collisions in z only", () => {
  expect(
    collision1to1(
      {
        id: "itemA",
        position: { x: 0, y: 0, z: 0 },
        aabb: { x: 1, y: 1, z: 1 },
      },
      {
        id: "itemB",
        position: { x: 0, y: 0.5, z: 1 },
        aabb: { x: 1, y: 1, z: 1 },
      },
      ["z"],
    ),
  ).toBe(false);

  expect(
    collision1to1(
      {
        id: "itemA",
        position: { x: 0, y: 0, z: 0 },
        aabb: { x: 1, y: 1, z: 1 },
      },
      {
        id: "itemB",
        position: { x: 0, y: 0, z: 0.5 },
        aabb: { x: 1, y: 1, z: 1 },
      },
      ["z"],
    ),
  ).toBe(true);
});
