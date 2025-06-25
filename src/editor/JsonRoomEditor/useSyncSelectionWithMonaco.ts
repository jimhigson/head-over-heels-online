import { useEffect, useRef } from "react";
import { startAppListening } from "../../store/listenerMiddleware";
import { setSelectedItemInRoom } from "../slice/levelEditorSlice";
import type { editor } from "monaco-editor";
import { parseTree, type ParseError, findNodeAtLocation } from "jsonc-parser";
import { useLoadMonaco } from "./useLoadMonaco";
import { twClass } from "../twClass";

export const useSyncSelectionWithMonaco = (
  editor: editor.IStandaloneCodeEditor | null,
) => {
  // select in monaco whenever the item selection in the store changes

  const monaco = useLoadMonaco();

  const collectionRef = useRef<editor.IEditorDecorationsCollection | null>(
    null,
  );

  useEffect(() => {
    if (editor === null || monaco === null) {
      return;
    }
    const unSub = startAppListening({
      actionCreator: setSelectedItemInRoom,
      effect(action, { getState }) {
        const { selectedJsonItemIds } = getState().levelEditor!;

        if (selectedJsonItemIds.length > 1 || action.payload.additive) {
          return;
        }
        // we have a single item selected
        const [singleSelectedJsonItemId] = selectedJsonItemIds;

        const editorModel = editor.getModel();
        if (editorModel === null) {
          return;
        }

        const editorText = editorModel?.getValue();

        if (editorText === undefined) {
          return;
        }
        // we have some editor text

        const errors: ParseError[] = [];
        const rootNode = parseTree(editorText, errors);

        if (rootNode === undefined) {
          return;
        }
        // we have a parsed json tree

        const node = findNodeAtLocation(rootNode, [
          "items",
          singleSelectedJsonItemId,
        ]);

        if (node === undefined) {
          return;
        }

        const { lineNumber: startLineNumber, column: startColumn } =
          editorModel.getPositionAt(node.offset);
        const { lineNumber: endLineNumber, column: endColumn } =
          editorModel.getPositionAt(node.offset + node.length);

        const decorationsOptions: editor.IModelDecorationOptions = {
          stickiness:
            monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
          inlineClassName: twClass("bg-metallicBlueHalfbrite"),
          hoverMessage: { value: `Selected item: ${singleSelectedJsonItemId}` },
        };

        const decorations = [
          {
            range: new monaco.Range(
              startLineNumber,
              startColumn,
              endLineNumber,
              endColumn,
            ),
            options: decorationsOptions,
          },
        ];

        if (!collectionRef.current) {
          collectionRef.current =
            editor.createDecorationsCollection(decorations);
        } else {
          collectionRef.current.set(decorations); // replaces previous
        }

        editor.revealRangeInCenterIfOutsideViewport(
          new monaco.Range(
            startLineNumber,
            startColumn,
            endLineNumber,
            endColumn,
          ),
          monaco.editor.ScrollType.Smooth,
        );
      },
    });

    return unSub;
  }, [editor, monaco]);
};
