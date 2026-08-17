import { type KernelRule, type RuleChoices } from "../geometry/kernelRules";
import { smoothGlyphContours } from "../geometry/smoothGlyphContours";
import { contoursPath } from "./contourPath";

export type ChoicePreviewProps = {
  rule: KernelRule;
  /** what every one of the rule's options is set to for this drawing */
  choices: RuleChoices;
  /** screen pixels per cell */
  scale?: number;
};

/**
 * What a rule does, drawn from the rule itself.
 *
 * The pattern is the smallest piece of art the rule recognises, so it doubles
 * as the picture: it is turned into a bitmap, the rule alone is let loose on
 * it with the choices in question, and the outline that comes out is what
 * that setting means. Nothing here knows what any particular rule draws, so
 * every option of every rule illustrates itself - including ones added later
 */
export const ChoicePreview = ({
  rule,
  choices,
  scale = 26,
}: ChoicePreviewProps) => {
  const bitmap = rule.pattern.map((row) =>
    [...row].map((cell) => cell !== "."),
  );
  const height = bitmap.length;
  const [firstRow] = bitmap;
  const width = firstRow.length;

  const { contours } = smoothGlyphContours(bitmap, "", {
    allows: (ruleName) => ruleName === rule.name,
    choicesAt: () => choices,
  });

  // framed on what the rule redraws, with half a cell of its surroundings
  // either side: the pattern is mostly context, and a picture of the context
  // says nothing about which choice is which
  const margin = 0.5;
  const siteXs = rule.activeSite.map(([siteX]) => siteX);
  const siteYs = rule.activeSite.map(([, siteY]) => siteY);
  const left = Math.min(...siteXs) - margin;
  const top = Math.min(...siteYs) - margin;
  const framedWidth = Math.max(...siteXs) + 1 + margin - left;
  const framedHeight = Math.max(...siteYs) + 1 + margin - top;

  return (
    <svg
      width={framedWidth * scale}
      height={framedHeight * scale}
      viewBox={`${left} ${top} ${framedWidth} ${framedHeight}`}
      class="editor-choice-preview"
    >
      {bitmap.map((row, y) =>
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
      <path d={contoursPath(contours)} fill="#f4e3c1" fill-rule="nonzero" />
      {Array.from({ length: width + 1 }, (_, x) => (
        <line
          key={`v${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={height}
          stroke="#ffffff22"
          stroke-width={1 / scale}
        />
      ))}
      {Array.from({ length: height + 1 }, (_, y) => (
        <line
          key={`h${y}`}
          x1={0}
          y1={y}
          x2={width}
          y2={y}
          stroke="#ffffff22"
          stroke-width={1 / scale}
        />
      ))}
    </svg>
  );
};
