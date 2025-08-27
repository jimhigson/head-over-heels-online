import type { FederatedPointerEvent } from "pixi.js";
import type { EmptyObject } from "type-fest";

import { objectValues } from "iter-tools";
import { Container, Graphics } from "pixi.js";

import type { InputDirectionMode } from "../../../store/slices/gameMenusSlice";
import type { Renderer } from "../Renderer";
import type { GeneralRenderContext } from "../RoomRenderContexts";
import type { OnScreenLookRenderer } from "./OnScreenLookRenderer";
import type { PointerGrabbingRender } from "./PointerGrabbingRenderer";

import { selectTotalUpscale } from "../../../store/slices/upscale/upscaleSlice";
import { store } from "../../../store/store";
import { objectEntriesIter } from "../../../utils/entries";
import {
  type DirectionXy8,
  lengthXyz,
  originXyz,
  scaleXyz,
  vectorClosestDirectionXy8,
} from "../../../utils/vectors/vectors";
import {
  lightlySnapXy4,
  rotateInputVector45,
} from "../../input/analogueControlAdjustments";
import {
  analogueDeadzone,
  type InputStateTrackerInterface,
} from "../../input/InputStateTracker";
import { createSprite } from "../createSprite";
import { noFilters } from "../filters/standardFilters";
import {
  hudHighlightAndOutlineFilters,
  hudLowlightAndOutlineFilters,
  hudLowlightedFilter,
} from "./hudFilters";

const joystickArrowOffset = 14;
const sensitivity = 2;

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

const joystickFurthestTouchRadius = 40;
export class OnScreenJoystickRenderer
  implements
    Renderer<JoystickRenderContext, EmptyObject, Container>,
    PointerGrabbingRender
{
  output = new Container({ label: "OnScreenJoystick", eventMode: "static" });

  #arrowSprites: Partial<Record<DirectionXy8, Container>>;

  #joystickSprite = createSprite({
    textureId: "joystick",
    anchor: { x: 0.5, y: 0.5 },
    y: 1,
  });

  #curPointerId: number | undefined;

  #lookRenderer: OnScreenLookRenderer | undefined;

  constructor(public readonly renderContext: JoystickRenderContext) {
    const {
      inputDirectionMode,
      general: { colourised },
    } = renderContext;

    this.#arrowSprites = {
      away: createSprite({
        textureId: "hud.char.↗",
        anchor: { x: 0.5, y: 0.5 },
        x: joystickArrowOffset,
        y: -joystickArrowOffset,
        filter: hudLowlightAndOutlineFilters,
      }),
      right: createSprite({
        textureId: "hud.char.↘",
        anchor: { x: 0.5, y: 0.5 },
        x: joystickArrowOffset,
        y: joystickArrowOffset,
        filter: hudLowlightAndOutlineFilters,
      }),
      towards: createSprite({
        textureId: "hud.char.↙",
        anchor: { x: 0.5, y: 0.5 },
        x: -joystickArrowOffset,
        y: joystickArrowOffset,
        filter: hudLowlightAndOutlineFilters,
      }),
      left: createSprite({
        textureId: "hud.char.↖",
        anchor: { x: 0.5, y: 0.5 },
        x: -joystickArrowOffset,
        y: -joystickArrowOffset,
        filter: hudLowlightAndOutlineFilters,
      }),
      ...(inputDirectionMode !== "4-way" ?
        {
          awayRight: createSprite({
            textureId: "hud.char.➡",
            anchor: { x: 0.5, y: 0.5 },
            x: joystickArrowOffset * Math.SQRT2,
            filter: hudLowlightAndOutlineFilters,
          }),
          towardsRight: createSprite({
            textureId: "hud.char.⬇",
            anchor: { x: 0.5, y: 0.5 },
            y: joystickArrowOffset * Math.SQRT2,
            filter: hudLowlightAndOutlineFilters,
          }),
          towardsLeft: createSprite({
            textureId: "hud.char.⬅",
            anchor: { x: 0.5, y: 0.5 },
            x: -joystickArrowOffset * Math.SQRT2,
            filter: hudLowlightAndOutlineFilters,
          }),
          awayLeft: createSprite({
            textureId: "hud.char.⬆",
            anchor: { x: 0.5, y: 0.5 },
            y: -joystickArrowOffset * Math.SQRT2,
            filter: hudLowlightAndOutlineFilters,
          }),
        }
      : {}),
    };

    this.output.addChild(this.#joystickSprite);

    this.output.addChild(
      new Graphics()
        .circle(0, 0, joystickFurthestTouchRadius)
        .fill("#00000000"),
    );
    for (const arrowSprite of objectValues(this.#arrowSprites)) {
      this.output.addChild(arrowSprite);
    }

    this.output.on("pointerenter", this.handlePointerEnter);
    // by using global, we can detect a pointer that started on the joystick
    // even if it wanders off of it

    this.output.on("pointerup", this.stopCurrentPointer);
    this.output.on("pointerupoutside", this.stopCurrentPointer);

    this.#joystickSprite.filters = colourised ? noFilters : hudLowlightedFilter;
  }

  handlePointerEnter = (e: FederatedPointerEvent) => {
    // already handling a pointer:
    if (this.#curPointerId !== undefined) {
      // switching from an old pointer to a new one
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

    const scale = selectTotalUpscale(store.getState());

    const { x: containerX, y: containerY } = this.output;
    const { x: eventX, y: eventY } = e;

    const { width: containerWidth, height: containerHeight } =
      this.output.getLocalBounds();

    // get x/y relative to joystick centre, at joystick's scale:
    const joyX = (eventX / scale - containerX) / (containerWidth / 2);
    const joyY = (eventY / scale - containerY) / (containerHeight / 2);

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

  tick() {
    const {
      renderContext: {
        inputStateTracker: { directionVector },
      },
    } = this;
    const menusOpen = store.getState().gameMenus.openMenus.length > 0;

    if (menusOpen) {
      this.stopCurrentPointer();
      return;
    }

    const highlightDirectionXy8 =
      lengthXyz(directionVector) > analogueDeadzone ?
        vectorClosestDirectionXy8(directionVector)
      : undefined;

    for (const [directionXy8, sprite] of objectEntriesIter(
      this.#arrowSprites,
    )) {
      sprite.filters =
        directionXy8 === highlightDirectionXy8 ?
          hudHighlightAndOutlineFilters
        : hudLowlightAndOutlineFilters;
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
    this.output.off("pointerenter", this.handlePointerEnter);
    this.output.off("pointerup", this.stopCurrentPointer);
    this.output.off("pointerupoutside", this.stopCurrentPointer);
    this.output.destroy();
  }
}
