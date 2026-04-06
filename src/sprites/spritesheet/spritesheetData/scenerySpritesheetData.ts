import type { SpritesheetData, SpritesheetFrameData } from "pixi.js";

import type { Xy } from "../../../utils/vectors/vectors";
import type { SceneryName, Wall } from "../../planets";
import type { AnimationsOfFrames } from "./AnimationsOfFrames";
import type {
  DoorFrameTextureName,
  SceneryWithOwnDoors,
} from "./doorSpritesheetData";

import { fromAllEntries } from "../../../utils/entries";
import { wallTiles } from "../../planets";
import { doorFrames, sceneryWithOwnDoors } from "./doorSpritesheetData";
import { seriesOfNumberedTextures } from "./spriteGenerators";
import { floorTileSize, wallTileSize } from "./textureSizes";
import { withSpeed } from "./withSpeed";

export type WallTextureId<
  PS extends SceneryName,
  TDark extends ".dark" | "",
> = string &
  {
    [P in PS]: {
      [D in TDark]: `${P}${TDark}.wall.${Wall<P>}.${"away" | "left"}`;
    };
  }[PS][TDark];

export type BackgroundTextureId<
  SN extends SceneryName,
  TDark extends ".dark" | "",
> =
  | `${SN}${TDark}.floor`
  | (SN extends SceneryWithOwnDoors ? DoorFrameTextureName<`${SN}${TDark}`>
    : never)
  | WallTextureId<SN, TDark>;

const backgroundFrames = <SN extends SceneryName, TDark extends ".dark" | "">(
  planet: SN,
  startX: number,
  startY: number,
  isDark: TDark,
): Record<BackgroundTextureId<SN, TDark>, SpritesheetFrameData> => {
  const hasDoor = (sceneryWithOwnDoors as readonly SceneryName[]).includes(
    planet,
  );

  type GeneratorTuple = [BackgroundTextureId<SN, TDark>, SpritesheetFrameData];

  function* backgroundFramesGenerator(
    planet: SN,
    startX: number,
    startY: number,
  ): Generator<GeneratorTuple> {
    const walls = wallTiles[planet];

    const { w, h } = wallTileSize;
    const yStep = w >> 1;

    for (let i = 0; i < walls.length; i++) {
      yield [
        `${planet}${isDark}.wall.${walls[i]}.left`,
        {
          frame: {
            x: startX - w * (i + 1),
            y: startY + yStep * i,
            ...wallTileSize,
          },
        },
      ];
      yield [
        `${planet}${isDark}.wall.${walls[i]}.away`,
        {
          frame: {
            x: startX + w * i,
            y: startY + yStep * i,
            ...wallTileSize,
          },
        },
      ];
    }

    yield [
      `${planet}${isDark}.floor`,
      {
        frame: {
          x: startX - w,
          y: startY + h,
          ...floorTileSize,
        },
      },
    ];

    if (hasDoor) {
      const doorY = startY + yStep * walls.length - 1;
      yield* doorFrames(`${planet as SN & SceneryWithOwnDoors}${isDark}`, "x", {
        x: startX + w * walls.length,
        y: doorY,
      }) as Generator<GeneratorTuple>;

      yield* doorFrames(`${planet as SN & SceneryWithOwnDoors}${isDark}`, "y", {
        x: startX - w * walls.length - 1,
        y: doorY,
      }) as Generator<GeneratorTuple>;
    }
  }

  type TextureName = BackgroundTextureId<SN, TDark>;

  return Object.fromEntries(
    backgroundFramesGenerator(planet, startX, startY),
  ) as Record<TextureName, SpritesheetFrameData>;
};

const floorEdgeSize = { w: 16, h: 13 };
const floorEdgeHalfSize = { w: 8, h: 9 };

type DoorLegPrefix<S extends "generic" | SceneryName, Dark extends boolean> =
  Dark extends true ? `${S}.dark` : S;

type DoorLegTextureId<
  S extends "generic" | SceneryName,
  Dark extends boolean,
> = `${DoorLegPrefix<S, Dark>}.door.legs.${"base" | "pillar" | "threshold"}.${"x" | "y"}`;
type SpritesheetFrameDataMaybeWithPivot = SpritesheetFrameData & {
  frame: { pivot?: Xy };
};

const doorLegsFrames = <
  S extends "generic" | SceneryName,
  Dark extends boolean = false,
>(
  scenery: S,
  centrePosition: Xy,
  isDark?: Dark,
): Record<DoorLegTextureId<S, Dark>, SpritesheetFrameDataMaybeWithPivot> => {
  const w = wallTileSize.w * 2;
  const prefix = isDark ? `${scenery}.dark` : scenery;

  function* doorLegsFramesGen(): Generator<
    [DoorLegTextureId<S, Dark>, SpritesheetFrameDataMaybeWithPivot]
  > {
    const partW = w + 8;
    for (const [part, yOffset, h, pivotY] of [
      ["threshold", 0, 24, 21],
      ["pillar", 25, 20, 17],
      ["base", 46, 20, 17],
    ] as const) {
      yield [
        `${prefix}.door.legs.${part}.x` as DoorLegTextureId<S, Dark>,
        {
          frame: {
            x: centrePosition.x + 1,
            y: centrePosition.y + yOffset,
            w: partW,
            h,
            pivot: { x: w, y: pivotY },
          },
        },
      ];
      yield [
        `${prefix}.door.legs.${part}.y` as DoorLegTextureId<S, Dark>,
        {
          frame: {
            x: centrePosition.x - 40,
            y: centrePosition.y + yOffset,
            w: partW,
            h,
            pivot: { x: 8, y: pivotY },
          },
        },
      ];
    }
  }

  return fromAllEntries(doorLegsFramesGen());
};

const yPeriod = 74;
let y = 53;
const frames = {
  ...backgroundFrames("egyptus", 834, y, ""),
  ...backgroundFrames("egyptus", 834, (y += yPeriod), ".dark"), // actually different
  ...backgroundFrames("moonbase", 834, (y += yPeriod), ""),
  ...backgroundFrames("moonbase", 834, (y += yPeriod), ".dark"), // actually different
  ...backgroundFrames("bookworld", 834, (y += yPeriod), ""),
  ...backgroundFrames("bookworld", 834, y, ".dark"), // same really
  ...backgroundFrames("jail", 834, (y += yPeriod), ""),
  ...backgroundFrames("jail", 834, y, ".dark"), // same really
  ...backgroundFrames("blacktooth", 834, (y += yPeriod), ""),
  ...backgroundFrames("blacktooth", 834, (y += yPeriod), ".dark"), // actually different
  ...backgroundFrames("penitentiary", 834, (y += yPeriod), ""),
  ...backgroundFrames("penitentiary", 834, y, ".dark"), // same really
  ...backgroundFrames("market", 834, (y += yPeriod), ""),
  ...backgroundFrames("market", 834, y, ".dark"), // same really
  ...backgroundFrames("safari", 834, (y += yPeriod), ""),
  ...backgroundFrames("safari", 834, y, ".dark"), // same really

  "floorEdge.towards": {
    frame: { x: 244, y: 589, ...floorEdgeSize, pivot: { x: 15, y: 4 } },
  },
  "floorEdge.half.towards": {
    frame: { x: 244, y: 589, ...floorEdgeHalfSize, pivot: { x: 7, y: 0 } },
  },
  "floorEdge.right": {
    frame: { x: 261, y: 589, ...floorEdgeSize, pivot: { x: 0, y: 4 } },
  },
  "floorEdge.half.right": {
    frame: { x: 261, y: 593, ...floorEdgeHalfSize, pivot: { x: 0, y: 0 } },
  },
  "floorOverdraw.cornerNearWall": {
    frame: { x: 405, y: 654, w: wallTileSize.w, h: 8 },
  },
  "shadow.wall.y": {
    frame: { x: 255, y: 552, w: 36, h: 16 },
  },
  "shadow.doorFrame.top.y": {
    frame: { x: 255, y: 519, w: 36, h: 32, pivot: { x: 18, y: 31.5 } },
  },
  "generic.floor.deadly": {
    frame: { x: 785, y: 462, ...floorTileSize },
  },
  "generic.dark.floor.deadly": {
    frame: { x: 785, y: 479, ...floorTileSize },
  },

  ...doorLegsFrames("generic", { x: 264, y: 615 }),
  ...doorLegsFrames("moonbase", { x: 955, y: 173 }),
  ...doorLegsFrames("moonbase", { x: 955, y: 387 }, true),

  "shadowMask.door.legs.threshold.double.y": {
    frame: {
      x: 292,
      y: 547,
      w: wallTileSize.w * 2,
      h: 21,
      pivot: { x: 0, y: 21 },
    },
  },
  "generic.door.floatingThreshold.x": {
    frame: {
      x: 271,
      y: 569,
      w: 26,
      h: 19,

      pivot: { x: 18, y: 12 },
    },
  },
  "generic.door.floatingThreshold.y": {
    frame: {
      x: 244,
      y: 569,
      w: 26,
      h: 19,

      pivot: { x: 8, y: 12 },
    },
  },
  "shadowMask.door.floatingThreshold.double.y": {
    frame: {
      x: 321,
      y: 594,
      w: 42,
      h: 21,
      // this is a bit of a hack, and relies on knowing how thick this the door legs
      // are loaded at when they are loaded over-wide for the door tunnels:
      //pivot: { x: 24, y: 28 },
      // this is more accurate to the sprite, but still slightly off because the
      // rendering of this makes it 0.5blocks deep, whereas it is actually slightly
      // more (like ~0.6 or similar)
      pivot: { x: 8, y: 20 },
    },
  },
  "shadow.door.floatingThreshold.double.y": {
    frame: {
      x: 364,
      y: 594,
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
      x: 883,
      y: 217,
    },
    { w: 10, h: 7 },
  ),
  ...seriesOfNumberedTextures(
    "moonbase.wall.screen.window2.away",
    2,
    {
      x: 867,
      y: 209,
    },
    { w: 10, h: 7 },
  ),
  ...seriesOfNumberedTextures(
    "moonbase.wall.screen.window3.away",
    4,
    {
      x: 851,
      y: 201,
    },
    { w: 10, h: 7 },
  ),
  "moonbase.wallDoorTransition.away": {
    frame: {
      x: 971,
      y: 247,
      ...wallTileSize,
    },
  },
  "moonbase.wallDoorTransition.away.dark": {
    frame: {
      x: 971,
      y: 321,
      ...wallTileSize,
    },
  },
  "moonbase.wallDoorTransition.away.mask": {
    frame: {
      x: 988,
      y: 247,
      ...wallTileSize,
    },
  },
  "moonbase.wallDoorTransition.left": {
    frame: {
      x: 681,
      y: 247,
      ...wallTileSize,
    },
  },
  "moonbase.wallDoorTransition.left.dark": {
    frame: {
      x: 681,
      y: 321,
      ...wallTileSize,
    },
  },
  "moonbase.wallDoorTransition.left.mask": {
    frame: {
      x: 664,
      y: 247,
      ...wallTileSize,
    },
  },
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
  "animations" | "frames"
> satisfies AnimationsOfFrames<keyof typeof frames>;
