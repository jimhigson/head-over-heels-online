import { glyphOutline, type GlyphOutline } from "./glyphOutline";
import { type GlyphOverride, pixelAt, type PixelKey } from "./glyphOverrides";
import { type KernelMatch } from "./kernelRules";
import { activeCellsOf, reachedCellsOf } from "./pixelRuleIndex";
import { withPixelRules } from "./withPixelRules";

type PixelChoiceOutcome = {
  /** the character's override with this choice made at the cell */
  override: GlyphOverride;
  outline: GlyphOutline;
  /** whether this is what the cell currently says or draws */
  current: boolean;
  /**
   * false where the choice cannot take the cell - a neighbour's shape
   * already reaches into it
   */
  takesEffect: boolean;
  /**
   * the cells whose drawing this choice is about: the cell, and everything
   * the shapes taking it reach into, now or with the choice made
   */
  affected: Array<[number, number]>;
};

/** one thing a cell could be told, with the outline it would give */
export type PixelChoice = PixelChoiceOutcome &
  (
    | { type: "inherit" | "none" }
    | {
        type: "option";
        ruleName: string;
        optionName: string;
        choiceName: string;
      }
    | { type: "rule"; ruleName: string }
  );

export type PixelChoiceSubject = {
  bitmap: boolean[][];
  char: string;
  override: GlyphOverride | undefined;
  cell: PixelKey;
  /** every rule whose pattern could put the cell in its active site */
  candidates: readonly string[];
};

const matchesClaiming = (
  outline: GlyphOutline,
  cell: PixelKey,
): KernelMatch[] => {
  const [cellX, cellY] = pixelAt(cell);
  return outline.matches.filter((match) =>
    activeCellsOf(match).some(([x, y]) => x === cellX && y === cellY),
  );
};

/**
 * blocks at the cell, one round at a time, every rule other than `wanted`
 * that still takes it - each block can let a rule further down the order in
 */
const blockingAllBut = (
  { bitmap, char, cell, candidates }: PixelChoiceSubject,
  start: GlyphOverride,
  wanted: string | undefined,
): { override: GlyphOverride; outline: GlyphOutline } => {
  let override = start;
  let outline = glyphOutline(bitmap, char, override);
  for (let round = 0; round < candidates.length; round++) {
    const claiming = matchesClaiming(outline, cell).map(
      ({ rule }) => rule.name,
    );
    const others = claiming.filter((name) => name !== wanted);
    const wantedTakesIt = wanted !== undefined && claiming.includes(wanted);
    if (others.length === 0 || wantedTakesIt) {
      break;
    }
    override = withPixelRules(override, cell, others, (was) => ({
      ...was,
      on: false,
    }));
    outline = glyphOutline(bitmap, char, override);
  }
  return { override, outline };
};

/** the cell with nothing said about whether any rule applies there */
const saysNothing = ({
  override,
  cell,
  candidates,
}: PixelChoiceSubject): GlyphOverride =>
  withPixelRules(override, cell, candidates, ({ options }) => ({ options }));

const saysSomething = ({ override, cell }: PixelChoiceSubject): boolean =>
  Object.values(override?.pixelRules?.[cell] ?? {}).some(
    ({ on }) => on !== undefined,
  );

/**
 * Everything a cell could be told about which rule redraws it, each drawn
 * as the whole glyph would come out.
 *
 * Choosing a rule switches it on here and blocks whatever else would still
 * take the cell ahead of it, so the choice holds whatever order the rules
 * are tried in. Choosing none blocks every one of them; inheriting says
 * nothing and leaves the cell to the character's own settings. The rule that
 * owns the cell also offers each of its options' choices.
 */
export const pixelChoices = (subject: PixelChoiceSubject): PixelChoice[] => {
  const { bitmap, char, override, cell, candidates } = subject;
  const now = glyphOutline(bitmap, char, override);
  const owning = matchesClaiming(now, cell);
  const owningNames = owning.map(({ rule }) => rule.name);
  const cleared = saysNothing(subject);
  const affectedWith = (outline: GlyphOutline): Array<[number, number]> => [
    pixelAt(cell),
    ...[...owning, ...matchesClaiming(outline, cell)].flatMap(reachedCellsOf),
  ];

  const inherit = glyphOutline(bitmap, char, cleared);
  const none = blockingAllBut(subject, cleared, undefined);

  const ruleChoices = candidates.map((ruleName): PixelChoice => {
    const { override: chosen, outline } = blockingAllBut(
      subject,
      withPixelRules(cleared, cell, [ruleName], (was) => ({
        ...was,
        on: true,
      })),
      ruleName,
    );
    return {
      type: "rule",
      ruleName,
      override: chosen,
      outline,
      current: owningNames.includes(ruleName),
      takesEffect: matchesClaiming(outline, cell).some(
        ({ rule }) => rule.name === ruleName,
      ),
      affected: affectedWith(outline),
    };
  });

  const optionChoices = owning.flatMap(({ rule, choices }) =>
    (rule.options ?? []).flatMap((option) =>
      option.choices.map((choice): PixelChoice => {
        const chosen = withPixelRules(override, cell, [rule.name], (was) => ({
          ...was,
          options: { ...was.options, [option.name]: choice.name },
        }));
        const outline = glyphOutline(bitmap, char, chosen);
        return {
          type: "option",
          ruleName: rule.name,
          optionName: option.name,
          choiceName: choice.name,
          override: chosen,
          outline,
          current: choices[option.name] === choice.name,
          takesEffect: true,
          affected: affectedWith(outline),
        };
      }),
    ),
  );

  return [
    {
      type: "inherit",
      override: cleared,
      outline: inherit,
      current: !saysSomething(subject),
      takesEffect: true,
      affected: affectedWith(inherit),
    },
    {
      type: "none",
      ...none,
      current: owning.length === 0,
      takesEffect: matchesClaiming(none.outline, cell).length === 0,
      affected: affectedWith(none.outline),
    },
    ...ruleChoices,
    ...optionChoices,
  ];
};
