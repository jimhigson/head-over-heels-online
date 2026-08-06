/** deterministic pseudo-random 0..1 so every run sees identical cases */
export const makeLcg =
  (seed: number): (() => number) =>
  (): number => {
    seed = (seed * 1_664_525 + 1_013_904_223) >>> 0;
    return seed / 2 ** 32;
  };
