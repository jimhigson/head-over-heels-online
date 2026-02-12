import { fromEntries, objectEntriesIter } from "./entries";
import { iterate } from "./iterate";

export const transformObject = <
  KIn extends number | string,
  VIn,
  KOut extends number | string,
  VOut,
>(
  object: Partial<Record<KIn, VIn>>,
  /** function to transform the key/value pair as an entry, and return a new entry, or undefined to skip */
  transform: (entry: [KIn, VIn]) => [KOut, VOut] | undefined,
): Record<KOut, VOut> => {
  const inIter = iterate(objectEntriesIter(object));
  const transformedIter = inIter
    .map(transform)
    .filter((entry) => entry !== undefined);
  return fromEntries(transformedIter) as Record<KOut, VOut>;
};

export const transformObjectAsync = async <
  KIn extends number | string,
  VIn,
  KOut extends number | string,
  VOut,
>(
  object: Partial<Record<KIn, VIn>>,
  /** function to transform the key/value pair as an entry, and return a new entry, or undefined to skip */
  transform: (entry: [KIn, VIn]) => Promise<[KOut, VOut] | undefined>,
): Promise<Record<KOut, VOut>> => {
  const inIter = iterate(objectEntriesIter(object));
  const transformedIter = inIter.map(transform);
  return fromEntries(
    (await Promise.all(transformedIter)).filter((entry) => entry !== undefined),
  ) as Record<KOut, VOut>;
};
