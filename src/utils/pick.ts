import { type DistributedOmit, type KeysOfUnion } from "type-fest";

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

/**
 * useful for cases where the keys to omit are known:
 *
 * omit(o, "a", "b", "c")
 */
export const omit = <
  O extends object,
  const KS extends ReadonlyArray<KeysOfUnion<O>>,
>(
  o: O,
  ...ks: KS
): DistributedOmit<O, KS[number]> => {
  // keyed by every union member's keys, so any of them can be deleted:
  const res: { [K in KeysOfUnion<O>]?: unknown } = { ...o };

  for (const k of ks) {
    delete res[k];
  }

  return res as DistributedOmit<O, KS[number]>;
};

/**
 * if we have an array a of type T[] and an object of Record<T, V>,
 * omit(O,...a) means remove "all of them" even though a may not have
 * all values drawn from T in it. In this case, all we can say is it
 * returns an object with a subset of the keys.
 *
 * omit(o, "a", "b", "c")
 */
export const omitArray = <O extends object, KS extends keyof O>(
  o: O,
  ks: KS[],
): Partial<O> => {
  const res: Partial<O> = { ...o };

  for (const k of ks) {
    delete res[k];
  }

  return res as Partial<O>;
};
