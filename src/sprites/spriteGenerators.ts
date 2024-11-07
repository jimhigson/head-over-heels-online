import { SpriteSize } from "@/model/modelTypes";
import { Direction, Xy } from "@/utils/vectors";
import { SpritesheetFrameData } from "pixi.js";

type DirectionalTexture<TName extends string> = `${TName}.${Direction}`;
export const fourDirections = <TName extends string>(
  name: TName,

  { x: startX, y: startY }: Xy,
  textureSize: SpriteSize,
): Record<`${TName}.${Direction}`, SpritesheetFrameData> => {
  function* generator(): Generator<
    [`${TName}.${Direction}`, SpritesheetFrameData]
  > {
    yield [`${name}.left`, { frame: { x: startX, y: startY, ...textureSize } }];
    yield [
      `${name}.away`,
      { frame: { x: startX + textureSize.w + 2, y: startY, ...textureSize } },
    ];
    yield [
      `${name}.towards`,
      { frame: { x: startX, y: startY + textureSize.h + 2, ...textureSize } },
    ];
    yield [
      `${name}.right`,
      {
        frame: {
          x: startX + textureSize.w + 2,
          y: startY + textureSize.h + 2,
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
