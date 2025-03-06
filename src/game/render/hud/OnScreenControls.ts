import { Container } from "pixi.js";

import type { Xy } from "../../../utils/vectors/vectors";
import type { GameState } from "../../gameState/GameState";

import type { TickOptions } from "./HudRenderer";
import { objectValues } from "iter-tools";
import { OnScreenJoystick } from "./OnScreenJoystick";
import type { ButtonType } from "./OnScreenButton";
import { ButtonAppearanceRenderer } from "./OnScreenButton";
import { spritesheetData } from "../../../sprites/spriteSheetData";

const mainButtonsSpreadXPx = 28;
const mainButtonsSpreadYPx = 14;

export class OnScreenControls<RoomId extends string> {
  #container = new Container({ label: "OnScreenControls" });

  #hudElements;

  constructor(private gameState: GameState<RoomId>) {
    this.#hudElements = {
      mainButtonNest: new Container({ label: "mainButtonNest" }),
      buttons: {
        jump: new ButtonAppearanceRenderer(
          { which: "jump", actions: ["jump"], colour: "blue", id: "jump" },
          gameState,
        ),
        fire: new ButtonAppearanceRenderer(
          { which: "fire", actions: ["fire"], colour: "yellow", id: "fire" },
          gameState,
        ),
        carry: new ButtonAppearanceRenderer(
          { which: "carry", actions: ["carry"], colour: "green", id: "carry" },
          gameState,
        ),
        carryAndJump: new ButtonAppearanceRenderer(
          {
            which: "carryAndJump",
            actions: ["carry", "jump"],
            colour: "red",
            id: "carryAndJump",
          },
          gameState,
        ),
      } satisfies {
        [N in ButtonType]: ButtonAppearanceRenderer<N, RoomId>;
      },
      joystick: new OnScreenJoystick(gameState.inputStateTracker),
    };

    const { buttons } = this.#hudElements;

    const { mainButtonNest, joystick } = this.#hudElements;

    for (const b of objectValues(buttons)) {
      mainButtonNest.addChild(b.container);
    }

    buttons.jump.container.y = mainButtonsSpreadYPx;
    buttons.carry.container.x = -mainButtonsSpreadXPx;
    buttons.carryAndJump.container.y = -mainButtonsSpreadYPx;
    buttons.fire.container.x = mainButtonsSpreadXPx;

    // buttons.menu.container.x = 24;
    // buttons.menu.container.y = 24;
    // buttons.menu.container.scale = 2;
    // buttons.menu.container.filters = hudLowlightAndOutlineFilters;

    this.#container.addChild(mainButtonNest);
    // this.#container.addChild(buttons.menu.container);
    this.#container.addChild(joystick.container);

    this.#initInteractivity();
  }

  #initInteractivity() {
    const {
      gameState: { inputStateTracker },
    } = this;

    for (const buttonRenderer of objectValues(this.#hudElements.buttons)) {
      const {
        button: { actions },
      } = buttonRenderer;

      buttonRenderer.container.eventMode = "static";
      buttonRenderer.container.on("pointerdown", () => {
        for (const a of actions) {
          inputStateTracker.hudInputState[a] = true;
        }
      });
      buttonRenderer.container.on("pointerup", () => {
        for (const a of actions) {
          inputStateTracker.hudInputState[a] = false;
        }
      });
      buttonRenderer.container.on("pointerleave", () => {
        for (const a of actions) {
          inputStateTracker.hudInputState[a] = false;
        }
      });
    }
  }

  /* change the position of elements in the hud (ie, to adjust to different screen sizes) */
  #updateElementPositions(screenSize: Xy) {
    const offsetFromSides = buttonSpriteSize.w + mainButtonsSpreadXPx;
    this.#hudElements.mainButtonNest.x = screenSize.x - offsetFromSides;
    this.#hudElements.mainButtonNest.y = screenSize.y - 14;

    this.#hudElements.joystick.container.x = offsetFromSides - 6;
    this.#hudElements.joystick.container.y = screenSize.y - 28;
  }

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
