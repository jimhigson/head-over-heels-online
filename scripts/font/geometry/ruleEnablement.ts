import {
  type GlyphOverride,
  type PixelKey,
  pixelKey,
  type PixelRuleSetting,
} from "./glyphOverrides";
import { type RuleChoices, ruleNamed, type RuleSettings } from "./kernelRules";

/** what a setting says about a rule, before anything else has its say */
export type RuleSetting = "inherit" | "off" | "on";

const settingObjectAt = (
  override: GlyphOverride | undefined,
  cell: PixelKey,
  ruleName: string,
): PixelRuleSetting | undefined => override?.pixelRules?.[cell]?.[ruleName];

export const settingAt = (
  override: GlyphOverride | undefined,
  cell: PixelKey,
  ruleName: string,
): RuleSetting => {
  const on = settingObjectAt(override, cell, ruleName)?.on;
  return (
    on === undefined ? "inherit"
    : on ? "on"
    : "off"
  );
};

export const choiceAt = (
  override: GlyphOverride | undefined,
  cell: PixelKey,
  ruleName: string,
  optionName: string,
): string | undefined =>
  settingObjectAt(override, cell, ruleName)?.options?.[optionName];

/**
 * whether a rule applies to a character as a whole, ignoring anything said
 * about individual pixels. Every reason a character sits a rule out is an
 * edit in the overrides file - the rules themselves know nothing about any
 * particular character
 */
export const allowedAcrossChar = (
  override: GlyphOverride | undefined,
  ruleName: string,
): boolean =>
  !(override?.disabledRules ?? []).includes(ruleName) &&
  !(ruleNamed(ruleName)?.defaultOff ?? false);

/**
 * How a character's settings decide whether a rule may take a set of cells,
 * and how it draws there.
 *
 * A pixel switched off blocks any match reaching it, however the rule is set
 * elsewhere - blocking is about the pixel, so it is the strongest thing that
 * can be said. A pixel switched on lets a rule take that place even where the
 * rule is off across the character, or off everywhere by default: that is
 * what makes a rule cut for one glyph's corner a rule about a shape rather
 * than about a character. With nothing said about any of the cells, the
 * character-wide setting decides.
 *
 * A mode is read the same way round: the first cell of the match that names
 * one wins, and where none does the rule draws in its own first mode.
 */
export const ruleSettingsFor = (
  override: GlyphOverride | undefined,
): RuleSettings => {
  const acrossChar = new Map<string, boolean>();
  return {
    allows(ruleName, activeCells) {
      let switchedOn = false;
      for (const [x, y] of activeCells) {
        const setting = settingAt(override, pixelKey(x, y), ruleName);
        if (setting === "off") {
          return false;
        }
        switchedOn ||= setting === "on";
      }
      if (switchedOn) {
        return true;
      }
      const known = acrossChar.get(ruleName);
      if (known !== undefined) {
        return known;
      }
      const allowed = allowedAcrossChar(override, ruleName);
      acrossChar.set(ruleName, allowed);
      return allowed;
    },
    choicesAt(ruleName, activeCells) {
      // the first cell of the match with anything to say about an option
      // answers it, so a shape spanning several cells is never asked to be
      // two things at once
      const answered: RuleChoices = {};
      for (const [x, y] of activeCells) {
        const chosen = settingObjectAt(
          override,
          pixelKey(x, y),
          ruleName,
        )?.options;
        for (const [option, choice] of Object.entries(chosen ?? {})) {
          answered[option] ??= choice;
        }
      }
      return answered;
    },
  };
};
