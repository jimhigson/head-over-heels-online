import { type Node, parseTree } from "jsonc-parser";
import type { editor } from "monaco-editor";

export function getParsedJsonFromEditor(
  editor: editor.IStandaloneCodeEditor | null,
): Node | undefined {
  if (editor === null) {
    return undefined;
  }
  const editorModel = editor.getModel();
  if (editorModel === null) {
    return undefined;
  }

  const editorText = editorModel.getValue();

  if (editorText === undefined) {
    return undefined;
  }
  // we have some editor text
  const rootNode = parseTree(editorText);

  if (rootNode === undefined) {
    return undefined;
  }

  return rootNode;
}
