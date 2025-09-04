import type { Node } from "jsonc-parser";

/**
 * Build an array of nodes from the given node up to the root
 */
export const getNodeAncestors = (node: Node | undefined): Node[] => {
  const ancestors: Node[] = [];
  let current = node;
  while (current) {
    if (current.type !== "property") {
      ancestors.push(current);
    }
    current = current.parent;
  }
  return ancestors;
};
