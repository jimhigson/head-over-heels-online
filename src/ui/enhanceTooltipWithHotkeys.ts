import { type ShortcutKeys } from "./useKeyboardShortcut";

const formatShortcutKey = (key: string): string =>
  key
    .replace(/ArrowLeft/g, "⬅")
    .replace(/ArrowRight/g, "➡")
    .replace(/ArrowUp/g, "⬆")
    .replace(/ArrowDown/g, "⬇");

export const formatShortcutKeysAsMarkdown = (
  shortcutKeys: ShortcutKeys,
): string => {
  const formattedKeys = shortcutKeys.map(formatShortcutKey);
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
