import { CssVariables } from "../../game/components/CssVariables";
import { multilineTextClass } from "../../game/components/dialogs/menuDialog/multilineTextClass";
import { BitmapText } from "../../game/components/tailwindSprites/BitmapText";
import { twClass } from "../../utils/twClass";

const emSpace = "\u2003";

const specimenText = `pack my box with five dozen liquor jugs
PACK${emSpace}MY${emSpace}BOX${emSpace}WITH${emSpace}FIVE${emSpace}DOZEN${emSpace}LIQUOR${emSpace}JUGS${emSpace}0123456789
?!.,;:/\\'\`‘’-+_%#@*^&<>()[]§©∞☰•★⚡⬅➡⬆⬇↖↗↘↙⏩⁌⁍⇧⌥⌘⎌⟳🛡♨🕹\uf1ff\ue709\uea78\uf50e\u{f10a9}\uf457`;

const specimenLines = specimenText.split("\n");

const scaleFactors = [1, 2] as const;

const colourClasses = [
  twClass("text-highlightBeige zx:text-zxYellow toppy:text-toppyWarm2"),
  twClass("text-midRed zx:text-zxMagenta toppy:text-toppyPink1"),
  twClass("text-moss zx:text-zxGreen toppy:text-toppyWarm1"),
  twClass("text-pastelBlue zx:text-zxCyan toppy:text-toppyCool1"),
];

export const FontSpecimen = () => (
  <div
    className="bg-pureBlack text-white p-1 w-full overflow-x-clip"
    data-font-specimen
  >
    {scaleFactors.map((scaleFactor, scaleIndex) => (
      <CssVariables scaleFactor={scaleFactor} key={scaleFactor}>
        <div
          className={`text-multi-line whitespace-pre ${colourClasses[(scaleIndex * 2) % colourClasses.length]}`}
        >
          {specimenText}
        </div>
        <div
          className={`${multilineTextClass} ${colourClasses[(scaleIndex * 2 + 1) % colourClasses.length]}`}
        >
          {specimenLines.map((line, lineIndex) => (
            <BitmapText key={lineIndex} className="block">
              {line}
            </BitmapText>
          ))}
        </div>
      </CssVariables>
    ))}
  </div>
);
