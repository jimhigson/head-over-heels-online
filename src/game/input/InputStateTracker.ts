import { store } from "../../store/store";
import type { Xyz } from "../../utils/vectors/vectors";
import { originXyz } from "../../utils/vectors/vectors";
import type { InputPress } from "./InputState";
import { type BooleanAction } from "./InputState";
import type { KeyboardStateMap } from "./keyboardState";
import { Ticker, UPDATE_PRIORITY } from "pixi.js";
import type { Key } from "./keys";
import { unitVectors } from "../../utils/vectors/unitVectors";

export type PressStatus =
  /** just started pressing this frame */
  | "tap"
  /** is held down, without reference to when it started */
  | "hold"
  /** is not pressed */
  | "released";

type FrameInput = {
  keyboardState: KeyboardStateMap;
  gamepads: (Gamepad | null)[];
};

const isKeyPressed = (frameInput: FrameInput, key: Key): boolean => {
  if (frameInput.keyboardState.has(key)) {
    return true;
  }

  return false;
};
const isGamepadButtonPressed = (
  frameInput: FrameInput,
  button: number,
): boolean => {
  for (const gp of frameInput.gamepads) {
    if (gp === null || gp.buttons.length <= button) {
      continue;
    }
    if (gp.buttons[button].pressed) {
      return true;
    }
  }
  return false;
};

const isActionPressed = (
  frameInput: FrameInput,
  action: BooleanAction,
): boolean => {
  const inputAssignmentForAction =
    store.getState().userSettings.inputAssignment[action];

  for (const key of inputAssignmentForAction.keys) {
    if (isKeyPressed(frameInput, key)) {
      return true;
    }
  }

  for (const button of inputAssignmentForAction.gamepadButtons) {
    if (isGamepadButtonPressed(frameInput, button)) {
      return true;
    }
  }

  return false;
};

/**
 * read from the given inputState (and anything else) to get the current interpretation
 * of the input, according to the
 */
export class InputStateTracker {
  #lastFrame: FrameInput | undefined = undefined;
  #directionVector: Xyz = originXyz;

  /** gets the non-analogue input (buttons and d-pad/stick treated like buttons) */
  #tickUpdatedDirectionXy4 = () => {
    let l;
    let r;
    let a;
    let t;

    // any new direction automatically wins
    switch ("tap") {
      case (l = this.currentActionPress("left")):
        return unitVectors.left;
      case (r = this.currentActionPress("right")):
        return unitVectors.right;
      case (a = this.currentActionPress("away")):
        return unitVectors.away;
      case (t = this.currentActionPress("towards")):
        return unitVectors.towards;
    }

    const inputsCount =
      (l !== "released" ? 1 : 0) +
      (r !== "released" ? 1 : 0) +
      (a !== "released" ? 1 : 0) +
      (t !== "released" ? 1 : 0);

    if (inputsCount > 1) {
      // more than one input, and none just started (none was tap) use whatever we already had set
      return this.#directionVector;
    }
    if (inputsCount === 1) {
      switch ("hold") {
        case l:
          return unitVectors.left;
        case r:
          return unitVectors.right;
        case a:
          return unitVectors.away;
        case t:
          return unitVectors.towards;
      }
    }

    // input count is zero, return the origin
    return originXyz;
  };

  #tick = () => {
    this.#directionVector = this.#tickUpdatedDirectionXy4();

    this.#lastFrame = {
      // keyboardstate is modified in-place, so we need a copy:
      keyboardState: new Map(this.keyboardStateMap),
      // navigator.getGamepads is not mutated after being returned so no need to copy:
      gamepads: navigator.getGamepads(),
    };
  };

  constructor(private keyboardStateMap: KeyboardStateMap) {}

  currentActionPress(action: BooleanAction): PressStatus {
    const currentFrameInput: FrameInput = {
      keyboardState: this.keyboardStateMap,
      gamepads: navigator.getGamepads(),
    };

    const pressedNow = isActionPressed(currentFrameInput, action);

    if (pressedNow) {
      const pressedLastFrame =
        this.#lastFrame === undefined ?
          false
        : isActionPressed(this.#lastFrame, action);

      if (pressedLastFrame) {
        return "hold";
      } else {
        return "tap";
      }
    }

    return "released";
  }

  /** returns any new taps since the last frame */
  inputTap(): InputPress | undefined {
    for (const key of this.keyboardStateMap.keys()) {
      if (
        this.#lastFrame === undefined ||
        !this.#lastFrame.keyboardState.has(key)
      ) {
        return { type: "key", input: key };
      }
    }
    for (const gp of navigator.getGamepads()) {
      if (gp === null) {
        continue;
      }
      for (const [buttonNumber, button] of gp.buttons.entries()) {
        if (button.pressed) {
          if (
            this.#lastFrame === undefined ||
            !isGamepadButtonPressed(this.#lastFrame, buttonNumber)
          ) {
            return { type: "gamepadButtons", input: buttonNumber };
          }
        }
      }
    }
  }

  get directionVector(): Xyz {
    return this.#directionVector;
  }

  startTicking() {
    // we want this to run at a lower update priority than anything else so that it back-runs
    // the interactions and only updates the last frame's record after everything else has had
    // a change to query it
    Ticker.shared.add(this.#tick, undefined, UPDATE_PRIORITY.UTILITY);
  }
  stopTicking() {
    Ticker.shared.remove(this.#tick);
  }
}
