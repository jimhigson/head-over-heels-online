export type ObjectEntries = <K extends keyof any, V>(
  o: Record<K, V>,
) => [K, V][];

export const entries = Object.entries as ObjectEntries;
