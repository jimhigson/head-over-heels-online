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

export const omit = <O extends object, KS extends keyof O>(
  o: O,
  ...ks: KS[]
): Omit<O, KS> => {
  const res: Partial<O> = { ...o };

  for (const k of ks) {
    delete res[k];
  }

  return res as Omit<O, KS>;
};
