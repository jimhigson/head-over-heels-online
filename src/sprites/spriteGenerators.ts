import type { SpriteSize } from "@/model/modelTypes";
import { iterate } from "@/utils/iterate";
import type { Direction4Xy, Xy } from "@/utils/vectors/vectors";
import { range } from "iter-tools";
import type { SpritesheetFrameData } from "pixi.js";

type DirectionalTexture<TName extends string> = `${TName}.${Direction4Xy}`;
export const fourDirections = <TName extends string>(
  name: TName,

  { x: startX, y: startY }: Xy,
  textureSize: SpriteSize,
): Record<`${TName}.${Direction4Xy}`, SpritesheetFrameData> => {
  function* generator(): Generator<
    [`${TName}.${Direction4Xy}`, SpritesheetFrameData]
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

//technically not all our animations have four frames but that's the maximum and it'll do ok
// could be a bit smarter here really
export type AnimatedTextureName<
  TName extends string,
  N extends number,
> = `${TName}.${FrameNumbers<N>}`;
export const seriesOfAnimationFrameTextures = <
  TName extends string,
  N extends number,
>(
  name: TName,
  n: N,
  { x: startX, y: startY }: Xy,
  textureSize: SpriteSize,
): Record<AnimatedTextureName<TName, N>, SpritesheetFrameData> => {
  type Name = AnimatedTextureName<TName, N>;

  function* generator(): Generator<[Name, SpritesheetFrameData]> {
    for (let i = 0; i < n; i++) {
      yield [
        `${name}.${i + 1}` as Name,
        {
          frame: {
            x: startX + i * (textureSize.w + 1),
            y: startY,
            ...textureSize,
          },
        },
      ];
    }
  }

  return Object.fromEntries(generator()) as Record<Name, SpritesheetFrameData>;
};

export const seriesOfAnimationFrameTextureIds = <
  TName extends string,
  N extends number,
>(
  name: TName,
  n: N,
): Array<AnimatedTextureName<TName, N>> => [
  ...iterate(range(1, n + 1)).map(
    (i) => `${name}.${String(i) as FrameNumbers<N>}` as const,
  ),
];
