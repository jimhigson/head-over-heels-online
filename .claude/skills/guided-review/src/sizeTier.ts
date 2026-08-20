/* a coarse t-shirt size for how much a changed file costs to review, for the
   contents sidebar - a quick sense of what's ahead before opening it. Text
   files size by changed line count; images have no lines, so they size by
   the % of pixels the compare viewer already computes. Shown as a solid
   Unicode block character rather than a letter, growing from a sliver to a
   full block as T(iny) rises to H(uge). */

export type SizeTier = "T" | "S" | "M" | "L" | "H";

export const sizeTierOfLines = (lines: number): SizeTier =>
  lines <= 3 ? "T"
  : lines <= 10 ? "S"
  : lines <= 32 ? "M"
  : lines <= 100 ? "L"
  : "H";

export const sizeTierOfImagePercent = (percent: number): SizeTier =>
  percent <= 1.5 ? "T"
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
