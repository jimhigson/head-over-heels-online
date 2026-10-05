import { debounce } from "@github/mini-throttle";
import { type OnChange } from "@monaco-editor/react";
import { type editor } from "monaco-editor";
import nanoEqual from "nano-equal";
import { useMemo } from "preact/hooks";

import { editorStore, store } from "../../store/store";
import { selectCurrentCommittedRoomJsonFromLevelEditorState } from "../slice/levelEditorSelectors";
import { roomJsonEdited } from "../slice/levelEditorSlice";
import { validateRoomJson } from "../validateRoomJson";
import { fixJson } from "./fixJson";

// performance is fine without a debounce, but it can be annoying
// if the editor changes during typing:
const debounceMs = 1_000;

const parseJsonWithCorrection = (text: string): object | undefined => {
  let parsedJson;
  try {
    parsedJson = JSON.parse(text);
  } catch (_e) {
    try {
      // since the fixing can be destructive, only use it if the text is not valid JSON,
      // and it makes it valid:
      parsedJson = JSON.parse(fixJson(text));
    } catch (_e2) {
      return undefined;
    }
  }
  return parsedJson;
};

export const useUpdateStoreWhenJsonEdited = (
  editor: editor.IStandaloneCodeEditor | null,
) => {
  return useMemo<OnChange>(() => {
    return debounce(
      (text: string | undefined, _ev: editor.IModelContentChangedEvent) => {
        const levelEditorState = editorStore.getState().levelEditor;
        const roomJson =
          selectCurrentCommittedRoomJsonFromLevelEditorState(levelEditorState);

        if (text === undefined || !editor) {
          return;
        }

        const parsedJson = parseJsonWithCorrection(text);

        if (parsedJson === undefined) {
          console.warn(
            "Text in editor: is not valid JSON, even after correction",
          );
          return;
        }

        if (nanoEqual(parsedJson, roomJson)) {
          console.warn(
            "Text in editor: after JSON parse is equal to current roomJson. not dispatching",
          );
          return;
        }

        /* checking monaco markers is not effective. They are added asynchronously
         * and not available immediately after the text change. Use ajv instead.
         */
        if (!validateRoomJson(parsedJson)) {
          console.warn(
            "Text in editor: after JSON parse, does not match schema. Not dispatching.",
            validateRoomJson.errors,
          );
          return;
        }

        if (parsedJson.id !== roomJson.id) {
          // it is ok to change the id of the room, but not over the top of another room's id:
          if (
            levelEditorState.campaignInProgress.rooms[parsedJson.id] !==
            undefined
          ) {
            console.warn(
              "Edit to room id would overwrite another room, not populating.",
            );
            return;
          }
        }

        store.dispatch(
          roomJsonEdited({ roomJson: parsedJson, timestamp: Date.now() }),
        );
      },
      debounceMs,
    );
  }, [editor]);
};
