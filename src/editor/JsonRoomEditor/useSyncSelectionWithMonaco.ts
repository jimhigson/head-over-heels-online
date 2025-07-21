import { useEffect, useRef } from "react";
import { startAppListening } from "../../store/listenerMiddleware";
import { setSelectedItemInRoom } from "../slice/levelEditorSlice";
import type { editor } from "monaco-editor";
import {
  parseTree,
  type Node,
  findNodeAtLocation,
  getLocation,
} from "jsonc-parser";
import { useLoadMonaco } from "./useLoadMonaco";
import { twClass } from "../twClass";
import { useAppDispatch } from "../../store/hooks";
import type { AnyRoomJson } from "../../model/RoomJson";
import type { EditorRoomItemId } from "../editorTypes";
import type { Monaco } from "@monaco-editor/react";

export const useSyncSelectionWithMonaco = (
  editor: editor.IStandaloneCodeEditor | null,
) => {
  // select matching text in monaco whenever the item selection in the store changes
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

      // const rootNode = parseTree(editorText);
      // if (rootNode === undefined) {
      //   return;
      // }
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

  function* generateDecorationsForSelectedItems({
    rootNode,
    editorModel,
    selectedJsonItemIds,
    monaco,
    decorationsOptions,
  }: {
    rootNode: Node;
    editorModel: editor.ITextModel;
    selectedJsonItemIds: EditorRoomItemId[];
    monaco: Monaco;
    decorationsOptions: editor.IModelDecorationOptions;
  }) {
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

  // sync store item selection -> monaco caret/decorations
  // (blue bar on left, not the little icons)
  useEffect(() => {
    if (editor === null || monaco === null) {
      return;
    }

    const decorationsOptions: editor.IModelDecorationOptions = {
      stickiness:
        monaco.editor.TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges,
      blockClassName: twClass("editor-selected"),
    };

    const unSub = startAppListening({
      actionCreator: setSelectedItemInRoom,
      effect(action, { getState }) {
        const { selectedJsonItemIds } = getState().levelEditor!;

        const editorModel = editor.getModel();
        if (editorModel === null) {
          return;
        }

        const editorText = editorModel?.getValue();

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
            decorationsOptions,
          }),
        ];

        if (!collectionRef.current) {
          collectionRef.current =
            editor.createDecorationsCollection(decorations);
        } else {
          collectionRef.current.set(decorations); // replaces previous
        }

        if (decorations.length > 0) {
          // go to the end of the array for the most recently selected (probably)
          const rangeToReveal = decorations.at(-1)!.range;
          editor.revealRangeInCenterIfOutsideViewport(
            rangeToReveal,
            monaco.editor.ScrollType.Smooth,
          );
        }
      },
    });

    return unSub;
  }, [editor, monaco]);
};
