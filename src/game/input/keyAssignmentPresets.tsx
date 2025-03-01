import { type InputAssignmentPreset } from "./InputState";
import type { MamePlayer } from "./controllers";
import {
  eightBitDoKeyboard,
  mameButtonsPlayer1,
  mameButtonsPlayer2,
  standardControllerLayout,
} from "./controllers";
import type { PartialInputAssignment } from "./combineInputAssignments";
import { combineInputAssignments } from "./combineInputAssignments";
import { emptyInputAssignment } from "./emptyInputAssignment";

//standard keys that are used in all presets:
const standardAssignment = {
  presses: {
    right: {
      keys: ["ArrowRight"],
      gamepadButtons: [],
    },
    towards: {
      keys: ["ArrowDown"],
    },
    left: {
      keys: ["ArrowLeft"],
    },
    away: {
      keys: ["ArrowUp"],
    },
    menu_openOrExit: {
      // escape alone isn't good because it can leave fullscreen in browser sometimes - use the others!
      keys: ["Escape", "Tab", "§"],
    },
    menu_exit: { gamepadButtons: [standardControllerLayout.b] },
    // menu_up: { keys: ["ArrowUp"] },
    // menu_down: { keys: ["ArrowDown"] },
    menu_select: {
      keys: ["Enter"],
      gamepadButtons: [standardControllerLayout.a],
    },
    // not many f-keys are available for us!
    // f3 is search in firefox
    // f5 is reload in most browsers
    // f6 in firefox is taken - focusses the address bar
    // f7 is taken in chrome/firefox - toggles caret browsing
    // f8 in chrome pauses script execution (if devtools open)
    // f11 clashes with macos defaults, and browser fullscreen!
    // f12 is taken in chrome/firefox - opens dev tools
    toggleColourisation: { keys: ["F10"] },
    toggleShowFps: { keys: ["F9"] },
    cycleResolution: { keys: ["0"] },
  },
} as const satisfies PartialInputAssignment;

const gamepadAssignment: InputAssignmentPreset = {
  inputAssignment: combineInputAssignments(standardAssignment, {
    presses: {
      right: {
        gamepadButtons: [standardControllerLayout.dPadRight],
      },
      towards: {
        gamepadButtons: [standardControllerLayout.dPadDown],
      },
      left: {
        gamepadButtons: [standardControllerLayout.dPadLeft],
      },
      away: {
        gamepadButtons: [standardControllerLayout.dPadUp],
      },
      jump: {
        gamepadButtons: [
          standardControllerLayout.a,
          standardControllerLayout.y,
        ],
      },
      carry: {
        gamepadButtons: [
          standardControllerLayout.x,
          standardControllerLayout.y,
        ],
      },
      fire: { gamepadButtons: [standardControllerLayout.b] },
      swop: { gamepadButtons: [standardControllerLayout.rb] },
      ["swop.head"]: {
        gamepadButtons: [standardControllerLayout.l3],
      },
      ["swop.heels"]: {
        gamepadButtons: [standardControllerLayout.r3],
      },
      hold: { gamepadButtons: [standardControllerLayout.start] },
      menu_openOrExit: {
        gamepadButtons: [
          // on macOS by default select opens the 'select a game' type screen and there's no way for
          // a browser to prevent that default. so that's unusable without OS config - encourage people
          // to turn that off I guess! Or they can use the keys
          standardControllerLayout.select,
        ],
      },
      toggleColourisation: {
        gamepadButtons: [standardControllerLayout.lt],
      },
    },
    axes: {
      x: [0],
      y: [1],
    },
  }),
  description:
    "Joysticks/gamepads with at least 4 buttons, but preferably 6 or more. Inc Playstation, xbox etc",
};

// menu key can't be reconfigured:
const zxSpectrumKeyAssignment: InputAssignmentPreset = {
  inputAssignment: combineInputAssignments(
    standardAssignment,
    gamepadAssignment.inputAssignment,
    {
      presses: {
        right: { keys: ["P", "7"] },
        towards: { keys: ["A", "8"] },
        left: { keys: ["O", "6"] },
        away: { keys: ["Q", "9"] },
        jump: {
          keys: [
            " ",
            "M",
            "N",
            "B",
            "Alt" /* Symbol shift key on the original - alt is similar */,
          ],
        },
        carry: {
          keys: [" ", "Enter", "L", "K", "J"],
        },
        fire: {
          keys: ["Shift", "Z", "X", "C", "V"],
        },
        swop: { keys: ["S", "D", "F", "G"] },
        hold: { keys: ["H"] },
      },
    },
  ),
  description: "closely matches zx spectrum keys",
};

const amigaKeyAssignment: InputAssignmentPreset = {
  inputAssignment: combineInputAssignments(
    standardAssignment,
    gamepadAssignment.inputAssignment,
    {
      presses: {
        carry: {
          keys: ["F3", "F5"],
        },
        fire: {
          keys: [" "],
        },
        jump: { keys: ["F5"] },
        swop: { keys: ["F1"] },
        hold: { keys: ["H"] },
      },
    },
  ),
  description: "closely matches Amiga version keys - heavy on the F-keys",
};

const defaultAssignment: InputAssignmentPreset = {
  inputAssignment: combineInputAssignments(
    standardAssignment,
    gamepadAssignment.inputAssignment,
    {
      presses: {
        right: {
          keys: ["P", "Numpad6"],
        },
        towards: {
          keys: ["A", "Numpad5"],
        },
        left: {
          keys: ["O", "Numpad8"],
        },
        away: {
          keys: ["Q", "Numpad9"],
        },
        jump: {
          keys: [" ", "`", "\\", "Numpad0", "Numpad-"],
        },
        carry: {
          keys: ["Shift", "`", "\\", "Numpad1", "Numpad-"],
        },
        fire: {
          keys: ["D", "NumpadEnter"],
        },
        swop: {
          keys: ["Enter", "S", "Numpad+"],
        },
        "swop.head": {
          keys: ["["],
        },
        "swop.heels": {
          keys: ["]"],
        },
        hold: {
          keys: ["F8", "H", "Numpad."],
        },
      },
    },
  ),
  description:
    "Default combined key and joystick/gamepad assignment, should work on most setups",
};

// left hand on wasd, right hand (optionally) on IOP
const wasdKeyAssignments: InputAssignmentPreset = {
  inputAssignment: combineInputAssignments(
    standardAssignment,
    gamepadAssignment.inputAssignment,
    {
      presses: {
        right: { keys: ["D"] },
        towards: { keys: ["S"] },
        left: { keys: ["A"] },
        away: { keys: ["W"] },
        jump: { keys: [" ", "F", "P"] },
        carry: { keys: ["Shift", "F", "I", "P"] },
        fire: { keys: ["E", "O", "Control"] },
        swop: { keys: ["Q"] },
        hold: { keys: ["H"] },
      },
    },
  ),
  description: "Modern, minimalist WASD key layout",
};

// left hand on wasd, right hand (optionally) on IOP
const keyboardMode8BitDo: InputAssignmentPreset = {
  inputAssignment: combineInputAssignments(
    standardAssignment,
    gamepadAssignment.inputAssignment,
    {
      presses: {
        right: { keys: [eightBitDoKeyboard.dPadRight] },
        towards: { keys: [eightBitDoKeyboard.dPadDown] },
        left: { keys: [eightBitDoKeyboard.dPadLeft] },
        away: { keys: [eightBitDoKeyboard.dPadUp] },
        jump: {
          keys: [eightBitDoKeyboard.a, eightBitDoKeyboard.y],
        },
        carry: {
          keys: [eightBitDoKeyboard.b, eightBitDoKeyboard.y],
        },
        fire: { keys: [eightBitDoKeyboard.x] },
        swop: { keys: [eightBitDoKeyboard.rb] },
        hold: { keys: [eightBitDoKeyboard.start] },
        menu_openOrExit: {
          keys: [eightBitDoKeyboard.select],
        },
      },
    },
  ),
  description:
    "8bitdo controllers in keyboard mode (identifies to OS as a keyboard). They work as controllers even on phones that don’t support controllers",
};

const mameToHoh = (mamePlayer: MamePlayer): PartialInputAssignment => ({
  presses: {
    right: { keys: [mamePlayer.directions.right] },
    towards: { keys: [mamePlayer.directions.down] },
    left: { keys: [mamePlayer.directions.left] },
    away: { keys: [mamePlayer.directions.up] },
    jump: { keys: [mamePlayer.buttons[0], mamePlayer.buttons[3]] },
    carry: { keys: [mamePlayer.buttons[1], mamePlayer.buttons[3]] },
    fire: { keys: [mamePlayer.buttons[2]] },
    swop: { keys: [mamePlayer.start] },
    hold: { keys: [mamePlayer.coin] },
    menu_openOrExit: { keys: [mamePlayer.buttons[2]] },
  },
});

const mamePreset: InputAssignmentPreset = {
  // note: mame is unusual in that it doesn't have gamepad built in
  inputAssignment: combineInputAssignments(
    emptyInputAssignment,
    standardAssignment,
    { presses: { menu_openOrExit: { keys: ["`", "Tab"] } } },
    mameToHoh(mameButtonsPlayer1),
    mameToHoh(mameButtonsPlayer2),
  ),
  description: "MAME key mappings. For arcade-style control panels",
};

export const keyAssignmentPresets = {
  default: defaultAssignment,
  "zx spectrum": zxSpectrumKeyAssignment,
  amiga: amigaKeyAssignment,
  /** allow playing on mame control panels with p1 or p2's joysticks/buttons */
  mame: mamePreset,
  wasd: wasdKeyAssignments,
  "🕹 8bitdo keyboard mode": keyboardMode8BitDo,
  "🕹 joystick": gamepadAssignment,
} satisfies Record<string, InputAssignmentPreset>;

export type KeyAssignmentPresetName = keyof typeof keyAssignmentPresets;
