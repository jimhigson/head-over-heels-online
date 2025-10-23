import type { Key } from "./keys";

import { transformObject } from "../../utils/entries";

/**
 * mapping for positions of buttons on a controller to their numbers in the gamepad api
 */
export type ControllerLayout = {
  buttons: {
    dPadUp?: number;
    dPadDown?: number;
    dPadLeft?: number;
    dPadRight?: number;
    /**
     * or cross for playstation,
     * or sometimes '1' for generic PC controllers
     */
    a?: number;
    /**
     * or circle for playstation
     */
    b?: number;
    /**
     * or square for playstation
     */
    x?: number;
    /**
     * or triangle for playstation
     */
    y?: number;
    /** or l1 */
    lb?: number;
    /** or l2 */
    lt?: number;
    /** or r1 */
    rb?: number;
    /** or r2 */
    rt?: number;
    select?: number;
    start?: number;
    /** or l3, except on pads with 3 shoulder buttons per-side */
    lPress?: number;
    /** or r3, except on pads with 3 shoulder buttons per-side */
    rPress?: number;
    /** for controllers with 3 shoulder buttons per side. For what is called 'l3' on PlayStation, see 'lStickPress' */
    l3?: number;
    /** for controllers with 3 shoulder buttons per side. For what is called 'r3' on PlayStation, see 'rStickPress' */
    r3?: number;
  };
  axes: {
    lStickX?: number;
    lStickY?: number;
    rStickX?: number;
    rStickY?: number;
  };
  radialAxes: {
    xy?: number;
  };
};

// see https://www.w3.org/TR/gamepad/#dfn-standard-gamepad
export const standardControllerLayout: ControllerLayout = {
  buttons: {
    dPadDown: 13,
    dPadUp: 12,
    dPadLeft: 14,
    dPadRight: 15,
    a: 0,
    b: 1,
    x: 2,
    y: 3,
    lb: 4,
    lt: 6,
    rb: 5,
    rt: 7,
    select: 8,
    start: 9,
    lPress: 10,
    rPress: 11,
  },
  axes: {
    lStickX: 0,
    lStickY: 1,
    rStickX: 2,
    rStickY: 3,
  },
  radialAxes: {
    // radial axes are non-standard -none in the standard layout
  },
};

/** nice, but ridiculously non-standard controller layout */
export const wired8BitDoUltimate2cControllerLayout = {
  buttons: {
    // no d-pad -this is reported as a radial axis
    // some buttons at least are standard:
    a: 0,
    b: 1,
    // but most are not standard at all:
    x: 3,
    y: 4,
    lb: 6,
    lt: 8,
    rb: 7,
    rt: 9,
    select: 10,
    start: 11,
    l3: 2,
    r3: 5,
    lStickPress: 13,
    rStickPress: 14,
  },
  axes: {
    lStickX: 0,
    lStickY: 1,
    rStickX: 2,
    rStickY: 5, // wtf?
  },
  radialAxes: {
    xy: 9,
  },
} as const;
wired8BitDoUltimate2cControllerLayout satisfies ControllerLayout;

// reverse-mapping from button numbers to names in the standard layout
export const standardControllerButtonNames = transformObject(
  standardControllerLayout.buttons,
  ([name, number]) => [number, name],
);

export type MamePlayer = {
  start: Key;
  coin: Key;
  directions: Record<"down" | "left" | "right" | "up", Key>;
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

/**
 * 8bitdo gamepad identifying as a keyboard, for those that support this
 */
export const eightBitDoKeyboard = {
  dPadUp: "C",
  dPadDown: "D",
  dPadLeft: "E",
  dPadRight: "F",
  a: "J",
  b: "G",
  y: "H",
  x: "I",
  lb: "K",
  rb: "M",
  start: "O",
  select: "N",
} as const satisfies Partial<Record<keyof ControllerLayout["buttons"], Key>>;
