import { useEffect } from "react";

import type { Key } from "../game/input/keys";

// Valid modifier combinations (no duplicates allowed)
type ValidModifiers =
  | "" // no modifiers
  | "^" // just ctrl
  | "^⇧" // ctrl+shift
  | "^⌘" // ctrl+cmd (unusual but valid)
  | "^⌘⇧" // ctrl+cmd+shift (unusual but valid)
  | "^⌘⌥" // ctrl+cmd+alt
  | "^⌘⌥⇧" // ctrl+cmd+alt+shift
  | "^⌥" // ctrl+alt
  | "^⌥⇧" // ctrl+alt+shift
  | "⇧" // just shift
  | "⌘" // just cmd
  | "⌘⇧" // cmd+shift
  | "⌘⌥" // cmd+alt
  | "⌘⌥⇧" // cmd+alt+shift
  | "⌥" // just alt/option
  | "⌥⇧"; // alt+shift

/**
 * A single shortcut key combination
 *  * '^s' for Ctrl+S
 *  * '⌘s' for Cmd+S
 *  * '⇧s' for shift+s
 *  * '⌥s' for alt/option+s
 *  * '⌘⇧s' for cmd+shift+s
 *  * 's' for pressing 's' with no modifier
 */
type SingleShortcut = `${ValidModifiers}${Key}`;

export type ShortcutKeys = SingleShortcut[];
const shortcutKeyRegex = /^(?<modifiers>[⇧⌘^⌥]*)(?<key>.+)$/;

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
  run: (() => void) | undefined,
  /**
   * The element to listen to for keyboard events (defaults to window)
   *
   * null means 'do not add' (eg, waiting for a value in a ref'
   * undefined means 'use the window'
   */
  element: HTMLElement | null | undefined | Window = undefined,
) => {
  // joining the string will mean the result is stable even if the array
  // is passed inline (changes on every render)
  const shortcutKeysString = shortcutKeys?.join(" ");

  useEffect(() => {
    if (!shortcutKeys || shortcutKeys.length === 0) return;

    if (element === null) {
      return;
    }

    const target = element ?? window;

    const handleKeydown = (event: KeyboardEvent) => {
      // Check if the event is coming from an area where shortcuts are disabled
      const eventTarget = event.target as HTMLElement;

      // Walk up the DOM tree looking for .no-keyboard-shortcuts
      // Stop when we reach the element we're listening to (or window)
      let currentElement: HTMLElement | null = eventTarget;
      while (currentElement && currentElement !== target) {
        if (currentElement.classList.contains("no-keyboard-shortcuts")) {
          return;
        }
        currentElement = currentElement.parentElement;
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
        const requiredAlt = modifiers.includes("⌥");
        const hasAnyModifier =
          requiredCtrl || requiredCmd || requiredShift || requiredAlt;

        // Check if current key state matches requirements
        const modifierMatches =
          requiredCtrl === event.ctrlKey &&
          requiredCmd === event.metaKey &&
          requiredShift === event.shiftKey &&
          requiredAlt === event.altKey &&
          // If no modifiers are required, ensure none are pressed
          (hasAnyModifier ||
            (!event.ctrlKey &&
              !event.metaKey &&
              !event.shiftKey &&
              !event.altKey));

        // When Alt is pressed on macOS, the key character can be modified
        // so we need to check the code instead
        const keyToCheck =
          requiredAlt && event.altKey ?
            event.code.replace(/^Key/, "").toLowerCase()
          : event.key.toLowerCase();

        if (keyToCheck === key.toLowerCase() && modifierMatches) {
          if (!disabled) {
            run?.();
          }
          // still prevent the default if we are disabled (eg, don't allow the browser
          // to show a 'save as' dialog, or use other default behaviour for shortcuts)
          event.preventDefault();
          break;
        }
      }
    };

    target.addEventListener("keydown", handleKeydown as EventListener);
    return () => {
      target.removeEventListener("keydown", handleKeydown as EventListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, run, shortcutKeysString, element]);
};
