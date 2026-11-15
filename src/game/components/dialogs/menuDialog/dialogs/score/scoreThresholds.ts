/**
 * the original game's max score - its grade thresholds are scores out of this
 */
const originalGameMaxScore = 94_000;

export type ScoreThreshold = {
  /**
   * proportion of the campaign's max score (0-1), exclusive of the upper limit
   */
  upToProportion: number;
  label: string;
};

/**
 * the original game's grade thresholds, as proportions of its max score.
 * Above the last is liberator, and a full score is completionist.
 *
 * import using `with { type: "macro" };` so only the proportions are built in
 */
export const scoreThresholds = (): ScoreThreshold[] => [
  { upToProportion: 8_000 / originalGameMaxScore, label: "beginner" }, // ~0.085
  { upToProportion: 20_000 / originalGameMaxScore, label: "novice" }, // ~0.213
  { upToProportion: 30_000 / originalGameMaxScore, label: "spy" }, // ~0.319
  { upToProportion: 55_000 / originalGameMaxScore, label: "master-spy" }, // ~0.585
  { upToProportion: 84_000 / originalGameMaxScore, label: "hero" }, // ~0.894
];
