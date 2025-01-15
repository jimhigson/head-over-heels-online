import type { KeyAssignment } from "./InputState";
import type { Key } from "./keys";

// menu key can't be reconfigured:

const originalKeyAssignment: KeyAssignment = {
  right: ["P", "7"],
  towards: ["A", "8"],
  left: ["O", "6"],
  away: ["Q", "9"],
  jump: [" ", "M", "N", "B"],
  carry: [" ", "Enter", "L", "K", "J"],
  fire: ["Shift", "Z", "X", "C", "V"],
  swop: ["S", "D", "F", "G"],
  hold: ["H"],
  menu: ["Escape"],
};

const defaultAssignment: KeyAssignment = {
  right: ["ArrowRight", "P"],
  towards: ["ArrowDown", "A"],
  left: ["ArrowLeft", "O"],
  away: ["ArrowUp", "Q"],
  jump: [
    " ",
    "`", // right of left-shift on mac
    "\\", // right of left-shift on windows
  ],
  carry: [
    "Shift",
    "`", // right of left-shift on mac,
    "\\", // right of left-shift on windows
  ],
  fire: ["D"],
  swop: ["Enter"],
  hold: ["F8", "H"],
  menu: ["Escape"],
};

// left hand on wasd, right hand (optionally) on IOP
const wasdKeyAssignments: KeyAssignment = {
  right: ["D"],
  towards: ["S"],
  left: ["A"],
  away: ["W"],
  jump: [" ", "F", "P"],
  carry: ["Shift", "F", "I", "P"],
  fire: ["E", "O"],
  swop: ["Q"],
  hold: ["H"],
  menu: ["Escape"],
};

type MameButtons = {
  start: Key;
  coin: Key;
  directions: Record<"up" | "down" | "left" | "right", Key>;
  buttons: [Key, Key, Key, Key, Key];
};

// default mame assignments to allow using arcade control panels made for mame:
// https://docs.mamedev.org/usingmame/defaultkeys.html
const mameButtonsP1: MameButtons = {
  start: "1",
  coin: "5",
  directions: {
    up: "ArrowUp",
    down: "ArrowDown",
    left: "ArrowLeft",
    right: "ArrowRight",
  },
  buttons: ["Control", "Alt", " ", "Shift", "Z"],
};
const mameButtonsP2: MameButtons = {
  start: "2",
  coin: "6",
  directions: {
    up: "R",
    down: "F",
    left: "D",
    right: "G",
  },
  buttons: ["A", "S", "Q", "W", "E"],
};

// see https://www.w3.org/TR/gamepad/#dfn-standard-gamepad
const standardGamepadAssignment: KeyAssignment = {
  right: ["joystick:15"],
  towards: ["joystick:13"],
  left: ["joystick:14"],
  away: ["joystick:12"],
  jump: ["joystick:0", "joystick:5"],
  carry: ["joystick:1", "joystick:5"],
  fire: ["joystick:2"],
  swop: ["joystick:3"],
  hold: ["joystick:9"],
  menu: ["joystick:8", "Escape"],
};

const mameToHoh = (...mameButtons: MameButtons[]): KeyAssignment => ({
  right: mameButtons.map((mb) => mb.directions.right),
  towards: mameButtons.map((mb) => mb.directions.down),
  left: mameButtons.map((mb) => mb.directions.left),
  away: mameButtons.map((mb) => mb.directions.up),
  jump: mameButtons.map((mb) => [mb.buttons[0], mb.buttons[3]]).flat(),
  carry: mameButtons.map((mb) => [mb.buttons[1], mb.buttons[3]]).flat(),
  fire: mameButtons.map((mb) => mb.buttons[2]),
  swop: mameButtons.map((mb) => mb.start),
  hold: mameButtons.map((mb) => mb.coin),
  menu: ["Escape"] as const,
});

export const keyAssignmentPresets = {
  default: defaultAssignment,
  original: originalKeyAssignment,
  /** allow playing on mame control panels with p1 or p2's joysticks/buttons */
  mame: mameToHoh(mameButtonsP1, mameButtonsP2),
  wasd: wasdKeyAssignments,
  "🕹 gamepad/joystick": standardGamepadAssignment,
};

export type KeyAssignmentPreset = keyof typeof keyAssignmentPresets;
