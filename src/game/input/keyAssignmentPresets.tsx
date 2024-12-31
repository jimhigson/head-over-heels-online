import type { KeyAssignment } from "./InputState";
import type { Key } from "./keys";

const originalKeyAssignment: KeyAssignment = {
  right: ["P"],
  towards: ["A"],
  left: ["O"],
  away: ["Q"],
  jump: [" ", "M"],
  carry: ["C", "M"],
  fire: ["N"],
  swop: ["Enter", "S"],
  hold: ["H"],
};

const updatedOriginal: KeyAssignment = {
  right: ["ArrowRight", ...originalKeyAssignment.right],
  towards: ["ArrowDown", ...originalKeyAssignment.towards],
  left: ["ArrowLeft", ...originalKeyAssignment.left],
  away: ["ArrowUp", ...originalKeyAssignment.away],
  jump: ["`", ...originalKeyAssignment.jump],
  carry: ["Shift", "`", ...originalKeyAssignment.carry],
  fire: ["D", ...originalKeyAssignment.fire],
  swop: originalKeyAssignment.swop,
  hold: ["F8", ...originalKeyAssignment.hold],
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
});

export const keyAssignmentPresets = {
  original: originalKeyAssignment,
  default: updatedOriginal,
  /** allow playing on mame control panels with p1 or p2's joysticks/buttons */
  mameP1P2: mameToHoh(mameButtonsP1, mameButtonsP2),
  wasd: wasdKeyAssignments,
};

console.log(keyAssignmentPresets);
