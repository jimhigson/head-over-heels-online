import type { Monaco } from "@monaco-editor/react";
import type { editor } from "monaco-editor";

import { findNodeAtLocation, getLocation, parseTree } from "jsonc-parser";
import { useEffect, useRef } from "react";

import { store } from "../../store/store";
import {
  type RootStateWithLevelEditorSlice,
  selectCurrentEditingRoomJson,
  useAppSelectorWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { useLoadMonaco } from "./useLoadMonaco";

const updateTextNow = (
  editor: editor.IStandaloneCodeEditor,
  state: RootStateWithLevelEditorSlice,
  monaco: Monaco | null,
) => {
  if (!monaco) {
    return;
  }

  const roomJson = selectCurrentEditingRoomJson(state);
  const { currentlyEditingRoomId } = state.levelEditor;

  if (roomJson === undefined || !currentlyEditingRoomId) {
    return;
  }

  // Get the model for this specific room
  const modelUri = monaco.Uri.parse(`${currentlyEditingRoomId}.json`);
  const model = monaco.editor.getModel(modelUri);

  if (!model) {
    return;
  }

  const stringifiedJson = JSON.stringify(roomJson, null, 2);

  if (model.getValue() === stringifiedJson) {
    return;
  }

  // Check if this model is currently being edited
  const isCurrentlyActive = editor.getModel() === model;

  // Get current text before updating
  const currentText = model.getValue();

  // If this is the active model, capture cursor position before updating
  let cursorPath: (number | string)[] = [];
  if (isCurrentlyActive) {
    const currentPosition = editor.getPosition();
    if (currentPosition) {
      // Get the json path at the current monaco cursor position
      const offset = model.getOffsetAt(currentPosition);
      const location = getLocation(currentText, offset);
      cursorPath = location.path;
    }
  }

  // Always update the model text to keep it in sync
  model.setValue(stringifiedJson);

  // If this is the active model and we had a cursor position, try to keep the cursor position
  // (relative to the json) the same
  if (isCurrentlyActive && cursorPath.length > 0) {
    // Try to restore cursor position to the same JSON path
    const newRootNode = parseTree(stringifiedJson);
    if (newRootNode) {
      const targetNode = findNodeAtLocation(newRootNode, cursorPath);

      if (targetNode) {
        // Found the same path in the new JSON, restore cursor there
        const newPosition = model.getPositionAt(targetNode.offset);
        editor.setPosition(newPosition);

        // Use smooth scrolling
        editor.revealPositionInCenterIfOutsideViewport(
          newPosition,
          monaco.editor.ScrollType.Smooth,
        );
      } else {
        // Path not found, try to find the closest parent path
        for (let i = cursorPath.length - 1; i > 0; i--) {
          const parentPath = cursorPath.slice(0, i);
          const parentNode = findNodeAtLocation(newRootNode, parentPath);

          if (parentNode) {
            const newPosition = model.getPositionAt(parentNode.offset);
            editor.setPosition(newPosition);

            editor.revealPositionInCenterIfOutsideViewport(
              newPosition,
              monaco.editor.ScrollType.Smooth,
            );
            break;
          }
        }
      }
    }
  }
};

const useUpdateTextWhenJsonChangesInSameRoom = (
  editor: editor.IStandaloneCodeEditor | null,
  monaco: Monaco | null,
) => {
  const currentRoomJson = useAppSelectorWithLevelEditorSlice(
    selectCurrentEditingRoomJson,
  );
  const currentlyEditingRoomId = useAppSelectorWithLevelEditorSlice(
    (state) => state.levelEditor.currentlyEditingRoomId,
  );
  const previousRoomIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (editor === null || !currentRoomJson || !currentlyEditingRoomId) {
      return;
    }

    const roomChanged =
      previousRoomIdRef.current !== undefined &&
      previousRoomIdRef.current !== currentlyEditingRoomId;
    // Check if room ID changed - if so, don't update text
    // (the document switching is handled by useCreateDocumentsInMonacoWhenCurrentRoomChanges)
    if (roomChanged) {
      previousRoomIdRef.current = currentlyEditingRoomId;
      return;
    }

    previousRoomIdRef.current = currentlyEditingRoomId;

    const state = store.getState() as RootStateWithLevelEditorSlice;
    updateTextNow(editor, state, monaco);
  }, [editor, monaco, currentRoomJson, currentlyEditingRoomId]);
};

/**
 * @warn ⚠️ KNOWN ISSUE HERE: this can't detect the id of the current room being updated
 * and detects that as a change to a different room
 * however:
 *      * edits to the room's id are quite rare
 *      * not clear how to fix this since ids are ids
 */
const useCreateDocumentsInMonacoWhenCurrentRoomChanges = (
  monaco: Monaco | null,
) => {
  const currentlyEditingRoomId = useAppSelectorWithLevelEditorSlice(
    (state) => state.levelEditor.currentlyEditingRoomId,
  );

  useEffect(() => {
    if (!monaco) {
      return;
    }

    // Check if a model already exists for this room
    const modelUri = monaco.Uri.parse(
      // this is the monaco recommended way:
      //`inmemory://model/${currentlyEditingRoomId}`,
      // but this is simpler:
      `${currentlyEditingRoomId}.json`,
    );
    const existingModel = monaco.editor.getModel(modelUri);

    if (!existingModel) {
      // Create a new model for this room
      const state = store.getState() as RootStateWithLevelEditorSlice;
      const roomJson = selectCurrentEditingRoomJson(state);
      const content = roomJson ? JSON.stringify(roomJson, null, 2) : "";

      monaco.editor.createModel(content, "json", modelUri);
    } else {
      // Update existing model's content
      const state = store.getState() as RootStateWithLevelEditorSlice;
      const roomJson = selectCurrentEditingRoomJson(state);
      const content = roomJson ? JSON.stringify(roomJson, null, 2) : "";

      existingModel.setValue(content);
    }
  }, [monaco, currentlyEditingRoomId]);
};

export const useUpdateJsonTextWhenStoreChanges = (
  editor: editor.IStandaloneCodeEditor | null,
) => {
  const monaco = useLoadMonaco();

  // update text in editor model for existing document when the current room's contents change::
  useUpdateTextWhenJsonChangesInSameRoom(editor, monaco);
  // create new documents when we open rooms we haven't edited before:
  useCreateDocumentsInMonacoWhenCurrentRoomChanges(monaco);
};
