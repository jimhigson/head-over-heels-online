import type { Sprite } from "pixi.js";
import { spritesheetPalette } from "../../../../gfx/spritesheetPalette";
import { zxSpectrumColors } from "../../../originalGame";
import { spriteSheet } from "../../../sprites/spriteSheet";
import {
  spritesheetData,
  type TextureId,
} from "../../../sprites/spriteSheetData";
import type { Subset } from "../../../utils/subset";
import type { BooleanAction } from "../../input/actions";
import type { InputStateTrackerInterface } from "../../input/InputStateTracker";
import { createSprite } from "../createSprite";
import { RevertColouriseFilter } from "../filters/RevertColouriseFilter";
import { replaceWithHalfbriteFilter } from "../filters/standardFilters";

export type OnScreenButtonName =
  | Subset<BooleanAction, "jump" | "carry" | "fire" | "menu_openOrExit">
  | "carryAndJump";
type ButtonColour = "red" | "blue" | "yellow" | "green";
export const buttonSpriteSize = spritesheetData.frames.button.frame;
const buttonColourFilters = {
  colourised: {
    red: replaceWithHalfbriteFilter(spritesheetPalette.midRed),
    blue: replaceWithHalfbriteFilter(spritesheetPalette.metallicBlue),
    yellow: replaceWithHalfbriteFilter(spritesheetPalette.highlightBeige),
    green: replaceWithHalfbriteFilter(spritesheetPalette.moss),
  },
  zx: {
    red: new RevertColouriseFilter(zxSpectrumColors.zxRed),
    blue: new RevertColouriseFilter(zxSpectrumColors.zxBlue),
    yellow: new RevertColouriseFilter(zxSpectrumColors.zxYellow),
    green: new RevertColouriseFilter(zxSpectrumColors.zxGreen),
  },
};
export class OnScreenButton {
  container: Sprite;

  constructor(
    private actions: BooleanAction[],
    private inputStateTracker: InputStateTrackerInterface,
    private colour?: ButtonColour,
    private textureId: TextureId = "button",
    private pressedTextureId: TextureId = "button.pressed",
  ) {
    const sprite = (this.container = createSprite(textureId) as Sprite);

    const { hudInputState } = inputStateTracker;

    sprite.eventMode = "static";
    sprite.on("pointerdown", () => {
      for (const a of actions) {
        hudInputState[a] = true;
      }
    });
    sprite.on("pointerup", () => {
      for (const a of actions) {
        hudInputState[a] = false;
      }
    });
    sprite.on("pointerleave", () => {
      for (const a of actions) {
        hudInputState[a] = false;
      }
    });
  }

  #updateColours(colourised: boolean) {
    if (!this.colour) return;

    if (colourised) {
      this.container.filters = buttonColourFilters.colourised[this.colour];
    } else {
      this.container.filters = buttonColourFilters.zx[this.colour];
    }
  }

  #updateSprite() {
    const pressed = this.actions.every(
      (a) => this.inputStateTracker.currentActionPress(a) !== "released",
    );
    this.container.texture =
      spriteSheet.textures[pressed ? this.pressedTextureId : this.textureId];
  }

  update(colourised: boolean) {
    this.#updateColours(colourised);
    this.#updateSprite();
  }
}
