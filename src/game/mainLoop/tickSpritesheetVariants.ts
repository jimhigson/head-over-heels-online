import type { Renderer } from "pixi.js";

import type { ZxSpectrumRoomColour } from "../../originalGame";
import type { SceneryName } from "../../sprites/planets";

import {
  createCurrentRoomSpritesheetVariant,
  destroyCurrentRoomSpritesheetVariant,
} from "../../sprites/spritesheet/variants/currentRoomSpritesheetVariant";
import { createDeactivatedSpritesheetVariant } from "../../sprites/spritesheet/variants/deactivatedSpritesheetVariant";
import { createDoughnuttedSpritesheetVariant } from "../../sprites/spritesheet/variants/doughnuttedSpritesheetVariant";
import { createSceneryPlayerSpritesheetVariant } from "../../sprites/spritesheet/variants/sceneryPlayerSpritesheetVariant";

export const tickSpritesheetVariants = (
  pixiRenderer: Renderer,
  colourised: boolean,
  roomScenery: SceneryName,
  roomColor: ZxSpectrumRoomColour,
): void => {
  if (colourised) {
    const isDim = roomColor.shade === "dimmed";
    createCurrentRoomSpritesheetVariant(
      pixiRenderer,
      colourised,
      roomScenery,
      roomColor,
    );
    createDeactivatedSpritesheetVariant(pixiRenderer, roomScenery, roomColor);
    createDoughnuttedSpritesheetVariant(pixiRenderer, isDim);
    createSceneryPlayerSpritesheetVariant(pixiRenderer, isDim);
  } else {
    destroyCurrentRoomSpritesheetVariant();
  }
};
