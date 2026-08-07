import { type Page } from "@playwright/test";
import { type Container, type Texture } from "pixi.js";

import { dispatchToStore } from "./gameStateQueries";

/**
 * turn on the smooth-sprites (cleanEdge upscaling) display setting and wait
 * for ground truth that the re-bake landed: a stage sprite drawing from an
 * upscaled (resolution > 1) sheet. The wait is generous because
 * software-rendered environments (SwiftShader in CI or a sandbox) are very
 * slow to compile the cleanEdge shader on first bake - callers must allow
 * for this in their test timeout
 */
export const enableSmoothSprites = async (page: Page) => {
  await dispatchToStore(page, {
    type: "userSettings/toggleUserSetting",
    payload: { path: "displaySettings.smoothSprites", value: true },
  });

  await page.waitForFunction(
    () => {
      const usesUpscaledSheet = (node: Container): boolean => {
        const { texture } = node as { texture?: Texture };
        // texture.source can be transiently absent mid-rebuild:
        if (texture?.source !== undefined && texture.source.resolution > 1) {
          return true;
        }
        return node.children.some(usesUpscaledSheet);
      };
      return usesUpscaledSheet(window.__PIXI_APP__!.stage);
    },
    undefined,
    { timeout: 590_000 },
  );
  // allow the recreated renderers a frame or two to settle:
  await page.waitForTimeout(1_000);
};
