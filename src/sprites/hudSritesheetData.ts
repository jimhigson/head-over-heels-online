import type { SpritesheetData, SpritesheetFrameData } from "pixi.js";
import { hudCharTextureSize } from "./textureSizes";
import { fromAllEntries } from "@/utils/entries";
import type { Xy } from "@/utils/vectors/vectors";

const alphaNumeric = [
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
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
] as const;

const punctuation = [
  " ",
  "?",
  "!",
  ".",
  ",",
  ";",
  ":",
  "/",
  "\\",
  "‘",
  "’",
  "'",
  "`",
  "-",
  "+",
] as const;

const brackets = ["(", ")", "[", "]", "<", ">"] as const;

const arrowChars = ["⬅", "➡", "⬆", "⬇", "↖", "↘", "↗", "↙"] as const;
// choose some arbitrary but fairly common keys for the menu items,
// selected to be unlikely to be used for either game controls or to
// appear in scroll markdown
const menuChars = ["=", "{", "}", "EnterFullscreen", "ExitFullscreen"] as const;

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
    ...charFrames(alphaNumeric, { x: 173, y: 0 }),
    "hud.fastSteps": {
      frame: { x: 497, y: 0, ...hudCharTextureSize },
    },
    "hud.shield": {
      frame: { x: 506, y: 0, ...hudCharTextureSize },
    },
    "hud.bigJumps": {
      frame: { x: 515, y: 0, ...hudCharTextureSize },
    },
    "hud.char.🕹": {
      frame: { x: 227, y: 27, ...hudCharTextureSize },
    },
    ...charFrames(punctuation, { x: 173, y: 9 }),
    ...charFrames(arrowChars, { x: 173, y: 18 }),
    ...charFrames(menuChars, { x: 524, y: 0 }),
    ...charFrames(brackets, { x: 173, y: 27 }),
  },
} as const satisfies Pick<SpritesheetData, "frames">;
