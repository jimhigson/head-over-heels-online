import type { SpritesheetData, SpritesheetFrameData } from "pixi.js";
import { hudCharTextureSize } from "./textureSizes";
import { fromAllEntries } from "../utils/entries";
import type { Xy } from "../utils/vectors/vectors";
import type { EscapedForTailwind } from "./escapeCharForTailwind";
import { escapeCharForTailwind } from "./escapeCharForTailwind";

// this source really needs a nerd font to read it:
// https://www.nerdfonts.com/cheat-sheet
export const nerdFontDiscordChar = "\uf1ff";
export const nerdFontGithubChar = "\ue709";
export const chromePwaInstall = ""; // \uea78
export const iosMacShare = ""; // \uf50e;
export const iosMacAddToDock = "󱂩"; // \uf10a9;
export const iosMacAddToHomeScreen = ""; // \uf457;

const firstRow = [
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
  { char: "∞", double: true },
  { char: nerdFontDiscordChar, double: true },
  { char: nerdFontGithubChar, double: true },
] as const;

const secondRow = [
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
  ar: Readonly<(Char | { char: Char; double: true })[]>,
  startPosition: Xy,
): Record<CharSpriteTextureId<Char>, SpritesheetFrameData> => {
  function* charFramesGenerator(): Generator<
    [CharSpriteTextureId<Char>, SpritesheetFrameData]
  > {
    let { x } = startPosition;
    for (let i = 0; i < ar.length; i++) {
      const ari = ar[i];
      const char = typeof ari === "string" ? ari : ari.char;
      const double = typeof ari === "string" ? false : ari.double;
      const w = double ? hudCharTextureSize.w * 2 : hudCharTextureSize.w;
      yield [
        `hud.char.${escapeCharForTailwind(char)}`,
        {
          frame: {
            x,
            y: startPosition.y,
            ...hudCharTextureSize,
            w,
          },
        },
      ];
      x += w + 1;
    }
  }

  return fromAllEntries(charFramesGenerator());
};

export const hudSpritesheetData = {
  frames: {
    ...charFrames(firstRow, { x: 151, y: 2 }),
    ...charFrames(secondRow, { x: 151, y: 11 }),
  },
} as const satisfies Pick<SpritesheetData, "frames">;
