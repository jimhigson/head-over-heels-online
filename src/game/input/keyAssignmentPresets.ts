import type { PartialInputAssignment } from "./combineInputAssignments";
import type { ControllerLayout, MamePlayer } from "./controllers";

import { combineInputAssignments } from "./combineInputAssignments";
import {
  eightBitDoKeyboard,
  mameButtonsPlayer1,
  mameButtonsPlayer2,
  standardControllerLayout,
  wired8BitDoUltimate2cControllerLayout,
} from "./controllers";
import { emptyInputAssignment } from "./emptyInputAssignment";
import { type InputAssignmentPreset } from "./InputAssignment";

//standard keys that are used in all presets:
const standardKeyAssignment = {
  presses: {
    right: {
      keys: ["ArrowRight"],
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

    jump: {
      // ` or z for jump-carry - these keys are next to shift on most keyboards
      keys: [" ", "`", "Z", "\\"],
    },
    carry: {
      keys: ["Shift", "`", "Z", "\\"],
    },
    fire: {
      keys: ["D"],
    },
    swop: {
      // Spectrum default S is used for WASD, we have enter instead:
      keys: ["Enter"],
    },
    "swop.head": {
      keys: ["[", "A"],
    },
    "swop.heels": {
      keys: ["]", "S"],
    },
    hold: {
      // Spectrum default 'H' is replaced with more recognisable/modern 'P' for pause
      keys: ["P"],
    },
    map: {
      keys: ["M", "Tab"],
    },
    menu_openOrExit: {
      // escape alone isn't good because it can leave fullscreen in browser sometimes - use the others!
      keys: ["Escape", "§"],
    },
    menu_select: {
      keys: ["Enter"],
    },
    // not many f-keys are available for us!
    // f3 is search in firefox
    // f5 is reload in most browsers
    // f6 in firefox is taken - focusses the address bar
    // f7 is taken in chrome/firefox - toggles caret browsing
    // f8 in chrome pauses script execution (if devtools open)
    // f11 clashes with macos defaults, and browser fullscreen!
    // f12 is taken in chrome/firefox - opens dev tools
    toggleCrtFilter: { keys: ["F8", "T"] },
    toggleShowFps: { keys: ["F9"] },
    toggleColourisation: { keys: ["F10"] },
    cycleResolution: { keys: ["0"] },

    pageDown: { keys: ["PageDown"] },
    pageUp: { keys: ["PageUp"] },
    home: { keys: ["Home"] },
    end: { keys: ["End"] },
  },
} as const satisfies PartialInputAssignment;

const gamepadAssignmentForLayout = ({
  buttons,
  axes,
  radialAxes,
}: ControllerLayout): PartialInputAssignment => {
  const isDefined = <T>(a: T | undefined): a is T => a !== undefined;
  return {
    presses: {
      right: {
        gamepadButtons: [buttons.dPadRight].filter(isDefined),
      },
      towards: {
        gamepadButtons: [buttons.dPadDown].filter(isDefined),
      },
      left: {
        gamepadButtons: [buttons.dPadLeft].filter(isDefined),
      },
      away: {
        gamepadButtons: [buttons.dPadUp].filter(isDefined),
      },
      jump: {
        gamepadButtons: [buttons.a, buttons.y].filter(isDefined),
      },
      carry: {
        gamepadButtons: [buttons.x, buttons.y].filter(isDefined),
      },
      fire: { gamepadButtons: [buttons.b].filter(isDefined) },
      lookShift: {
        gamepadButtons: [buttons.rb].filter(isDefined),
      },
      ["swop.head"]: {
        gamepadButtons: [buttons.lt].filter(isDefined),
      },
      ["swop.heels"]: {
        gamepadButtons: [buttons.rt].filter(isDefined),
      },
      hold: {
        gamepadButtons: [buttons.start].filter(isDefined),
      },
      menu_select: {
        gamepadButtons: [buttons.a].filter(isDefined),
      },
      menu_exit: {
        gamepadButtons: [buttons.b].filter(isDefined),
      },
      menu_openOrExit: {
        gamepadButtons: [
          // on macOS by default select opens the 'select a game' type screen and there's no way for
          // a browser to prevent that default. so that's unusable without OS config - encourage people
          // to turn that off I guess! Or they can use the keys
          buttons.select,
        ].filter(isDefined),
      },
      map: {
        gamepadButtons: [buttons.lb].filter(isDefined),
      },
      toggleCrtFilter: {
        gamepadButtons: [buttons.l3].filter(isDefined),
      },
      toggleShowFps: {
        gamepadButtons: [buttons.r3].filter(isDefined),
      },
    },
    axes: {
      x: [axes.lStickX].filter(isDefined),
      y: [axes.lStickY].filter(isDefined),
      xLook: [axes.rStickX].filter(isDefined),
      yLook: [axes.rStickY].filter(isDefined),
    },
    radialAxes: {
      xy: [radialAxes.xy].filter(isDefined),
    },
  };
};

// menu key can't be reconfigured:
const zxSpectrumKeyAssignment: InputAssignmentPreset = {
  inputAssignment: combineInputAssignments(
    standardKeyAssignment,
    // mix in standard controller as well as Speccy keys:
    gamepadAssignmentForLayout(standardControllerLayout),
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
  description: "Closely matches the ZX Spectrum original game's keys",
};

const amigaKeyAssignment: InputAssignmentPreset = {
  inputAssignment: combineInputAssignments(
    standardKeyAssignment,
    // mix in standard controller as well as the Amiga keys:
    gamepadAssignmentForLayout(standardControllerLayout),
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
  description: "Closely matches Amiga version keys - heavy on the F-keys",
};

const defaultAssignment: InputAssignmentPreset = {
  inputAssignment: combineInputAssignments(
    standardKeyAssignment,
    // standard controller included:
    gamepadAssignmentForLayout(standardControllerLayout),
    {
      presses: {
        // Looking by default - like WASD but over at IJKL
        // (find pip on J with right index finger)
        lookUp: {
          keys: ["I"],
        },
        lookDown: {
          keys: ["K"],
        },
        lookLeft: {
          keys: ["J"],
        },
        lookRight: {
          keys: ["L"],
        },
        lookShift: {
          keys: ["C"],
        },
      },
    },
  ),
  description:
    "Combined key and joystick/gamepad assignment, should work on most setups",
};

// left hand on wasd, right hand (optionally) on IOP
const wasdKeyAssignments: InputAssignmentPreset = {
  inputAssignment: combineInputAssignments(
    standardKeyAssignment,
    // also mix in the standard controller:
    gamepadAssignmentForLayout(standardControllerLayout),
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

const keyboardMode8BitDo: InputAssignmentPreset = {
  inputAssignment: combineInputAssignments(
    standardKeyAssignment,
    gamepadAssignmentForLayout(standardControllerLayout),
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

const ultimateWireless2c8BitDoNonStandard: InputAssignmentPreset = {
  inputAssignment: combineInputAssignments(
    standardKeyAssignment,
    gamepadAssignmentForLayout(wired8BitDoUltimate2cControllerLayout),
  ),
  description:
    "8Bitdo Ultimate 2c Wired reports in a non-standard way on some systems - use this if you have this controller and it doesn't work as expected",
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
    menu_openOrExit: { keys: [mamePlayer.buttons[4]] },
    lookShift: { keys: [mamePlayer.buttons[5]] },
  },
});

const mamePreset: InputAssignmentPreset = {
  // note: mame is unusual in that it doesn't have gamepad built in
  inputAssignment: combineInputAssignments(
    emptyInputAssignment,
    standardKeyAssignment,
    { presses: { menu_openOrExit: { keys: ["`", "Tab"] } } },
    mameToHoh(mameButtonsPlayer1),
    {
      presses: {
        // player 2 joystick for look:
        lookDown: { keys: [mameButtonsPlayer2.directions.down] },
        lookLeft: { keys: [mameButtonsPlayer2.directions.left] },
        lookRight: { keys: [mameButtonsPlayer2.directions.right] },
        lookUp: { keys: [mameButtonsPlayer2.directions.up] },

        // player 2's buttons for direct swop to head/heels:
        ["swop.head"]: { keys: [mameButtonsPlayer2.buttons[0]] },
        ["swop.heels"]: { keys: [mameButtonsPlayer2.buttons[1]] },
      },
    },
  ),
  description: "Arcade-style control panels",
};

export const keyAssignmentPresets = {
  Default: defaultAssignment,
  "ZX Spec": zxSpectrumKeyAssignment,
  Amiga: amigaKeyAssignment,
  /** allow playing on mame control panels with p1 or p2's joysticks/buttons */
  MAME: mamePreset,
  WASD: wasdKeyAssignments,
  "🕹 8b kbd": keyboardMode8BitDo,
  "🕹 8b U2c": ultimateWireless2c8BitDoNonStandard,
} satisfies Record<string, InputAssignmentPreset>;

export type KeyAssignmentPresetName = keyof typeof keyAssignmentPresets;
