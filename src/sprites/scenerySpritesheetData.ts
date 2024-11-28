import type { SpritesheetData, SpritesheetFrameData } from "pixi.js";
import type { AnimationsOfFrames } from "./AnimationsOfFrames";
import type { PlanetName, Wall } from "./planets";
import { planets } from "./planets";
import { wallTileSize, floorTileSize } from "./textureSizes";

export type WallTextureId<
  PS extends PlanetName,
  TDark extends "" | ".dark",
> = string &
  {
    [P in PS]: {
      [D in TDark]: `${P}${TDark}.wall.${Wall<P>}.${"left" | "away"}`;
    };
  }[PS][TDark];

export type BackgroundTextureId<
  TPlanet extends PlanetName,
  TDark extends "" | ".dark",
> = WallTextureId<TPlanet, TDark> | `${TPlanet}${TDark}.floor`;

const backgroundFrames = <
  TPlanet extends PlanetName,
  TDark extends "" | ".dark",
>(
  planet: TPlanet,
  startX: number,
  startY: number,
  isDark: TDark,
): Record<BackgroundTextureId<TPlanet, TDark>, SpritesheetFrameData> => {
  function* backgroundFramesGenerator<TPlanet extends PlanetName>(
    planet: TPlanet,
    startX: number,
    startY: number,
  ): Generator<[BackgroundTextureId<TPlanet, TDark>, SpritesheetFrameData]> {
    const { walls } = planets[planet];

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
          y: startY - lastI * yStep + h + 1,
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
  ...backgroundFrames("blacktooth", 443, 324, ""),
  ...backgroundFrames("blacktooth", 541, 324, ".dark"), // same really
  ...backgroundFrames("bookworld", 356, 23, ""),
  ...backgroundFrames("bookworld", 356, 23, ".dark"), // same really
  ...backgroundFrames("egyptus", 435, 23, ""),
  ...backgroundFrames("egyptus", 557, 97, ".dark"), // actually different
  ...backgroundFrames("jail", 411, 340, ""),
  ...backgroundFrames("jail", 411, 340, ".dark"), // same really
  ...backgroundFrames("market", 378, 244, ""),
  ...backgroundFrames("market", 378, 244, ".dark"), // same really
  ...backgroundFrames("moonbase", 384, 141, ""),
  ...backgroundFrames("moonbase", 384, 141, ".dark"), // same really
  ...backgroundFrames("penitentiary", 513, 23, ""),
  ...backgroundFrames("penitentiary", 513, 23, ".dark"), // same really
  ...backgroundFrames("safari", 482, 244, ""),
  ...backgroundFrames("safari", 482, 244, ".dark"), // same really
} as const;

export const scenerySpritesheetData = {
  frames,
  animations: {},
} as const satisfies Pick<
  SpritesheetData,
  "frames" | "animations"
> satisfies AnimationsOfFrames<keyof typeof frames>;
