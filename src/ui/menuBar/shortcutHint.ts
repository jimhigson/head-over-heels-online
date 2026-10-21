import { formatShortcutKey } from "../enhanceTooltipWithHotkeys";
import { type ShortcutKeys } from "../useKeyboardShortcut";

const isApplePlatform = /Mac|iPhone|iPad/.test(navigator.platform);

/**
 * the shortcut to show: the one using this platform's command key, if any
 */
export const shortcutHint = (shortcutKeys: ShortcutKeys): string => {
  const platformModifier = isApplePlatform ? "⌘" : "^";
  const otherModifier = isApplePlatform ? "^" : "⌘";
  const [firstShortcutKey] = shortcutKeys;
  return formatShortcutKey(
    shortcutKeys.find((key) => key.includes(platformModifier)) ??
      shortcutKeys.find((key) => !key.includes(otherModifier)) ??
      firstShortcutKey,
  );
};
