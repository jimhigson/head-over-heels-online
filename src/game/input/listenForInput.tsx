import { directions } from "@/utils/vectors";
import { isKey, Key } from "./keys";
import { entries } from "@/utils/entries";
import { GameState } from "../gameState/GameState";

export const actions = [
  ...directions,
  "jump",
  "fire",
  "carry",
  "swop",
  "pause",
] as const;
export type Action = (typeof actions)[number];

export type KeyAssignment = Record<Action, Key[]>;

const originalKeyAssignment: KeyAssignment = {
  right: ["P"],
  towards: ["A"],
  left: ["O"],
  away: ["Q"],
  jump: [" ", "M"],
  carry: ["C", "M"],
  fire: ["N"],
  swop: ["Enter"],
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

export const listenForInput = ({
  keyAssignment,
  inputState,
}: GameState<string>) => {
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

  window.addEventListener("keydown", keyDownHandler, false);
  window.addEventListener("keyup", keyUpHandler, false);

  return () => {
    console.log("removing listeners on keys");
    window.removeEventListener("keydown", keyDownHandler, false);
    window.removeEventListener("keyup", keyUpHandler, false);
  };
};
