import { objectEntries, objectKeys } from "iter-tools";
import { iterate } from "./iterate";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ObjectKeys = <K extends keyof any>(
  o: Partial<Record<K, unknown>>,
) => K[];
export type ObjectKeysIter = <K extends keyof any>(
  o: Partial<Record<K, unknown>>,
) => IterableIterator<K>;

export type EntriesOf<O extends object> =
  /*O extends Record<infer K, infer V> ? Array<[K, V]>
  : */ Array<
    {
      [K in keyof O]: [K, O[K]];
    }[keyof O]
  >;

export type ObjectEntries = <K extends keyof any, V>(
  o: Record<K, V>,
) => [K, V][];

export type ObjectEntriesIter = <K extends keyof any, V>(
  o: Partial<Record<K, V>>,
) => IterableIterator<[K, V]>;

export const entries = Object.entries as ObjectEntries;
export const objectEntriesIter = objectEntries as ObjectEntriesIter;
export const keys = Object.keys as ObjectKeys;
export const keysIter = objectKeys as ObjectKeysIter;

export type ObjectFromEntries = <K extends keyof any, V>(
  o: Iterable<[K, V]>,
) => Partial<Record<K, V>>;

export type ObjectFromAllEntries = <K extends keyof any, V>(
  o: Iterable<[K, V]>,
) => Record<K, V>;

export const fromEntries = Object.fromEntries as ObjectFromEntries;
export const fromAllEntries = Object.fromEntries as ObjectFromAllEntries;

export const transformObject = <
  KIn extends string | number,
  VIn,
  KOut extends string | number,
  VOut,
>(
  object: Partial<Record<KIn, VIn>>,
  transform: (entry: [KIn, VIn]) => [KOut, VOut],
): Record<KOut, VOut> => {
  const inIter = iterate(objectEntriesIter(object));
  const transformedIter = inIter.map(transform);
  return fromEntries(transformedIter) as Record<KOut, VOut>;
};
