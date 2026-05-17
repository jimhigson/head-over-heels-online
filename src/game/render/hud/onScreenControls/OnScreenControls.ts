import { Container } from "pixi.js";
import { type SetRequired } from "type-fest";

import { type InputDirectionMode } from "../../../../store/slices/userSettings/userSettingsSlice";
import { valuesIter } from "../../../../utils/entries";
import { type Xy } from "../../../../utils/vectors/vectors";
import { selectCurrentPlayableItem } from "../../../gameState/gameStateSelectors/selectPlayableItem";
import { type Renderer } from "../../Renderer";
import { type GeneralRenderContext } from "../../room/RoomRenderContexts";
import { HudButtonRenderer } from "../HudButtonRenderer";
import { type HudRendererTickContextWithRoom } from "../hudRendererContexts";
import { carryAndJumpButtonAppearance } from "./buttonAppearances/carryAndJumpButtonAppearance";
import { carryButtonAppearance } from "./buttonAppearances/carryButtonAppearance";
import { fireButtonAppearance } from "./buttonAppearances/fireButtonAppearance";
import { jumpButtonAppearance } from "./buttonAppearances/jumpButtonAppearance";
import { OnScreenLookRenderer } from "./look/OnScreenLookRenderer";
import { OnScreenJoystickRenderer } from "./OnScreenJoystickRenderer";

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
      HudRendererTickContextWithRoom<RoomId, RoomItemId>,
      Container
    >
{
  #container = new Container({ label: "OnScreenControls" });

  #hudElements;

  readonly renderContext: OnScreenControlsRenderContext<RoomId>;

  constructor(renderContext: OnScreenControlsRenderContext<RoomId>) {
    this.renderContext = renderContext;
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
        jump: new HudButtonRenderer(
          {
            button: {
              which: "jump",
              actions: ["jump"],
              id: "jump",
            },
            general,
            inputStateTracker,
          },
          jumpButtonAppearance,
        ),
        fire: new HudButtonRenderer(
          {
            button: { which: "fire", actions: ["fire"], id: "fire" },
            general,
            inputStateTracker,
          },
          fireButtonAppearance,
        ),
        carry: new HudButtonRenderer(
          {
            button: { which: "carry", actions: ["carry"], id: "carry" },
            general,
            inputStateTracker,
          },
          carryButtonAppearance,
        ),
        carryAndJump: new HudButtonRenderer(
          {
            button: {
              which: "carryAndJump",
              actions: ["carry", "jump"],
              id: "carryAndJump",
            },
            general,
            inputStateTracker,
          },
          carryAndJumpButtonAppearance,
        ),
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

    for (const { output } of valuesIter(buttons)) {
      mainButtonNest.addChild(output);
    }

    buttons.jump.output.y = mainButtonsSpreadYPx;
    buttons.carry.output.x = -mainButtonsSpreadXPx;
    buttons.carryAndJump.output.y = -mainButtonsSpreadYPx;
    buttons.fire.output.x = mainButtonsSpreadXPx;

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

    for (const buttonRenderer of valuesIter(this.#hudElements.buttons)) {
      const {
        renderContext: {
          button: { actions },
        },
      } = buttonRenderer;

      buttonRenderer.output.on("pointerdown", () => {
        for (const action of actions) {
          inputStateTracker.hudInputState[action] = true;
        }
      });
      buttonRenderer.output.on("pointerup", () => {
        for (const action of actions) {
          inputStateTracker.hudInputState[action] = false;
        }
      });
      buttonRenderer.output.on("pointerleave", () => {
        for (const action of actions) {
          inputStateTracker.hudInputState[action] = false;
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
  }

  tick(tickContext: HudRendererTickContextWithRoom<RoomId, RoomItemId>): void {
    const { screenSize } = tickContext;
    const {
      general: { gameState },
    } = this.renderContext;

    this.#updateElementPositions(screenSize);

    this.#hudElements.mainButtonNest.visible = !tickContext.paused;
    this.#hudElements.joystick.output.visible = !tickContext.paused;

    for (const b of valuesIter(this.#hudElements.buttons)) {
      b.tick({
        ...tickContext,
        currentPlayable: selectCurrentPlayableItem(gameState),
      });
    }
    this.#hudElements.joystick.tick(tickContext);
    this.#hudElements.look.tick(tickContext);
  }

  get output() {
    return this.#container;
  }

  destroy() {
    this.#hudElements.joystick.destroy();
    this.#hudElements.look.destroy();
    this.#container.destroy({ children: true });
  }
}
