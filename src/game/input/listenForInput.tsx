import type { Key } from "./keys";
import { isKey } from "./keys";
import { entries, objectEntriesIter } from "@/utils/entries";
import type { InputState } from "./InputState";
import { type KeyAssignment, type Action, booleanActions } from "./InputState";
import type { Direction4Xy } from "@/utils/vectors/vectors";
import { originXyz } from "@/utils/vectors/vectors";
import { unitVectors } from "@/utils/vectors/unitVectors";

// returns the action for a given keyboard key, or undefined if none was found
function* keyToAction(
  keyAssignment: KeyAssignment,
  pressedKey: Key,
): Generator<Action | Direction4Xy> {
  for (const [action, assignedKeys] of entries(keyAssignment)) {
    if (assignedKeys.includes(pressedKey)) {
      yield action;
    }
  }
}
const standardiseCase = (k: string): string =>
  k.length === 1 ? k.toUpperCase() : k;

const isDirectionAction = (
  input: Action | Direction4Xy,
): input is Direction4Xy =>
  input === "away" ||
  input === "towards" ||
  input === "left" ||
  input === "right";

export const listenForInput = ({
  keyAssignment,
  inputState,
  onInputStateChange,
}: {
  keyAssignment: KeyAssignment;
  /** an inputState object to directly mutate */
  inputState: InputState;
  /** for callers not on a main game loop (ie, dom/react) - callback for when input change */
  onInputStateChange?: (inputState: InputState) => void;
}) => {
  let directionPressNumber = 0;
  // map the direction key to the order of its press, if it is currently being pressed
  const directionsPressed: Partial<Record<Direction4Xy, number>> = {};

  const updateDirection = (): void => {
    let mostRecentDirectionPressNumber = -1;
    let mostRecentDirection: Direction4Xy | undefined = undefined;
    // get only the most recently pressed direction:
    for (const [iDir, iPressNumber] of objectEntriesIter(directionsPressed)) {
      if (iPressNumber > mostRecentDirectionPressNumber) {
        mostRecentDirectionPressNumber = iPressNumber;
        mostRecentDirection = iDir;
      }
    }

    inputState.direction =
      mostRecentDirection === undefined ? originXyz : (
        unitVectors[mostRecentDirection]
      );
  };

  const keyDownHandler = ({ key, repeat }: KeyboardEvent): void => {
    // ignore key repeat from OS (holding down key makes multiple keypresses)
    if (repeat) return;

    const stdKey = standardiseCase(key);

    if (!isKey(stdKey)) {
      console.log("do not recognise key: ", stdKey);
      return;
    }

    for (const action of keyToAction(keyAssignment, stdKey)) {
      if (isDirectionAction(action)) {
        directionsPressed[action] = directionPressNumber++;
      } else {
        inputState[action] = true;
      }
    }
    updateDirection();
    onInputStateChange?.(inputState);
  };
  const keyUpHandler = ({ key }: KeyboardEvent): void => {
    const stdKey = standardiseCase(key);
    if (!isKey(stdKey)) {
      return;
    }

    for (const action of keyToAction(keyAssignment, stdKey)) {
      if (isDirectionAction(action)) {
        delete directionsPressed[action];
      } else {
        inputState[action] = false;
      }
    }
    updateDirection();
    onInputStateChange?.(inputState);
  };

  const handleWindowFocus = (): void => {
    inputState.windowFocus = true;
    onInputStateChange?.(inputState);
  };
  const handleWindowBlur = (): void => {
    inputState.windowFocus = false;
    // turn all keys off:
    for (const action of booleanActions) {
      inputState[action] = false;
    }
    onInputStateChange?.(inputState);
  };

  window.focus();
  window.addEventListener("keydown", keyDownHandler, false);
  window.addEventListener("keyup", keyUpHandler, false);
  window.addEventListener("focus", handleWindowFocus, false);
  window.addEventListener("blur", handleWindowBlur, false);

  return () => {
    window.removeEventListener("keydown", keyDownHandler, false);
    window.removeEventListener("keyup", keyUpHandler, false);
    window.removeEventListener("focus", handleWindowFocus, false);
    window.removeEventListener("blur", handleWindowBlur, false);
  };
};
