import { useEffect } from "preact/hooks";

import { editorStore } from "../../store/store";
import {
  isInNoKeyboardShortcutsArea,
  keyboardEventMatchesShortcutKeys,
} from "../../ui/useKeyboardShortcut";
import { valuesIter } from "../../utils/entries";
import { commandDefinitions } from "./commandDefinitions";
import { type EditorCommand, resolveCommandDefinition } from "./EditorCommand";
import { runCommand } from "./runCommand";
import { selectCommandIsAvailable } from "./selectCommandIsAvailable";

/**
 * runs the editor's commands from their shortcut keys, wherever (or whether)
 * they are shown. Where commands share a key, the first available one runs -
 * so a key can fall back to another command while its first is unavailable
 */
export const useCommandShortcuts = () => {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (isInNoKeyboardShortcutsArea(event, window)) {
        return;
      }
      const state = editorStore.getState();
      const matchingCommands = valuesIter(commandDefinitions)
        .map((commandDefinition) =>
          resolveCommandDefinition<EditorCommand>(commandDefinition, state),
        )
        .filter(
          ({ shortcutKeys }) =>
            shortcutKeys !== undefined &&
            keyboardEventMatchesShortcutKeys(event, shortcutKeys),
        )
        .toArray();
      if (matchingCommands.length === 0) {
        return;
      }
      // even when unavailable, so the browser doesn't act on the keys instead (eg save the page):
      event.preventDefault();
      const availableCommand = matchingCommands.find((command) =>
        selectCommandIsAvailable(command, state),
      );
      if (availableCommand !== undefined) {
        runCommand(availableCommand);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);
};
