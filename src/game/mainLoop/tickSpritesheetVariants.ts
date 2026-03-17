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
import {
  createUncolourisedSpritesheet,
  destroyUncolourisedSpritesheet,
} from "../../sprites/spritesheet/variants/uncolourisedSpritesheetVariant";

const rebuildVariants = (context: VariantBuildContext): void => {
  createCurrentRoomSpritesheetVariant(context);
  createDeactivatedSpritesheetVariant(context);
  createDoughnuttedSpritesheetVariant(context);
  createSceneryPlayerSpritesheetVariant(context);
};

const initAndBuildUncolourised = (pixiRenderer: Renderer): void => {
  initOriginalSpritesheet(pixiRenderer);
  destroyCurrentRoomSpritesheetVariant();
  createUncolourisedSpritesheet(pixiRenderer);
};

const initAndBuildColourised = (
  pixiRenderer: Renderer,
  context: VariantBuildContext,
): void => {
  initOriginalSpritesheet(pixiRenderer);
  destroyUncolourisedSpritesheet();
  rebuildVariants(context);
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
  const { name } = spriteOption;

  if (spriteOption.uncolourised) {
    if (!isTextureLoaded(name)) {
      return loadSpritesheetAssets(name).then(() => {
        initAndBuildUncolourised(pixiRenderer);
      });
    }
    initAndBuildUncolourised(pixiRenderer);
    return;
  }

  const context: VariantBuildContext = {
    pixiRenderer,
    roomScenery,
    roomColor,
    spriteOption: name,
    spritesheetMetaData: spritesheetMetaForOption(name),
  };

  if (!isTextureLoaded(name)) {
    return loadSpritesheetAssets(name).then(() => {
      initAndBuildColourised(pixiRenderer, context);
    });
  }

  initAndBuildColourised(pixiRenderer, context);
};
