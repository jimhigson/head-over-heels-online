import { findNodeAtLocation, type Node } from "jsonc-parser";

import { matchesJsonPatternPart } from "../../../utils/jsonPattern/matchesJsonPatternPart";
import { splitJsonPattern } from "../../../utils/jsonPattern/splitJsonPattern";
import {
  type SuggestionGenerator,
  type SuggestionPatterns,
} from "./suggestionPatterns";

const log = 0;

/**
 * Check if a path and node ancestors match a single pattern - see
 * `matchesJsonPatternPart` for what each part of the pattern can be
 */
export const matchesPattern = (
  pattern: string,
  path: (number | string)[],
  nodeAncestors: Node[],
): boolean => {
  const patternParts = splitJsonPattern(pattern).reverse();

  // Pattern must not be longer than the path
  if (patternParts.length > path.length) {
    return false;
  }

  return patternParts.every((part, index) =>
    matchesJsonPatternPart(
      part,
      path[index],
      (propertyPath) =>
        findNodeAtLocation(nodeAncestors[index], propertyPath)?.value,
    ),
  );
};

/**
 * Find a matching pattern for the given JSON path.
 *
 * Matches patterns against the leaf node and its ancestors, allowing patterns
 * to match at any depth in the tree. For example, a pattern "config.toDoor"
 * will match whether it appears at the root level or nested inside other objects.
 *
 * Both path and nodeAncestors arrays are ordered from leaf to root.
 */
export const findMatchingPattern = (
  /** the patterns to search for a match. First match is returned */
  suggestionPatterns: SuggestionPatterns,
  /** from leaf to root */
  path: (number | string)[],
  /** from leaf to root */
  nodeAncestors: Node[],
): null | SuggestionGenerator => {
  for (const pattern of Object.keys(suggestionPatterns)) {
    if (matchesPattern(pattern, path, nodeAncestors)) {
      if (log) {
        console.log(`✅ `, path, nodeAncestors, "matched", pattern);
      }
      return suggestionPatterns[pattern];
    }

    if (log) {
      console.log(`❌ `, path, nodeAncestors, "did not match", pattern);
    }
  }
  return null;
};
