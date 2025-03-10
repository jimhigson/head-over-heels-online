import { Container } from "pixi.js";

import type { Xy } from "../../../utils/vectors/vectors";
import type { GameState } from "../../gameState/GameState";

import type { HudRendererTickOptions } from "./HudRenderer";
import { objectValues } from "iter-tools";
import { OnScreenJoystick } from "./OnScreenJoystick";
import type { ButtonType } from "./OnScreenButtonRenderer";
import { OnScreenButtonRenderer } from "./OnScreenButtonRenderer";
import { spritesheetData } from "../../../sprites/spriteSheetData";
import type { InputDirectionMode } from "../../../store/slices/gameMenusSlice";

const mainButtonsSpreadXPx = 26;
const mainButtonsSpreadYPx = 13;

export class OnScreenControls<RoomId extends string> {
  #container = new Container({ label: "OnScreenControls" });

  #hudElements;

  constructor(
    private gameState: GameState<RoomId>,
    private colourise: boolean,
    private inputDirectionMode: InputDirectionMode,
  ) {
    this.#hudElements = {
      mainButtonNest: new Container({ label: "mainButtonNest" }),
      buttons: {
        jump: new OnScreenButtonRenderer(
          { which: "jump", actions: ["jump"], id: "jump" },
          gameState,
        ),
        fire: new OnScreenButtonRenderer(
          { which: "fire", actions: ["fire"], id: "fire" },
          gameState,
        ),
        carry: new OnScreenButtonRenderer(
          { which: "carry", actions: ["carry"], id: "carry" },
          gameState,
        ),
        carryAndJump: new OnScreenButtonRenderer(
          {
            which: "carryAndJump",
            actions: ["carry", "jump"],
            id: "carryAndJump",
          },
          gameState,
        ),
        menu: new OnScreenButtonRenderer(
          {
            which: "menu",
            actions: ["menu_openOrExit"],
            id: "menu",
          },
          gameState,
        ),
      } satisfies {
        [N in ButtonType]: OnScreenButtonRenderer<N, RoomId>;
      },
      joystick: new OnScreenJoystick(
        gameState.inputStateTracker,
        inputDirectionMode,
      ),
    };

    const { buttons } = this.#hudElements;

    const { mainButtonNest, joystick } = this.#hudElements;

    for (const b of objectValues(buttons)) {
      if (b.button.which === "menu") {
        this.#container.addChild(buttons.menu.container);
      } else {
        mainButtonNest.addChild(b.container);
      }
    }

    buttons.jump.container.y = mainButtonsSpreadYPx;
    buttons.carry.container.x = -mainButtonsSpreadXPx;
    buttons.carryAndJump.container.y = -mainButtonsSpreadYPx;
    buttons.fire.container.x = mainButtonsSpreadXPx;

    buttons.menu.container.x = 24;
    buttons.menu.container.y = 24;

    this.#container.addChild(mainButtonNest);
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
    this.#hudElements.mainButtonNest.x = screenSize.x - 40;
    this.#hudElements.mainButtonNest.y = screenSize.y - 14;

    this.#hudElements.joystick.container.x = 32;
    this.#hudElements.joystick.container.y = screenSize.y - 28;
  }

  tick({ screenSize }: HudRendererTickOptions<RoomId>): void {
    this.#updateElementPositions(screenSize);
    for (const b of objectValues(this.#hudElements.buttons)) {
      b.tick({ colourise: this.colourise });
    }
    //this.#updateShowAndHide();
    this.#hudElements.joystick.tick(this.colourise);
  }

  get container() {
    return this.#container;
  }

  destroy() {
    this.#container.destroy();
    this.#hudElements.joystick.destroy();
  }
}
export const buttonSpriteSize = spritesheetData.frames.button.frame;
