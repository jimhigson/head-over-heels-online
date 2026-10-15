import { type EditorCommand } from "../commands/EditorCommand";

/**
 * what the cmd-k search matches a command against: its label, its dotted key
 * (so category terms like "monster" match), and its synonyms
 */
export const cmdKSearchText = (
  key: string,
  { label, synonyms = [] }: EditorCommand,
): string => [label, key, ...synonyms].join(" ");
