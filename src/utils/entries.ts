/* eslint-disable @typescript-eslint/no-explicit-any */
export type ObjectKeys = <K extends keyof any>(
  o: Partial<Record<K, unknown>>,
) => K[];

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

export const entries = Object.entries as ObjectEntries;
export const keys = Object.keys as ObjectKeys;

export type ObjectFromEntries = <K extends keyof any, V>(
  o: Iterable<[K, V]>,
) => Partial<Record<K, V>>;

export type ObjectFromAllEntries = <K extends keyof any, V>(
  o: Iterable<[K, V]>,
) => Record<K, V>;

export const fromEntries = Object.fromEntries as ObjectFromEntries;
export const fromAllEntries = Object.fromEntries as ObjectFromAllEntries;
