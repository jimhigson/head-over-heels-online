import { expect, test } from "vitest";

import { type EditorJsonItemUnion } from "./editorTypes";
import { isRotatable } from "./itemRotation";

const at0 = { x: 0, y: 0, z: 0 };

const rotatableItems: ReadonlyArray<[string, EditorJsonItemUnion]> = [
  [
    "mirror",
    { type: "mirror", config: { orientation: "awayLeft" }, position: at0 },
  ],
  [
    "lamp",
    {
      type: "lamp",
      config: { direction: "towards", activated: true },
      position: at0,
    },
  ],
  [
    "monster",
    {
      type: "monster",
      config: {
        which: "cyberman",
        activated: "on",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
      },
      position: at0,
    },
  ],
  [
    "movingPlatform",
    {
      type: "movingPlatform",
      config: {
        movement: "back-forth",
        activated: "on",
        startDirection: "away",
      },
      position: at0,
    },
  ],
  [
    "sceneryPlayer",
    {
      type: "sceneryPlayer",
      config: { which: "head", startDirection: "awayRight" },
      position: at0,
    },
  ],
  // single-block-in-plane conveyors/barriers rotate; a tall (z) extent is fine:
  [
    "conveyor",
    { type: "conveyor", config: { direction: "left" }, position: at0 },
  ],
  ["barrier", { type: "barrier", config: { axis: "x" }, position: at0 }],
  [
    "tall barrier",
    { type: "barrier", config: { axis: "x", times: { z: 3 } }, position: at0 },
  ],
];

const notRotatableItems: ReadonlyArray<[string, EditorJsonItemUnion]> = [
  ["block", { type: "block", config: { style: "artificial" }, position: at0 }],
  // multi-block-in-plane barriers/conveyors can't rotate without changing their footprint:
  [
    "multi-block conveyor",
    {
      type: "conveyor",
      config: { direction: "left", times: { x: 3 } },
      position: at0,
    },
  ],
  [
    "wide barrier",
    { type: "barrier", config: { axis: "x", times: { x: 2 } }, position: at0 },
  ],
];

test.for(rotatableItems)("isRotatable is true for %s", ([, item]) => {
  expect(isRotatable(item)).toBe(true);
});

test.for(notRotatableItems)("isRotatable is false for %s", ([, item]) => {
  expect(isRotatable(item)).toBe(false);
});
