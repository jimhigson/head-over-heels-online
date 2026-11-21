import type { Node } from "jsonc-parser";

export const getNodePropertyValue = (
  node: Node,
  propertyName: string,
): boolean | null | number | string | undefined => {
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
