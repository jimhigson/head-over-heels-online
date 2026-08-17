import { useTip } from "../../../src/ui/tip/useTip";
import { type PixelKey } from "../geometry/glyphOverrides";
import { type PixelRules } from "../geometry/pixelRuleIndex";
import { type RuleSetting } from "../geometry/ruleEnablement";
import { ruleLabel } from "../geometry/ruleTree";

export type PixelCellProps = {
  cell: PixelKey;
  x: number;
  y: number;
  rules: PixelRules;
  selected: boolean;
  /** true where this cell carries rule settings of its own */
  customised: boolean;
  settingOf: (ruleName: string) => RuleSetting;
  onSelect: () => void;
  /** glyph pixels per screen pixel */
  zoom: number;
};

const settingSuffix = (setting: RuleSetting) =>
  setting === "inherit" ? "" : ` (${setting} here)`;

/**
 * A cell some rule bears on, outlined so the places worth touching stand out
 * from the rest of the glyph: solid where a rule took the cell, dashed where
 * one could have. Hovering says which rules those are and what this cell
 * currently says about them, so the answer is available without selecting the
 * cell and reading the panel.
 */
export const PixelCell = ({
  cell,
  x,
  y,
  rules,
  selected,
  customised,
  settingOf,
  onSelect,
  zoom,
}: PixelCellProps) => {
  const applied = new Set(rules.applied);
  const listed = [
    ...rules.applied,
    ...rules.couldApply.filter((name) => !applied.has(name)),
  ];
  const { interestfor, tip } = useTip(
    listed.length === 0 ?
      undefined
    : <div class="editor-pixel-tip">
        <p>pixel {cell}</p>
        <ul>
          {listed.map((name) => (
            <li key={name}>
              {applied.has(name) ? "▪ " : "▫ "}
              {ruleLabel(name)}
              {settingSuffix(settingOf(name))}
            </li>
          ))}
        </ul>
      </div>,
    { svgInvoker: true },
  );

  return (
    <>
      {/* a cell carrying settings of its own is marked in its corner rather
          than shaded: a wash over the cell competes with the art and the
          outline underneath, which are the things actually being read */}
      {customised && (
        <text
          x={x + 0.08}
          y={y + 0.08}
          font-size={0.38}
          dominant-baseline="hanging"
          fill="#ffe94b"
          pointer-events="none"
        >
          M
        </text>
      )}
      <rect
        x={x}
        y={y}
        width={1}
        height={1}
        fill="transparent"
        stroke={
          selected ? "#ffe94b"
          : rules.applied.length > 0 ?
            "#8de08d"
          : listed.length > 0 ?
            "#8de08d80"
          : "none"
        }
        stroke-width={(selected ? 5 : 3) / zoom}
        stroke-dasharray={
          rules.applied.length > 0 || selected ? undefined : 8 / zoom
        }
        interestfor={interestfor}
        style={{ cursor: "pointer" }}
        onClick={onSelect}
      />
      {tip}
    </>
  );
};
