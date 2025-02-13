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
  ...backgroundFrames("blacktooth", 544, 148, ".dark"), // same really
  ...backgroundFrames("blacktooth", 544, 76, ""),
  ...backgroundFrames("bookworld", 382, 16, ".dark"), // same really
  ...backgroundFrames("bookworld", 382, 16, ""),
  ...backgroundFrames("egyptus", 447, 16, ""),
  ...backgroundFrames("egyptus", 447, 89, ".dark"), // actually different
  ...backgroundFrames("jail", 512, 76, ".dark"), // same really
  ...backgroundFrames("jail", 512, 76, ""),
  ...backgroundFrames("market", 440, 386, ".dark"), // same really
  ...backgroundFrames("market", 440, 386, ""),
  ...backgroundFrames("moonbase", 453, 305, ".dark"), // actually different
  ...backgroundFrames("moonbase", 453, 233, ""),
  ...backgroundFrames("penitentiary", 372, 389, ".dark"), // same really
  ...backgroundFrames("penitentiary", 372, 389, ""),
  ...backgroundFrames("safari", 544, 386, ".dark"), // same really
  ...backgroundFrames("safari", 544, 386, ""),

  "floorEdge.right": {
    frame: { x: 400, y: 502, w: 8, h: 9 },
  },
  "floorEdge.towards": {
    frame: { x: 391, y: 502, w: 8, h: 9 },
  },
  "floorOverdraw.right": {
    frame: { x: 400, y: 492, w: 8, h: 9 },
  },
  "floorOverdraw.towards": {
    frame: { x: 391, y: 492, w: 8, h: 9 },
  },
  "generic.floor.overdraw": {
    frame: { x: 180, y: 113, w: wallTileSize.w, h: floorTileSize.h * 2 },
  },
  "generic.wall.overdraw": {
    frame: { x: 197, y: 113, w: wallTileSize.w, h: floorTileSize.h * 2 },
  },
  "shadow.wall.y": {
    frame: { x: 410, y: 129, w: 36, h: 16 },
  },
  "generic.floor.deadly": {
    frame: { x: 376, y: 454, ...floorTileSize },
  },
  "generic.dark.floor.deadly": {
    frame: { x: 376, y: 471, ...floorTileSize },
  },

  // doors names after the axis they go along: x=towards/away, y=left/right
  "generic.door.legs.pillar": {
    frame: { x: 237, y: 92, w: wallTileSize.w, h: 12 },
  },
  "generic.door.legs.base": {
    frame: { x: 237, y: 104, w: wallTileSize.w, h: 9 },
  },
  "generic.door.legs.threshold.double.x": {
    frame: { x: 221, y: 68, w: wallTileSize.w * 2, h: 24 },
  },
  "generic.door.legs.threshold.double.y": {
    frame: { x: 186, y: 68, w: wallTileSize.w * 2, h: 24 },
  },
  "shadowMask.door.legs.threshold.double.y": {
    frame: {
      x: 254,
      y: 68,
      w: wallTileSize.w * 2,
      h: 21,
      pivot: { x: 0, y: 21 },
    },
  },
  "generic.door.floatingThreshold.x": {
    frame: { x: 209, y: 93, w: 26, h: 19 },
  },
  "generic.door.floatingThreshold.y": {
    frame: { x: 180, y: 93, w: 26, h: 19 },
  },
  "shadowMask.door.floatingThreshold.double.y": {
    frame: {
      x: 254,
      y: 90,
      w: 42,
      h: 21,
      pivot: { x: 8, y: 20 },
    },
  },
  "shadow.door.floatingThreshold.double.y": {
    frame: {
      x: 297,
      y: 90,
      w: 42,
      h: 21,
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
