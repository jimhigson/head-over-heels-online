import type { SetRequired } from "type-fest";

import { objectValues } from "iter-tools-es";
import { Container } from "pixi.js";

import type { InputDirectionMode } from "../../../store/slices/gameMenus/gameMenusSlice";
import type { Xy } from "../../../utils/vectors/vectors";
import type { Renderer } from "../Renderer";
import type { GeneralRenderContext } from "../room/RoomRenderContexts";
import type { HudRendererTickContext } from "./hudRendererContexts";
import type { ButtonType } from "./OnScreenButtonRenderer";

import { spritesheetData } from "../../../sprites/spriteSheetData";
import { selectCurrentPlayableItem } from "../../gameState/gameStateSelectors/selectPlayableItem";
import { OnScreenButtonRenderer } from "./OnScreenButtonRenderer";
import { OnScreenJoystickRenderer } from "./OnScreenJoystickRenderer";
import { OnScreenLookRenderer } from "./OnScreenLookRenderer";

const mainButtonsSpreadXPx = 30;
const mainButtonsSpreadYPx = 15;
const joystickX = 42;
const joystickYFromBottom = 36;
const mainNextXFromRightEdge = 44;
const mainNextYFromBottom = 20;

type OnScreenControlsRenderContext<RoomId extends string> = {
  /**
   * for HUDs, there really must be a game playing, so set the (usually optional) gameState to required
   */
  general: SetRequired<GeneralRenderContext<RoomId>, "gameState">;
  inputDirectionMode: InputDirectionMode;
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
      general: {
        gameState: { inputStateTracker },
      },
      inputDirectionMode,
      general,
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
          general,
          inputStateTracker,
        }),
        fire: new OnScreenButtonRenderer({
          button: { which: "fire", actions: ["fire"], id: "fire" },
          general,
          inputStateTracker,
        }),
        carry: new OnScreenButtonRenderer({
          button: { which: "carry", actions: ["carry"], id: "carry" },
          general,
          inputStateTracker,
        }),
        carryAndJump: new OnScreenButtonRenderer({
          button: {
            which: "carryAndJump",
            actions: ["carry", "jump"],
            id: "carryAndJump",
          },
          general,
          inputStateTracker,
        }),
        menu: new OnScreenButtonRenderer({
          button: { which: "menu", actions: ["menu_openOrExit"], id: "menu" },
          general,
          inputStateTracker,
        }),
        map: new OnScreenButtonRenderer({
          button: { which: "map", actions: ["map"], id: "map" },
          general,
          inputStateTracker,
        }),
      } satisfies {
        [BT in ButtonType]: OnScreenButtonRenderer<BT, RoomId>;
      },
      joystick: new OnScreenJoystickRenderer({
        inputStateTracker,
        inputDirectionMode,
        general,
      }),
      look: new OnScreenLookRenderer({
        inputStateTracker,
        general,
      }),
    };

    this.#hudElements.look.joystickRenderer = this.#hudElements.joystick;
    this.#hudElements.joystick.lookRenderer = this.#hudElements.look;

    this.#initAddToScene();
    this.#initInteractivity();
  }

  #initAddToScene() {
    const { buttons } = this.#hudElements;

    const { mainButtonNest, joystick, look } = this.#hudElements;

    // sits behind everything else, so has to be added first
    this.#container.addChild(look.output);

    for (const {
      renderContext: {
        button: { which },
      },
      output,
    } of objectValues(buttons)) {
      if (which === "menu" || which === "map") {
        this.#container.addChild(output);
      } else {
        mainButtonNest.addChild(output);
      }
    }

    buttons.jump.output.y = mainButtonsSpreadYPx;
    buttons.carry.output.x = -mainButtonsSpreadXPx;
    buttons.carryAndJump.output.y = -mainButtonsSpreadYPx;
    buttons.fire.output.x = mainButtonsSpreadXPx;

    buttons.menu.output.x = 24;
    buttons.menu.output.y = 24;
    buttons.map.output.y = 16;

    this.#container.addChild(mainButtonNest);
    this.#container.addChild(joystick.output);
  }

  #initInteractivity() {
    const {
      renderContext: {
        general: {
          gameState: { inputStateTracker },
        },
      },
    } = this;

    for (const buttonRenderer of objectValues(this.#hudElements.buttons)) {
      const {
        renderContext: {
          button: { actions },
        },
      } = buttonRenderer;

      buttonRenderer.output.eventMode = "static";
      buttonRenderer.output.on("pointerdown", () => {
        for (const a of actions) {
          inputStateTracker.hudInputState[a] = true;
        }
      });
      buttonRenderer.output.on("pointerup", () => {
        for (const a of actions) {
          inputStateTracker.hudInputState[a] = false;
        }
      });
      buttonRenderer.output.on("pointerleave", () => {
        for (const a of actions) {
          inputStateTracker.hudInputState[a] = false;
        }
      });
    }
  }

  /* change the position of elements in the hud (ie, to adjust to different screen sizes) */
  #updateElementPositions(screenSize: Xy) {
    this.#hudElements.mainButtonNest.x = screenSize.x - mainNextXFromRightEdge;
    this.#hudElements.mainButtonNest.y = screenSize.y - mainNextYFromBottom;

    this.#hudElements.joystick.output.x = joystickX;
    this.#hudElements.joystick.output.y = screenSize.y - joystickYFromBottom;

    this.#hudElements.buttons.map.output.x = screenSize.x - 4 * 8;
  }

  tick(tickContext: HudRendererTickContext<RoomId, RoomItemId>): void {
    const { screenSize } = tickContext;
    const {
      general: { gameState },
    } = this.renderContext;

    this.#updateElementPositions(screenSize);
    for (const b of objectValues(this.#hudElements.buttons)) {
      b.tick({
        ...tickContext,
        currentPlayable: selectCurrentPlayableItem(gameState),
      });
    }
    this.#hudElements.joystick.tick();
    this.#hudElements.look.tick(tickContext);
  }

  get output() {
    return this.#container;
  }

  destroy() {
    this.#container.destroy();
    this.#hudElements.joystick.destroy();
    this.#hudElements.look.destroy();
  }
}
export const buttonSpriteSize = spritesheetData.frames.button.frame;
