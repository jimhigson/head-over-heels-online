import { isKey, type Key } from "./keys";
import { nextOrder } from "./order";

// see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/location
//const DOM_KEY_LOCATION_STANDARD = 0;
//const DOM_KEY_LOCATION_LEFT = 1;
//const DOM_KEY_LOCATION_RIGHT = 2;
const DOM_KEY_LOCATION_NUMPAD = 3;

const getKey = ({ key, location, repeat }: KeyboardEvent): Key | undefined => {
  if (repeat) {
    // ignore key repeat from OS (holding down key makes multiple keypresses)
    return undefined;
  }

  const standardCase = key.length === 1 ? key.toUpperCase() : key;
  const withLocation =
    location === DOM_KEY_LOCATION_NUMPAD ?
      `Numpad${standardCase}`
    : standardCase;

  if (isKey(withLocation)) {
    return withLocation;
  }
  console.warn("unrecognised key", key);
  return undefined;
};

export type KeyboardState = {
  /**
   * the current state (which keys are pressed) on the keyboard. The number is the
   * order when it started to be pressed
   */
  keys: { [k in Key]?: number };
  handled: (k: Key) => void;
};

export const createKeyboardState = (): KeyboardState => {
  return {
    keys: {},
    handled() {
      throw new Error("TODO, not implemented");
    },
  };
};

/**
 * @param state mutable state to write the keyboard state to
 */
export const maintainKeyboardState = (state: KeyboardState) => {
  console.log("maintaining keyboard state with", maintainKeyboardState);

  const keyDownHandler = (keyboardEvent: KeyboardEvent): void => {
    const stdKey = getKey(keyboardEvent);

    if (stdKey === undefined) {
      return;
    }

    state.keys[stdKey] = nextOrder();
  };
  const keyUpHandler = (keyboardEvent: KeyboardEvent): void => {
    const stdKey = getKey(keyboardEvent);

    if (stdKey === undefined) {
      return;
    }

    delete state.keys[stdKey];
  };

  const handleWindowBlur = (): void => {
    // if the window blurs, nothing is pressed:
    state.keys = {};
  };

  window.addEventListener("keydown", keyDownHandler, false);
  window.addEventListener("keyup", keyUpHandler, false);
  window.addEventListener("blur", handleWindowBlur, false);
  return () => {
    window.removeEventListener("keydown", keyDownHandler, false);
    window.removeEventListener("keyup", keyUpHandler, false);
    window.removeEventListener("blur", handleWindowBlur, false);
  };
};
