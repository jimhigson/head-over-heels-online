import type { SpriteSize } from "../model/modelTypes";
import { iterate } from "../utils/iterate";
import { addXy, type DirectionXy4, type Xy } from "../utils/vectors/vectors";
import { range } from "iter-tools";
import type { SpritesheetFrameData } from "pixi.js";

type DirectionalTexture<TName extends string> = `${TName}.${DirectionXy4}`;
export const fourDirections = <TName extends string>(
  name: TName,

  { x: startX, y: startY }: Xy,
  textureSize: SpriteSize,
): Record<`${TName}.${DirectionXy4}`, SpritesheetFrameData> => {
  function* generator(): Generator<
    [`${TName}.${DirectionXy4}`, SpritesheetFrameData]
  > {
    yield [`${name}.left`, { frame: { x: startX, y: startY, ...textureSize } }];
    yield [
      `${name}.away`,
      { frame: { x: startX + textureSize.w + 1, y: startY, ...textureSize } },
    ];
    yield [
      `${name}.towards`,
      { frame: { x: startX, y: startY + textureSize.h + 1, ...textureSize } },
    ];
    yield [
      `${name}.right`,
      {
        frame: {
          x: startX + textureSize.w + 1,
          y: startY + textureSize.h + 1,
          ...textureSize,
        },
      },
    ];
  }

  return Object.fromEntries(generator()) as Record<
    DirectionalTexture<TName>,
    SpritesheetFrameData
  >;
};

export type FrameNumbers<N extends number> =
  `${N}` extends "2" ? "1" | "2"
  : `${N}` extends "3" ? "1" | "2" | "3"
  : `${N}` extends "4" ? "1" | "2" | "3" | "4"
  : `${N}` extends "5" ? "1" | "2" | "3" | "4" | "5"
  : `${N}` extends "6" ? "1" | "2" | "3" | "4" | "5" | "6"
  : `${N}` extends "7" ? "1" | "2" | "3" | "4" | "5" | "6" | "7"
  : `${N}` extends "8" ? "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"
  : `${N}` extends "9" ? "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
  : never;

export type NumberedTextureName<
  TName extends string,
  N extends number,
> = `${TName}.${FrameNumbers<N>}`;
export const seriesOfNumberedTextures = <
  TName extends string,
  N extends number,
>(
  name: TName,
  n: N,
  { x: startX, y: startY }: Xy,
  textureSize: SpriteSize,
  rowSize: number = n,
): Record<NumberedTextureName<TName, N>, SpritesheetFrameData> => {
  type Name = NumberedTextureName<TName, N>;

  function* generator(): Generator<[Name, SpritesheetFrameData]> {
    for (let i = 0; i < n; i++) {
      yield [
        `${name}.${i + 1}` as Name,
        {
          frame: {
            x: startX + (i % rowSize) * (textureSize.w + 1),
            y: startY + Math.floor(i / rowSize) * (textureSize.h + 1),
            ...textureSize,
          },
        },
      ];
    }
  }

  return Object.fromEntries(generator()) as Record<Name, SpritesheetFrameData>;
};

export const fourDirectionsOfNumberedTextures = <
  TName extends string,
  N extends number,
>(
  name: TName,
  n: N,
  position: Xy,
  textureSize: SpriteSize,
): Record<
  `${TName}.${DirectionXy4}.${FrameNumbers<N>}`,
  SpritesheetFrameData
> => {
  const frames = {
    ...seriesOfNumberedTextures(`${name}.left`, n, position, textureSize),
    ...seriesOfNumberedTextures(
      `${name}.away`,
      n,
      addXy(position, { x: (textureSize.w + 1) * n }),
      textureSize,
    ),
    ...seriesOfNumberedTextures(
      `${name}.towards`,
      n,
      addXy(position, { y: textureSize.h + 1 }),
      textureSize,
    ),
    ...seriesOfNumberedTextures(
      `${name}.right`,
      n,
      addXy(position, {
        x: (textureSize.w + 1) * n,
        y: textureSize.h + 1,
      }),
      textureSize,
    ),
  } as const;
  // typescript needs a little help to realise these are the same:;
  return frames as Record<keyof typeof frames, SpritesheetFrameData>;
};

export const seriesOfAnimationFrameTextureIds = <
  TName extends string,
  N extends number,
>(
  name: TName,
  n: N,
): Array<NumberedTextureName<TName, N>> => [
  ...iterate(range(1, n + 1)).map(
    (i) => `${name}.${String(i) as FrameNumbers<N>}` as const,
  ),
];
