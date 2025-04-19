import type { SpritesheetData, SpritesheetFrameData } from "pixi.js";
import { hudCharTextureSize } from "./textureSizes";
import { fromAllEntries } from "../utils/entries";
import type { Xy } from "../utils/vectors/vectors";
import type { EscapedForTailwind } from "./escapeCharForTailwind";
import { escapeCharForTailwind } from "./escapeCharForTailwind";

// this source really needs a nerd font to read it:
// https://www.nerdfonts.com/cheat-sheet
export const nerdFontDiscordChar = "\uf1ff";
export const chromePwaInstall = ""; // \uea78
export const iosMacShare = ""; // \uf50e;
export const iosMacAddToDock = "󱂩"; // \uf10a9;
export const iosMacAddToHomeScreen = ""; // \uf457;

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
  "%",
  "⬅",
  "➡",
  "⬆",
  "⬇",
  "↖",
  "↘",
  "↗",
  "↙",
  "(",
  ")",
  "[",
  "]",
  "<",
  ">",
  // choose some arbitrary but fairly common keys for the menu items,
  // selected to be unlikely to be used for either game controls or to
  // appear in scroll markdown
  "⏩",
  "⁌",
  "⁍",
  // currently unused
  "EnterFullscreen",
  "ExitFullscreen",
  "Menu",
  "*",
  "@",
  chromePwaInstall,
  iosMacShare,
  iosMacAddToDock,
  iosMacAddToHomeScreen,
  "•",
] as const;

export type CharSpriteTextureId<C extends string> =
  `hud.char.${EscapedForTailwind<C>}`;

const charFrames = <Char extends string>(
  ar: Readonly<Char[]>,
  startPosition: Xy,
): Record<CharSpriteTextureId<Char>, SpritesheetFrameData> => {
  function* charFramesGenerator(): Generator<
    [CharSpriteTextureId<Char>, SpritesheetFrameData]
  > {
    for (let i = 0; i < ar.length; i++) {
      const char = ar[i];
      yield [
        `hud.char.${escapeCharForTailwind(char)}`,
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
    ...charFrames(alphaNumeric, { x: 151, y: 2 }),
    ...charFrames(punctuation, { x: 151, y: 11 }),
    "hud.char.⚡️": {
      frame: { x: 475, y: 2, ...hudCharTextureSize },
    },
    "hud.char.🛡️": {
      frame: { x: 484, y: 2, ...hudCharTextureSize },
    },
    // unicode char is actually "hot spring" - this means big jumps
    "hud.char.♨": {
      frame: { x: 493, y: 2, ...hudCharTextureSize },
    },
    "hud.char.🕹": {
      frame: { x: 502, y: 2, ...hudCharTextureSize },
    },
    "hud.char.∞": {
      frame: {
        x: 511,
        y: 2,
        ...{ w: hudCharTextureSize.w * 2, h: hudCharTextureSize.h },
      },
    },
    [`hud.char.${nerdFontDiscordChar}`]: {
      frame: {
        x: 527,
        y: 2,
        ...{ w: hudCharTextureSize.w * 2, h: hudCharTextureSize.h },
      },
    },
  },
} as const satisfies Pick<SpritesheetData, "frames">;
