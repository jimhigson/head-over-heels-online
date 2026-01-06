/* eslint-disable no-console -- the point of this file is to log to the console */
import type { Renderer, TextureSource } from "pixi.js";

import { Texture } from "pixi.js";

import spritesheetPalette from "../_generated/palette/spritesheetPalette.json" with { type: "json" };
import {
  getApp,
  getTrackingStartTime,
  patchPixiToTrackTextures,
} from "./patchPixi";
import { getTextureMemory, getTrackedTextures } from "./textureData";

/**
 * Format duration in "5m 2s 234ms" format
 */
const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;

  const parts: string[] = [];
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);
  parts.push(`${milliseconds}ms`);

  return parts.join(" ");
};

const formatMemory = (bytes: number): string => {
  const kb = bytes / 1024;
  if (kb >= 1024) {
    return `${Math.round(kb / 1024)} MB`;
  }
  if (kb >= 1) {
    return `${Math.round(kb)} KB`;
  }
  return `${bytes} B`;
};

const extractTextureSourceToBase64 = async (
  textureSource: TextureSource,
  renderer: Renderer,
): Promise<string> => {
  const wrapper = new Texture({ source: textureSource });
  try {
    return await renderer.extract.base64(wrapper);
  } finally {
    wrapper.destroy(false);
  }
};

export const textureToConsoleArgs = async (
  textureSource: TextureSource,
  renderer: Renderer,
  maxSize = 100,
): Promise<string[]> => {
  const base64 = await extractTextureSourceToBase64(textureSource, renderer);
  const { width, height } = textureSource;
  return [
    `%c `,
    // Note: We use padding instead of width/height because console.log doesn't
    // properly support width/height on inline elements. Padding creates the visible area.
    `padding: ${Math.min(height / 2, maxSize)}px ${Math.min(width / 2, maxSize)}px;
     background: url(${base64}) no-repeat center;
     background-size: contain;
     border: 1px solid ${spritesheetPalette.pink};`,
  ];
};

/**
 * Log textures as images to the console with stats at the end
 */
const logTextures = async (maxSize?: number): Promise<void> => {
  const trackedTextures = getTrackedTextures();

  if (trackedTextures.length === 0) {
    console.log(
      "No dynamic textures found. Did you call textureInspector.start()?",
    );
    return;
  }

  const trackingStart = getTrackingStartTime();
  if (!trackingStart) {
    console.warn(
      "Tracking start time not set. Cannot log texture creation times.",
    );
    return;
  }

  const { renderer } = getApp();

  for (const item of trackedTextures) {
    const { textureSource } = item;
    const memory = getTextureMemory(textureSource);
    const format = textureSource.format ?? "unknown";
    const duration = item.createdAt - trackingStart;
    const createdTime = formatDuration(duration);
    const label = `\n ${textureSource.width}x${textureSource.height} ${format} (${formatMemory(memory)}) ${item.type ?? "unknown type"} ${createdTime}`;

    try {
      console.groupCollapsed(
        ...(await textureToConsoleArgs(textureSource, renderer, maxSize)),
        label,
      );
      console.log(extractTextureSourceToBase64(textureSource, renderer));
    } catch (_error) {
      console.error(`⚠️⚠️⚠️ Failed to extract texture ⚠️⚠️⚠️`);
      console.group();
    }

    console.log(label);
    console.log(item.callStack);
    console.groupEnd();
  }

  showTextureStats();
};

/**
 * Show texture statistics grouped by size and type
 */
const showTextureStats = (): void => {
  const trackedTextures = getTrackedTextures();
  const sizeGroups = new Map<
    string,
    { count: number; memory: number; width: number; height: number }
  >();
  const typeGroups = new Map<string, { count: number; memory: number }>();
  let totalMemory = 0;

  for (const item of trackedTextures) {
    const { textureSource, type } = item;
    const size = `${textureSource.width}x${textureSource.height}`;
    const memory = getTextureMemory(textureSource);

    // Track by size
    const existingSize = sizeGroups.get(size) ?? {
      count: 0,
      memory: 0,
      width: textureSource.width,
      height: textureSource.height,
    };
    sizeGroups.set(size, {
      count: existingSize.count + 1,
      memory: existingSize.memory + memory,
      width: textureSource.width,
      height: textureSource.height,
    });

    totalMemory += memory;

    // Track by type
    const typeKey = type ?? "unknown";
    const existing = typeGroups.get(typeKey) ?? { count: 0, memory: 0 };
    typeGroups.set(typeKey, {
      count: existing.count + 1,
      memory: existing.memory + memory,
    });
  }

  console.log("\n📊 Texture Statistics:");
  console.log(`Total textures: ${trackedTextures.length}`);
  console.log(`Total GPU memory: ${formatMemory(totalMemory)}`);

  if (typeGroups.size > 0) {
    console.log("\n🏷️  Grouped by type:");
    const typeArray = Array.from(typeGroups.entries())
      .map(([type, stats]) => ({
        type,
        count: stats.count,
        memory: formatMemory(stats.memory),
      }))
      .sort((a, b) => b.count - a.count);
    console.table(typeArray);
  }

  if (sizeGroups.size > 0) {
    console.log("\n📐 Grouped by size:");
    const sizeArray = Array.from(sizeGroups.entries())
      .map(([size, stats]) => ({
        size,
        count: stats.count,
        memory: formatMemory(stats.memory),
        width: stats.width,
        height: stats.height,
      }))
      .sort((a, b) => {
        const aArea = a.width * a.height;
        const bArea = b.width * b.height;
        return aArea - bArea; // Sort by area, smallest first
      });
    console.table(sizeArray);
  }
};

declare global {
  interface Window {
    textureInspector: () => void;
    textureInspectorStart: typeof patchPixiToTrackTextures;
  }
}

/**
 * Add texture inspector to window object for console access
 */
export const addToConsole = (): void => {
  if (typeof window !== "undefined") {
    window.textureInspector = logTextures;
    window.textureInspectorStart = patchPixiToTrackTextures;

    console.log(`✅ Texture inspector ready. Use these commands in the console:
  textureInspector(maxSize?)     - View all textures with images and statistics
  textureInspectorStart(app) - Start tracking textures (call from your app init code to track all from the start)`);
  }
};
