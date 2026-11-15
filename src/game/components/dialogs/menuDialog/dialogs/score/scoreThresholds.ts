/**
 * the original game's max score - its grade thresholds are scores out of this
 */
const ORIGINAL_GAME_MAX_SCORE = 94_000;

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
  { upToProportion: 8_000 / ORIGINAL_GAME_MAX_SCORE, label: "beginner" }, // ~0.085
  { upToProportion: 20_000 / ORIGINAL_GAME_MAX_SCORE, label: "novice" }, // ~0.213
  { upToProportion: 30_000 / ORIGINAL_GAME_MAX_SCORE, label: "spy" }, // ~0.319
  { upToProportion: 55_000 / ORIGINAL_GAME_MAX_SCORE, label: "master-spy" }, // ~0.585
  { upToProportion: 84_000 / ORIGINAL_GAME_MAX_SCORE, label: "hero" }, // ~0.894
];
