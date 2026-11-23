import { expect, test } from "vitest";

import type { DirectionXy8 } from "../utils/vectors/vectors";
import type { EditorJsonItemUnion } from "./editorTypes";
import { directionForItem } from "./itemDirection";

const at0 = { x: 0, y: 0, z: 0 };

test("a one-block conveyor can face every direction on the floor", () => {
  expect(
    directionForItem({
      type: "conveyor",
      config: { direction: "left" },
      position: at0,
    })?.supported,
  ).toEqual<readonly DirectionXy8[]>(["away", "towards", "left", "right"]);
});

test.for<[string, EditorJsonItemUnion, readonly DirectionXy8[]]>([
  [
    "left",
    {
      type: "conveyor",
      config: { direction: "left", times: { x: 3 } },
      position: at0,
    },
    ["left", "right"],
  ],
  [
    "right",
    {
      type: "conveyor",
      config: { direction: "right", times: { x: 3 } },
      position: at0,
    },
    ["left", "right"],
  ],
  [
    "away",
    {
      type: "conveyor",
      config: { direction: "away", times: { y: 2 } },
      position: at0,
    },
    ["away", "towards"],
  ],
  [
    "towards",
    {
      type: "conveyor",
      config: { direction: "towards", times: { y: 2 } },
      position: at0,
    },
    ["away", "towards"],
  ],
])(
  "a conveyor longer than a block, going %s, can only face its own or the opposite direction, in a fixed order",
  ([, conveyor, expectedDirections]) => {
    expect(directionForItem(conveyor)?.supported).toEqual<
      readonly DirectionXy8[]
    >(expectedDirections);
  },
);
