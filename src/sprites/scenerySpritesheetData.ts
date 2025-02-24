import type { SpritesheetData, SpritesheetFrameData } from "pixi.js";
import type { AnimationsOfFrames } from "./AnimationsOfFrames";
import type { SceneryName, Wall } from "./planets";
import { scenery } from "./planets";
import { wallTileSize, floorTileSize } from "./textureSizes";

export type WallTextureId<
  PS extends SceneryName,
  TDark extends "" | ".dark",
> = string &
  {
    [P in PS]: {
      [D in TDark]: `${P}${TDark}.wall.${Wall<P>}.${"left" | "away"}`;
    };
  }[PS][TDark];

export type BackgroundTextureId<
  TPlanet extends SceneryName,
  TDark extends "" | ".dark",
> = WallTextureId<TPlanet, TDark> | `${TPlanet}${TDark}.floor`;

const backgroundFrames = <
  TPlanet extends SceneryName,
  TDark extends "" | ".dark",
>(
  planet: TPlanet,
  startX: number,
  startY: number,
  isDark: TDark,
): Record<BackgroundTextureId<TPlanet, TDark>, SpritesheetFrameData> => {
  function* backgroundFramesGenerator<TPlanet extends SceneryName>(
    planet: TPlanet,
    startX: number,
    startY: number,
  ): Generator<[BackgroundTextureId<TPlanet, TDark>, SpritesheetFrameData]> {
    const { walls } = scenery[planet];

    const { w, h } = wallTileSize;
    const yStep = w >> 1;
    const n = walls.length;

    let i = 0;
    for (; i < walls.length; i++) {
      yield [
        `${planet}${isDark}.wall.${walls[i]}.left`,
        {
          frame: { x: startX + w * i, y: startY - yStep * i, ...wallTileSize },
        },
      ];
      yield [
        `${planet}${isDark}.wall.${walls[i]}.away`,
        {
          frame: {
            x: startX + w * ((n << 1) - i - 1),
            y: startY - yStep * i,
            ...wallTileSize,
          },
        },
      ];
    }

    const lastI = i - 1;
    yield [
      `${planet}${isDark}.floor`,
      {
        frame: {
          x: startX + lastI * w,
          y: startY - lastI * yStep + h,
          ...floorTileSize,
        },
      },
    ];
  }

  return Object.fromEntries(
    backgroundFramesGenerator(planet, startX, startY),
  ) as Record<BackgroundTextureId<TPlanet, TDark>, SpritesheetFrameData>;
};

const frames = {
  ...backgroundFrames("blacktooth", 542, 104, ".dark"), // actually different
  ...backgroundFrames("blacktooth", 542, 29, ""),
  ...backgroundFrames("bookworld", 408, 29, ".dark"), // same really
  ...backgroundFrames("bookworld", 408, 29, ""),
  ...backgroundFrames("egyptus", 475, 29, ""),
  ...backgroundFrames("egyptus", 475, 104, ".dark"), // actually different
  ...backgroundFrames("jail", 440, 104, ".dark"), // same really
  ...backgroundFrames("jail", 440, 104, ""),
  ...backgroundFrames("market", 443, 356, ".dark"), // same really
  ...backgroundFrames("market", 443, 356, ""),
  ...backgroundFrames("moonbase", 453, 276, ".dark"), // actually different
  ...backgroundFrames("moonbase", 453, 204, ""),
  ...backgroundFrames("penitentiary", 376, 357, ".dark"), // same really
  ...backgroundFrames("penitentiary", 376, 357, ""),
  ...backgroundFrames("safari", 542, 357, ".dark"), // same really
  ...backgroundFrames("safari", 542, 357, ""),

  "floorEdge.right": {
    frame: { x: 423, y: 442, w: 8, h: 9 },
  },
  "floorEdge.towards": {
    frame: { x: 414, y: 442, w: 8, h: 9 },
  },
  "floorOverdraw.right": {
    frame: { x: 423, y: 432, w: 8, h: 9 },
  },
  "floorOverdraw.towards": {
    frame: { x: 414, y: 432, w: 8, h: 9 },
  },
  "generic.floor.overdraw": {
    frame: { x: 435, y: 452, w: wallTileSize.w, h: floorTileSize.h * 2 },
  },
  "generic.wall.overdraw": {
    frame: { x: 452, y: 452, w: wallTileSize.w, h: floorTileSize.h * 2 },
  },
  "shadow.wall.y": {
    frame: { x: 432, y: 435, w: 36, h: 16 },
  },
  "generic.floor.deadly": {
    frame: { x: 407, y: 143, ...floorTileSize },
  },
  "generic.dark.floor.deadly": {
    frame: { x: 407, y: 160, ...floorTileSize },
  },

  // doors names after the axis they go along: x=towards/away, y=left/right
  "generic.door.legs.pillar": {
    frame: { x: 524, y: 476, w: wallTileSize.w, h: 12 },
  },
  "generic.door.legs.base": {
    frame: { x: 524, y: 488, w: wallTileSize.w, h: 9 },
  },
  "generic.door.legs.threshold.double.x": {
    frame: { x: 508, y: 452, w: wallTileSize.w * 2, h: 24 },
  },
  "generic.door.legs.threshold.double.y": {
    frame: { x: 469, y: 452, w: wallTileSize.w * 2, h: 24 },
  },
  "shadowMask.door.legs.threshold.double.y": {
    frame: {
      x: 469,
      y: 430,
      w: wallTileSize.w * 2,
      h: 21,
      pivot: { x: 0, y: 21 },
    },
  },
  "generic.door.floatingThreshold.x": {
    frame: {
      x: 496,
      y: 477,
      w: 26,
      h: 19,

      pivot: { x: 18, y: 12 },
    },
  },
  "generic.door.floatingThreshold.y": {
    frame: {
      x: 469,
      y: 477,
      w: 26,
      h: 19,

      pivot: { x: 8, y: 12 },
    },
  },
  "shadowMask.door.floatingThreshold.double.y": {
    frame: {
      x: 541,
      y: 480,
      w: 42,
      h: 21,
      // the legs are as deep as the wall is, so this pivot value is sensitive to the
      // depth of the door legs bb:
      pivot: { x: 24, y: 28 },
    },
  },
  "shadow.door.floatingThreshold.double.y": {
    frame: {
      x: 584,
      y: 480,
      w: 42,
      h: 21,
      // the legs are as deep as the wall is, so this pivot value is sensitive to the
      // depth of the door legs bb:
      pivot: { x: 8, y: 20 },
    },
  },
} as const;

export const scenerySpritesheetData = {
  frames,
  animations: {},
} as const satisfies Pick<
  SpritesheetData,
  "frames" | "animations"
> satisfies AnimationsOfFrames<keyof typeof frames>;
