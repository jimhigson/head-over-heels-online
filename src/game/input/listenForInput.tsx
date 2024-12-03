import type { Key } from "./keys";
import { isKey } from "./keys";
import { entries } from "@/utils/entries";
import type { GameState } from "../gameState/GameState";
import { type KeyAssignment, type Action, actions } from "./InputState";

const originalKeyAssignment: KeyAssignment = {
  right: ["P"],
  towards: ["A"],
  left: ["O"],
  away: ["Q"],
  jump: [" ", "M"],
  carry: ["C", "M"],
  fire: ["N"],
  swop: ["Enter", "S"],
  pause: ["H"],
};

export const defaultKeyAssignments: KeyAssignment = {
  right: ["ArrowRight", ...originalKeyAssignment.right],
  towards: ["ArrowDown", ...originalKeyAssignment.towards],
  left: ["ArrowLeft", ...originalKeyAssignment.left],
  away: ["ArrowUp", ...originalKeyAssignment.away],
  jump: originalKeyAssignment.jump,
  carry: ["Shift", ...originalKeyAssignment.carry],
  fire: ["Control", ...originalKeyAssignment.fire],
  swop: originalKeyAssignment.swop,
  pause: ["F8", ...originalKeyAssignment.pause],
};

// returns the action for a given keyboard key, or undefined if none was found
function* keyToAction(
  keyAssignment: KeyAssignment,
  pressedKey: Key,
): Generator<Action> {
  for (const [action, assignedKeys] of entries(keyAssignment)) {
    if (assignedKeys.includes(pressedKey)) {
      yield action;
    }
  }
}

const standardiseCase = (k: string): string =>
  k.length === 1 ? k.toUpperCase() : k;

export const listenForInput = <RoomId extends string>({
  keyAssignment,
  inputState,
}: GameState<RoomId>) => {
  const keyDownHandler = ({ key }: KeyboardEvent): void => {
    const stdKey = standardiseCase(key);

    if (!isKey(stdKey)) {
      console.log("do not recognise key: ", stdKey);
      return;
    }

    for (const action of keyToAction(keyAssignment, stdKey)) {
      inputState[action] = true;
    }
  };
  const keyUpHandler = ({ key }: KeyboardEvent): void => {
    const stdKey = standardiseCase(key);
    if (!isKey(stdKey)) {
      return;
    }

    for (const action of keyToAction(keyAssignment, stdKey)) {
      inputState[action] = false;
    }
  };

  const handleWindowFocus = (): void => {
    inputState.windowFocus = true;
  };
  const handleWindowBlur = (): void => {
    inputState.windowFocus = false;
    // turn all keys off:
    for (const action of actions) {
      inputState[action] = false;
    }
  };

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
