/* eslint-disable no-console -- the point of this file is to log to the console */
import spritesheetPalette from "../../gfx/spritesheetPalette.json";
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

/**
 * Log textures as images to the console with stats at the end
 */
const logTextures = async (): Promise<void> => {
  const trackedTextures = getTrackedTextures();

  if (trackedTextures.size === 0) {
    console.log(
      "No dynamic textures found. Did you call textureInspector.start()?",
    );
    return;
  }

  const app = getApp();

  const trackingStart = getTrackingStartTime();
  if (!trackingStart) {
    console.warn(
      "Tracking start time not set. Cannot log texture creation times.",
    );
    return;
  }

  // Log textures with preview images
  for (const item of trackedTextures) {
    const { texture } = item;
    const memory = getTextureMemory(texture);
    const memoryKB = (memory / 1024).toFixed(2);
    const format = texture.source?.format ?? "unknown";

    try {
      // Extract texture to base64
      const base64 = await app.renderer.extract.base64(texture);

      const duration = item.createdAt - trackingStart;
      const createdTime = formatDuration(duration);

      // Create a styled console log with image
      console.groupCollapsed(
        `%c `,
        // Note: We use padding instead of width/height because console.log doesn't
        // properly support width/height on inline elements. Padding creates the visible area.
        `padding: ${Math.min(texture.height / 2, 100)}px ${Math.min(texture.width / 2, 100)}px;
         background: url(${base64}) no-repeat center;
         background-size: contain;
         border: 1px solid ${spritesheetPalette.pink};`,
        `\n ${texture.width}x${texture.height} ${format} (${memoryKB} KB) ${item.type ?? "unknown type"} ${createdTime}`,
      );

      // Log clickable data URL
      console.log(base64);

      console.log("stack", item.callStack);
      console.groupEnd();
    } catch (error) {
      console.warn(`Failed to extract texture:`, error);
    }
  }

  // Show stats at the end for visibility
  showTextureStats();
};

/**
 * Show texture statistics grouped by size and type
 */
const showTextureStats = (): void => {
  const trackedTextures = getTrackedTextures();
  const sizeGroups = new Map<
    string,
    { count: number; memoryKB: number; width: number; height: number }
  >();
  const typeGroups = new Map<string, { count: number; memoryKB: number }>();
  let totalMemory = 0;

  for (const item of trackedTextures) {
    const { texture, type } = item;
    const size = `${texture.width}x${texture.height}`;
    const memory = getTextureMemory(texture);

    // Track by size
    const existingSize = sizeGroups.get(size) ?? {
      count: 0,
      memoryKB: 0,
      width: texture.width,
      height: texture.height,
    };
    sizeGroups.set(size, {
      count: existingSize.count + 1,
      memoryKB: existingSize.memoryKB + memory / 1024,
      width: texture.width,
      height: texture.height,
    });

    totalMemory += memory;

    // Track by type
    const typeKey = type ?? "unknown";
    const existing = typeGroups.get(typeKey) ?? { count: 0, memoryKB: 0 };
    typeGroups.set(typeKey, {
      count: existing.count + 1,
      memoryKB: existing.memoryKB + memory / 1024,
    });
  }

  console.log("\n📊 Texture Statistics:");
  console.log(`Total textures: ${trackedTextures.size}`);
  console.log(`Total GPU memory: ${(totalMemory / 1024).toFixed(2)} KB`);

  if (typeGroups.size > 0) {
    console.log("\n🏷️  Grouped by type:");
    const typeArray = Array.from(typeGroups.entries())
      .map(([type, stats]) => ({
        type,
        count: stats.count,
        memoryKB: stats.memoryKB.toFixed(2),
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
        memoryKB: stats.memoryKB.toFixed(2),
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
    window.textureInspector = () => {
      logTextures();
    };
    window.textureInspectorStart = patchPixiToTrackTextures;

    console.log(`✅ Texture inspector ready. Use these commands in the console:
  textureInspector()     - View all textures with images and statistics
  textureInspectorStart(app) - Start tracking textures (call from your app init code to track all from the start)`);
  }
};
