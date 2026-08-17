import { CssVariables } from "../../game/components/CssVariables";
import { twClass } from "../../utils/twClass" with { type: "macro" };

const emSpace = "\u2003";

// the ascii pairs the menus write, so the specimen shows whether the font
// still ligates them into the double-width leader glyphs
const menuLeaders = "^^>><<";

const specimenText = `pack my box with five dozen liquor jugs
PACK${emSpace}MY${emSpace}BOX${emSpace}WITH${emSpace}FIVE${emSpace}DOZEN${emSpace}LIQUOR${emSpace}JUGS
0123456789
?!.,;:/\\'\`‘’-=+_|%#@*^&<>()[]§©∞☰•★⚡⬅➡⬆⬇↖↗↘↙⇧⌥⌘⎌⟳↻↺
🛡♨🕹\uf1ff\ue709\uea78\uf50e\u{f10a9}\uf457\u{ff0e}${menuLeaders}
https://blockstack.ing`;

const colourClasses = [
  twClass("text-highlightBeige zx:text-zxYellow toppy:text-toppyWarm2"),
  twClass("text-midRed zx:text-zxMagenta toppy:text-toppyPink1"),
  twClass("text-moss zx:text-zxGreen toppy:text-toppyWarm1"),
  twClass("text-pastelBlue zx:text-zxCyan toppy:text-toppyCool1"),
];

export type FontSpecimenProps = { scale: number };

export const FontSpecimen = ({ scale }: FontSpecimenProps) => (
  <div
    class="bg-pureBlack text-white p-1 w-full overflow-x-clip allow-select"
    data-font-specimen
  >
    {[scale, scale * 2].map((scaleFactor, scaleIndex) => (
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
