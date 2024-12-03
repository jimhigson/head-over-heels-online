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
  ...backgroundFrames("moonbase", 472, 301, ".dark"), // actually different
  ...backgroundFrames("moonbase", 472, 229, ""),
  ...backgroundFrames("penitentiary", 372, 389, ".dark"), // same really
  ...backgroundFrames("penitentiary", 372, 389, ""),
  ...backgroundFrames("safari", 544, 386, ".dark"), // same really
  ...backgroundFrames("safari", 544, 386, ""),
} as const;

export const scenerySpritesheetData = {
  frames,
  animations: {},
} as const satisfies Pick<
  SpritesheetData,
  "frames" | "animations"
> satisfies AnimationsOfFrames<keyof typeof frames>;
