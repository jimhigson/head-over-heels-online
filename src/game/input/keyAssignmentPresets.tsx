import type { PartialDeep } from "type-fest";
import { fromAllEntries } from "../../utils/entries";
import type { DirectionXy4 } from "../../utils/vectors/vectors";
import { directionsXy4 } from "../../utils/vectors/vectors";
import type { BooleanAction } from "./InputState";
import {
  booleanActions,
  type InputAssignment,
  type InputAssignmentPreset,
} from "./InputState";
import type { MamePlayer } from "./controllers";
import {
  mameButtonsPlayer1,
  mameButtonsPlayer2,
  standardControllerLayout,
} from "./controllers";

//standard keys that are used in all presets:
const standardAssignment = {
  presses: {
    menu_openOrExit: {
      // escape alone isn't good because it can leave fullscreen in browser sometimes - use the others!
      keys: ["Escape", "Tab", "§"],
    },
    menu_exit: { gamepadButtons: [standardControllerLayout.x] },
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
    // f11 clashes with macos defaults, and browser fullscreen!
    // f12 is taken in chrome/firefox - opens dev tools
    toggleColourisation: { keys: ["F10"] },
    toggleShowFps: { keys: ["F9"] },
  },
  axes: {
    x: [0],
    y: [1],
  },
} as const satisfies PartialInputAssignment;

const allActions: (BooleanAction | DirectionXy4)[] = [
  ...booleanActions,
  ...directionsXy4,
];

const emptyInputAssignment: InputAssignment = {
  presses: fromAllEntries(
    allActions.map((action) => [
      action,
      { keys: [], gamepadAxes: [], gamepadButtons: [] },
    ]),
  ),
  axes: { x: [], y: [] },
};

const combineWithoutDuplicates = <T,>(
  a: T[] | undefined,
  b: T[] | undefined,
): T[] => Array.from(new Set([...(a ?? []), ...(b ?? [])]));

type PartialInputAssignment = PartialDeep<InputAssignment>;

export function combineInputAssignments(
  firstAssignment: InputAssignment,
  ...assignments: PartialInputAssignment[]
): InputAssignment {
  return {
    presses: assignments.reduce(
      (
        ac: InputAssignment["presses"],
        curAssignment,
      ): InputAssignment["presses"] => {
        for (const action of allActions) {
          ac[action] = {
            keys: combineWithoutDuplicates(
              ac[action]?.keys,
              curAssignment?.presses?.[action]?.keys,
            ),
            gamepadButtons: combineWithoutDuplicates(
              ac[action]?.gamepadButtons,
              curAssignment?.presses?.[action]?.gamepadButtons,
            ),
          };
        }
        return ac;
      },
      structuredClone(firstAssignment.presses),
    ),
    axes: {
      x: Array.from(
        new Set([
          ...firstAssignment.axes.x,
          ...assignments.map((a) => a.axes?.x ?? []).flat(),
        ]),
      ),
      y: Array.from(
        new Set([
          ...firstAssignment.axes.y,
          ...assignments.map((a) => a.axes?.y ?? []).flat(),
        ]),
      ),
    },
  };
}

// menu key can't be reconfigured:
const originalKeyAssignment: InputAssignmentPreset = {
  inputAssignment: combineInputAssignments(
    emptyInputAssignment,
    standardAssignment,
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

const gamepadAssignment: InputAssignmentPreset = {
  inputAssignment: combineInputAssignments(
    emptyInputAssignment,
    standardAssignment,
    {
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
            standardControllerLayout.b,
            standardControllerLayout.y,
          ],
        },
        fire: { gamepadButtons: [standardControllerLayout.x] },
        swop: { gamepadButtons: [standardControllerLayout.r1] },
        hold: { gamepadButtons: [standardControllerLayout.start] },
        menu_openOrExit: {
          gamepadButtons: [
            // allow r1 because 3-6 button controllers probably won't have a start button
            // - and, on macOS by default select opens the 'select a game' type screen so
            // that's unusable without OS config
            standardControllerLayout.l1,
            standardControllerLayout.select,
          ],
        },
        toggleColourisation: {
          gamepadButtons: [standardControllerLayout.l2],
        },
      },
      axes: {
        x: [0],
        y: [1],
      },
    },
  ),
  description:
    "Joysticks/gamepads with at least 4 buttons, but preferably 6 or more. Inc Playstation, xbox etc",
};

const defaultAssignment: InputAssignmentPreset = {
  inputAssignment: combineInputAssignments(
    emptyInputAssignment,
    standardAssignment,
    gamepadAssignment.inputAssignment,
    {
      presses: {
        right: {
          keys: ["ArrowRight", "P", "Numpad6"],
        },
        towards: {
          keys: ["ArrowDown", "A", "Numpad5"],
        },
        left: {
          keys: ["ArrowLeft", "O", "Numpad8"],
        },
        away: {
          keys: ["ArrowUp", "Q", "Numpad9"],
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
    emptyInputAssignment,
    standardAssignment,
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
    menu_openOrExit: { keys: [mamePlayer.buttons[5]] },
  },
});

const mamePreset: InputAssignmentPreset = {
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
  "zx spectrum": originalKeyAssignment,
  /** allow playing on mame control panels with p1 or p2's joysticks/buttons */
  mame: mamePreset,
  wasd: wasdKeyAssignments,
  "🕹joystick": gamepadAssignment,
} satisfies Record<string, InputAssignmentPreset>;

export type KeyAssignmentPresetName = keyof typeof keyAssignmentPresets;
