import { type Container, type RenderLayer, Sprite } from "pixi.js";

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
  RenderLayer: "🥞",
};

/**
 * structural RenderLayer detection - constructor names are mangled in
 * minified builds, but only layers carry renderLayerChildren
 */
const isRenderLayer = (container: Container): container is RenderLayer =>
  "renderLayerChildren" in container;

/**
 * Gets the type name of a container, stripping leading underscore if present
 * (minified Pixi builds may use names like _Container, _Sprite, etc.)
 */
export const getContainerTypeName = (container: Container): string => {
  if (isRenderLayer(container)) {
    // structural, so it also holds in minified builds where the
    // constructor name is mangled:
    return "RenderLayer";
  }
  const rawTypeName = container.constructor.name;
  return rawTypeName.startsWith("_") ? rawTypeName.slice(1) : rawTypeName;
};

/**
 * Gets the emoji for a container type
 */
export const getContainerEmoji = (typeName: string): string =>
  emojis[typeName] || "📌";

/**
 * Gets additional info about a container for debugging/logging
 */
export const getContainerAdditionalInfo = (container: Container): string[] => {
  const additionalInfo: string[] = [];

  try {
    if (container.x !== 0 || container.y !== 0) {
      additionalInfo.push(`@(x=${container.x}, y=${container.y})`);
    }
  } catch (_e: unknown) {
    additionalInfo.push("@(ERROR)");
  }

  if (container.children.length > 0) {
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

  // rendered by a RenderLayer instead of at its tree position:
  if (container.parentRenderLayer) {
    additionalInfo.push(
      `🥞 in layer "${container.parentRenderLayer.label ?? "(unlabelled)"}"`,
    );
  }

  if (isRenderLayer(container)) {
    const attached = container.renderLayerChildren;
    additionalInfo.push(
      attached.length === 0 ?
        "layer children: none"
      : `layer children: ${attached
          .map((child) => `"${child.label ?? "(unlabelled)"}"`)
          .join(", ")}`,
    );
  }

  if (container instanceof Sprite) {
    if (container.texture === null || container.texture === undefined) {
      additionalInfo.push("texture: NO TEXTURE");
    } else {
      const textureLabel = container.texture.label || "(anon texture)";
      additionalInfo.push(`texture: "${textureLabel}"`);
    }
  }

  return additionalInfo;
};

/**
 * Gets the label suffix for a container (empty string if no label or label matches type)
 */
export const getContainerLabelSuffix = (
  container: Container,
  typeName: string,
): string =>
  container.label && container.label !== typeName ?
    ` "${container.label}"`
  : "";

/**
 * Formats a single container's info as a string (without tree structure)
 */
export const formatContainerInfo = (container: Container): string => {
  const typeName = getContainerTypeName(container);
  const emoji = getContainerEmoji(typeName);
  const label = getContainerLabelSuffix(container, typeName);
  const info = getContainerAdditionalInfo(container);

  const infoStr = info.length > 0 ? ` (${info.join(", ")})` : "";
  return `${emoji} ${typeName}${label}${infoStr}`;
};
