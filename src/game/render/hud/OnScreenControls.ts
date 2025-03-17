import { Container } from "pixi.js";

import type { Xy } from "../../../utils/vectors/vectors";
import type { GameState } from "../../gameState/GameState";

import { objectValues } from "iter-tools";
import { OnScreenJoystickRenderer } from "./OnScreenJoystick";
import type { ButtonType } from "./OnScreenButtonRenderer";
import { OnScreenButtonRenderer } from "./OnScreenButtonRenderer";
import { spritesheetData } from "../../../sprites/spriteSheetData";
import type { InputDirectionMode } from "../../../store/slices/gameMenusSlice";
import type { Renderer } from "../Renderer";
import type { HudRendererTickContext } from "./HudRenderer";
import { selectCurrentPlayableItem } from "../../gameState/gameStateSelectors/selectPlayableItem";

const mainButtonsSpreadXPx = 30;
const mainButtonsSpreadYPx = 15;

type OnScreenControlsRenderContext<RoomId extends string> = {
  gameState: GameState<RoomId>;
  inputDirectionMode: InputDirectionMode;
  colourise: boolean;
};

export class OnScreenControls<RoomId extends string, RoomItemId extends string>
  implements
    Renderer<
      OnScreenControlsRenderContext<RoomId>,
      HudRendererTickContext<RoomId, RoomItemId>,
      Container
    >
{
  #container = new Container({ label: "OnScreenControls" });

  #hudElements;

  constructor(
    public readonly renderContext: OnScreenControlsRenderContext<RoomId>,
  ) {
    const {
      gameState: { inputStateTracker },
      inputDirectionMode,
      colourise,
    } = renderContext;

    this.#hudElements = {
      mainButtonNest: new Container({ label: "mainButtonNest" }),
      buttons: {
        jump: new OnScreenButtonRenderer({
          button: {
            which: "jump",
            actions: ["jump"],
            id: "jump",
          },
          colourise,
          inputStateTracker,
        }),
        fire: new OnScreenButtonRenderer({
          button: { which: "fire", actions: ["fire"], id: "fire" },
          colourise,
          inputStateTracker,
        }),
        carry: new OnScreenButtonRenderer({
          button: { which: "carry", actions: ["carry"], id: "carry" },
          colourise,
          inputStateTracker,
        }),
        carryAndJump: new OnScreenButtonRenderer({
          button: {
            which: "carryAndJump",
            actions: ["carry", "jump"],
            id: "carryAndJump",
          },
          colourise,
          inputStateTracker,
        }),
        menu: new OnScreenButtonRenderer({
          button: { which: "menu", actions: ["menu_openOrExit"], id: "menu" },
          colourise,
          inputStateTracker,
        }),
      } satisfies {
        [BT in ButtonType]: OnScreenButtonRenderer<BT, RoomId, RoomItemId>;
      },
      joystick: new OnScreenJoystickRenderer({
        inputStateTracker,
        inputDirectionMode,
        colourise,
      }),
    };

    const { buttons } = this.#hudElements;

    const { mainButtonNest, joystick } = this.#hudElements;

    for (const b of objectValues(buttons)) {
      if (b.renderContext.button.which === "menu") {
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
      renderContext: {
        gameState: { inputStateTracker },
      },
    } = this;

    for (const buttonRenderer of objectValues(this.#hudElements.buttons)) {
      const {
        renderContext: {
          button: { actions },
        },
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
    this.#hudElements.mainButtonNest.x = screenSize.x - 44;
    this.#hudElements.mainButtonNest.y = screenSize.y - 14;

    this.#hudElements.joystick.container.x = 32;
    this.#hudElements.joystick.container.y = screenSize.y - 28;
  }

  tick(tickContext: HudRendererTickContext<RoomId, RoomItemId>): void {
    const { screenSize } = tickContext;
    const { gameState } = this.renderContext;

    this.#updateElementPositions(screenSize);
    for (const b of objectValues(this.#hudElements.buttons)) {
      b.tick({
        ...tickContext,
        currentPlayable: selectCurrentPlayableItem(gameState),
      });
    }
    this.#hudElements.joystick.tick();
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
