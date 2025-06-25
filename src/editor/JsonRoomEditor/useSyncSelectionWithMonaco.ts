import { useEffect, useRef } from "react";
import { startAppListening } from "../../store/listenerMiddleware";
import { setSelectedItemInRoom } from "../slice/levelEditorSlice";
import type { editor } from "monaco-editor";
import {
  parseTree,
  type ParseError,
  findNodeAtLocation,
  getLocation,
} from "jsonc-parser";
import { useLoadMonaco } from "./useLoadMonaco";
import { twClass } from "../twClass";
import { useAppDispatch } from "../../store/hooks";
import type { AnyRoomJson } from "../../model/RoomJson";
import type { EditorRoomItemId } from "../EditorRoomId";

export const useSyncSelectionWithMonaco = (
  editor: editor.IStandaloneCodeEditor | null,
) => {
  // select in monaco whenever the item selection in the store changes

  const monaco = useLoadMonaco();

  const collectionRef = useRef<editor.IEditorDecorationsCollection | null>(
    null,
  );

  const dispatch = useAppDispatch();

  // sync monaco caret -> store selection
  useEffect(() => {
    if (editor === null || monaco === null) {
      return;
    }

    const disposable = editor.onDidChangeCursorPosition((e) => {
      const editorModel = editor.getModel();

      if (editorModel === null) {
        return;
      }

      const offset = editorModel.getOffsetAt(e.position);

      const editorText = editorModel?.getValue();

      if (editorText === undefined) {
        return;
      }
      // we have some editor text

      const rootNode = parseTree(editorText);
      if (rootNode === undefined) {
        return;
      }
      const { path } = getLocation(editorText, offset);
      if (path.length < 2) {
        return;
      }

      if (path[0] === ("items" satisfies keyof AnyRoomJson)) {
        const [, jsonItemId] = path;
        dispatch(
          setSelectedItemInRoom({
            additive: false,
            jsonItemId: jsonItemId as EditorRoomItemId,
          }),
        );
      }
    });

    return disposable.dispose;
  }, [dispatch, editor, monaco]);

  // sync store -> monaco selection
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
            monaco.editor.TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges,
          blockClassName: twClass("border-l-1 border-metallicBlue"),

          glyphMarginHoverMessage: {
            value: `Selected item: ${singleSelectedJsonItemId}`,
          },
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
