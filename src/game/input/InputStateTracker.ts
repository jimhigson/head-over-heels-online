import { store } from "../../store/store";
import type { Xyz } from "../../utils/vectors/vectors";
import {
  addXyz,
  directionsXy4,
  lengthXyz,
  originXyz,
  scaleXyz,
} from "../../utils/vectors/vectors";
import type { InputPress } from "./InputState";
import { actionToAxis, type BooleanAction } from "./InputState";
import type { KeyboardStateMap } from "./keyboardState";
import { Ticker, UPDATE_PRIORITY } from "pixi.js";
import type { Key } from "./keys";
import { unitVectors } from "../../utils/vectors/unitVectors";
import type { GamepadState } from "./GamepadState";
import { extractGamepadsState } from "./GamepadState";
import {
  isometricInputVector,
  snapToCardinal,
} from "./analogueControlAdjustments";

const analogueDeadzone = 0.1;
const snapAngleRadians = 13 * (Math.PI / 180);

export type PressStatus =
  /** just started pressing this frame */
  | "tap"
  /** is held down, without reference to when it started */
  | "hold"
  /** is not pressed */
  | "released";

type FrameInput = {
  keyboardState: KeyboardStateMap;
  gamepads: (GamepadState | null)[];
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

const axisPressThreshold = 0.5;

const isGamepadAxisPressed = (
  frameInput: FrameInput,
  axis: number,
  /**
   * if given, will only return true if the axis is moving in that direction. Otherwise,
   * returns true if it is more than the threshold in either direction
   */
  direction?: 1 | -1,
) => {
  for (const gp of frameInput.gamepads) {
    if (gp === null || gp.axes.length <= axis) {
      continue;
    }
    if (direction === undefined) {
      // any direction
      if (Math.abs(gp.axes[axis]) > axisPressThreshold) {
        return true;
      }
    } else {
      // specific direction only
      if (gp.axes[axis] * direction > axisPressThreshold) {
        return true;
      }
    }
  }
  return false;
};

const isActionPressed = (
  frameInput: FrameInput,
  action: BooleanAction,
  useAxes: boolean = true,
): boolean => {
  const { inputAssignment } = store.getState().userSettings;

  const inputAssignmentForAction = inputAssignment.presses[action];

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

  if (useAxes) {
    // axis that are faking being buttons. Eg, lots of gamepads without analogue sticks use axes even for
    // binary input (dpads), rather than follow the w3c 'standard' layout of representing
    // dpads as buttons
    const actionAsAxis = actionToAxis(action);
    if (actionAsAxis !== undefined) {
      const gamepadAxes = inputAssignment.axes[actionAsAxis.axis];

      for (const gamepadAxis of gamepadAxes) {
        if (
          isGamepadAxisPressed(frameInput, gamepadAxis, actionAsAxis.direction)
        ) {
          return true;
        }
      }
    }
  }

  return false;
};

/**
 * read from the given inputState (and anything else) to get the current interpretation
 * of the input, according to the
 */
export class InputStateTracker {
  // snapshot of the input at the start of the current frame
  #currentFrameInput: FrameInput;
  // snapshot of the input at the start of the previous frame, for comparison
  #lastFrameInput: FrameInput | undefined = undefined;
  #directionVector: Xyz = originXyz;

  constructor(private keyboardStateMap: KeyboardStateMap) {
    this.#currentFrameInput = {
      keyboardState: new Map(keyboardStateMap),
      gamepads: extractGamepadsState(navigator.getGamepads()),
    };
  }

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

  /** gets the non-analogue input (buttons and d-pad/stick treated like buttons) */
  #tickUpdatedDirectionAnalogue() {
    const currentFrameInput = this.#currentFrameInput;

    function* pressVectors(): Generator<Xyz> {
      for (const d of directionsXy4) {
        if (isActionPressed(currentFrameInput, d, false)) yield unitVectors[d];
      }
    }
    function* axisVectors(): Generator<Xyz> {
      const {
        userSettings: {
          inputAssignment: {
            axes: { x: axesX, y: axesY },
          },
        },
      } = store.getState();
      for (const gp of currentFrameInput.gamepads) {
        if (gp === null) {
          continue;
        }

        for (const a of axesX) {
          if (gp.axes.length <= a) continue;
          const axisValue = gp.axes[a];
          if (Math.abs(axisValue) > analogueDeadzone) {
            yield scaleXyz(unitVectors.right, axisValue);
          }
        }
        for (const a of axesY) {
          if (gp.axes.length <= a) continue;
          const axisValue = gp.axes[a];
          if (Math.abs(axisValue) > analogueDeadzone) {
            yield scaleXyz(unitVectors.towards, axisValue);
          }
        }
      }
    }

    const pressVector = addXyz(originXyz, ...pressVectors());
    const axisVector = snapToCardinal(
      isometricInputVector(addXyz(originXyz, ...axisVectors())),
      snapAngleRadians,
    );

    const v = addXyz(pressVector, axisVector);

    const vl = lengthXyz(v);

    return vl > 1 ? scaleXyz(v, 1 / vl) : v;
  }

  #tick = () => {
    const {
      userSettings: { analogueControl },
    } = store.getState();
    this.#directionVector =
      analogueControl ?
        this.#tickUpdatedDirectionAnalogue()
      : this.#tickUpdatedDirectionXy4();

    this.#lastFrameInput = this.#currentFrameInput;

    // input snapshot to use for the rest of this frame (until the next call to tick)
    this.#currentFrameInput = {
      // keyboard state is modified in-place, so we need a copy:
      keyboardState: new Map(this.keyboardStateMap),
      gamepads: extractGamepadsState(navigator.getGamepads()),
    };
  };

  currentActionPress(action: BooleanAction): PressStatus {
    const pressedNow = isActionPressed(this.#currentFrameInput, action);

    if (pressedNow) {
      const pressedLastFrame =
        this.#lastFrameInput === undefined ?
          false
        : isActionPressed(this.#lastFrameInput, action);

      if (pressedLastFrame) {
        // if (action === "towards")
        //   console.log(action, "was pressed last frame and this one");

        return "hold";
      } else {
        // if (action === "towards")
        //   console.log(action, "was pressed this frame and NOT the last one");
        return "tap";
      }
    }
    //if (action === "towards") console.log(action, "was not pressed this frame");

    return "released";
  }

  /** returns any new taps since the last frame */
  inputTap(): InputPress | undefined {
    for (const key of this.keyboardStateMap.keys()) {
      if (
        this.#lastFrameInput === undefined ||
        !this.#lastFrameInput.keyboardState.has(key)
      ) {
        return { type: "key", input: key };
      }
    }
    for (const gp of this.#currentFrameInput.gamepads) {
      if (gp === null) {
        continue;
      }
      for (const [buttonNumber, button] of gp.buttons.entries()) {
        if (button.pressed) {
          if (
            this.#lastFrameInput === undefined ||
            !isGamepadButtonPressed(this.#lastFrameInput, buttonNumber)
          ) {
            return { type: "gamepadButtons", input: buttonNumber };
          }
        }
      }
      for (const [axisNumber, axisValue] of gp.axes.entries()) {
        if (Math.abs(axisValue) > axisPressThreshold) {
          if (
            this.#lastFrameInput === undefined ||
            !isGamepadAxisPressed(this.#lastFrameInput, axisNumber)
          ) {
            return { type: "gamepadAxes", input: axisNumber };
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

// this is necessary to have a type that doesn't include the #hidden fields - why these stay
// ont the class type I'm not sure
export type InputStateTrackerInterface = Pick<
  InputStateTracker,
  | "currentActionPress"
  | "inputTap"
  | "directionVector"
  | "startTicking"
  | "stopTicking"
>;
