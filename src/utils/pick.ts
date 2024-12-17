export const pick = <O extends object, KS extends keyof O>(
  o: O,
  ...ks: KS[]
): {
  [K in KS]: O[K];
} => {
  const res: Partial<{
    [K in KS]: O[K];
  }> = {};

  for (const k of ks) {
    res[k] = o[k];
  }

  return res as {
    [K in KS]: O[K];
  };
};
