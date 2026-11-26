import type { EditorCommandPresentation } from "../../../../../../editor/commands/EditorCommand";

/**
 * opens the room being played in the editor, from the in-game cmd-k menu
 */
export type OpenInEditorCommand = EditorCommandPresentation & {
  type: "openInEditor";
};

export const openInEditorCommandDefinitions = {
  openInEditor: {
    type: "openInEditor",
    label: "Open in editor",
    synonyms: ["edit room", "level editor"],
  },
} satisfies Record<string, OpenInEditorCommand>;
