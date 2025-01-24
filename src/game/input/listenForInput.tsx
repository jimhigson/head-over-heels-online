import type { Key } from "./keys";
import { isKey } from "./keys";
import type { InputState } from "./InputState";
import {
  type InputAssignment,
  type Action,
  booleanActions,
} from "./InputState";
import { entries, objectEntriesIter } from "../../utils/entries";
import { unitVectors } from "../../utils/vectors/unitVectors";
import type { DirectionXy4 } from "../../utils/vectors/vectors";
import { originXyz } from "../../utils/vectors/vectors";

// see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/location
//const DOM_KEY_LOCATION_STANDARD = 0;
//const DOM_KEY_LOCATION_LEFT = 1;
//const DOM_KEY_LOCATION_RIGHT = 2;
const DOM_KEY_LOCATION_NUMPAD = 3;

// returns the action for a given keyboard key, or undefined if none was found
function* keyToAction(
  inputAssignment: InputAssignment,
  pressedKey: Key,
): Generator<Action | DirectionXy4> {
  for (const [action, assignedKeys] of entries(inputAssignment)) {
    if (assignedKeys.includes(pressedKey)) {
      yield action;
    }
  }
}
const getKey = ({
  key: k,
  location: l,
  repeat: r,
}: KeyboardEvent): Key | undefined => {
  if (r) {
    // ignore key repeat from OS (holding down key makes multiple keypresses)
    return undefined;
  }

  const standardCase = k.length === 1 ? k.toUpperCase() : k;
  const withLocation =
    l === DOM_KEY_LOCATION_NUMPAD ? `Numpad${standardCase}` : standardCase;

  if (isKey(withLocation)) {
    return withLocation;
  }
  console.log("unrecognised key", k);
  return undefined;
};

const isDirectionAction = (
  input: Action | DirectionXy4,
): input is DirectionXy4 =>
  input === "away" ||
  input === "towards" ||
  input === "left" ||
  input === "right";

export const listenForInput = (
  inputState: InputState,
  getInputAssignment: () => InputAssignment,
) => {
  let directionPressNumber = 0;
  // map the direction key to the order of its press, if it is currently being pressed
  const directionsPressed: Partial<Record<DirectionXy4, number>> = {};

  const updateDirection = (): void => {
    let mostRecentDirectionPressNumber = -1;
    let mostRecentDirection: DirectionXy4 | undefined = undefined;
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

  const keyDownHandler = (keyboardEvent: KeyboardEvent): void => {
    const stdKey = getKey(keyboardEvent);

    if (stdKey === undefined) {
      return;
    }

    inputState.raw[stdKey] = true;

    let foundMapping = false;
    const inputAssignment = getInputAssignment();
    for (const action of keyToAction(inputAssignment, stdKey)) {
      foundMapping = true;
      if (isDirectionAction(action)) {
        directionsPressed[action] = directionPressNumber++;
      }
      inputState[action] = true;
    }

    if (!foundMapping) {
      console.log("no mapping for key: ", stdKey);
    }

    updateDirection();
    inputState.events.emit("inputStateChanged", {
      upOrDown: "down",
      inputState,
    });
  };
  const keyUpHandler = (keyboardEvent: KeyboardEvent): void => {
    const stdKey = getKey(keyboardEvent);

    if (stdKey === undefined) {
      return;
    }

    delete inputState.raw[stdKey];

    const inputAssignment = getInputAssignment();
    for (const action of keyToAction(inputAssignment, stdKey)) {
      if (isDirectionAction(action)) {
        delete directionsPressed[action];
      }
      inputState[action] = false;
    }
    updateDirection();
    inputState.events.emit("inputStateChanged", {
      upOrDown: "up",
      inputState,
    });
  };

  const handleWindowFocus = (): void => {
    inputState.windowBlurred = false;
    inputState.events.emit("inputStateChanged", {
      inputState,
    });
  };
  const handleWindowBlur = (): void => {
    inputState.windowBlurred = true;
    // turn all keys off:
    for (const action of booleanActions) {
      inputState[action] = false;
    }
    inputState.raw = {};
    inputState.events.emit("inputStateChanged", {
      inputState,
    });
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
