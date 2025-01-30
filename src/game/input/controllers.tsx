import { transformObject } from "../../utils/entries";
import type { Key } from "./keys";

// see https://www.w3.org/TR/gamepad/#dfn-standard-gamepad
export const standardControllerLayout = {
  dPadDown: 13,
  dPadUp: 12,
  dPadLeft: 14,
  dPadRight: 15,
  a: 0,
  b: 1,
  x: 2,
  y: 3,
  l1: 4,
  r1: 5,
  l2: 6,
  r2: 7,
  select: 8,
  start: 9,
  l3: 10,
  r3: 11,
};

export const standardControllerButtonNames = transformObject(
  standardControllerLayout,
  ([k, v]) => [v, k],
);

export type MamePlayer = {
  start: Key;
  coin: Key;
  directions: Record<"up" | "down" | "left" | "right", Key>;
  buttons: [Key, Key, Key, Key, Key, Key];
};
// default mame assignments to allow using arcade control panels made for mame:
// https://docs.mamedev.org/usingmame/defaultkeys.html
export const mameButtonsPlayer1: MamePlayer = {
  start: "1",
  coin: "5",
  directions: {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
  },
  buttons: ["Control", "Alt", " ", "Shift", "Z", "X"],
};
export const mameButtonsPlayer2: MamePlayer = {
  start: "2",
  coin: "6",
  directions: {
    up: "R",
    down: "F",
    left: "D",
    right: "G",
  },
  buttons: ["A", "S", "Q", "W", "I", "K"],
};
