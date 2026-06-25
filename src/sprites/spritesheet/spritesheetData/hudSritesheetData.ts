import { type SpritesheetData, type SpritesheetFrameData } from "pixi.js";

import { fromAllEntries } from "../../../utils/entries";
import { type Xy } from "../../../utils/vectors/vectors";
import {
  escapeCharForTailwind,
  type EscapedForTailwind,
  uppercaseCharReplacement,
} from "../../escapeCharForTailwind";
import {
  hudCharTextureSize,
  hudLowercaseCharTextureSize,
} from "./textureSizes";

// this source really needs a nerd font to read it:
// https://www.nerdfonts.com/cheat-sheet
export const nerdFontDiscordChar = "\uf1ff";
export const nerdFontGithubChar = "\ue709";
export const nerdFontTwitchChar = "\uf1e8";
export const nerdFontAppleChar = "\ue711";
export const nerdFontGoogleChar = "\ue7f0";

const chromePwaInstall = ""; // \uea78
const iosMacShare = ""; // \uf50e;
const iosMacAddToDock = "󱂩"; // \uf10a9;
const iosMacAddToHomeScreen = ""; // \uf457;

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
  "|",
  "#",
  "⚡",
  "🛡",
  // unicode char is actually "hot spring" because there is no "spring" - this means big jumps
  "♨",
  "🕹",
  { char: "∞", width: 16 },
  { char: nerdFontDiscordChar, width: 16 },
  { char: nerdFontGithubChar, width: 16 },
  { char: nerdFontTwitchChar, width: 16 },
  { char: nerdFontAppleChar, width: 16 },
  { char: nerdFontGoogleChar, width: 16 },
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
  uppercaseCharReplacement('"'),
  "`",
  uppercaseCharReplacement("$"),
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
  "☰", // the menu "hamburger" icon
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
  "&",
  "⎌", // undo
  "⟳", // redo
  "↻", // rotate clockwise
  "↺", // rotate anti-clockwise
] as const satisfies CharRow;

export type CharSpriteTextureId<C extends string> =
  `hud.char.${EscapedForTailwind<C>}`;

/**
 * A single HUD glyph as the font generator and the spritesheet both see it:
 * the raw character (before escapeCharForTailwind), its advance width, and the
 * frame rectangle on the spritesheet.
 */
export type HudGlyph<C extends string> = {
  char: C;
  advanceWidth: number;
  frame: { x: number; y: number; w: number; h: number };
};

function* rowGlyphs<C extends string>(
  ar: CharRow<C>,
  startPosition: Xy,
  height: number,
): Generator<HudGlyph<C>> {
  let { x } = startPosition;
  for (const ari of ar) {
    const char = typeof ari === "string" ? ari : ari.char;
    const advanceWidth =
      (typeof ari === "string" ? undefined : ari.width) ?? hudCharTextureSize.w;
    yield {
      char,
      advanceWidth,
      frame: { x, y: startPosition.y, w: advanceWidth, h: height },
    };
    x += Math.max(advanceWidth, hudCharTextureSize.w) + 1;
  }
}

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
    for (const { char, frame } of rowGlyphs(ar, startPosition, height)) {
      yield [`hud.char.${escapeCharForTailwind(char)}`, { frame }];
    }
  }

  return fromAllEntries(charFramesGenerator());
};

/**
 * Every HUD glyph in spritesheet order, sharing the same per-row walk that
 * produces the spritesheet frames. The font generator consumes this so the
 * generated font and the in-game sprites are derived from one source of truth.
 */
export const hudGlyphs: readonly HudGlyph<string>[] = [
  ...rowGlyphs(row1, { x: 1, y: 994 }, hudLowercaseCharTextureSize.h),
  ...rowGlyphs(row2, { x: 1, y: 1005 }, hudCharTextureSize.h),
  ...rowGlyphs(row3, { x: 1, y: 1014 }, hudCharTextureSize.h),
];

export const hudSpritesheetData = {
  frames: {
    ...charFrames(row1, { x: 1, y: 994 }, hudLowercaseCharTextureSize.h),
    ...charFrames(row2, { x: 1, y: 1005 }),
    ...charFrames(row3, { x: 1, y: 1014 }),
  },
} as const satisfies Pick<SpritesheetData, "frames">;
