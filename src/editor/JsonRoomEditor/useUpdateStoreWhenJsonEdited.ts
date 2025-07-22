import type { OnChange } from "@monaco-editor/react";
import { useCallback, useState } from "react";
import type { editor } from "monaco-editor";
import nanoEqual from "nano-equal";
import { useCurrentEditingRoomJson } from "../slice/levelEditorSelectors";
import type { EditorRoomJson } from "../editorTypes";
import { roomJsonEdited } from "../slice/levelEditorSlice";
import { useAppDispatch } from "../../store/hooks";
import roomSchema from "../../_generated/room.schema.json";
import Ajv from "ajv";

/**
 * extremely basic JSON fixup to add quotes and remove trailing commas
 * This is not a full JSON parser, and will break if it detects these
 * features inside strings
 */
const fixJson = (text: string) =>
  text
    // quote unquoted keys
    .replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":')
    // remove trailing commas before closing brackets
    .replace(/,(\s*[}\]])/g, "$1");

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
  const roomJson = useCurrentEditingRoomJson();
  const dispatch = useAppDispatch();

  const [ajvValidate] = useState(() => new Ajv().compile(roomSchema));

  return useCallback<OnChange>(
    (text: string | undefined, _ev: editor.IModelContentChangedEvent) => {
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
      if (!ajvValidate(parsedJson)) {
        console.warn(
          "Text in editor: after JSON parse, does not match schema. Not dispatching.",
        );
        return;
      }

      dispatch(roomJsonEdited(parsedJson as EditorRoomJson));
    },
    [editor, roomJson, ajvValidate, dispatch],
  );
};
