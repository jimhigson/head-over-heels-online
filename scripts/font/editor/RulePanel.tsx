import { useState } from "preact/hooks";

import { CommandItem } from "../../../src/ui/command/CommandItem";
import { CommandMatch } from "../../../src/ui/command/CommandMatch";
import { Select } from "../../../src/ui/Select";
import { Switch, SwitchN } from "../../../src/ui/Switch";
import { type GlyphOverride, type PixelKey } from "../geometry/glyphOverrides";
import { type RuleChoices, ruleNamed } from "../geometry/kernelRules";
import { type PixelRules, rulesAt } from "../geometry/pixelRuleIndex";
import {
  allowedAcrossChar,
  choiceAt,
  type RuleSetting,
  settingAt,
} from "../geometry/ruleEnablement";
import {
  type RuleBranch,
  ruleLabel,
  rulesUnder,
  ruleTree,
} from "../geometry/ruleTree";
import { charLabel } from "./charLabel";
import { ChoicePreview } from "./ChoicePreview";
import { KernelShape } from "./KernelShape";
import { type EditorGlyph } from "./useGlyphs";

export type RulePanelProps = {
  glyph: EditorGlyph;
  override: GlyphOverride | undefined;
  /** which rules bear on which of this character's cells */
  pixelRules: Map<PixelKey, PixelRules>;
  /** the cell being edited, or undefined to edit the character as a whole */
  pixel: PixelKey | undefined;
  /** turn a whole set of rules on, or off if any of them is currently on */
  onToggleForChar: (ruleNames: readonly string[]) => void;
  onSetForPixel: (ruleNames: readonly string[], setting: RuleSetting) => void;
  onSetChoiceForPixel: (
    ruleName: string,
    optionName: string,
    choice: string,
  ) => void;
};

const settings = ["inherit", "on", "off"] as const satisfies RuleSetting[];

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
 * one rule, or a whole branch of them, as it applies wherever the panel is
 * pointed: a plain on/off for the character, or inherit/on/off for a single
 * pixel, where saying nothing is the usual answer.
 *
 * A rule that is off until switched on has no character-wide setting to show -
 * switching it on is something said about a place, not about a glyph - so at
 * character scope it says so rather than offering a switch that could only
 * ever read off.
 */
const RuleSwitch = ({ ruleNames, label, shown, panel }: RuleSwitchProps) => {
  const {
    override,
    pixel,
    onToggleForChar,
    onSetForPixel,
    onSetChoiceForPixel,
  } = panel;
  const [firstRule] = ruleNames;
  const tooltipContent = ruleNames.length === 1 ? tipFor(firstRule) : undefined;

  if (pixel === undefined) {
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
        tooltipContent={tooltipContent}
        onChange={() => onToggleForChar(ruleNames)}
      />
    );
  }

  const each = ruleNames.map((name) => settingAt(override, pixel, name));
  const common =
    each.every((setting) => setting === each[0]) ? each[0] : "inherit";
  // a rule's options are answered below its switch, but only for a single
  // rule and only where the rule actually applies here - there is nothing to
  // choose about a rule that is not going to draw
  const rule = ruleNames.length === 1 ? ruleNamed(firstRule) : undefined;
  const applies =
    common === "on" ||
    (common === "inherit" && allowedAcrossChar(override, firstRule));
  const options = applies ? rule?.options : undefined;
  const chosen = (option: {
    name: string;
    choices: readonly { name: string }[];
  }) =>
    choiceAt(override, pixel, firstRule, option.name) ?? option.choices[0].name;
  // every option answered, so a preview of one shows the others as they are
  const answered: RuleChoices = Object.fromEntries(
    (rule?.options ?? []).map((option) => [option.name, chosen(option)]),
  );

  return (
    <>
      <SwitchN
        class="editor-rule"
        value={common}
        values={settings}
        ariaLabel={label}
        label={shown}
        tooltipContent={tooltipContent}
        onChange={(setting) => onSetForPixel(ruleNames, setting)}
      />
      {options?.map((option) => (
        <div key={option.name} class="editor-rule editor-rule-option">
          <span class="editor-note">{option.name}</span>
          <Select
            value={chosen(option)}
            values={option.choices.map(({ name }) => name)}
            disableCommandInput
            triggerButtonClassName="editor-rule-option-trigger"
            // closed, the name alone: a preview squeezed into the row is too
            // small to read, and the pictures are there for choosing between,
            // which is what the open list does
            triggerButtonLabel={chosen(option)}
            OptionCommandItem={({ itemValue, onSelect: pick }) => (
              <CommandItem value={itemValue} onSelect={pick} class="px-1">
                <span class="editor-choice-item">
                  {rule !== undefined && (
                    <ChoicePreview
                      rule={rule}
                      choices={{ ...answered, [option.name]: itemValue }}
                    />
                  )}
                  <CommandMatch text={itemValue} />
                </span>
              </CommandItem>
            )}
            onSelect={(choice) =>
              onSetChoiceForPixel(firstRule, option.name, choice)
            }
          />
        </div>
      ))}
    </>
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
 *
 * With a pixel picked, the panel is about that cell instead, and shows only
 * the rules whose pattern could ever reach it - the rest could do nothing
 * there however they were set.
 */
export const RulePanel = (panel: RulePanelProps) => {
  const { glyph, pixel, pixelRules } = panel;
  const firedCounts = new Map<string, number>();
  for (const { rule } of glyph.outline.matches) {
    firedCounts.set(rule.name, (firedCounts.get(rule.name) ?? 0) + 1);
  }

  // a rule whose pattern lands nowhere on this character can do nothing to it
  // however it is set, so it is left out entirely - of the whole character's
  // list, and of a single cell's
  const bearing = new Set(
    (pixel === undefined ?
      [...pixelRules.values()]
    : [rulesAt(pixelRules, pixel)]
    ).flatMap(({ applied, couldApply }) => [...applied, ...couldApply]),
  );

  return (
    <div class="editor-column">
      <p class="editor-note">
        {pixel === undefined ?
          `char ${charLabel(glyph.char)} — only the rules that reach it`
        : `pixel (${pixel}) — only the rules that could reach it`}
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
