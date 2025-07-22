import { useEffect, useRef } from "react";
import { startAppListening } from "../../store/listenerMiddleware";
import {
  selectCurrentEditingRoomJson,
  type RootStateWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import type { editor } from "monaco-editor";
import { store } from "../../store/store";
import { getLocation, parseTree, findNodeAtLocation } from "jsonc-parser";
import { useLoadMonaco } from "./useLoadMonaco";
import type { Monaco } from "@monaco-editor/react";

const updateTextNow = (
  editor: editor.IStandaloneCodeEditor,
  state: RootStateWithLevelEditorSlice,
  monaco: Monaco | null,
) => {
  const roomJson = selectCurrentEditingRoomJson(state);

  if (roomJson === undefined) {
    editor.setValue("");
    return;
  }

  const stringifiedJson = JSON.stringify(roomJson, null, 2);

  if (editor.getValue() === stringifiedJson) {
    return;
  }

  // text has changes - get where the cursor is in the json now:
  const editorModel = editor.getModel();

  if (editorModel === null) {
    return;
  }

  // Get the current cursor position and text
  const currentPosition = editor.getPosition();
  const currentText = editor.getValue();

  if (!currentPosition) {
    editor.setValue(stringifiedJson);
    return;
  }

  // Get the json path at the current monaco cursor position
  const offset = editorModel.getOffsetAt(currentPosition);
  const { path } = getLocation(currentText, offset);

  // Set the new value
  editor.setValue(stringifiedJson);

  // Try to restore cursor position to the same JSON path
  if (path.length > 0) {
    const newRootNode = parseTree(stringifiedJson);
    if (newRootNode) {
      const targetNode = findNodeAtLocation(newRootNode, path);

      if (targetNode) {
        // Found the same path in the new JSON, restore cursor there
        const newPosition = editorModel.getPositionAt(targetNode.offset);
        editor.setPosition(newPosition);

        // Use smooth scrolling if monaco is available
        if (monaco) {
          editor.revealPositionInCenterIfOutsideViewport(
            newPosition,
            monaco.editor.ScrollType.Smooth,
          );
        } else {
          editor.revealPositionInCenter(newPosition);
        }
      } else {
        // Path not found, try to find the closest parent path
        for (let i = path.length - 1; i > 0; i--) {
          const parentPath = path.slice(0, i);
          const parentNode = findNodeAtLocation(newRootNode, parentPath);

          if (parentNode) {
            const newPosition = editorModel.getPositionAt(parentNode.offset);
            editor.setPosition(newPosition);

            // Use smooth scrolling if monaco is available
            if (monaco) {
              editor.revealPositionInCenterIfOutsideViewport(
                newPosition,
                monaco.editor.ScrollType.Smooth,
              );
            } else {
              editor.revealPositionInCenter(newPosition);
            }
            break;
          }
        }
      }
    }
  }
};

export const useUpdateJsonTextWhenStoreChanges = (
  editor: editor.IStandaloneCodeEditor | null,
) => {
  const monaco = useLoadMonaco();
  const initialised = useRef(false);

  // initial setting of editor state:
  useEffect(() => {
    if (editor === null) {
      return;
    }

    if (initialised.current) {
      return;
    }

    updateTextNow(
      editor,
      store.getState() as RootStateWithLevelEditorSlice,
      monaco,
    );

    initialised.current = true;
  }, [editor, monaco]);

  // set editor state every time the store changes:
  useEffect(() => {
    if (editor === null) {
      return;
    }

    const unSub = startAppListening({
      // predicate is any time the json for the room has changed:
      predicate(action, currentState, originalState) {
        return (
          selectCurrentEditingRoomJson(
            currentState as RootStateWithLevelEditorSlice,
          ) !==
          selectCurrentEditingRoomJson(
            originalState as RootStateWithLevelEditorSlice,
          )
        );
      },
      effect(action, { getState }) {
        updateTextNow(
          editor,
          getState() as RootStateWithLevelEditorSlice,
          monaco,
        );
      },
    });

    return unSub;
  }, [editor, monaco]);
};
