import type { Renderer } from "pixi.js";

import type { ZxSpectrumRoomColour } from "../../originalGame";
import type { SceneryName } from "../../sprites/planets";
import type { SpriteOption } from "../../store/slices/gameMenus/gameMenusSlice";

import {
  initOriginalSpritesheet,
  isTextureLoaded,
  type LoadableSpriteOption,
  loadSpritesheetAssets,
} from "../../sprites/spritesheet/loadedSpriteSheet";
import {
  createCurrentRoomSpritesheetVariant,
  destroyCurrentRoomSpritesheetVariant,
} from "../../sprites/spritesheet/variants/currentRoomSpritesheetVariant";
import { createDeactivatedSpritesheetVariant } from "../../sprites/spritesheet/variants/deactivatedSpritesheetVariant";
import { createDoughnuttedSpritesheetVariant } from "../../sprites/spritesheet/variants/doughnuttedSpritesheetVariant";
import { createSceneryPlayerSpritesheetVariant } from "../../sprites/spritesheet/variants/sceneryPlayerSpritesheetVariant";
import { createUncolourisedSpritesheet } from "../../sprites/spritesheet/variants/uncolourisedSpritesheetVariant";

const rebuildVariants = (
  pixiRenderer: Renderer,
  roomScenery: SceneryName,
  roomColor: ZxSpectrumRoomColour,
  spriteOption: LoadableSpriteOption,
): void => {
  const isDim = roomColor.shade === "dimmed";
  createCurrentRoomSpritesheetVariant(
    pixiRenderer,
    roomScenery,
    roomColor,
    spriteOption,
  );
  createDeactivatedSpritesheetVariant(
    pixiRenderer,
    roomScenery,
    roomColor,
    spriteOption,
  );
  createDoughnuttedSpritesheetVariant(pixiRenderer, isDim, spriteOption);
  createSceneryPlayerSpritesheetVariant(pixiRenderer, isDim, spriteOption);
};

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
      // texture not loaded yet - need to run the async load:
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

  if (!isTextureLoaded(spriteOption)) {
    // texture not loaded yet - need to run the async load:
    return loadSpritesheetAssets(spriteOption).then(() => {
      initOriginalSpritesheet(pixiRenderer);
      rebuildVariants(pixiRenderer, roomScenery, roomColor, spriteOption);
    });
  }

  // texture loaded - everything else we need is synchronous:
  initOriginalSpritesheet(pixiRenderer);
  rebuildVariants(pixiRenderer, roomScenery, roomColor, spriteOption);
  return; // nothing async to do
};
