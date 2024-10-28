/* eslint-disable @typescript-eslint/no-explicit-any */
export type ObjectEntries = <K extends keyof any, V>(
  o: Record<K, V>,
) => [K, V][];

export const entries = Object.entries as ObjectEntries;

export type ObjectFromEntries = <K extends keyof any, V>(
  o: [K, V][],
) => Partial<Record<K, V>>;

export type ObjectFromAllEntries = <K extends keyof any, V>(
  o: [K, V][],
) => Record<K, V>;

export const fromEntries = Object.fromEntries as ObjectFromEntries;
export const fromAllEntries = Object.fromEntries as ObjectFromAllEntries;
