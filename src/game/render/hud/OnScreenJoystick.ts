import type { FederatedPointerEvent } from "pixi.js";
import { Container, Graphics } from "pixi.js";
import { createSprite } from "../createSprite";
import { store } from "../../../store/store";
import { selectTotalUpscale } from "../../../store/selectors";
import { objectValues } from "iter-tools";
import type { Xyz } from "../../../utils/vectors/vectors";
import {
  lengthXyz,
  originXyz,
  scaleXyz,
  vectorClosestDirectionXy4,
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
import { objectEntriesIter } from "../../../utils/entries";
import { noFilters } from "../filters/standardFilters";
import type { InputDirectionMode } from "../../../store/gameMenusSlice";
import { unitVectors } from "../../../utils/vectors/unitVectors";

const joystickArrowOffset = 13;
const sensitivity = 2;

export class OnScreenJoystick {
  container = new Container({ label: "OnScreenJoystick", eventMode: "static" });

  arrowSprites: Partial<Record<DirectionXy8, Container>>;

  #joystickSprite = createSprite({
    textureId: "joystick",
    anchor: { x: 0.5, y: 0.5 },
    y: 1,
  });

  #curPointerId: number | undefined;

  constructor(
    private inputStateTracker: InputStateTrackerInterface,
    private inputDirectionMode: InputDirectionMode,
  ) {
    this.arrowSprites = {
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

  snapXy4(input: Xyz) {
    return unitVectors[vectorClosestDirectionXy4(input)];
  }
  snapXy8(input: Xyz) {
    console.log(
      input,
      vectorClosestDirectionXy8(input),
      unitVectors[vectorClosestDirectionXy8(input)],
    );
    return unitVectors[vectorClosestDirectionXy8(input)];
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

    const onScreenDirectionVector = rotateInputVector45({
      x: -dx,
      y: -dy,
      z: 0,
    });

    const snapped =
      this.inputDirectionMode === "4-way" ?
        this.snapXy4(onScreenDirectionVector)
      : this.inputDirectionMode === "8-way" ?
        this.snapXy8(onScreenDirectionVector)
      : scaleXyz(onScreenDirectionVector, sensitivity);

    this.inputStateTracker.hudInputState.directionVector = snapped;
  };

  tick(colourise: boolean) {
    const { directionVector } = this.inputStateTracker;

    const highlightDirectionXy8 =
      lengthXyz(directionVector) > analogueDeadzone ?
        vectorClosestDirectionXy8(directionVector)
      : undefined;

    for (const [directionXy8, sprite] of objectEntriesIter(this.arrowSprites)) {
      sprite.filters =
        directionXy8 === highlightDirectionXy8 ?
          hudHighlightAndOutlineFilters
        : hudLowlightAndOutlineFilters;
    }

    this.#joystickSprite.filters = colourise ? noFilters : hudLowlightedFilter;
  }
}
