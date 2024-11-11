import type { SpritesheetData, SpritesheetFrameData } from "pixi.js";
import type { AnimationsOfFrames } from "./AnimationsOfFrames";
import type { PlanetName, Wall } from "./planets";
import { planets } from "./planets";
import { wallTileSize, floorTileSize } from "./textureSizes";

export type WallTextureId<PS extends PlanetName> = {
  [P in PS]: `${P}.wall.${Wall<P>}.${"left" | "away"}`;
}[PS];

type BackgroundTextureId<TPlanet extends PlanetName> =
  | WallTextureId<TPlanet>
  | `${TPlanet}.floor`;

const backgroundFrames = <TPlanet extends PlanetName>(
  planet: TPlanet,
  startX: number,
  startY: number,
): Record<BackgroundTextureId<TPlanet>, SpritesheetFrameData> => {
  function* backgroundFramesGenerator<TPlanet extends PlanetName>(
    planet: TPlanet,
    startX: number,
    startY: number,
  ): Generator<[BackgroundTextureId<TPlanet>, SpritesheetFrameData]> {
    const { walls } = planets[planet];

    const { w, h } = wallTileSize;
    const yStep = w >> 1;
    const n = walls.length;

    let i = 0;
    for (; i < walls.length; i++) {
      yield [
        `${planet}.wall.${walls[i]}.left`,
        {
          frame: { x: startX + w * i, y: startY - yStep * i, ...wallTileSize },
        },
      ];
      yield [
        `${planet}.wall.${walls[i]}.away`,
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
      `${planet}.floor`,
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
  ) as Record<BackgroundTextureId<TPlanet>, SpritesheetFrameData>;
};

const frames = {
  ...backgroundFrames("blacktooth", 487, 335),
  ...backgroundFrames("bookworld", 356, 23),
  ...backgroundFrames("egyptus", 435, 23),
  ...backgroundFrames("jail", 455, 351),
  ...backgroundFrames("market", 378, 244),
  ...backgroundFrames("moonbase", 384, 141),
  ...backgroundFrames("penitentiary", 513, 23),
  ...backgroundFrames("safari", 482, 244),
} as const;

export const scenerySpritesheetData = {
  frames,
  animations: {},
} as const satisfies Pick<
  SpritesheetData,
  "frames" | "animations"
> satisfies AnimationsOfFrames<keyof typeof frames>;
