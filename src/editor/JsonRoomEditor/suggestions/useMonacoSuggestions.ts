import { findNodeAtOffset, getLocation, parseTree } from "jsonc-parser";
import { useEffect } from "react";

import { store } from "../../../store/store";
import {
  type RootStateWithLevelEditorSlice,
  selectCurrentEditingRoomJson,
} from "../../slice/levelEditorSlice";
import { useLoadMonaco } from "../useLoadMonaco";
import { getNodeAncestors } from "./getNodeAncestors";
import { suggestionPatterns } from "./suggestionPatterns";
import { findMatchingPattern } from "./suggestionsPatternMatching";

/**
 * suggest room ids when editing toRoom, roomAbove, or roomBelow properties
 */
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

        if (isAtPropertyKey) {
          return { suggestions: [] };
        }

        // Parse the tree to get nodes with parent references
        const tree = parseTree(editorText);
        const currentNode = tree ? findNodeAtOffset(tree, offset) : undefined;

        const nodeAncestors = getNodeAncestors(currentNode);

        const suggestionGenerator = findMatchingPattern(
          suggestionPatterns,
          // note - reverse the path so that it is consistent with the order in nodeAncestors.
          // The array will now start with the leaf, and end at the root
          path.toReversed(),
          nodeAncestors,
        );

        if (suggestionGenerator) {
          const wordInfo = editorModel.getWordAtPosition(position);
          const storeState = store.getState() as RootStateWithLevelEditorSlice;

          // Get suggestions from the matched pattern's callback
          const currentRoomJson = selectCurrentEditingRoomJson(storeState);
          const suggestionStrings = suggestionGenerator(
            storeState,
            currentRoomJson,
            ...nodeAncestors,
          );

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

          // Check if we're in an array context
          const [, parentNode] = nodeAncestors;
          const isInArray = parentNode?.type === "array";

          return {
            suggestions: suggestionStrings.map((suggestion) => {
              const insertText = `${insertQuoteBefore ? '"' : ""}${suggestion}${insertQuoteAfter ? '"' : ""}${insertQuoteAfter && isInArray ? "," : ""}`;

              return {
                label: suggestion,
                kind: monaco.languages.CompletionItemKind.Reference,
                insertText,
                insertTextRules:
                  monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: {
                  startLineNumber: lineNumber,
                  startColumn,
                  endLineNumber: position.lineNumber,
                  endColumn,
                },
              };
            }),
          };
        } else {
          return { suggestions: [] };
        }
      },
    });
  }, [monaco]);
};
