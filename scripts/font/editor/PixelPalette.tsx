import { useMemo } from "preact/hooks";

import {
  type GlyphOverride,
  pixelAt,
  type PixelKey,
} from "../geometry/glyphOverrides";
import { kernelRulesForChar } from "../geometry/kernelRules";
import { type PixelChoice, pixelChoices } from "../geometry/pixelChoices";
import { type PixelRules, rulesAt } from "../geometry/pixelRuleIndex";
import { ruleLabel } from "../geometry/ruleTree";
import { contoursPath } from "./contourPath";
import { type EditorGlyph } from "./useGlyphs";

export type PixelPaletteProps = {
  glyph: EditorGlyph;
  override: GlyphOverride | undefined;
  pixelRules: Map<PixelKey, PixelRules>;
  pixel: PixelKey;
  onChoose: (next: GlyphOverride) => void;
};

const margin = 0.5;
/** screen pixels per glyph pixel */
const scale = 24;

type ChoiceTileProps = {
  glyph: EditorGlyph;
  pixel: PixelKey;
  choice: PixelChoice;
  label: string;
  title: string;
  onChoose: (next: GlyphOverride) => void;
};

/** the glyph around the cell, as it would be drawn with this choice made */
const ChoiceTile = ({
  glyph,
  pixel,
  choice,
  label,
  title,
  onChoose,
}: ChoiceTileProps) => {
  const [cellX, cellY] = pixelAt(pixel);
  // framed tight on the cells this choice is about
  const xs = choice.affected.map(([x]) => x);
  const ys = choice.affected.map(([, y]) => y);
  const left = Math.min(...xs) - margin;
  const top = Math.min(...ys) - margin;
  const width = Math.max(...xs) + 1 + margin - left;
  const height = Math.max(...ys) + 1 + margin - top;
  return (
    <button
      type="button"
      class="editor-palette-tile"
      data-current={choice.current ? "true" : undefined}
      data-inert={choice.takesEffect ? undefined : "true"}
      title={choice.takesEffect ? title : `${title} - blocked by a neighbour`}
      onClick={() => onChoose(choice.override)}
    >
      <svg
        width={width * scale}
        height={height * scale}
        viewBox={`${left} ${top} ${width} ${height}`}
      >
        {glyph.bitmap.map((row, y) =>
          row.map((inked, x) =>
            inked ?
              <rect
                key={`${x},${y}`}
                x={x}
                y={y}
                width={1}
                height={1}
                fill="#3d4453"
              />
            : null,
          ),
        )}
        <path
          d={contoursPath(choice.outline.contours)}
          fill="#f4e3c1"
          fill-rule="nonzero"
        />
        <rect
          x={cellX}
          y={cellY}
          width={1}
          height={1}
          fill="none"
          stroke="#ffe94b"
          stroke-width={2 / scale}
        />
      </svg>
      <span class="editor-palette-label">{label}</span>
    </button>
  );
};

const labelOf = (choice: PixelChoice): string => {
  switch (choice.type) {
    case "inherit":
      return "auto";
    case "none":
      return "none";
    case "rule":
      return ruleLabel(choice.ruleName);
    case "option":
      return choice.choiceName;
    default:
      return choice satisfies never;
  }
};

const titleOf = (choice: PixelChoice): string => {
  switch (choice.type) {
    case "inherit":
      return "nothing said here - the character's settings decide";
    case "none":
      return "no rule redraws this cell";
    case "rule":
      return choice.ruleName;
    case "option":
      return `${choice.ruleName} ${choice.optionName}: ${choice.choiceName}`;
    default:
      return choice satisfies never;
  }
};

type OptionChoice = Extract<PixelChoice, { type: "option" }>;

const isOptionChoice = (choice: PixelChoice): choice is OptionChoice =>
  choice.type === "option";

const optionHeading = ({ ruleName, optionName }: OptionChoice): string =>
  `${ruleName} — ${optionName}`;

const useChoices = (
  glyph: EditorGlyph,
  override: GlyphOverride | undefined,
  pixelRules: Map<PixelKey, PixelRules>,
  pixel: PixelKey,
): PixelChoice[] =>
  useMemo(() => {
    const reaching = new Set(rulesAt(pixelRules, pixel).couldApply);
    return pixelChoices({
      bitmap: glyph.bitmap,
      char: glyph.char,
      override,
      cell: pixel,
      candidates: kernelRulesForChar(glyph.char)
        .map(({ name }) => name)
        .filter((name) => reaching.has(name)),
    });
  }, [glyph, override, pixelRules, pixel]);

/**
 * What a single cell can be told, each shown as the glyph would come out
 * rather than by the name of the rule behind it. Picking a tile is the whole
 * edit: the rule it shows takes the cell, and the rule that owns the cell
 * offers its options the same way underneath
 */
export const PixelPalette = ({
  glyph,
  override,
  pixelRules,
  pixel,
  onChoose,
}: PixelPaletteProps) => {
  const choices = useChoices(glyph, override, pixelRules, pixel);
  const tile = (choice: PixelChoice) => (
    <ChoiceTile
      key={titleOf(choice)}
      glyph={glyph}
      pixel={pixel}
      choice={choice}
      label={labelOf(choice)}
      title={titleOf(choice)}
      onChoose={onChoose}
    />
  );
  const optionChoices = choices.filter(isOptionChoice);
  const optionHeadings = [...new Set(optionChoices.map(optionHeading))];

  return (
    <div class="editor-column">
      <p class="editor-note">pixel ({pixel}) — pick what redraws it</p>
      <div class="editor-palette">
        {choices.filter((choice) => !isOptionChoice(choice)).map(tile)}
      </div>
      {optionHeadings.map((heading) => (
        <div key={heading} class="editor-column">
          <p class="editor-note">{heading}</p>
          <div class="editor-palette">
            {optionChoices
              .filter((choice) => optionHeading(choice) === heading)
              .map(tile)}
          </div>
        </div>
      ))}
    </div>
  );
};
