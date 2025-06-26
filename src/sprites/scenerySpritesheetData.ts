import type { SpritesheetData, SpritesheetFrameData } from "pixi.js";
import type { AnimationsOfFrames } from "./AnimationsOfFrames";
import type { SceneryName, Wall } from "./planets";
import { wallTiles } from "./planets";
import { wallTileSize, floorTileSize } from "./textureSizes";
import { seriesOfNumberedTextures } from "./spriteGenerators";
import { withSpeed } from "./withSpeed";

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
    const walls = wallTiles[planet];

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

const floorEdgeSize = { w: 16, h: 13 };
const floorEdgeHalfSize = { w: 8, h: 9 };

const frames = {
  ...backgroundFrames("blacktooth", 542, 104, ".dark"), // actually different
  ...backgroundFrames("blacktooth", 542, 29, ""),
  ...backgroundFrames("bookworld", 408, 29, ".dark"), // same really
  ...backgroundFrames("bookworld", 408, 29, ""),
  ...backgroundFrames("egyptus", 475, 29, ""),
  ...backgroundFrames("egyptus", 475, 104, ".dark"), // actually different
  ...backgroundFrames("jail", 440, 104, ".dark"), // same really
  ...backgroundFrames("jail", 440, 104, ""),
  ...backgroundFrames("market", 443, 357, ".dark"), // same really
  ...backgroundFrames("market", 443, 357, ""),
  ...backgroundFrames("moonbase", 453, 276, ".dark"), // actually different
  ...backgroundFrames("moonbase", 453, 204, ""),
  ...backgroundFrames("penitentiary", 376, 357, ".dark"), // same really
  ...backgroundFrames("penitentiary", 376, 357, ""),
  ...backgroundFrames("safari", 542, 357, ".dark"), // same really
  ...backgroundFrames("safari", 542, 357, ""),

  "floorEdge.right": {
    frame: { x: 418, y: 466, ...floorEdgeSize, pivot: { x: 0, y: 4 } },
  },
  "floorEdge.towards": {
    frame: { x: 401, y: 466, ...floorEdgeSize, pivot: { x: 15, y: 4 } },
  },
  "floorEdge.half.right": {
    frame: { x: 418, y: 470, ...floorEdgeHalfSize, pivot: { x: 0, y: 0 } },
  },
  "floorEdge.half.towards": {
    frame: { x: 401, y: 466, ...floorEdgeHalfSize, pivot: { x: 7, y: 0 } },
  },
  "floorOverdraw.cornerNearWall": {
    frame: { x: 623, y: 452, w: wallTileSize.w, h: 8 },
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
  "generic.door.legs.pillar.y": {
    frame: { x: 508, y: 476, w: wallTileSize.w, h: 12 },
  },
  "generic.door.legs.base.y": {
    frame: { x: 508, y: 488, w: wallTileSize.w, h: 9 },
  },
  "generic.door.legs.pillar.x": {
    frame: { x: 524, y: 476, w: wallTileSize.w, h: 12 },
  },
  "generic.door.legs.base.x": {
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
      x: 457,
      y: 492,
      w: 26,
      h: 19,

      pivot: { x: 18, y: 12 },
    },
  },
  "generic.door.floatingThreshold.y": {
    frame: {
      x: 430,
      y: 492,
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
  ...seriesOfNumberedTextures(
    "moonbase.wall.screen.window1.away",
    3,
    {
      x: 566,
      y: 196,
    },
    { w: 10, h: 7 },
  ),
  ...seriesOfNumberedTextures(
    "moonbase.wall.screen.window2.away",
    2,
    {
      x: 550,
      y: 188,
    },
    { w: 10, h: 7 },
  ),
  ...seriesOfNumberedTextures(
    "moonbase.wall.screen.window3.away",
    4,
    {
      x: 534,
      y: 180,
    },
    { w: 10, h: 7 },
  ),
} as const;

export const scenerySpritesheetData = {
  frames,
  animations: {
    "moonbase.wall.screen.window1.away": withSpeed(
      [
        "moonbase.wall.screen.window1.away.1",
        "moonbase.wall.screen.window1.away.2",
        "moonbase.wall.screen.window1.away.3",
      ] as const,
      1 / 16,
    ),
    "moonbase.wall.screen.window2.away": withSpeed(
      [
        "moonbase.wall.screen.window2.away.1",
        "moonbase.wall.screen.window2.away.1",
        "moonbase.wall.screen.window2.away.2",
      ] as const,
      1 / 16,
    ),
    "moonbase.wall.screen.window3.away": withSpeed(
      [
        "moonbase.wall.screen.window3.away.1",
        "moonbase.wall.screen.window3.away.2",
        "moonbase.wall.screen.window3.away.3",
        "moonbase.wall.screen.window3.away.4",
        "moonbase.wall.screen.window3.away.4",
      ] as const,
      1 / 16,
    ),
  },
} as const satisfies Pick<
  SpritesheetData,
  "frames" | "animations"
> satisfies AnimationsOfFrames<keyof typeof frames>;
