import type { FederatedPointerEvent } from "pixi.js";

import { Container, Graphics } from "pixi.js";

import type { RoomState } from "../../../../model/RoomState";
import type { InputDirectionMode } from "../../../../store/slices/gameMenus/gameMenusSlice";
import type { Xy } from "../../../../utils/vectors/vectors";
import type { Renderer } from "../../Renderer";
import type { GeneralRenderContext } from "../../room/RoomRenderContexts";
import type { HudRendererTickContextWithRoom } from "../hudRendererContexts";
import type { OnScreenLookRenderer } from "./look/OnScreenLookRenderer";

import { getSpriteSheetVariantTexture } from "../../../../sprites/spritesheet/variants/getSpriteSheetVariant";
import { selectTotalUpscale } from "../../../../store/slices/upscale/upscaleSlice";
import { store } from "../../../../store/store";
import { objectEntriesIter } from "../../../../utils/entries";
import {
  type DirectionXy8,
  lengthXyz,
  originXyz,
  scaleXyz,
  vectorClosestDirectionXy8,
} from "../../../../utils/vectors/vectors";
import { charHeight } from "../../../components/dialogs/menuDialog/dialogs/useScrollingFromInput";
import {
  lightlySnapXy4,
  rotateInputVector45,
} from "../../../input/analogueControlAdjustments";
import {
  analogueDeadzone,
  type InputStateTrackerInterface,
} from "../../../input/InputStateTracker";
import { createSprite } from "../../createSprite";
import { TextContainer } from "../../text/TextContainer";
import { tintForHud } from "../spritesheetVariantForHud";
import { setPointerXyMaybeRotated } from "./look/setPointerXyMaybeRotated";

const joystickArrowOffset = 14;
const sensitivity = 2;

/** avoid gc */
const xyPositionBuffer: Xy = { x: -1, y: -1 };

type JoystickRenderContext = {
  inputStateTracker: InputStateTrackerInterface;
  inputDirectionMode: InputDirectionMode;
  general: GeneralRenderContext<string>;
};

/**
 * how much to snap by for the sake of biasing to make the cardinal directions
 * easier to hit
 */
const snapCosineThreshold = Math.cos(30 * (Math.PI / 180));

const joystickFurthestTouchRadius = 55;
const fullyTransparentHex = "#00000000";
export class OnScreenJoystickRenderer
  implements
    Renderer<
      JoystickRenderContext,
      HudRendererTickContextWithRoom<string, string>,
      Container
    >
{
  output = new Container({ label: "OnScreenJoystick", eventMode: "static" });

  #arrowSprites: Partial<Record<DirectionXy8, Container>>;

  #joystickSprite;

  #curPointerId: number | undefined;

  #lookRenderer: OnScreenLookRenderer | undefined;

  #roomRenderedIn: RoomState<string, string> | undefined;

  constructor(public readonly renderContext: JoystickRenderContext) {
    const {
      inputDirectionMode,
      general: { colourised, pixiRenderer },
    } = renderContext;

    this.#joystickSprite = createSprite({
      textureId: "joystick.whole",
      anchor: { x: 0.5, y: 0.5 },
      y: 1,
      spritesheetVariant: colourised ? "for-current-room" : "uncolourised",
    });

    this.#arrowSprites = {
      away: new TextContainer({
        pixiRenderer,
        outline: true,
        x: joystickArrowOffset,
        y: -joystickArrowOffset,
        text: "↗",
      }),
      right: new TextContainer({
        pixiRenderer,
        outline: true,
        x: joystickArrowOffset,
        y: joystickArrowOffset,
        text: "↘",
      }),
      towards: new TextContainer({
        pixiRenderer,
        outline: true,
        x: -joystickArrowOffset,
        y: joystickArrowOffset,
        text: "↙",
      }),
      left: new TextContainer({
        pixiRenderer,
        outline: true,
        x: -joystickArrowOffset,
        y: -joystickArrowOffset,
        text: "↖",
      }),
      ...(inputDirectionMode !== "4-way" ?
        {
          awayRight: new TextContainer({
            pixiRenderer,
            outline: true,
            x: joystickArrowOffset * Math.SQRT2,
            text: "➡",
          }),
          towardsRight: new TextContainer({
            pixiRenderer,
            outline: true,
            y: joystickArrowOffset * Math.SQRT2,
            text: "⬇",
          }),
          towardsLeft: new TextContainer({
            pixiRenderer,
            outline: true,
            x: -joystickArrowOffset * Math.SQRT2,
            text: "⬅",
          }),
          awayLeft: new TextContainer({
            pixiRenderer,
            outline: true,
            y: -joystickArrowOffset * Math.SQRT2,
            text: "⬆",
          }),
        }
      : {}),
    };

    this.output.addChild(this.#joystickSprite);

    this.output.addChild(
      new Graphics()
        .circle(0, 0, joystickFurthestTouchRadius)
        .fill(fullyTransparentHex),
    );
    this.output.addChild(
      new Container({
        children: Object.values(this.#arrowSprites),
        y: charHeight / 2,
      }),
    );

    this.output.on("touchstart", this.handleTouchStart);
    this.output.on("mousedown", this.handleTouchStart);
    // by using global, we can detect a touch that started on the joystick
    // even if it wanders off of it

    this.output.on("touchend", this.stopCurrentPointer);
    this.output.on("touchendoutside", this.stopCurrentPointer);
    this.output.on("mouseup", this.stopCurrentPointer);
    this.output.on("mouseupoutside", this.stopCurrentPointer);
  }

  handleTouchStart = (e: FederatedPointerEvent) => {
    // already handling a touch:
    if (this.#curPointerId !== undefined) {
      // switching from an old touch to a new one
      this.stopCurrentPointer();
    }

    if (this.#lookRenderer!.curPointerId === e.pointerId) {
      // being handled by the look renderer
      return;
    }

    // allows tapping without movement:
    this.#curPointerId = e.pointerId;
    this.usePointerLocation(e);
    this.output.on("globalpointermove", this.usePointerLocation);
  };

  stopCurrentPointer = () => {
    this.#curPointerId = undefined;
    this.renderContext.inputStateTracker.hudInputState.directionVector =
      originXyz;
    this.output.off("globalpointermove", this.usePointerLocation);
  };

  /**
   * get the location from the event (if it is the current pointer,
   * ie started on the joystick) and send it to the input tracker
   */
  usePointerLocation = (e: FederatedPointerEvent) => {
    if (e.pointerId !== this.#curPointerId) return;

    const {
      rotate90,
      gameEngineScreenSize: { y: gameEngineScreenSizeY },
    } = this.renderContext.general.upscale;
    const scale = selectTotalUpscale(store.getState());

    const { x: containerX, y: containerY } = this.output;

    const joyCentreX = containerX;
    const joyCentreY =
      rotate90 ? gameEngineScreenSizeY - containerY : containerY;

    const { x: ex, y: ey } = setPointerXyMaybeRotated(
      e,
      rotate90,
      xyPositionBuffer,
    );

    const exScaled = ex / scale;
    const eyScaled = ey / scale;

    const { width: containerWidth, height: containerHeight } =
      this.output.getLocalBounds();

    // get x/y relative to joystick centre, at joystick's scale:
    const joyX = (exScaled - joyCentreX) / (containerWidth / 2);
    const joyY =
      ((eyScaled - joyCentreY) / (containerHeight / 2)) * (rotate90 ? -1 : 1);

    const onScreenDirectionVector = rotateInputVector45({
      x: -joyX,
      y: -joyY,
      z: 0,
    });

    this.renderContext.inputStateTracker.hudInputState.directionVector =
      scaleXyz(
        lightlySnapXy4(onScreenDirectionVector, snapCosineThreshold),
        sensitivity,
      );
  };

  tick({ room }: HudRendererTickContextWithRoom<string, string>): void {
    const {
      renderContext: {
        general: { colourised },
        inputStateTracker: { directionVector },
      },
    } = this;

    if (this.#roomRenderedIn !== room) {
      this.#joystickSprite.texture = getSpriteSheetVariantTexture(
        colourised ? "for-current-room" : "uncolourised",
        "joystick.whole",
      );
      this.#roomRenderedIn = room;
    }

    const menusOpen = store.getState().gameMenus.openMenus.length > 0;

    if (menusOpen) {
      this.stopCurrentPointer();
      return;
    }

    const highlightDirectionXy8 =
      lengthXyz(directionVector) > analogueDeadzone ?
        vectorClosestDirectionXy8(directionVector)
      : undefined;

    const activeTint = tintForHud(colourised, room.color, true);
    const notActiveTint = tintForHud(colourised, room.color, false);

    for (const [directionXy8, sprite] of objectEntriesIter(
      this.#arrowSprites,
    )) {
      sprite.tint =
        directionXy8 === highlightDirectionXy8 ? activeTint : notActiveTint;
    }
  }

  get curPointerId() {
    return this.#curPointerId;
  }

  set lookRenderer(renderer: OnScreenLookRenderer) {
    this.#lookRenderer = renderer;
  }

  destroy() {
    this.stopCurrentPointer();
    this.output.off("touchstart", this.handleTouchStart);
    this.output.off("mousedown", this.handleTouchStart);

    this.output.off("touchend", this.stopCurrentPointer);
    this.output.off("touchendoutside", this.stopCurrentPointer);
    this.output.off("mouseup", this.stopCurrentPointer);
    this.output.off("mouseupoutside", this.stopCurrentPointer);
    this.output.destroy();
  }
}
