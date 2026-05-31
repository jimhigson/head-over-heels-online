import { CssVariables } from "../../game/components/CssVariables";
import { twClass } from "../../utils/twClass";

const specimenText = `pack my box with five dozen liquor jugs
PACK MY BOX WITH FIVE DOZEN LIQUOR JUGS 0123456789
?!.,;:/\\'\`‘’-+_%#@*^&<>()[]§©∞☰•★⚡⬅➡⬆⬇↖↗↘↙⏩⁌⁍⇧⌥⌘⎌⟳🛡♨🕹\uf1ff\ue709\uea78\uf50e\u{f10a9}\uf457`;

const scaleFactors = [1, 2, 4] as const;

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
    {scaleFactors.map((scaleFactor, i) => (
      <CssVariables scaleFactor={scaleFactor} key={scaleFactor}>
        <div
          className={`text-multi-line whitespace-pre ${colourClasses[i % colourClasses.length]}`}
        >
          {specimenText}
        </div>
      </CssVariables>
    ))}
  </div>
);
