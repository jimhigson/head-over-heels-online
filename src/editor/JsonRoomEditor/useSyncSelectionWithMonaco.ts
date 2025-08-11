import { useEffect, useRef, useState } from "react";
import { useAppSelectorWithLevelEditorSlice } from "../slice/levelEditorSlice";
import type { editor } from "monaco-editor";
import { parseTree, type Node, findNodeAtLocation } from "jsonc-parser";
import { useLoadMonaco } from "./useLoadMonaco";
import { twClass } from "../twClass";
import type { EditorRoomItemId } from "../editorTypes";
import type { Monaco } from "@monaco-editor/react";

const useMonacoEditorText = (
  editor: editor.IStandaloneCodeEditor | null,
): string | undefined => {
  const [text, setText] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!editor) {
      setText(undefined);
      return;
    }

    // Get initial value
    setText(editor.getValue());

    // Listen for changes
    const disposable = editor.onDidChangeModelContent(() => {
      setText(editor.getValue());
    });

    return () => disposable.dispose();
  }, [editor]);

  return text;
};

export const useSyncStoreItemSelectionToMonacoDecorations = (
  editor: editor.IStandaloneCodeEditor | null,
) => {
  // select matching text in monaco whenever the item selection in the store changes
  const monaco = useLoadMonaco();

  const collectionRef = useRef<editor.IEditorDecorationsCollection | null>(
    null,
  );

  function* generateDecorationsForSelectedItems({
    rootNode,
    editorModel,
    selectedJsonItemIds,
    monaco,
  }: {
    rootNode: Node;
    editorModel: editor.ITextModel;
    selectedJsonItemIds: EditorRoomItemId[];
    monaco: Monaco;
  }) {
    const decorationsOptions: editor.IModelDecorationOptions = {
      stickiness:
        monaco.editor.TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges,
      blockClassName: twClass("editor-selected"),
    };

    for (const selectedJsonItemId of selectedJsonItemIds) {
      const node = findNodeAtLocation(rootNode, ["items", selectedJsonItemId]);

      if (node === undefined) {
        continue;
      }

      const { lineNumber: startLineNumber, column: startColumn } =
        editorModel.getPositionAt(node.offset);
      const { lineNumber: endLineNumber, column: endColumn } =
        editorModel.getPositionAt(node.offset + node.length);

      yield {
        range: new monaco.Range(
          startLineNumber,
          startColumn,
          endLineNumber,
          endColumn,
        ),
        options: decorationsOptions,
      };
    }
  }

  const selectedJsonItemIds = useAppSelectorWithLevelEditorSlice(
    (state) => state.levelEditor.selectedJsonItemIds,
  );

  // we also want to update decorations whe the text changes
  // to keep the decorations in sync with the changing text
  // since the changes could have moved the text around in
  // a way the the decorations can't track (like complete
  // replacement of the json)
  const editorText = useMonacoEditorText(editor);

  // sync store item selection -> monaco caret/decorations
  // (blue bar on left, not the little icons)
  useEffect(() => {
    if (editor === null || monaco === null) {
      return;
    }

    const editorModel = editor.getModel();
    if (editorModel === null) {
      return;
    }

    if (editorText === undefined) {
      return;
    }
    // we have some editor text

    const rootNode = parseTree(editorText);

    if (rootNode === undefined) {
      return;
    }

    const decorations = [
      ...generateDecorationsForSelectedItems({
        rootNode,
        editorModel,
        selectedJsonItemIds,
        monaco,
      }),
    ];

    if (!collectionRef.current) {
      collectionRef.current = editor.createDecorationsCollection(decorations);
    } else {
      collectionRef.current.set(decorations); // replaces previous
    }

    if (
      decorations.length > 0 &&
      // only change position while not editing - this can be quite annoying!
      !editor.hasTextFocus()
    ) {
      // go to the end of the array for the most recently selected (probably)
      const rangeToReveal = decorations.at(-1)!.range;
      editor.revealRangeInCenterIfOutsideViewport(
        rangeToReveal,
        monaco.editor.ScrollType.Smooth,
      );
    }
  }, [editor, editorText, monaco, selectedJsonItemIds]);
};
