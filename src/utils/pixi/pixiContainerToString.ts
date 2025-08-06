import { type Container, Sprite } from "pixi.js";

const emojis: Record<string, string | undefined> = {
  Container: "📦",
  Sprite: "🖼️",
  UniqueTextureSprite: "✨",
  Graphics: "🎨",
  Text: "📝",
  AnimatedSprite: "🎬",
  TilingSprite: "🔲",
  BitmapText: "🔤",
  Mesh: "🔺",
  NineSliceSprite: "🔳",
};
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

  // Get the type name of the container, stripping leading underscore if present
  // (minified Pixi builds may use names like _Container, _Sprite, etc.)
  const rawTypeName = container.constructor.name;
  const typeName =
    rawTypeName.startsWith("_") ? rawTypeName.slice(1) : rawTypeName;

  // Get emoji for the type
  let typeEmoji = emojis[typeName] || "📌";

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

  // Get the label if it exists and is different from the type name
  const label =
    container.label && container.label !== typeName ?
      ` "${container.label}"`
    : "";

  // Get additional info
  const additionalInfo: string[] = [];
  try {
    if (container.x !== 0 || container.y !== 0) {
      additionalInfo.push(`@(${container.x}, ${container.y})`);
    }
  } catch (_e: unknown) {
    additionalInfo.push("@(ERROR)");
  }
  if (container.children.length > 2) {
    additionalInfo.push(`children: ${container.children.length}`);
  }
  if (!container.visible) {
    additionalInfo.push("hidden");
  }
  if (container.alpha < 1) {
    additionalInfo.push(`alpha: ${container.alpha.toFixed(2)}`);
  }
  if (container.mask) {
    additionalInfo.push("😷 masked");
  }
  // Check for texture on Sprites and subclasses
  if (container instanceof Sprite) {
    const sprite = container as Sprite;
    if (sprite.texture === null || sprite.texture === undefined) {
      additionalInfo.push("texture: NO TEXTURE");
    } else {
      const textureLabel = sprite.texture.label || "(anon texture)";
      additionalInfo.push(`texture: "${textureLabel}"`);
    }
  }

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
