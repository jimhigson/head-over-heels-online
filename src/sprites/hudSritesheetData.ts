import type { SpritesheetData, SpritesheetFrameData } from "pixi.js";

import type { Xy } from "../utils/vectors/vectors";
import type { EscapedForTailwind } from "./escapeCharForTailwind";

import { fromAllEntries } from "../utils/entries";
import {
  escapeCharForTailwind,
  uppercaseCharReplacement,
} from "./escapeCharForTailwind";
import { hudCharTextureSize } from "./textureSizes";

// this source really needs a nerd font to read it:
// https://www.nerdfonts.com/cheat-sheet
export const nerdFontDiscordChar = "\uf1ff";
export const nerdFontGithubChar = "\ue709";
export const chromePwaInstall = ""; // \uea78
export const iosMacShare = ""; // \uf50e;
export const iosMacAddToDock = "󱂩"; // \uf10a9;
export const iosMacAddToHomeScreen = ""; // \uf457;

type CharWidth = number;

type CharDesc<C extends string = string> =
  | {
      char: C;
      width?: CharWidth;
    }
  | C;

type CharRow<C extends string = string> = ReadonlyArray<CharDesc<C>>;

const row1 = [
  { char: "a", width: 8 },
  { char: "b", width: 8 },
  { char: "c", width: 7 },
  { char: "d", width: 8 },
  { char: "e", width: 8 },
  { char: "f", width: 6 },
  { char: "g", width: 8 },
  { char: "h", width: 8 },
  { char: "i", width: 4 },
  { char: "j", width: 5 },
  { char: "k", width: 8 },
  { char: "l", width: 5 },
  { char: "m", width: 9 },
  { char: "n", width: 8 },
  { char: "o", width: 8 },
  { char: "p", width: 8 },
  { char: "q", width: 8 },
  { char: "r", width: 5 },
  { char: "s", width: 6 },
  { char: "t", width: 6 },
  { char: "u", width: 8 },
  { char: "v", width: 8 },
  { char: "w", width: 9 },
  { char: "x", width: 8 },
  { char: "y", width: 8 },
  { char: "z", width: 6 },
  { char: "?", width: 6 },
  { char: "!", width: 4 },
  { char: ".", width: 4 },
  { char: ",", width: 4 },
  { char: ";", width: 4 },
  { char: ":", width: 3 },
  { char: "/", width: 7 },
  { char: "\\", width: 7 },
  { char: "‘", width: 4 },
  { char: "’", width: 4 },
  { char: "'", width: 4 },
  { char: "-", width: 5 },
] as const satisfies CharRow;

const row2 = [
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
  "_",
  "#",
  "⚡",
  "🛡",
  // unicode char is actually "hot spring" because there is no "spring" - this means big jumps
  "♨",
  "🕹",
  { char: "∞", width: 16 },
  { char: nerdFontDiscordChar, width: 16 },
  { char: nerdFontGithubChar, width: 16 },
] as const satisfies CharRow;

const row3 = [
  " ",
  uppercaseCharReplacement("?"),
  uppercaseCharReplacement("!"),
  // 'upper case versions of punctuation - these use the 8x8 sprite from the original original HoH
  // and make sense when punctuation is in fixed-height, upper-case only blocks, since the upper case
  // text is all original sprite on the original 8x8 zx spectrum character grid
  uppercaseCharReplacement("."),
  uppercaseCharReplacement(","),
  uppercaseCharReplacement(";"),
  uppercaseCharReplacement(":"),
  uppercaseCharReplacement("/"),
  uppercaseCharReplacement("\\"),
  uppercaseCharReplacement("‘"),
  uppercaseCharReplacement("’"),
  uppercaseCharReplacement("'"),
  "`",
  uppercaseCharReplacement("-"),
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
  "©",
  chromePwaInstall,
  iosMacShare,
  iosMacAddToDock,
  iosMacAddToHomeScreen,
  "•",
  "⇧",
  "^",
  "⌥",
  "⌘",
  "★",
  "§",
] as const satisfies CharRow;

export type CharSpriteTextureId<C extends string> =
  `hud.char.${EscapedForTailwind<C>}`;

const charFrames = <C extends string>(
  ar: CharRow<C>,
  startPosition: Xy,
  height: number = hudCharTextureSize.h,
): Record<
  CharSpriteTextureId<C>,
  SpritesheetFrameData & {
    pivot?: Xy;
  }
> => {
  function* charFramesGenerator(): Generator<
    [CharSpriteTextureId<C>, SpritesheetFrameData]
  > {
    let { x } = startPosition;
    for (let i = 0; i < ar.length; i++) {
      const ari = ar[i];
      const char = typeof ari === "string" ? ari : ari.char;
      const width = typeof ari === "string" ? undefined : ari.width;
      const w = width ?? hudCharTextureSize.w;
      yield [
        `hud.char.${escapeCharForTailwind(char)}`,
        {
          frame: {
            x,
            y: startPosition.y,
            ...hudCharTextureSize,
            w,
            h: height,
          },
        },
      ];
      x += Math.max(w, hudCharTextureSize.w) + 1;
    }
  }

  return fromAllEntries(charFramesGenerator());
};

export const hudSpritesheetData = {
  frames: {
    ...charFrames(row1, { x: 1, y: 605 }, 10),
    ...charFrames(row2, { x: 1, y: 616 }),
    ...charFrames(row3, { x: 1, y: 625 }),
  },
} as const satisfies Pick<SpritesheetData, "frames">;
