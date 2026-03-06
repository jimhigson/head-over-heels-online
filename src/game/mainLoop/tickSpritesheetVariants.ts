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
  previousColourised?: boolean,
  previousColor?: ZxSpectrumRoomColour,
): void => {
  console.time("tickSpritesheetVariants (total)");
  if (colourised) {
    const isDim = roomColor.shade === "dimmed";
    const previousIsDim = previousColor?.shade === "dimmed";

    console.time("  currentRoom");
    createCurrentRoomSpritesheetVariant(pixiRenderer, roomScenery, roomColor);
    console.timeEnd("  currentRoom");

    console.time("  deactivated");
    createDeactivatedSpritesheetVariant(pixiRenderer, roomScenery, roomColor);
    console.timeEnd("  deactivated");

    if (!previousColourised || previousIsDim !== isDim) {
      console.time("  doughnutted");
      createDoughnuttedSpritesheetVariant(pixiRenderer, isDim);
      console.timeEnd("  doughnutted");

      console.time("  sceneryPlayer");
      createSceneryPlayerSpritesheetVariant(pixiRenderer, isDim);
      console.timeEnd("  sceneryPlayer");
    }
  } else {
    destroyCurrentRoomSpritesheetVariant();
  }
  console.timeEnd("tickSpritesheetVariants (total)");
};
