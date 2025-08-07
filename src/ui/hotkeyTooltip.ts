import type { ShortcutKeys } from "./useKeyboardShortcut";

const formatShortcutKey = (key: string): string => {
  // Convert modifier symbols and keys to display format
  return key
    .replace(/ArrowLeft/g, "⬅")
    .replace(/ArrowRight/g, "➡")
    .replace(/ArrowUp/g, "⬆")
    .replace(/ArrowDown/g, "⬇");
};

const generateHotkeyText = (shortcutKeys: ShortcutKeys): string => {
  const formattedKeys = shortcutKeys.map(formatShortcutKey);
  if (formattedKeys.length === 1) {
    return `\n\nHotkey: **${formattedKeys[0]}**`;
  }
  // Multiple shortcuts
  return `\n\nHotkeys: ${formattedKeys.map((k) => `**${k}**`).join(" or ")}`;
};

/**
 * Generates or enhances tooltip content with hotkey information
 */
export const enhanceTooltipWithHotkeys = (
  /**
   * The original tooltip content, if any
   */
  tooltipContent: string | undefined,
  /**
   * The shortcut keys to display
   */
  shortcutKeys: ShortcutKeys | undefined,
): string | undefined => {
  if (!shortcutKeys) {
    return tooltipContent;
  }

  if (tooltipContent) {
    // Append to existing tooltip
    return `${tooltipContent}${generateHotkeyText(shortcutKeys)}`;
  }

  // Create tooltip with just hotkey info
  const formattedKeys = shortcutKeys.map(formatShortcutKey);
  return formattedKeys.length === 1 ?
      `Hotkey: **${formattedKeys[0]}**`
    : `Hotkeys: ${formattedKeys.map((k) => `**${k}**`).join(" or ")}`;
};
