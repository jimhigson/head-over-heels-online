import { type ShortcutKeys } from "./useKeyboardShortcut";

export const formatShortcutKey = (key: string): string =>
  key
    .replace(/ArrowLeft/g, "⬅")
    .replace(/ArrowRight/g, "➡")
    .replace(/ArrowUp/g, "⬆")
    .replace(/ArrowDown/g, "⬇");

/**
 * a key as markdown text: its ascii punctuation escaped, so eg `[` isn't read
 * as starting a link
 */
const formatShortcutKeyAsMarkdown = (key: string): string =>
  formatShortcutKey(key).replace(/[!-/:-@[-`{-~]/g, "\\$&");

export const formatShortcutKeysAsMarkdown = (
  shortcutKeys: ShortcutKeys,
): string => {
  const formattedKeys = shortcutKeys.map(formatShortcutKeyAsMarkdown);
  if (formattedKeys.length === 1) {
    return `key: **${formattedKeys[0]}**`;
  }
  return `keys: ${formattedKeys.map((k) => `**${k}**`).join(" or ")}`;
};

export const enhanceTooltipWithHotkeys = (
  tooltipContent: string | undefined,
  shortcutKeys: ShortcutKeys | undefined,
): string | undefined => {
  if (!shortcutKeys) {
    return tooltipContent;
  }

  const hotkeyText = formatShortcutKeysAsMarkdown(shortcutKeys);

  if (tooltipContent) {
    return `${tooltipContent}\n\n${hotkeyText}`;
  }

  return hotkeyText;
};
