import type { SpritesheetData, SpritesheetFrameData } from "pixi.js";
import { fromAllEntries } from "../utils/entries";
import type { AxisXy } from "../utils/vectors/vectors";
import { addXy, type Xy } from "../utils/vectors/vectors";

type SceneryName = "generic" | "moonbase" | "moonbase.dark";

export type DoorFrameTextureName<Name extends SceneryName = SceneryName> =
  `door.frame.${Name}.${AxisXy}.${"near" | "far" | "top"}`;

type Frame = {
  x: number;
  y: number;
  w: number;
  h: number;
  pivot: Xy;
};

const doorFrames = <SN extends SceneryName>(
  name: SN,
  orientation: AxisXy,
  startPosition: Xy,
): Record<DoorFrameTextureName<SN>, SpritesheetFrameData> => {
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

  function* charFramesGenerator(): Generator<
    [DoorFrameTextureName<SN>, SpritesheetFrameData]
  > {
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
            pivot: { x: 0, y: 36 },
          }),
        },
      },
    ];
  }

  return fromAllEntries(charFramesGenerator());
};

export const doorSpritesheetData = {
  frames: {
    ...doorFrames("generic", "y", { x: 580, y: 415 }),
    ...doorFrames("generic", "x", { x: 581, y: 415 }),
    ...doorFrames("moonbase", "y", { x: 451, y: 204 }),
    ...doorFrames("moonbase", "x", { x: 582, y: 204 }),
    ...doorFrames("moonbase.dark", "y", { x: 451, y: 276 }),
    ...doorFrames("moonbase.dark", "x", { x: 582, y: 276 }),
  },
} as const satisfies Pick<SpritesheetData, "frames">;
