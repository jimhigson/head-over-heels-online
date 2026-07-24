import { type SpritesheetData, type SpritesheetFrameData } from "pixi.js";

import { fromAllEntries } from "../../../utils/entries";
import { concat } from "../../../utils/iterators/concat";
import { addXy, type AxisXy, type Xy } from "../../../utils/vectors/vectors";

// which sceneries have their own door styles?
export const sceneryWithOwnDoors = [
  "moonbase" /*
  uncomment for experimental egyptus doors:
  "egyptus" 
  */,
] as const;
export type SceneryWithOwnDoors = (typeof sceneryWithOwnDoors)[number];
type DoorSceneryName = "generic" | `${SceneryWithOwnDoors}${".dark" | ""}`;

/**
 * door frame texture ids carry the door's along-wall axis as a d-number:
 * d0 = runs along x, d2 = runs along y
 */
export type DoorFrameTextureName<SN extends DoorSceneryName = DoorSceneryName> =
  `door.frame.${SN}.${"d0" | "d2"}.${"far" | "near" | "top" | "whole"}`;

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
  const d = orientation === "x" ? "d0" : "d2";
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
    `door.frame.${name}.${d}.whole`,
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
    `door.frame.${name}.${d}.far`,
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
    `door.frame.${name}.${d}.near`,
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
    `door.frame.${name}.${d}.top`,
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
      doorFrames("generic", "y", { x: 362, y: 617 }),
      doorFrames("generic", "x", { x: 364, y: 617 }),
    ),
  ),
} as const satisfies Pick<SpritesheetData, "frames">;
