import { CssVariables } from "../../game/components/CssVariables";
import {
  menuLeaderBackChar,
  menuLeaderFocussedChar,
  menuLeaderUnfocussedChar,
} from "../../sprites/spritesheet/spritesheetData/hudChars";
import { twClass } from "../../utils/twClass";

const emSpace = "\u2003";

// the double-width menu-leader glyphs live in the private-use area, so reference
// them explicitly to exercise them in the specimen
const menuLeaders = `${menuLeaderUnfocussedChar}${menuLeaderFocussedChar}${menuLeaderBackChar}`;

const specimenText = `pack my box with five dozen liquor jugs
PACK${emSpace}MY${emSpace}BOX${emSpace}WITH${emSpace}FIVE${emSpace}DOZEN${emSpace}LIQUOR${emSpace}JUGS${emSpace}0123456789
?!.,;:/\\'\`‘’-=+_|%#@*^&<>()[]§©∞☰•★⚡⬅➡⬆⬇↖↗↘↙⏩⁌⁍⇧⌥⌘⎌⟳↻↺🛡♨🕹\uf1ff\ue709\uea78\uf50e\u{f10a9}\uf457\u{ff0e}${menuLeaders}`;

const scaleFactors = [1, 2] as const;

const colourClasses = [
  twClass("text-highlightBeige zx:text-zxYellow toppy:text-toppyWarm2"),
  twClass("text-midRed zx:text-zxMagenta toppy:text-toppyPink1"),
  twClass("text-moss zx:text-zxGreen toppy:text-toppyWarm1"),
  twClass("text-pastelBlue zx:text-zxCyan toppy:text-toppyCool1"),
];

export const FontSpecimen = () => (
  <div
    class="bg-pureBlack text-white p-1 w-full overflow-x-clip allow-select"
    data-font-specimen
  >
    {scaleFactors.map((scaleFactor, scaleIndex) => (
      <CssVariables scaleFactor={scaleFactor} key={scaleFactor}>
        <div
          class={`text-multi-line whitespace-pre ${colourClasses[scaleIndex % colourClasses.length]}`}
        >
          {specimenText}
        </div>
        <div
          class={`text-double-height whitespace-pre ${colourClasses[(scaleIndex + 2) % colourClasses.length]}`}
        >
          {specimenText}
        </div>
        {/* the .text-underline utility (Chrome ignores the font's own underline
            metrics for CSS text-decoration - see its definition in
            spritesTailwindPlugin.ts) - check this sits sharp and pixel-aligned,
            a 1px gap below the baseline, at every scale */}
        <div
          class={`text-multi-line whitespace-pre text-underline ${colourClasses[scaleIndex % colourClasses.length]}`}
        >
          The Quick Brown Fox Jumps Over The Lazy Dog
        </div>
      </CssVariables>
    ))}
  </div>
);
