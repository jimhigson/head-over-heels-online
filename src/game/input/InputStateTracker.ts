import { Ticker, UPDATE_PRIORITY } from "pixi.js";

import type { Xyz } from "../../utils/vectors/vectors";
import type { GamepadState } from "./GamepadState";
import type { HudInputState } from "./hudInputState";
import type { AxisAssignableAction, InputPress } from "./InputAssignment";
import type { KeyboardStateMap } from "./keyboardState";
import type { Key } from "./keys";

import {
  selectInputAssignment,
  selectInputDirectionMode,
  selectScreenRelativeControl,
} from "../../store/slices/gameMenus/gameMenusSelectors";
import { store } from "../../store/store";
import { emptyArray } from "../../utils/empty";
import { iterate } from "../../utils/iterate";
import { unitVectors } from "../../utils/vectors/unitVectors";
import {
  addXyz,
  directionsXy4,
  dotProductXyz,
  lengthXy,
  lengthXyz,
  originXyz,
  scaleXyz,
  xyzEqual,
} from "../../utils/vectors/vectors";
import { type BooleanAction, lookDirectionsXy4 } from "./actions";
import { actionToAxis } from "./actionToAxis";
import { rotateInputVector45, snapXyFnMap } from "./analogueControlAdjustments";
import { extractGamepadsState } from "./GamepadState";
import { lookUnitVectors } from "./lookUnitVectors";

export const analogueDeadzone = 0.2;
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
  direction?: -1 | 1,
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
  const inputAssignment = selectInputAssignment(store.getState());

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

/** constrains the vector so that all components are in the range 0..1 */
const constrainUnitRange = (v: Xyz) => {
  const vl = lengthXy(v);
  return vl > 1 ?
      // TODO: actually not sure why z was explictly zero here - can't see how
      // input could be giving a z anyway
      //{ ...
      scaleXyz(v, 1 / vl)
      //z: 0,
      //}
    : v;
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
   * secondary xy axes for looking around the room
   */
  #lookVector: Xyz = originXyz;

  /**
   * latches set to true if an action should be ignored until it is released
   * and inputted again. Ie, pressing jump to leave a scroll shouldn't make the character
   * jump when the scroll is closed because it was handled
   */
  actionsHandled: Set<BooleanAction> = new Set();

  constructor(
    private keyboardStateMap: KeyboardStateMap,
    public readonly hudInputState: HudInputState,
  ) {}

  /** gets the non-analogue input (buttons and d-pad/stick treated like buttons) */
  #getDirectionXy4ForTick = (): Xyz => {
    const currentFrameInput = this.#frameInputBuffer.at(0);

    if (
      currentFrameInput === undefined ||
      // look-shift means none of the directional input goes into the main (character movement etc) input:
      isActionPressed(currentFrameInput, "lookShift", false)
    ) {
      return originXyz;
    }

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

  /**
   * get XY(z) vectors for binary inputs
   */
  *#pressVectors<D extends BooleanAction>(
    input: FrameInput,
    directions: readonly D[],
    directionVectors: Record<D, Xyz>,
  ): Generator<Xyz> {
    for (const d of directions) {
      if (isActionPressed(input, d, false)) yield directionVectors[d];
    }
  }

  /**
   * get the x and y input, for each assigned axis for the given axis-
   * assignable actions, and each gamepad
   */
  *#axisVectors(
    input: FrameInput,
    xAction: AxisAssignableAction,
    yAction: AxisAssignableAction,
    xDirection: -1 | 1,
    yDirection: -1 | 1,
  ): Generator<Xyz> {
    // Generator for look vectors - will yield look direction vectors
    const axesAssignment = selectInputAssignment(store.getState()).axes;

    const axesX = axesAssignment[xAction];
    const axesY = axesAssignment[yAction];

    /* loop over all gamepads, yielding their contribution on all registered axes */
    for (const gp of input.gamepads) {
      if (gp === null) {
        continue;
      }

      let x = 0,
        y = 0;

      for (const a of axesX) {
        if (gp.axes.length <= a) continue;
        x += gp.axes[a] * xDirection;
      }
      for (const a of axesY) {
        if (gp.axes.length <= a) continue;
        y += gp.axes[a] * yDirection;
      }

      const v: Xyz = { x, y, z: 0 };

      if (lengthXyz(v) > analogueDeadzone) yield v;
    }
  }

  /** gets the modernised input direction (including analogue or 8-way) */
  #getDirectionAnalogueOrXy8ForTick(): Xyz {
    const currentFrameInput = this.#frameInputBuffer.at(0);

    if (
      currentFrameInput === undefined ||
      // look-shift means none of the directional input goes into the main (character movement etc) input:
      isActionPressed(currentFrameInput, "lookShift", false)
    ) {
      return originXyz;
    }

    let pressVs = [
      ...this.#pressVectors(currentFrameInput, directionsXy4, unitVectors),
    ];
    let recentlyReleasedPress: undefined | Xyz = undefined;

    if (pressVs.length === 1) {
      const [singlePressedNow] = pressVs;

      const previousFramePressVectors = [
        ...iterate(this.#frameInputBuffer)
          .drop(1)
          .map((buffer) => [
            ...this.#pressVectors(buffer, directionsXy4, unitVectors),
          ]),
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
          // and one orthogonal:
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
      ...this.#axisVectors(currentFrameInput, "x", "y", -1, -1),
    );
  }

  #getLookDirectionForTick(): Xyz {
    const currentFrameInput = this.#frameInputBuffer.at(0);

    if (currentFrameInput === undefined) {
      return originXyz;
    }

    const lookShift = isActionPressed(currentFrameInput, "lookShift", false);

    return constrainUnitRange(
      addXyz(
        ...this.#pressVectors(
          currentFrameInput,
          lookDirectionsXy4,
          lookUnitVectors,
        ),
        ...this.#axisVectors(currentFrameInput, "xLook", "yLook", -1, -1),
        ...(lookShift ?
          this.#pressVectors(currentFrameInput, directionsXy4, unitVectors)
        : emptyArray),
        ...(lookShift ?
          this.#axisVectors(currentFrameInput, "x", "y", -1, -1)
        : emptyArray),
      ),
    );
  }

  #tick = ({ lastTime: atTime }: Ticker) => {
    const inputDirectionMode = selectInputDirectionMode(store.getState());
    const screenRelativeControl = selectScreenRelativeControl(store.getState());

    const shouldRotate = screenRelativeControl && inputDirectionMode;
    const maybeRotate45 = shouldRotate ? rotateInputVector45 : (v: Xyz) => v;

    const snapXyFn = snapXyFnMap[inputDirectionMode];

    this.#directionVector = constrainUnitRange(
      snapXyFn(
        addXyz(
          maybeRotate45(
            inputDirectionMode === "4-way" ?
              this.#getDirectionXy4ForTick()
            : this.#getDirectionAnalogueOrXy8ForTick(),
          ),
          // hudinput is never rotated or look-shifted
          this.hudInputState.directionVector,
        ),
      ),
    );

    this.#lookVector = this.#getLookDirectionForTick();

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

  get lookVector(): Xyz {
    return this.#lookVector;
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
  | "actionsHandled"
  | "currentActionPress"
  | "directionVector"
  | "hudInputState"
  | "inputTap"
  | "lookVector"
  | "startTicking"
  | "stopTicking"
>;
