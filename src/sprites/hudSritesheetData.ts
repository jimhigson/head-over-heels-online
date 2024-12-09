import type { SpritesheetData, SpritesheetFrameData } from "pixi.js";
import { hudCharTextureSize } from "./textureSizes";
import { seriesOfAnimationFrameTextures } from "./spriteGenerators";
import { fromAllEntries } from "@/utils/entries";
import type { Xy } from "@/utils/vectors/vectors";

// Define the array of uppercase letters
const alphabetUppercase = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
] as const;

const pucntuation = [
  " ",
  "?",
  "!",
  ".",
  ",",
  ";",
  ":",
  "/",
  "(",
  ")",
  "[",
  "]",
  "-",
] as const;
const pucntuation2 = ["‘", "’", "'"] as const;

const charFrames = <Char extends string>(
  ar: Readonly<Char[]>,
  startPosition: Xy,
): Record<`hud.char.${Char}`, SpritesheetFrameData> => {
  function* charFramesGenerator(): Generator<
    [`hud.char.${Char}`, SpritesheetFrameData]
  > {
    for (let i = 0; i < ar.length; i++) {
      const char = ar[i];
      yield [
        `hud.char.${char}`,
        {
          frame: {
            x: startPosition.x + i * (hudCharTextureSize.w + 1),
            y: startPosition.y,
            ...hudCharTextureSize,
          },
        },
      ];
    }
  }

  return fromAllEntries(charFramesGenerator());
};

export const hudSpritesheetData = {
  frames: {
    "hud.fastSteps": {
      frame: { x: 569, y: 0, ...hudCharTextureSize },
    },
    "hud.shield": {
      frame: { x: 578, y: 0, ...hudCharTextureSize },
    },
    "hud.bigJumps": {
      frame: { x: 587, y: 0, ...hudCharTextureSize },
    },
    "hud.char.0": {
      frame: { x: 479, y: 0, ...hudCharTextureSize },
    },
    ...charFrames(alphabetUppercase, { x: 245, y: 0 }),
    ...charFrames(pucntuation, { x: 515, y: 9 }),
    ...charFrames(pucntuation2, { x: 515, y: 18 }),
    ...seriesOfAnimationFrameTextures(
      "hud.char",
      9,
      { x: 488, y: 0 },
      hudCharTextureSize,
    ),
  },
} as const satisfies Pick<SpritesheetData, "frames">;
