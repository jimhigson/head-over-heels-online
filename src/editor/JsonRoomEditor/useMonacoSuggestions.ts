import { useEffect } from "react";
import { useLoadMonaco } from "./useLoadMonaco";
import {
  getLocation,
  parseTree,
  findNodeAtOffset,
  type Node,
} from "jsonc-parser";
import {
  selectCurrentEditingRoomJson,
  type RootStateWithLevelEditorSlice,
} from "../slice/levelEditorSlice";
import { store } from "../../store/store";
import { iterateRoomJsonItemsWithIds } from "../../model/RoomJson";
import { emptyArray, emptySet } from "../../utils/empty";
import type { JsonItemType } from "../../model/json/JsonItem";
import { iterate } from "../../utils/iterate";
import type { EditorRoomJson } from "../editorTypes";

/**
 * Get the value of a property from an object node
 */
const getNodeValue = (
  node: Node,
  propertyName: string,
): string | number | boolean | null | undefined => {
  if (node.type !== "object" || !node.children) {
    return undefined;
  }

  // Find the property node with the matching name
  const propertyNode = node.children.find((child) => {
    if (child.type === "property" && child.children?.[0]) {
      return child.children[0].value === propertyName;
    }
    return false;
  });

  // Return the value of the property (primitives only)
  if (propertyNode?.type === "property" && propertyNode.children?.[1]) {
    const [, valueNode] = propertyNode.children;
    return valueNode.value;
  }

  return undefined;
};

/**
 * Build an array of nodes from the given node up to the root
 */
const getNodeAncestors = (node: Node | undefined): Node[] => {
  const ancestors: Node[] = [];
  let current = node;
  while (current) {
    ancestors.push(current);
    current = current.parent;
  }
  return ancestors;
};

/**
 * Get all room IDs except the currently editing one
 */
const getOtherRoomIds = (
  storeState: RootStateWithLevelEditorSlice,
  _currentRoomJson: EditorRoomJson,
  ..._nodeAncestors: Node[]
): string[] =>
  Object.keys(storeState.levelEditor.campaignInProgress.rooms).filter(
    (roomId) => roomId !== storeState.levelEditor.currentlyEditingRoomId,
  );

/**
 * Patterns for property paths and their corresponding suggestion generators
 */
const suggestionPatterns: Record<
  string,
  (
    storeState: RootStateWithLevelEditorSlice,
    currentRoomJson: EditorRoomJson,
    ...nodeAncestors: Node[]
  ) => string[]
> = {
  toRoom: getOtherRoomIds,
  roomAbove: getOtherRoomIds,
  roomBelow: getOtherRoomIds,
  "meta.nonContiguousRelationship.with.room": getOtherRoomIds,
  // joytsticks:
  ["config.controls.*"](storeState, currentRoomJson, _node, targetsArray) {
    const existingTargets =
      (targetsArray.children &&
        new Set(
          iterate(targetsArray.children)
            ?.map((c) => c.value)
            .filter((s) => typeof s === "string"),
        )) ??
      (emptySet as Set<string>);

    return (
      iterateRoomJsonItemsWithIds(currentRoomJson.items, "charles")
        .map(([id]) => id)
        // only suggest the ids that aren't already in the array (in existingTargets)
        .filter((id) => !existingTargets.has(id))
        .toArray()
    );
  },
  // switches:
  ["modifies.*.targets.*"](
    storeState,
    currentRoomJson,
    _node,
    targetsArray,
    _,
    config,
  ) {
    const expectType = getNodeValue(config, "expectType");

    if (typeof expectType !== "string") {
      return emptyArray;
    }

    const existingTargets =
      (targetsArray.children &&
        new Set(
          iterate(targetsArray.children)
            ?.map((c) => c.value)
            .filter((s) => typeof s === "string"),
        )) ??
      (emptySet as Set<string>);

    return (
      iterateRoomJsonItemsWithIds(
        currentRoomJson.items,
        expectType as JsonItemType,
      )
        .map(([id]) => id)
        // only suggest the ids that aren't already in the array (in existingTargets)
        .filter((id) => !existingTargets.has(id))
        .toArray()
    );
  },
};

/**
 * Find a matching pattern for the given JSON path
 */
const findMatchingPattern = (path: (string | number)[]): string | null => {
  for (const pattern of Object.keys(suggestionPatterns)) {
    const patternParts = pattern.split(".");
    const pathTail = path.slice(-patternParts.length);

    // Check if pattern matches, handling wildcards
    const matches = patternParts.every((part, index) => {
      const pathPart = pathTail[index];
      return part === "*" || String(pathPart) === part;
    });

    if (matches && pathTail.length === patternParts.length) {
      return pattern;
    }
  }
  return null;
};

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

        const matchedPattern = findMatchingPattern(path);

        if (matchedPattern) {
          const wordInfo = editorModel.getWordAtPosition(position);
          const storeState = store.getState() as RootStateWithLevelEditorSlice;

          // Get suggestions from the matched pattern's callback
          const currentRoomJson = selectCurrentEditingRoomJson(storeState);
          const suggestionStrings = suggestionPatterns[matchedPattern](
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
