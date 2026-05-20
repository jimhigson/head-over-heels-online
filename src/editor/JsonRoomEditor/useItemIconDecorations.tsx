import type * as Monaco from "monaco-editor";

import { findNodeAtLocation } from "jsonc-parser";
import { type editor } from "monaco-editor";
import { useEffect, useRef } from "preact/hooks";

import { type SceneryName } from "../../sprites/planets";
import { textureForItem } from "../../sprites/textureForItem";
import { useEditorAppSelector } from "../../store/store";
import { keys } from "../../utils/entries";
import { twClass } from "../../utils/twClass";
import { type EditorRoomJsonItems } from "../editorTypes";
import { selectCurrentEditingRoomJson } from "../slice/levelEditorSlice";
import { getParsedJsonFromEditor } from "./getParsedJsonFromEditor";
import { useLoadMonaco } from "./useLoadMonaco";

function* generateItemIconDecorations({
  editor,
  jsonItems,
  scenery,
  monaco,
}: {
  editor: editor.IStandaloneCodeEditor;
  jsonItems: EditorRoomJsonItems;
  scenery: SceneryName;
  monaco: typeof Monaco;
  //decorationsOptions: editor.IModelDecorationOptions;
}): Generator<editor.IModelDeltaDecoration, void, void> {
  const editorModel = editor.getModel();
  if (editorModel === null) {
    return;
  }

  const rootNode = getParsedJsonFromEditor(editor);

  if (rootNode === undefined) {
    return;
  }

  for (const selectedJsonItemId of keys(jsonItems)) {
    const node = findNodeAtLocation(rootNode, ["items", selectedJsonItemId]);

    if (node === undefined) {
      continue;
    }

    const { lineNumber, column } = editorModel.getPositionAt(node.offset);

    yield {
      range: new monaco.Range(lineNumber, column, lineNumber, column),
      options: {
        stickiness:
          monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
        glyphMarginClassName: twClass(
          // nb: texture name needs to not have a dot in it for this to work!
          `w-4 h-4 sprite ${textureForItem(jsonItems[selectedJsonItemId], scenery)} sprite-in-glyph-margin`,
        ),
      },
    };
  }
}

export const useItemIconDecorations = (
  editor: editor.IStandaloneCodeEditor | null,
): editor.IEditorDecorationsCollection | null => {
  const monaco = useLoadMonaco();
  const jsonItems = useEditorAppSelector(
    (state) => selectCurrentEditingRoomJson(state).items,
  );
  const scenery = useEditorAppSelector(
    (state) => selectCurrentEditingRoomJson(state).planet,
  );

  const collectionRef = useRef<editor.IEditorDecorationsCollection | null>(
    null,
  );

  useEffect(() => {
    if (editor === null || monaco === null) {
      return;
    }

    const decorations = [
      ...generateItemIconDecorations({
        editor,
        jsonItems,
        monaco,
        scenery,
      }),
    ];

    if (!collectionRef.current) {
      collectionRef.current = editor.createDecorationsCollection(decorations);
    } else {
      collectionRef.current.set(decorations); // replaces previous
    }
  }, [editor, jsonItems, monaco, scenery]);

  return collectionRef.current;
};
