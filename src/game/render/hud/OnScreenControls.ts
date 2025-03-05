import { Container } from "pixi.js";

import type { Xy } from "../../../utils/vectors/vectors";
import type { GameState } from "../../gameState/GameState";

import type { TickOptions } from "./HudRenderer";
import { objectValues } from "iter-tools";
import { OnScreenJoystick } from "./OnScreenJoystick";
import { ButtonAppearanceRenderer } from "./OnScreenButton";
import type { Subset } from "../../../utils/subset";
import type { BooleanAction } from "../../input/actions";
import { spritesheetData } from "../../../sprites/spriteSheetData";

const mainButtonsSpreadPx = 14;
export type OnScreenButtonName =
  | Subset<BooleanAction, "jump" | "carry" | "fire">
  | "menu"
  | "carryAndJump";
export class OnScreenControls<RoomId extends string> {
  #container = new Container({ label: "OnScreenControls" });

  #hudElements;

  constructor(private gameState: GameState<RoomId>) {
    this.#hudElements = {
      mainButtonNest: new Container({ label: "mainButtonNest" }),
      buttons: {
        // menu: new OnScreenButton({
        //   actions: ["menu_openOrExit"],
        //   inputStateTracker: gameState.inputStateTracker,
        //   colour: undefined,
        //   gameState,
        //   textureId: "hud.char.Menu",
        // }),
        jump: new ButtonAppearanceRenderer(
          { colour: "blue", actions: ["jump"], id: "jump", which: "jump" },
          gameState,
        ),
        fire: new ButtonAppearanceRenderer(
          { colour: "red", actions: ["fire"], id: "fire", which: "fire" },
          gameState,
        ),
        carry: new ButtonAppearanceRenderer(
          { colour: "green", actions: ["carry"], id: "carry", which: "carry" },
          gameState,
        ),
        // fire: new OnScreenButton({
        //   actions: ["fire"],
        //   inputStateTracker: gameState.inputStateTracker,
        //   colour: "red",
        //   gameState,
        //   surfaceTextureId: () => "hooter",
        // }),
        // carryAndJump: new OnScreenButton({
        //   actions: ["carry", "jump"],
        //   inputStateTracker: gameState.inputStateTracker,
        //   gameState,
        //   colour: "yellow",
        // }),
      }, //satisfies Record<OnScreenButtonName, OnScreenButton<RoomId>>,
      joystick: new OnScreenJoystick(gameState.inputStateTracker),
    };

    const { buttons } = this.#hudElements;

    const { mainButtonNest, joystick } = this.#hudElements;

    for (const b of objectValues(buttons)) {
      mainButtonNest.addChild(b.container);
    }

    buttons.jump.container.y = mainButtonsSpreadPx;
    buttons.carry.container.x = -mainButtonsSpreadPx * 2;
    // buttons.carryAndJump.container.y = -mainButtonsSpreadPx;
    buttons.fire.container.x = mainButtonsSpreadPx * 2;

    // buttons.menu.container.x = 24;
    // buttons.menu.container.y = 24;
    // buttons.menu.container.scale = 2;
    // buttons.menu.container.filters = hudLowlightAndOutlineFilters;

    this.#container.addChild(mainButtonNest);
    // this.#container.addChild(buttons.menu.container);
    this.#container.addChild(joystick.container);

    this.#initInteractivity();
  }

  #initInteractivity() {}

  /* change the position of elements in the hud (ie, to adjust to different screen sizes) */
  #updateElementPositions(screenSize: Xy) {
    const offsetFromSides = buttonSpriteSize.w + mainButtonsSpreadPx;
    this.#hudElements.mainButtonNest.x = screenSize.x - offsetFromSides;
    this.#hudElements.mainButtonNest.y = screenSize.y - 14;

    this.#hudElements.joystick.container.x = offsetFromSides - 6;
    this.#hudElements.joystick.container.y = screenSize.y - 28;
  }

  /* change the position of elements in the hud (ie, to adjust to different screen sizes) */
  /*
  #updateShowAndHide() {
    const { currentCharacterName } = this.gameState;

    return;

    
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
    */

  tick({ screenSize, colourise }: TickOptions<RoomId>): void {
    this.#updateElementPositions(screenSize);
    for (const b of objectValues(this.#hudElements.buttons)) {
      b.tick({ colourise });
    }
    //this.#updateShowAndHide();
    this.#hudElements.joystick.tick(colourise);
  }

  get container() {
    return this.#container;
  }

  destroy() {
    this.#container.destroy();
  }
}
export const buttonSpriteSize = spritesheetData.frames.button.frame;
