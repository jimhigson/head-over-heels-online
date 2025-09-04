import { type Node } from "jsonc-parser";

import type {
  SuggestionGenerator,
  SuggestionPatterns,
} from "./suggestionPatterns";

import { getNodePropertyValue } from "./getNodePropertyValue";

export const log = 1;

/**
 * Parse an attribute selector like [type=door] into property and value
 */
const parseAttributeSelector = (
  selector: string,
): { property: string; value: string } | null => {
  const match = selector.match(/^\[(?<property>\w+)=(?<value>\w+)\]$/);
  if (!match?.groups) return null;
  return { property: match.groups.property, value: match.groups.value };
};

/**
 * Check if a path and node ancestors match a single pattern
 */
export const matchesPattern = (
  pattern: string,
  path: (number | string)[],
  nodeAncestors: Node[],
): boolean => {
  const patternParts = pattern.split(".").reverse();

  // Pattern must not be longer than the path
  if (patternParts.length > path.length) {
    return false;
  }

  // Take the first N elements from path/ancestors to match pattern length
  const pathHead = path.slice(0, patternParts.length);
  const nodeHead = nodeAncestors.slice(0, patternParts.length);

  // Check if pattern matches, handling wildcards and attribute selectors
  return patternParts.every((part, index) => {
    console.log("part", part);

    const attributeSelector = parseAttributeSelector(part);

    if (attributeSelector) {
      console.log(
        "atrSel",
        nodeHead[index],
        attributeSelector.property,
        getNodePropertyValue(nodeHead[index], attributeSelector.property),
      );
      // Attribute selector checks a property on the node at this position
      return (
        getNodePropertyValue(nodeHead[index], attributeSelector.property) ===
        attributeSelector.value
      );
    }

    // Normal path element matching
    const pathPart = pathHead[index];
    const matches = part === "*" || String(pathPart) === part;
    return matches;
  });
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
      if (log) console.log(`✅ `, path, nodeAncestors, "matched", pattern);
      return suggestionPatterns[pattern];
    }

    if (log) console.log(`❌ `, path, nodeAncestors, "did not match", pattern);
  }
  return null;
};
