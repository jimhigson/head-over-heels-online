import type { Renderer } from "pixi.js";

import type { ZxSpectrumRoomColour } from "../../originalGame";
import type { SceneryName } from "../../sprites/planets";
import type { VariantBuildContext } from "../../sprites/spritesheet/VariantBuildContext";
import type { SpriteOption } from "../../store/slices/gameMenus/gameMenusSlice";

import {
  initOriginalSpritesheet,
  isTextureLoaded,
  loadSpritesheetAssets,
} from "../../sprites/spritesheet/loadedSpriteSheet";
import { spritesheetMetaForOption } from "../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import {
  createCurrentRoomSpritesheetVariant,
  destroyCurrentRoomSpritesheetVariant,
} from "../../sprites/spritesheet/variants/currentRoomSpritesheetVariant";
import { createDeactivatedSpritesheetVariant } from "../../sprites/spritesheet/variants/deactivatedSpritesheetVariant";
import { createDoughnuttedSpritesheetVariant } from "../../sprites/spritesheet/variants/doughnuttedSpritesheetVariant";
import { createSceneryPlayerSpritesheetVariant } from "../../sprites/spritesheet/variants/sceneryPlayerSpritesheetVariant";
import { createUncolourisedSpritesheet } from "../../sprites/spritesheet/variants/uncolourisedSpritesheetVariant";

const rebuildVariants = (context: VariantBuildContext): void => {
  createCurrentRoomSpritesheetVariant(context);
  createDeactivatedSpritesheetVariant(context);
  createDoughnuttedSpritesheetVariant(context);
  createSceneryPlayerSpritesheetVariant(context);
};

/**
 * @returns a promise if the work can't be done right away;
 * undefined if the work was done synchronously
 */
export const tickSpritesheetVariants = (
  pixiRenderer: Renderer,
  roomScenery: SceneryName,
  roomColor: ZxSpectrumRoomColour,
  spriteOption: SpriteOption,
): Promise<void> | undefined => {
  if (spriteOption === "Speccy") {
    destroyCurrentRoomSpritesheetVariant();
    // speccy spritesheet needs BlockStack to be loaded first:
    if (!isTextureLoaded("BlockStack")) {
      // Texture not loaded yet - return a promise and process once
      // it is done. The caller can wait on the promise for when loading
      // is complete
      return loadSpritesheetAssets("BlockStack").then(() => {
        initOriginalSpritesheet(pixiRenderer);
        createUncolourisedSpritesheet(pixiRenderer);
      });
    }

    // texture loaded - everything else we need is synchronous:
    initOriginalSpritesheet(pixiRenderer);
    createUncolourisedSpritesheet(pixiRenderer);
    return; // nothing async to do
  }

  const context: VariantBuildContext = {
    pixiRenderer,
    roomScenery,
    roomColor,
    spriteOption,
    spritesheetMetaData: spritesheetMetaForOption(spriteOption),
  };

  if (!isTextureLoaded(spriteOption)) {
    // texture not loaded yet - need to run the async load:
    return loadSpritesheetAssets(spriteOption).then(() => {
      initOriginalSpritesheet(pixiRenderer);
      rebuildVariants(context);
    });
  }

  // texture loaded - everything else we need is synchronous:
  initOriginalSpritesheet(pixiRenderer);
  rebuildVariants(context);
  return; // nothing async to do
};
