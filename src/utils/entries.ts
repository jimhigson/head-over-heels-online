import { objectEntries, objectKeys } from "iter-tools-es";

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
