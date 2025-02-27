import { spritesheetPalette } from "gfx/spritesheetPalette";
import type { Sprite } from "pixi.js";
import { Container } from "pixi.js";

import type {
  CharacterName,
  IndividualCharacterName,
} from "../../../model/modelTypes";
import type { Xy } from "../../../utils/vectors/vectors";
import type { GameState } from "../../gameState/GameState";

import type { Subset } from "../../../utils/subset";
import type { BooleanAction } from "../../input/actions";
import type { TickOptions } from "./HudRenderer";
import { createSprite } from "../createSprite";
import { replaceWithHalfbriteFilter } from "../filters/standardFilters";
import { RevertColouriseFilter } from "../filters/RevertColouriseFilter";
import { zxSpectrumColors } from "../../../originalGame";
import type { InputStateTrackerInterface } from "../../input/InputStateTracker";
import { objectValues } from "iter-tools";
import {
  spritesheetData,
  type TextureId,
} from "../../../sprites/spriteSheetData";
import { spriteSheet } from "../../../sprites/spriteSheet";
import { selectAbilities } from "../../gameState/gameStateSelectors/selectPlayableItem";

const mainButtonsSpreadPx = 14;

type OnScreenButtonName =
  | Subset<BooleanAction, "jump" | "carry" | "fire" | "menu_openOrExit">
  | "carryAndJump";

type ButtonColour = "red" | "blue" | "yellow" | "green";

const buttonSpriteSize = spritesheetData.frames.button.frame;

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

class OnScreenButton {
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

export class OnScreenControls<RoomId extends string> {
  #container = new Container({ label: "OnScreenControls" });

  #hudElements = {
    mainButtonNest: new Container({ label: "mainButtonNest" }),
    buttons: {} as Record<OnScreenButtonName, OnScreenButton>,
  };

  constructor(private gameState: GameState<RoomId>) {
    const buttons = (this.#hudElements.buttons = {
      menu_openOrExit: new OnScreenButton(
        ["menu_openOrExit"],
        gameState.inputStateTracker,
        undefined,
        "hud.char.Menu",
      ),
      jump: new OnScreenButton(["jump"], gameState.inputStateTracker, "green"),
      carry: new OnScreenButton(["carry"], gameState.inputStateTracker, "blue"),
      fire: new OnScreenButton(["fire"], gameState.inputStateTracker, "red"),
      carryAndJump: new OnScreenButton(
        ["carry", "jump"],
        gameState.inputStateTracker,
        "yellow",
      ),
    });

    const { mainButtonNest } = this.#hudElements;
    mainButtonNest.addChild(buttons.jump.container);
    mainButtonNest.addChild(buttons.carry.container);
    mainButtonNest.addChild(buttons.fire.container);
    mainButtonNest.addChild(buttons.carryAndJump.container);

    buttons.jump.container.y = mainButtonsSpreadPx;
    buttons.carry.container.x = -mainButtonsSpreadPx * 2;
    buttons.carryAndJump.container.y = -mainButtonsSpreadPx;
    buttons.fire.container.x = mainButtonsSpreadPx * 2;

    this.#container.addChild(mainButtonNest);
    this.#container.addChild(buttons.menu_openOrExit.container);

    this.#initInteractivity();
  }

  #initInteractivity() {}

  /* change the position of elements in the hud (ie, to adjust to different screen sizes) */
  #updateElementPositions(screenSize: Xy) {
    this.#hudElements.mainButtonNest.x =
      screenSize.x - buttonSpriteSize.w - mainButtonsSpreadPx;
    this.#hudElements.mainButtonNest.y = screenSize.y - 20;
  }

  /* change the position of elements in the hud (ie, to adjust to different screen sizes) */
  #updateShowAndHide() {
    const { currentCharacterName } = this.gameState;

    const heelsAbilities = selectAbilities(this.gameState, "heels");
    const headAbilities = selectAbilities(this.gameState, "head");

    const carryVisible =
      (this.#characterIsActive(currentCharacterName, "heels") &&
        heelsAbilities?.hasBag) ??
      false;

    this.#hudElements.buttons.carryAndJump.container.visible =
      this.#hudElements.buttons.carry.container.visible = carryVisible;

    const fireVisible =
      (this.#characterIsActive(currentCharacterName, "head") &&
        headAbilities?.hasHooter) ??
      false;

    this.#hudElements.buttons.fire.container.visible = fireVisible;
  }

  #characterIsActive(
    currentCharacterName: CharacterName,
    characterName: IndividualCharacterName,
  ) {
    return (
      currentCharacterName === characterName ||
      currentCharacterName === "headOverHeels"
    );
  }

  tick({ screenSize, colourise }: TickOptions<RoomId>): void {
    this.#updateElementPositions(screenSize);
    for (const b of objectValues(this.#hudElements.buttons)) {
      b.update(colourise);
    }
    this.#updateShowAndHide();
  }

  get container() {
    return this.#container;
  }

  destroy() {
    this.#container.destroy();
  }
}
