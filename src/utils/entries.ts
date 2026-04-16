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

// TODO: consider replacing with type-fest version:
//    https://github.com/sindresorhus/type-fest/blob/main/source/entries.d.ts
export const entries = Object.entries as ObjectEntries;
export const keys = Object.keys as ObjectKeys;

/** Lazily iterate entries of a plain object. Only plain objects are supported. */
function* objectEntriesIterGen<K extends keyof any, V>(
  o: Partial<Record<K, V>>,
): IterableIterator<[K, V]> {
  for (const k in o) {
    yield [k as K, o[k] as V];
  }
}
export const objectEntriesIter = objectEntriesIterGen as ObjectEntriesIter;

/** Lazily iterate keys of a plain object. Only plain objects are supported. */
function* objectKeysIterGen<K extends keyof any>(
  o: Partial<Record<K, unknown>>,
): IterableIterator<K> {
  for (const k in o) {
    yield k as K;
  }
}
export const keysIter = objectKeysIterGen as ObjectKeysIter;

export type ObjectValuesIter = <V>(
  o: Partial<Record<keyof any, V>>,
) => IterableIterator<V>;

/** Lazily iterate values of a plain object. Only plain objects are supported. */
function* objectValuesIterGen<V>(
  o: Partial<Record<keyof any, V>>,
): IterableIterator<V> {
  for (const k in o) {
    yield o[k] as V;
  }
}
export const valuesIter = objectValuesIterGen as ObjectValuesIter;

export type ObjectFromEntries = <K extends keyof any, V>(
  o: Iterable<[K, V]>,
) => Partial<Record<K, V>>;

export type ObjectFromAllEntries = <K extends keyof any, V>(
  o: Iterable<[K, V]>,
) => Record<K, V>;

export const fromEntries = Object.fromEntries as ObjectFromEntries;
export const fromAllEntries = Object.fromEntries as ObjectFromAllEntries;
