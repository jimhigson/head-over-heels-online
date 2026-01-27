import type { SpritesheetData, SpritesheetFrameData } from "pixi.js";

import { concat } from "iter-tools-es";

import type { AxisXy, Xy } from "../../../utils/vectors/vectors";

import { fromAllEntries } from "../../../utils/entries";
import { addXy } from "../../../utils/vectors/vectors";

// which sceneries have their own door styles?
export const sceneryWithOwnDoors = [
  "moonbase" /*
  uncomment for experimental egyptus doors:
  "egyptus" 
  */,
] as const;
export type SceneryWithOwnDoors = (typeof sceneryWithOwnDoors)[number];
type DoorSceneryName = "generic" | `${SceneryWithOwnDoors}${".dark" | ""}`;

export type DoorFrameTextureName<SN extends DoorSceneryName = DoorSceneryName> =
  `door.frame.${SN}.${AxisXy}.${"far" | "near" | "top" | "whole"}`;

type Frame = {
  x: number;
  y: number;
  w: number;
  h: number;
  pivot: Xy;
};

export function* doorFrames<SN extends DoorSceneryName>(
  name: SN,
  orientation: AxisXy,
  startPosition: Xy,
): Generator<[DoorFrameTextureName<SN>, SpritesheetFrameData]> {
  const maybeMirror = ({ x, y, w, h, pivot }: Frame) =>
    orientation === "x" ?
      {
        ...addXy(startPosition, { x: -x - w - 1, y }),
        w,
        h,
        pivot: { x: w - pivot.x, y: pivot.y },
      }
    : {
        ...addXy(startPosition, { x: x + 2, y }),
        w,
        h,
        pivot,
      };

  yield [
    `door.frame.${name}.${orientation}.whole`,
    {
      frame: {
        ...maybeMirror({
          x: -41,
          y: 0,
          w: 40,
          h: 64,
          pivot: { x: 9, y: 63 },
        }),
      },
    },
  ];
  yield [
    `door.frame.${name}.${orientation}.far`,
    {
      frame: {
        ...maybeMirror({
          x: -18,
          y: 0,
          w: 17,
          h: 57,
          pivot: { x: 9, y: 52 },
        }),
      },
    },
  ];
  yield [
    `door.frame.${name}.${orientation}.near`,
    {
      frame: {
        ...maybeMirror({
          x: -41,
          y: 6,
          w: 20,
          h: 58,
          pivot: { x: 8, y: 58 },
        }),
      },
    },
  ];
  yield [
    `door.frame.${name}.${orientation}.top`,
    {
      frame: {
        ...maybeMirror({
          x: -57,
          y: -1,
          w: 15,
          h: 36,
          pivot: { x: 0, y: 37 },
        }),
      },
    },
  ];
}

export const doorSpritesheetData = {
  frames: fromAllEntries(
    concat(
      doorFrames("generic", "y", { x: 580, y: 415 }),
      doorFrames("generic", "x", { x: 582, y: 415 }),
      // ...doorFrames("moonbase", "y", { x: 752, y: 232 }),
      // ...doorFrames("moonbase", "x", { x: 915, y: 232 }),
      // ...doorFrames("moonbase.dark", "y", { x: 752, y: 306 }),
      // ...doorFrames("moonbase.dark", "x", { x: 915, y: 306 }),
    ),
  ),
} as const satisfies Pick<SpritesheetData, "frames">;
