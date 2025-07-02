import { useEffect } from "react";
import { useLoadMonaco } from "./useLoadMonaco";
import { getLocation } from "jsonc-parser";
import type { RootStateWithLevelEditorSlice } from "../slice/levelEditorSlice";
import { store } from "../../store/store";
import type { AnyRoomJson } from "../../model/RoomJson";
import type { ItemInPlayConfig } from "../../model/ItemInPlay";

export const useMonacoSuggestions = () => {
  const monaco = useLoadMonaco();

  useEffect(() => {
    if (monaco === null) {
      return;
    }

    // Suggest room ids:
    monaco.languages.registerCompletionItemProvider("json", {
      triggerCharacters: [":", '"'],
      provideCompletionItems(editorModel, position) {
        const editorText = editorModel.getValue();
        const offset = editorModel.getOffsetAt(position);

        const { path, isAtPropertyKey } = getLocation(editorText, offset);

        const lastPathSegment = path.at(-1);
        const isRoomIdProperty =
          lastPathSegment ===
            ("toRoom" satisfies keyof ItemInPlayConfig<"teleporter">) ||
          lastPathSegment === ("roomAbove" satisfies keyof AnyRoomJson) ||
          lastPathSegment === ("roomBelow" satisfies keyof AnyRoomJson);

        const isEditingToRoomValue = isRoomIdProperty && !isAtPropertyKey;

        if (isEditingToRoomValue) {
          const wordInfo = editorModel.getWordAtPosition(position);

          const storeState = store.getState() as RootStateWithLevelEditorSlice;

          const { lineNumber } = position;
          const startColumn = wordInfo?.startColumn ?? position.column;
          const endColumn = wordInfo?.endColumn ?? position.column;

          // Get the line text to check for surrounding quotes
          const lineContent = editorModel.getLineContent(lineNumber);
          // Monaco columns are 1-based, but string indexing is 0-based
          const charBefore =
            startColumn > 1 ? lineContent[startColumn - 2] : "";
          const charAfter =
            endColumn <= lineContent.length ? lineContent[endColumn - 1] : "";

          const insertQuoteBefore = charBefore !== '"';
          const insertQuoteAfter = charAfter !== '"';

          return {
            suggestions: Object.keys(
              storeState.levelEditor.campaignInProgress.rooms,
            )
              // filter out the current room's own id:
              .filter(
                (roomId) =>
                  roomId !== storeState.levelEditor.currentlyEditingRoomId,
              )
              .map((roomId) => ({
                label: roomId,
                kind: monaco.languages.CompletionItemKind.Reference,
                insertText: `${insertQuoteBefore ? '"' : ""}${roomId}${insertQuoteAfter ? '"' : ""}`,
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: {
                  startLineNumber: lineNumber,
                  startColumn,
                  endLineNumber: position.lineNumber,
                  endColumn,
                },
              })),
          };
        } else {
          return { suggestions: [] };
        }
      },
    });
  }, [monaco]);
};
