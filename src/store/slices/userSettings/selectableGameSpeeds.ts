export const selectableGameSpeeds = [1, 1.2, 1.5, 2] as const;
export type SelectableGameSpeeds = (typeof selectableGameSpeeds)[number];
