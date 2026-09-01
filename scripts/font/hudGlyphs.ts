import { uppercaseCharReplacement } from "../../src/sprites/escapeCharForTailwind";
import {
  menuLeaderBackChar,
  menuLeaderFocussedChar,
  menuLeaderUnfocussedChar,
  nerdFontAppleChar,
  nerdFontDiscordChar,
  nerdFontGithubChar,
  nerdFontGoogleChar,
  nerdFontTwitchChar,
} from "../../src/sprites/spritesheet/spritesheetData/hudChars";
import {
  hudCharTextureSize,
  hudLowercaseCharTextureSize,
} from "../../src/sprites/spritesheet/spritesheetData/textureSizes";
import { type Xy } from "../../src/utils/vectors/vectors";

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
  { char: "=", width: 5 },
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
  // currently unused. Named rather than deleted: a row's frames are walked
  // left to right from its start, so dropping an entry would slide every
  // later glyph in the row onto the wrong cell of the sheet
  "FastForward",
  "BulletLeader",
  "BulletLeaderMirrored",
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
  // double-width (16px) menu-item leaders — one glyph each rather than two chars.
  // order matters: these map to the appended spritesheet cells in this sequence
  { char: menuLeaderFocussedChar, width: 16 },
  { char: menuLeaderUnfocussedChar, width: 16 },
  { char: menuLeaderBackChar, width: 16 },
] as const satisfies CharRow;

/**
 * A single HUD glyph as the font generator sees it: the raw character, its
 * advance width, and its frame rectangle in BlockStack spritesheet coordinates
 * (the generator samples these pixels from the unmasked sheet,
 * gfx/sprites.borders.png).
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

/**
 * Every HUD glyph in spritesheet order. The font generator consumes this to
 * build the woff2, sampling each glyph's pixels from the cropped char strip.
 */
export const hudGlyphs: readonly HudGlyph<string>[] = [
  ...rowGlyphs(row1, { x: 1, y: 994 }, hudLowercaseCharTextureSize.h),
  ...rowGlyphs(row2, { x: 1, y: 1_005 }, hudCharTextureSize.h),
  ...rowGlyphs(row3, { x: 1, y: 1_014 }, hudCharTextureSize.h),
];
