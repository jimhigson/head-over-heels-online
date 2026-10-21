/**
 * camelCase to lower-case words, eg "awayRight" → "away right"
 */
export const camelToSpaced = (camelCase: string): string =>
  camelCase.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
