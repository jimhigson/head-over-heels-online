import { expect, test } from "vitest";

import { blockStackSpritesheetMeta } from "../../../../gfx/spritesheetMeta/blockStackSpritesheetMeta";
import { type Xy } from "../../../utils/vectors/vectors";
import { makeItemRenderBoxAtCameraAngle } from "./makeItemRenderBoxAtCameraAngle";

// head, per the itemRenderExtents table: physical 12×12×12, draws 15×15×13
// with base offset (-0.5,-0.5,0)
const head = {
  type: "head" as "head",
  state: { box: { x: 0, y: 0, z: 0, xd: 12, yd: 12, zd: 12 } },
};

test("no table entry means no render box (draws true to the physical aabb)", () => {
  expect(
    makeItemRenderBoxAtCameraAngle(
      {
        type: "block",
        config: { style: "organic" },
        state: { box: { x: 0, y: 0, z: 0, xd: 16, yd: 16, zd: 12 } },
      },
      { x: 1, y: 0 },
      blockStackSpritesheetMeta,
    ),
  ).toBeUndefined();
});

test("generic overdraw at the base angle uses the table's base offset", () => {
  expect(
    makeItemRenderBoxAtCameraAngle(
      head,
      { x: 1, y: 0 },
      blockStackSpritesheetMeta,
    ),
  ).toEqual({
    renderAabb: { x: 15, y: 15, z: 13 },
    renderAabbOffset: { x: -0.5, y: -0.5, z: 0 },
  });
});

// on camera-reversed axes the box's near corner follows the sprite anchor
// back by the overdraw (aabb - renderAabb = -3), added to the base offset:
test.for([
  { angle: { x: 0, y: 1 }, offset: { x: -0.5, y: -3.5, z: 0 } },
  { angle: { x: -1, y: 0 }, offset: { x: -3.5, y: -3.5, z: 0 } },
  { angle: { x: 0, y: -1 }, offset: { x: -3.5, y: -0.5, z: 0 } },
] as Array<{ angle: Xy; offset: { x: number; y: number; z: number } }>)(
  "generic overdraw offsets back on reversed axes at camera $angle",
  ({ angle, offset }) => {
    expect(
      makeItemRenderBoxAtCameraAngle(head, angle, blockStackSpritesheetMeta),
    ).toEqual({
      renderAabb: { x: 15, y: 15, z: 13 },
      renderAabbOffset: offset,
    });
  },
);

test("times-multiplied items stretch the table's overdraw box over the repetition", () => {
  // conveyor: single-block drawn box 18×18×12; ×3 along x adds 2 blocks (32px):
  expect(
    makeItemRenderBoxAtCameraAngle(
      {
        type: "conveyor",
        config: { times: { x: 3 } },
        state: { box: { x: 0, y: 0, z: 0, xd: 48, yd: 16, zd: 12 } },
      },
      { x: 1, y: 0 },
      blockStackSpritesheetMeta,
    ),
  ).toEqual({
    renderAabb: { x: 50, y: 18, z: 12 },
    renderAabbOffset: { x: -1, y: -1, z: 0 },
  });
});

test("blockers draw nothing: a zero-size render box", () => {
  expect(
    makeItemRenderBoxAtCameraAngle(
      {
        type: "blocker",
        state: { box: { x: 0, y: 0, z: 0, xd: 32, yd: 24, zd: 9_999 } },
      },
      { x: 1, y: 0 },
      blockStackSpritesheetMeta,
    ),
  ).toEqual({
    renderAabb: { x: 0, y: 0, z: 0 },
    renderAabbOffset: { x: 0, y: 0, z: 0 },
  });
});
