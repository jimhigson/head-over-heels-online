import type { FederatedPointerEvent } from "pixi.js";
import { Container, Graphics } from "pixi.js";
import { createSprite } from "../createSprite";
import { store } from "../../../store/store";
import { selectTotalUpscale } from "../../../store/selectors";
import { objectValues } from "iter-tools";
import {
  lengthXyz,
  originXyz,
  scaleXyz,
  vectorClosestDirectionXy8,
  type DirectionXy8,
} from "../../../utils/vectors/vectors";
import {
  analogueDeadzone,
  type InputStateTrackerInterface,
} from "../../input/InputStateTracker";
import { rotateInputVector45 } from "../../input/analogueControlAdjustments";
import {
  hudHighlightAndOutlineFilters,
  hudLowlightAndOutlineFilters,
  hudLowlightedFilter,
} from "./hudFilters";
import { entries } from "../../../utils/entries";
import { noFilters } from "../filters/standardFilters";

const joystickArrowOffset = 13;
const sensitivity = 2;

export class OnScreenJoystick {
  container = new Container({ label: "OnScreenJoystick", eventMode: "static" });

  arrowSprites: Record<DirectionXy8, Container> = {
    away: createSprite({
      textureId: "hud.char.↗",
      anchor: { x: 0.5, y: 0.5 },
      x: joystickArrowOffset,
      y: -joystickArrowOffset,
      filter: hudLowlightAndOutlineFilters,
    }),
    awayRight: createSprite({
      textureId: "hud.char.➡",
      anchor: { x: 0.5, y: 0.5 },
      x: joystickArrowOffset * Math.SQRT2,
      filter: hudLowlightAndOutlineFilters,
    }),
    right: createSprite({
      textureId: "hud.char.↘",
      anchor: { x: 0.5, y: 0.5 },
      x: joystickArrowOffset,
      y: joystickArrowOffset,
      filter: hudLowlightAndOutlineFilters,
    }),
    towardsRight: createSprite({
      textureId: "hud.char.⬇",
      anchor: { x: 0.5, y: 0.5 },
      y: joystickArrowOffset * Math.SQRT2,
      filter: hudLowlightAndOutlineFilters,
    }),
    towards: createSprite({
      textureId: "hud.char.↙",
      anchor: { x: 0.5, y: 0.5 },
      x: -joystickArrowOffset,
      y: joystickArrowOffset,
      filter: hudLowlightAndOutlineFilters,
    }),
    towardsLeft: createSprite({
      textureId: "hud.char.⬅",
      anchor: { x: 0.5, y: 0.5 },
      x: -joystickArrowOffset * Math.SQRT2,
      filter: hudLowlightAndOutlineFilters,
    }),
    left: createSprite({
      textureId: "hud.char.↖",
      anchor: { x: 0.5, y: 0.5 },
      x: -joystickArrowOffset,
      y: -joystickArrowOffset,
      filter: hudLowlightAndOutlineFilters,
    }),
    awayLeft: createSprite({
      textureId: "hud.char.⬆",
      anchor: { x: 0.5, y: 0.5 },
      y: -joystickArrowOffset * Math.SQRT2,
      filter: hudLowlightAndOutlineFilters,
    }),
  };

  #joystickSprite = createSprite({
    textureId: "joystick",
    anchor: { x: 0.5, y: 0.5 },
    y: 1,
  });

  #curPointerId: number | undefined;
  constructor(private inputStateTracker: InputStateTrackerInterface) {
    this.container.addChild(this.#joystickSprite);

    this.container.addChild(new Graphics().circle(0, 0, 24).fill("#00000000"));
    for (const arrowSprite of objectValues(this.arrowSprites)) {
      this.container.addChild(arrowSprite);
    }

    this.container.on("pointerenter", (e) => {
      // allows tapping without movement:
      this.#curPointerId = e.pointerId;
      this.handlePointer(e);
      this.container.on("globalpointermove", this.handlePointer);

      this.container.on("pointerup", () => {
        this.container.off("globalpointermove", this.handlePointer);
        this.#curPointerId = undefined;
        inputStateTracker.hudInputState.directionVector = originXyz;
      });
      this.container.on("pointerupoutside", () => {
        this.container.off("globalpointermove", this.handlePointer);
        this.#curPointerId = undefined;
        inputStateTracker.hudInputState.directionVector = originXyz;
      });
    });
  }

  handlePointer = (e: FederatedPointerEvent) => {
    if (e.pointerId !== this.#curPointerId) return;

    const scale = selectTotalUpscale(store.getState());

    const { x: containerX, y: containerY } = this.container;
    const { x: eventX, y: eventY } = e;

    const { width: containerWidth, height: containerHeight } =
      this.container.getLocalBounds();

    const dx = (eventX / scale - containerX) / (containerWidth / 2);
    const dy = (eventY / scale - containerY) / (containerHeight / 2);

    const directionVector = scaleXyz(
      rotateInputVector45({ x: -dx, y: -dy, z: 0 }),
      sensitivity,
    );

    this.inputStateTracker.hudInputState.directionVector = directionVector;
  };

  tick(colourise: boolean) {
    const { directionVector } = this.inputStateTracker;

    const highlightDirectionXy8 =
      lengthXyz(directionVector) > analogueDeadzone ?
        vectorClosestDirectionXy8(directionVector)
      : undefined;

    for (const [directionXy8, sprite] of entries(this.arrowSprites)) {
      sprite.filters =
        directionXy8 === highlightDirectionXy8 ?
          hudHighlightAndOutlineFilters
        : hudLowlightAndOutlineFilters;
    }

    this.#joystickSprite.filters = colourise ? noFilters : hudLowlightedFilter;
  }
}
