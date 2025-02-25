import { store } from "../../store/store";
import type { Xyz } from "../../utils/vectors/vectors";
import {
  addXyz,
  directionsXy4,
  dotProductXyz,
  lengthXy,
  lengthXyz,
  originXyz,
  scaleXy,
  xyzEqual,
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
  rotateInputVector45,
  snapToCardinal,
} from "./analogueControlAdjustments";
import { iterate } from "../../utils/iterate";
import { emptyArray } from "../../utils/empty";
import type { HudInputState } from "./hudInputState";

const analogueDeadzone = 0.2;
const snapAngleRadians = 13 * (Math.PI / 180);

/* how long to keep buffered input for - this is essentially a sensitivity setting
  - this could be configurable as in the original game */
const bufferLengthMs = 45;

export type PressStatus =
  /** just started pressing this frame */
  | "tap"
  /** is held down, without reference to when it started */
  | "hold"
  /** is not pressed */
  | "released";

type FrameInput = {
  /* time in ms (from the ticker) when this input was given */
  atTime: number;
  keyboardState: KeyboardStateMap;
  hudInputState: HudInputState;
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

/**
 * treats axes like buttons - either pressed or not; ie, analogue sticks
 * (or d-pad reporting as axes) used to move through a menu
 */
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

  if (frameInput.hudInputState[action]) {
    // frame input is very simple since it doesn't have any mappings
    // to different keys/buttons - it is direct to actions:
    return true;
  }

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
  /**
   * snapshot of the input this frame, the previous frame, and going back as
   * far as the buffer length. This frame is always at index 0, the previous frame at index 1,
   * and older are kept in-order going back to as old as the buffer length
   */
  #frameInputBuffer: FrameInput[] = [];
  #directionVector: Xyz = originXyz;

  /**
   * latches set to true if an action should be ignored until it is released
   * and inputted again. Ie, pressing jump to leave a scroll shouldn't make the character
   * jump when the scroll is closed because it was handled
   */
  actionsHandled: Set<BooleanAction> = new Set();

  constructor(
    private keyboardStateMap: KeyboardStateMap,
    public hudInputState: HudInputState,
  ) {}

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

  /** gets the modernised input direction (including analogue or 8-way) */
  #tickUpdatedDirectionAnalogueOrXy8() {
    const currentFrameInput = this.#frameInputBuffer.at(0);

    if (currentFrameInput === undefined) {
      return originXyz;
    }

    /* vectors for the binary presses - buttons and keys */
    function* pressVectors(input: FrameInput): Generator<Xyz> {
      // TODO: consider axes at the extremes (== -1, or 1) as buttons and don't use in axisVectors

      for (const d of directionsXy4) {
        if (isActionPressed(input, d, false)) yield unitVectors[d];
      }
    }
    function* axisVectors(input: FrameInput): Generator<Xyz> {
      const {
        userSettings: {
          inputAssignment: {
            axes: { x: axesX, y: axesY },
          },
        },
      } = store.getState();
      for (const gp of input.gamepads) {
        if (gp === null) {
          continue;
        }

        let x = 0,
          y = 0;

        for (const a of axesX) {
          if (gp.axes.length <= a) continue;
          x -= gp.axes[a];
        }
        for (const a of axesY) {
          if (gp.axes.length <= a) continue;
          y -= gp.axes[a];
        }

        const v: Xyz = { x, y, z: 0 };

        if (lengthXyz(v) > analogueDeadzone) yield v;
      }
    }
    let pressVs = [...pressVectors(currentFrameInput)];
    let recentlyReleasedPress: Xyz | undefined = undefined;

    if (pressVs.length === 1) {
      const [singlePressedNow] = pressVs;

      const previousFramePressVectors = [
        ...iterate(this.#frameInputBuffer)
          .drop(1)
          .map((buffer) => [...pressVectors(buffer)]),
      ];

      // if only one input is pressed, check the buffer if another, orthogonal input was only just released,
      // in this case we keep going diagonally for a short time until that found frame is out of the buffer
      loopOverBuffers: for (const prevFramePressV of previousFramePressVectors) {
        if (prevFramePressV.length > 2) {
          break loopOverBuffers;
        }
        if (
          prevFramePressV.length === 2 &&
          // one identical:
          prevFramePressV.some((bp) => xyzEqual(bp, singlePressedNow))
        ) {
          // and one orthoganal:
          const bufferOrthogonalPress = prevFramePressV.find(
            (bp) => dotProductXyz(bp, singlePressedNow) < 0.001,
          );
          if (bufferOrthogonalPress !== undefined) {
            recentlyReleasedPress = bufferOrthogonalPress;
            break loopOverBuffers;
          }
        }
      }

      if (!recentlyReleasedPress) {
        // check if we are starting new input from none
        for (const prevFramePressV of previousFramePressVectors) {
          if (prevFramePressV.length === 0) {
            // start of input - cancel the current input until the buffer is fuller:
            pressVs = emptyArray;
          }
        }
      }
    }

    /*
    if (recentlyReleasedPress) {
      console.log(
        "🕹️ applying a recently released press of",
        recentlyReleasedPress,
      );
    }*/

    return addXyz(
      recentlyReleasedPress ?? originXyz,
      ...pressVs,
      ...axisVectors(currentFrameInput),
    );
  }

  #tick = ({ lastTime: atTime }: Ticker) => {
    const {
      userSettings: { analogueControl, screenRelativeControl },
    } = store.getState();

    const shouldRotate = screenRelativeControl && analogueControl;
    const maybeRotate = shouldRotate ? rotateInputVector45 : (v: Xyz) => v;

    const v = snapToCardinal(
      maybeRotate(
        analogueControl ?
          this.#tickUpdatedDirectionAnalogueOrXy8()
        : this.#tickUpdatedDirectionXy4(),
      ),
      snapAngleRadians,
    );

    const vl = lengthXy(v);

    this.#directionVector = {
      ...(vl > 1 ? scaleXy(v, 1 / vl) : v),
      z: 0,
    };

    // input snapshot to use for the rest of this frame (until the next call to tick)
    const currentFrameInput: FrameInput = {
      // keyboard state is modified in-place, so we need a copy:
      keyboardState: new Map(this.keyboardStateMap),
      // hud input state is also modified in-place - make a copy:
      hudInputState: { ...this.hudInputState },
      gamepads: extractGamepadsState(navigator.getGamepads()),
      atTime,
    };

    this.#frameInputBuffer.unshift(currentFrameInput);

    // remove input from the buffer starting from the first one that's older than the one
    // after the end of the buffer length
    const oldestTimeToKeep = atTime - bufferLengthMs;
    const removalIndex = this.#frameInputBuffer.findIndex(
      (b) => b.atTime < oldestTimeToKeep,
    );
    if (removalIndex !== -1) {
      this.#frameInputBuffer.splice(removalIndex + 1);
    }

    /*
    // logging to monitor buffer health:
    console.log(
      "frame buffer now has length",
      this.#frameInputBuffer.length,
      "from",
      this.#frameInputBuffer.at(0)?.atTime,
      "to",
      this.#frameInputBuffer.at(-1)?.atTime,
      "buffer length",
      (this.#frameInputBuffer.at(0)?.atTime ?? 0) -
        (this.#frameInputBuffer.at(-1)?.atTime ?? 0),
      "target buffer length",
      bufferLengthMs,
    );
    */

    // clear the latches for input that was handled, but now no longer is being input:
    for (const action of this.actionsHandled) {
      if (!isActionPressed(currentFrameInput, action)) {
        this.actionsHandled.delete(action);
      }
    }
  };

  currentActionPress(action: BooleanAction): PressStatus {
    const currentFrameInput = this.#frameInputBuffer.at(0);

    if (currentFrameInput === undefined) {
      // we are before the first frame
      return "released";
    }

    const pressedNow = isActionPressed(currentFrameInput, action);

    if (this.actionsHandled.has(action)) {
      return "released"; // treat as released if was already handled
    }

    if (pressedNow) {
      const previousFrameInput = this.#frameInputBuffer.at(1);

      const pressedLastFrame =
        previousFrameInput === undefined ? false : (
          isActionPressed(previousFrameInput, action)
        );

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

    return "released";
  }

  /** returns one or zero new taps since the last frame (the first one we find) */
  inputTap(): InputPress | undefined {
    const currentFrameInput = this.#frameInputBuffer.at(0);
    const previousFrameInput = this.#frameInputBuffer.at(1);

    if (currentFrameInput === undefined) {
      return;
    }

    for (const key of this.keyboardStateMap.keys()) {
      if (
        previousFrameInput === undefined ||
        !previousFrameInput.keyboardState.has(key)
      ) {
        return { type: "key", input: key };
      }
    }
    for (const gp of currentFrameInput.gamepads) {
      if (gp === null) {
        continue;
      }
      for (const [buttonNumber, button] of gp.buttons.entries()) {
        if (button.pressed) {
          if (
            previousFrameInput === undefined ||
            !isGamepadButtonPressed(previousFrameInput, buttonNumber)
          ) {
            return { type: "gamepadButtons", input: buttonNumber };
          }
        }
      }
      for (const [axisNumber, axisValue] of gp.axes.entries()) {
        if (Math.abs(axisValue) > axisPressThreshold) {
          if (
            previousFrameInput === undefined ||
            !isGamepadAxisPressed(previousFrameInput, axisNumber)
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
    Ticker.shared.add(this.#tick, undefined, UPDATE_PRIORITY.INTERACTION);
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
  | "hudInputState"
  | "actionsHandled"
>;
