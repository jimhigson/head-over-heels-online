import { useEffect } from "react";
import type { Key } from "../../game/input/keys";

// Valid modifier combinations (no duplicates allowed)
type ValidModifiers =
  | "" // no modifiers
  | "^" // just ctrl
  | "⌘" // just cmd
  | "⇧" // just shift
  | "^⇧" // ctrl+shift
  | "⌘⇧" // cmd+shift
  | "^⌘" // ctrl+cmd (unusual but valid)
  | "^⌘⇧"; // ctrl+cmd+shift (unusual but valid)

/**
 * A single shortcut key combination
 *  * '^s' for Ctrl+S
 *  * '⌘s' for Cmd+S
 *  * '⇧s' for shift+s
 *  * '⌘⇧s' for cmd+shift+s
 *  * 's' for pressing 's' with no modifier
 */
type SingleShortcut = `${ValidModifiers}${Key}`;

export type ShortcutKeys = SingleShortcut[];
const shortcutKeyRegex = /^(?<modifiers>[⇧⌘^]*)(?<key>.+)$/;
// Helper to check for duplicate modifiers
const hasDuplicateModifiers = (modifiers: string): boolean => {
  const seen = new Set<string>();
  for (const char of modifiers) {
    if (seen.has(char)) return true;
    seen.add(char);
  }
  return false;
};
export const useKeyboardShortcut = (
  shortcutKeys: ShortcutKeys | undefined,
  disabled: boolean,
  onClick: (() => void) | undefined,
) => {
  const shortcutKeysString = shortcutKeys?.join(" ");

  useEffect(() => {
    if (!shortcutKeys || shortcutKeys.length === 0) return;

    const handleKeydown = (event: KeyboardEvent) => {
      // Check if the event is coming from Monaco editor
      const target = event.target as HTMLElement;
      const isMonacoEditor = target.closest(".monaco-editor") !== null;

      // If Monaco editor has focus, let it handle the event
      if (isMonacoEditor) {
        return;
      }

      for (const shortcut of shortcutKeys) {
        const match = shortcut.match(shortcutKeyRegex);
        if (!match || !match.groups) continue;

        const { modifiers, key } = match.groups;

        // Skip shortcuts with duplicate modifiers
        if (hasDuplicateModifiers(modifiers)) {
          console.warn(`Invalid shortcut "${shortcut}": duplicate modifiers`);
          continue;
        }

        // Parse which modifiers are required
        const requiredCtrl = modifiers.includes("^");
        const requiredCmd = modifiers.includes("⌘");
        const requiredShift = modifiers.includes("⇧");
        const hasAnyModifier = requiredCtrl || requiredCmd || requiredShift;

        // Check if current key state matches requirements
        const modifierMatches =
          requiredCtrl === event.ctrlKey &&
          requiredCmd === event.metaKey &&
          requiredShift === event.shiftKey &&
          // If no modifiers are required, ensure none are pressed
          (hasAnyModifier ||
            (!event.ctrlKey && !event.metaKey && !event.shiftKey));

        if (event.key.toLowerCase() === key.toLowerCase() && modifierMatches) {
          if (!disabled) {
            onClick?.();
          }
          // still prevent the default if we are disabled (eg, don't allow the browser
          // to show a 'save as' dialog, or use other default behaviour for shortcuts)
          event.preventDefault();
          break;
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, onClick, shortcutKeysString]);
};
