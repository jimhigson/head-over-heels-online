import type { InputAssignmentPreset } from "./InputState";
import type { Key } from "./keys";

// menu key can't be reconfigured:

const originalKeyAssignment: InputAssignmentPreset = {
  inputAssignment: {
    right: ["P", "7", "joystick:x"],
    towards: ["A", "8", "joystick:y"],
    left: ["O", "6", "joystick:x"],
    away: ["Q", "9", "joystick:y"],
    jump: [
      " ",
      "M",
      "N",
      "B",
      "Alt" /* Symbol shift key on the original - alt is similar */,
    ],
    carry: [" ", "Enter", "L", "K", "J"],
    fire: ["Shift", "Z", "X", "C", "V"],
    swop: ["S", "D", "F", "G"],
    hold: ["H"],
    menu: ["Escape"],
  },
  description: "closely matches zx spectrum keys",
};

// see https://www.w3.org/TR/gamepad/#dfn-standard-gamepad
const standardGamepadAssignment: InputAssignmentPreset = {
  inputAssignment: {
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
  },
  description:
    "Playstation2+, xbox, and similar controllers with dual analogue sticks and lots of buttons",
};

// a gamepad with less buttons
const basicGamepadAssignment: InputAssignmentPreset = {
  inputAssignment: {
    right: ["joystick:x"],
    towards: ["joystick:y"],
    left: ["joystick:x"],
    away: ["joystick:y"],
    jump: ["joystick:0", "joystick:4"],
    carry: ["joystick:1", "joystick:4"],
    fire: ["joystick:2"],
    swop: ["joystick:3"],
    hold: ["joystick:5"],
    menu: ["joystick:6", "Escape"],
  },
  description: "Controllers with 4-6 buttons",
};

const defaultAssignment: InputAssignmentPreset = {
  inputAssignment: {
    right: [
      "ArrowRight",
      "P",
      "Numpad6",
      ...basicGamepadAssignment.inputAssignment.right,
      ...standardGamepadAssignment.inputAssignment.right,
    ],
    towards: [
      "ArrowDown",
      "A",
      "Numpad5",
      ...basicGamepadAssignment.inputAssignment.towards,
      ...standardGamepadAssignment.inputAssignment.towards,
    ],
    left: [
      "ArrowLeft",
      "O",
      "Numpad8",
      ...basicGamepadAssignment.inputAssignment.left,
      ...standardGamepadAssignment.inputAssignment.left,
    ],
    away: [
      "ArrowUp",
      "Q",
      "Numpad9",
      ...basicGamepadAssignment.inputAssignment.away,
      ...standardGamepadAssignment.inputAssignment.away,
    ],
    jump: [
      " ",
      "`", // right of left-shift on mac
      "\\", // right of left-shift on windows
      "Numpad0",
      "Numpad-",
      ...standardGamepadAssignment.inputAssignment.jump,
    ],
    carry: [
      "Shift",
      "`", // right of left-shift on mac,
      "\\", // right of left-shift on windows
      "Numpad1",
      "Numpad-",
      ...standardGamepadAssignment.inputAssignment.carry,
    ],
    fire: [
      "D",
      "NumpadEnter",
      ...standardGamepadAssignment.inputAssignment.fire,
    ],
    swop: [
      "Enter",
      "S",
      "Numpad+",
      ...standardGamepadAssignment.inputAssignment.swop,
    ],
    hold: [
      "F8",
      "H",
      "Numpad.",
      ...standardGamepadAssignment.inputAssignment.hold,
    ],
    menu: ["Escape", "joystick:8"],
  },
};

// left hand on wasd, right hand (optionally) on IOP
const wasdKeyAssignments: InputAssignmentPreset = {
  inputAssignment: {
    right: ["D"],
    towards: ["S"],
    left: ["A"],
    away: ["W"],
    jump: [" ", "F", "P"],
    carry: ["Shift", "F", "I", "P"],
    fire: ["E", "O", "Control"],
    swop: ["Q"],
    hold: ["H"],
    menu: ["Escape"],
  },
  description: "Modern, minimalist WASD key layout",
};

type MameButtons = {
  start: Key;
  coin: Key;
  directions: Record<"up" | "down" | "left" | "right", Key>;
  buttons: [Key, Key, Key, Key, Key, Key];
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
  buttons: ["Control", "Alt", " ", "Shift", "Z", "X"],
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
  buttons: ["A", "S", "Q", "W", "I", "K"],
};

const mameToHoh = (...mameButtons: MameButtons[]): InputAssignmentPreset => ({
  inputAssignment: {
    right: mameButtons.map((mb) => mb.directions.right),
    towards: mameButtons.map((mb) => mb.directions.down),
    left: mameButtons.map((mb) => mb.directions.left),
    away: mameButtons.map((mb) => mb.directions.up),
    jump: mameButtons.map((mb) => [mb.buttons[0], mb.buttons[3]]).flat(),
    carry: mameButtons.map((mb) => [mb.buttons[1], mb.buttons[3]]).flat(),
    fire: mameButtons.map((mb) => mb.buttons[2]),
    swop: mameButtons.map((mb) => mb.start),
    hold: ["P", "F5", ...mameButtons.map((mb) => mb.coin)],

    menu: ["Escape", "`", "Tab", ...mameButtons.map((mb) => mb.buttons[5])],
  },
  description: "MAME key mappings. For arcade-style control panels",
});

export const keyAssignmentPresets = {
  default: defaultAssignment,
  "zx spectrum": originalKeyAssignment,
  /** allow playing on mame control panels with p1 or p2's joysticks/buttons */
  mame: mameToHoh(mameButtonsP1, mameButtonsP2),
  wasd: wasdKeyAssignments,
  "🕹joystick 1": basicGamepadAssignment,
  "🕹joystick 2": standardGamepadAssignment,
};

export type KeyAssignmentPreset = keyof typeof keyAssignmentPresets;
