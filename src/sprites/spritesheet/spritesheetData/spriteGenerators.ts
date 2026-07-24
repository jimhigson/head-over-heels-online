import { type SpritesheetFrameData } from "pixi.js";

import { type SpriteSize } from "../../../model/modelTypes";
import { range } from "../../../utils/iterators/range";
import { octantIndexOfDirection } from "../../../utils/vectors/octantIndexOfDirection" with { type: "macro" };
import {
  addXy,
  type DirectionIndexXy4,
  type Xy,
} from "../../../utils/vectors/vectors";

/**
 * a 4-way directional texture id: the suffix is the facing's even-octant ring
 * index (left=d0, away=d2, right=d4, towards=d6) so appearances can compute
 * which variant to draw arithmetically
 */
type DirectionalTexture<TName extends string> =
  `${TName}.d${DirectionIndexXy4}`;
export const fourDirections = <TName extends string>(
  name: TName,

  { x: startX, y: startY }: Xy,
  textureSize: SpriteSize,
): Record<DirectionalTexture<TName>, SpritesheetFrameData> => {
  function* generator(): Generator<
    [DirectionalTexture<TName>, SpritesheetFrameData]
  > {
    yield [
      `${name}.d${octantIndexOfDirection("left")}`,
      { frame: { x: startX, y: startY, ...textureSize } },
    ];
    yield [
      `${name}.d${octantIndexOfDirection("away")}`,
      { frame: { x: startX + textureSize.w + 1, y: startY, ...textureSize } },
    ];
    yield [
      `${name}.d${octantIndexOfDirection("towards")}`,
      { frame: { x: startX, y: startY + textureSize.h + 1, ...textureSize } },
    ];
    yield [
      `${name}.d${octantIndexOfDirection("right")}`,
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

export const seriesOfNamedTextures = <
  TName extends string,
  TPrefix extends string = "",
>(
  names: readonly TName[],
  { x: startX, y: startY }: Xy,
  textureSize: SpriteSize,
  rowSize: number = names.length,
  prefix?: TPrefix,
): Record<
  TPrefix extends "" ? TName : `${TPrefix}.${TName}`,
  SpritesheetFrameData
> => {
  type TextureName = TPrefix extends "" ? TName : `${TPrefix}.${TName}`;

  function* generator(): Generator<[TextureName, SpritesheetFrameData]> {
    for (let i = 0; i < names.length; i++) {
      const textureName = (
        prefix ?
          `${prefix}.${names[i]}`
        : names[i]) as TextureName;

      yield [
        textureName,
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

  return Object.fromEntries(generator()) as Record<
    TextureName,
    SpritesheetFrameData
  >;
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
  `${DirectionalTexture<TName>}.${FrameNumbers<N>}`,
  SpritesheetFrameData
> => {
  const frames = {
    ...seriesOfNumberedTextures(
      `${name}.d${octantIndexOfDirection("left")}`,
      n,
      position,
      textureSize,
    ),
    ...seriesOfNumberedTextures(
      `${name}.d${octantIndexOfDirection("away")}`,
      n,
      addXy(position, { x: (textureSize.w + 1) * n }),
      textureSize,
    ),
    ...seriesOfNumberedTextures(
      `${name}.d${octantIndexOfDirection("towards")}`,
      n,
      addXy(position, { y: textureSize.h + 1 }),
      textureSize,
    ),
    ...seriesOfNumberedTextures(
      `${name}.d${octantIndexOfDirection("right")}`,
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
  ...range(1, n + 1).map(
    (i) => `${name}.${String(i) as FrameNumbers<N>}` as const,
  ),
];
