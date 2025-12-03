import { type Container } from "pixi.js";

import {
  getContainerAdditionalInfo,
  getContainerEmoji,
  getContainerLabelSuffix,
  getContainerTypeName,
} from "./containerInfo";

/**
 * Renders a Pixi container hierarchy as a string representation
 * showing the scene graph structure with labels and types
 */
export const pixiContainerToString = (
  container: Container,
  indent = "",
  isLast = true,
  isRoot = true,
  ancestors: Container[] = [],
): string => {
  const lines: string[] = [];

  // Add initial newline for root
  if (isRoot) {
    lines.push("");
  }

  const typeName = getContainerTypeName(container);

  // Get emoji for the type
  let typeEmoji = getContainerEmoji(typeName);

  // Check if this container is used as a mask by any ancestor
  // ancestors[0] is immediate parent, ancestors[1] is grandparent, etc.
  ancestors.forEach((ancestor, index) => {
    if (ancestor.mask === container) {
      if (index === 0) {
        // Direct parent
        typeEmoji += "😷";
      } else {
        // Grandparent or higher: index 1 = grandparent (show ^2), index 2 = great-grandparent (show ^3)
        typeEmoji += `😷^${index + 1}`;
      }
    }
  });

  const label = getContainerLabelSuffix(container, typeName);
  const additionalInfo = getContainerAdditionalInfo(container);

  // Build the current line
  const prefix = isRoot ? "" : indent + (isLast ? "└── " : "├── ");
  lines.push(`${prefix}${typeEmoji} ${typeName}${label}`);

  // Add properties on separate lines if any
  if (additionalInfo.length > 0) {
    // Only show vertical line if there are children
    const hasChildren = container.children.length > 0;
    // The bullet should align with the first character of the type name
    // We need to account for the emoji and the space after it (3 chars total)
    const propIndent =
      isRoot ?
        hasChildren ? "│  "
        : "   "
      : indent + (isLast ? "    " : "│   ") + (hasChildren ? "│  " : "   ");
    additionalInfo.forEach((prop) => {
      lines.push(`${propIndent}→ ${prop}`);
    });
  }

  // Process children
  const childIndent = isRoot ? "" : indent + (isLast ? "    " : "│   ");
  container.children.forEach((child, index) => {
    const isLastChild = index === container.children.length - 1;
    lines.push(
      pixiContainerToString(
        child as Container,
        childIndent,
        isLastChild,
        false,
        [container, ...ancestors],
      ),
    );
  });

  return lines.join("\n") + (isRoot ? "\n" : "");
};
