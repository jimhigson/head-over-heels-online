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

      let parsedJson;
      try {
        parsedJson = JSON.parse(text);
      } catch (_e) {
        console.warn("Text in editor: does not parse as JSON. not dispatching");
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

      // Check if the JSON has validation errors from the schema
      /*
      const model = editor.getModel();
      if (model && monaco) {
        const markers = monaco.editor.getModelMarkers({ resource: model.uri });

        console.log("Markers:", markers);

        const hasErrors = markers.some(
          (marker) => marker.severity === monaco.MarkerSeverity.Error,
        );

        if (hasErrors) {
          console.warn("JSON has schema validation errors, not dispatching.");
          // Don't update the state if there are schema validation errors
          return;
        } else {
          console.log("no errors");
        }
      }*/

      dispatch(roomJsonEdited(parsedJson as EditorRoomJson));
    },
    [editor, roomJson, ajvValidate, dispatch],
  );
};
