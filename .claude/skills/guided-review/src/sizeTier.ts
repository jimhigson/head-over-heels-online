/* a coarse t-shirt size for how much a changed file costs to review, for the
   contents sidebar - a quick sense of what's ahead before opening it. Text
   files size by changed line count; images have no lines, so they size by
   the % of pixels the compare viewer already computes. Shown as a solid
   Unicode block character rather than a letter, growing from a sliver to a
   full block as T(iny) rises to H(uge). */

export type SizeTier = "H" | "L" | "M" | "S" | "T";

// zero is its own case - a side with no changes gets no bar at all, rather
// than the sliver a genuinely tiny change gets
export const sizeTierOfLines = (lines: number): SizeTier | undefined =>
  lines === 0 ? undefined
  : lines <= 3 ? "T"
  : lines <= 10 ? "S"
  : lines <= 32 ? "M"
  : lines <= 100 ? "L"
  : "H";

export const sizeTierOfImagePercent = (percent: number): SizeTier | undefined =>
  percent === 0 ? undefined
  : percent <= 1.5 ? "T"
  : percent <= 3.3 ? "S"
  : percent <= 10 ? "M"
  : percent <= 20 ? "L"
  : "H";

export const blockOfTier: Record<SizeTier, string> = {
  T: "▁",
  S: "▃",
  M: "▅",
  L: "▇",
  H: "█",
};

// a plain space collapses away as trimmable whitespace when it's a bar's only
// content; a non-breaking space doesn't, and is the same monospace cell width
export const emptyTierGlyph = " ";
