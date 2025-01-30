import { store } from "../../store/store";
import type { Xyz } from "../../utils/vectors/vectors";
import { originXyz } from "../../utils/vectors/vectors";
import type { InputPress } from "./InputState";
import { type BooleanAction } from "./InputState";
import type { KeyboardStateMap } from "./keyboardState";
import { Ticker, UPDATE_PRIORITY } from "pixi.js";
import type { Key } from "./keys";

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
    if (gp === null) {
      continue;
    }
    if (gp.buttons.length > button && gp.buttons[button].pressed) {
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

  #tick = () => {
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
    return originXyz;
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
