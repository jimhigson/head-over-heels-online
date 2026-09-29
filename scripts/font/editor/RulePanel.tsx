import { useState } from "preact/hooks";

import { Switch } from "../../../src/ui/Switch";
import { type GlyphOverride, type PixelKey } from "../geometry/glyphOverrides";
import { ruleNamed } from "../geometry/kernelRules";
import { type PixelRules } from "../geometry/pixelRuleIndex";
import {
  type RuleBranch,
  ruleLabel,
  rulesUnder,
  ruleTree,
} from "../geometry/ruleTree";
import { charLabel } from "./charLabel";
import { KernelShape } from "./KernelShape";
import { type EditorGlyph } from "./useGlyphs";

export type RulePanelProps = {
  glyph: EditorGlyph;
  override: GlyphOverride | undefined;
  /** which rules bear on which of this character's cells */
  pixelRules: Map<PixelKey, PixelRules>;
  /** turn a whole set of rules on, or off if any of them is currently on */
  onToggleForChar: (ruleNames: readonly string[]) => void;
};

const tipFor = (ruleName: string) => {
  const rule = ruleNamed(ruleName);
  return rule === undefined ? undefined : <KernelShape rule={rule} />;
};

type RuleSwitchProps = {
  ruleNames: readonly string[];
  /** the accessible name; the branch heading already shows a branch's own */
  label: string;
  /** what to write beside the switch, if anything */
  shown?: string;
  panel: RulePanelProps;
};

/**
 * one rule, or a whole branch of them, switched on or off for the character.
 *
 * A rule that is off until switched on has no character-wide setting to show -
 * switching it on is something said about a place, not about a glyph - so it
 * says so rather than offering a switch that could only ever read off.
 */
const RuleSwitch = ({ ruleNames, label, shown, panel }: RuleSwitchProps) => {
  const { override, onToggleForChar } = panel;
  const [firstRule] = ruleNames;

  if (ruleNames.every((name) => ruleNamed(name)?.defaultOff === true)) {
    return (
      <span class="editor-note editor-rule-note">{shown} per pixel only</span>
    );
  }
  const anyOff = ruleNames.some((name) =>
    (override?.disabledRules ?? []).includes(name),
  );
  return (
    <Switch
      class="editor-rule"
      value={!anyOff}
      ariaLabel={label}
      label={shown}
      tooltipContent={ruleNames.length === 1 ? tipFor(firstRule) : undefined}
      onChange={() => onToggleForChar(ruleNames)}
    />
  );
};

type BranchProps = {
  branch: RuleBranch;
  depth: number;
  firedCounts: Map<string, number>;
  visible: (ruleName: string) => boolean;
  panel: RulePanelProps;
};

const countIn = (
  ruleNames: readonly string[],
  firedCounts: Map<string, number>,
): number =>
  ruleNames.reduce((total, name) => total + (firedCounts.get(name) ?? 0), 0);

const Branch = ({
  branch,
  depth,
  firedCounts,
  visible,
  panel,
}: BranchProps) => {
  const under = rulesUnder(branch).filter(visible);
  const fired = countIn(under, firedCounts);
  // a branch that did something opens on its own: what fired is what is worth
  // looking at, and everything else stays out of the way until asked for
  const [open, setOpen] = useState(fired > 0 || depth === 0);
  if (under.length === 0) {
    return null;
  }

  return (
    <div style={{ marginLeft: depth === 0 ? 0 : 10 }}>
      <div class="editor-branch-head">
        <button
          type="button"
          class="editor-twisty"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? "▾" : "▸"} {branch.name}
        </button>
        <RuleSwitch
          ruleNames={under}
          label={branch.name}
          shown={fired > 0 ? `×${fired}` : undefined}
          panel={panel}
        />
      </div>
      {open && (
        <div class="editor-column">
          {branch.ruleNames.filter(visible).map((name) => (
            <RuleSwitch
              key={name}
              ruleNames={[name]}
              label={ruleLabel(name)}
              shown={`${ruleLabel(name)}${
                (firedCounts.get(name) ?? 0) > 0 ?
                  ` ×${firedCounts.get(name)}`
                : ""
              }`}
              panel={panel}
            />
          ))}
          {branch.branches.map((child) => (
            <Branch
              key={child.name}
              branch={child}
              depth={depth + 1}
              firedCounts={firedCounts}
              visible={visible}
              panel={panel}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * every kernel rule this character could be shaped by, grouped by what the
 * rule does and whether it fired. A rule that fires where it should not is
 * turned off here rather than by naming the character in the rule table, so
 * the exceptions live with the character they belong to.
 */
export const RulePanel = (panel: RulePanelProps) => {
  const { glyph, pixelRules } = panel;
  const firedCounts = new Map<string, number>();
  for (const { rule } of glyph.outline.matches) {
    firedCounts.set(rule.name, (firedCounts.get(rule.name) ?? 0) + 1);
  }

  // a rule whose pattern lands nowhere on this character can do nothing to it
  // however it is set, so it is left out entirely
  const bearing = new Set(
    pixelRules
      .values()
      .flatMap(({ applied, couldApply }) => [...applied, ...couldApply]),
  );

  return (
    <div class="editor-column">
      <p class="editor-note">
        char {charLabel(glyph.char)} — only the rules that reach it
      </p>
      {ruleTree(glyph.char).map((branch) => (
        <Branch
          key={branch.name}
          branch={branch}
          depth={0}
          firedCounts={firedCounts}
          visible={(name) => bearing.has(name)}
          panel={panel}
        />
      ))}
    </div>
  );
};
