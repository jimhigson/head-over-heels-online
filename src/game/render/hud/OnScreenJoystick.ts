import { Container, Graphics } from "pixi.js";
import { spritesheetPalette } from "../../../../gfx/spritesheetPalette";
import { createSprite } from "../createSprite";
import { RevertColouriseFilter } from "../filters/RevertColouriseFilter";
import { store } from "../../../store/store";
import { selectTotalUpscale } from "../../../store/selectors";
import { objectValues } from "iter-tools";
import { originXyz, type DirectionXy8 } from "../../../utils/vectors/vectors";
import type { InputStateTrackerInterface } from "../../input/InputStateTracker";

const joystickArrowOffset = 13;
export class OnScreenJoystick {
  container = new Container({ label: "OnScreenJoystick", eventMode: "static" });

  static #unpressedArrowFilter = new RevertColouriseFilter(
    spritesheetPalette.midGrey,
  );

  arrowSprites: Record<DirectionXy8, Container> = {
    away: createSprite({
      textureId: "hud.char.↗",
      anchor: { x: 0.5, y: 0.5 },
      x: joystickArrowOffset,
      y: -joystickArrowOffset,
      filter: OnScreenJoystick.#unpressedArrowFilter,
    }),
    awayRight: createSprite({
      textureId: "hud.char.➡",
      anchor: { x: 0.5, y: 0.5 },
      x: joystickArrowOffset * Math.SQRT2,
      filter: OnScreenJoystick.#unpressedArrowFilter,
    }),
    right: createSprite({
      textureId: "hud.char.↘",
      anchor: { x: 0.5, y: 0.5 },
      x: joystickArrowOffset,
      y: joystickArrowOffset,
      filter: OnScreenJoystick.#unpressedArrowFilter,
    }),
    towardsRight: createSprite({
      textureId: "hud.char.⬇",
      anchor: { x: 0.5, y: 0.5 },
      y: joystickArrowOffset * Math.SQRT2,
      filter: OnScreenJoystick.#unpressedArrowFilter,
    }),
    towards: createSprite({
      textureId: "hud.char.↙",
      anchor: { x: 0.5, y: 0.5 },
      x: -joystickArrowOffset,
      y: joystickArrowOffset,
      filter: OnScreenJoystick.#unpressedArrowFilter,
    }),
    towardsLeft: createSprite({
      textureId: "hud.char.⬅",
      anchor: { x: 0.5, y: 0.5 },
      x: -joystickArrowOffset * Math.SQRT2,
      filter: OnScreenJoystick.#unpressedArrowFilter,
    }),
    left: createSprite({
      textureId: "hud.char.↖",
      anchor: { x: 0.5, y: 0.5 },
      x: -joystickArrowOffset,
      y: -joystickArrowOffset,
      filter: OnScreenJoystick.#unpressedArrowFilter,
    }),
    awayLeft: createSprite({
      textureId: "hud.char.⬆",
      anchor: { x: 0.5, y: 0.5 },
      y: -joystickArrowOffset * Math.SQRT2,
      filter: OnScreenJoystick.#unpressedArrowFilter,
    }),
  };

  constructor(inputStateTracker: InputStateTrackerInterface) {
    this.container.addChild(
      createSprite({ textureId: "joystick", anchor: { x: 0.5, y: 0.5 }, y: 1 }),
    );

    this.container.addChild(new Graphics().circle(0, 0, 24).fill("#00000000"));
    for (const arrowSprite of objectValues(this.arrowSprites)) {
      this.container.addChild(arrowSprite);
    }

    this.container.on("pointermove", (e) => {
      const scale = selectTotalUpscale(store.getState());

      const { x: containerX, y: containerY } = this.container;
      const { x: eventX, y: eventY } = e;

      const { width: containerWidth, height: containerHeight } =
        this.container.getLocalBounds();

      const dx = (eventX / scale - containerX) / (containerWidth / 2);
      const dy = (eventY / scale - containerY) / (containerHeight / 2);

      const directionVector = { x: -dx, y: -dy, z: 0 };

      inputStateTracker.hudInputState.directionVector = directionVector;
    });

    this.container.on("pointerup", () => {
      inputStateTracker.hudInputState.directionVector = originXyz;
    });
    this.container.on("pointerupoutside", () => {
      inputStateTracker.hudInputState.directionVector = originXyz;
    });
  }
}
