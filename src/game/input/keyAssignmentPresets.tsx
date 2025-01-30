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

const allActions: (BooleanAction | DirectionXy4)[] = [
  ...booleanActions,
  ...directionsXy4,
];

const emptyInputAssignment: InputAssignment = fromAllEntries(
  allActions.map((action) => [
    action,
    { keys: [], gamepadAxes: [], gamepadButtons: [] },
  ]),
);

const combineWithoutDuplicates = <T,>(
  a: T[] | undefined,
  b: T[] | undefined,
): T[] => Array.from(new Set([...(a ?? []), ...(b ?? [])]));

type PartialInputAssignment = PartialDeep<InputAssignment>;

export function combineInputAssignments(
  firstAssignment: InputAssignment,
  ...assignments: PartialInputAssignment[]
): InputAssignment {
  return assignments.reduce(
    (ac: InputAssignment, curAssignment): InputAssignment => {
      for (const action of allActions) {
        ac[action] = {
          keys: combineWithoutDuplicates(
            ac[action]?.keys,
            curAssignment[action]?.keys,
          ),
          gamepadAxes: combineWithoutDuplicates(
            ac[action]?.gamepadAxes,
            curAssignment[action]?.gamepadAxes,
          ),
          gamepadButtons: combineWithoutDuplicates(
            ac[action]?.gamepadButtons,
            curAssignment[action]?.gamepadButtons,
          ),
        };
      }
      return ac;
    },
    structuredClone(firstAssignment),
  );
}

//standard keys that are used in all presets:
const standardKeys = {
  menu_openOrExit: { keys: ["Escape"] },
  // menu_up: { keys: ["ArrowUp"] },
  // menu_down: { keys: ["ArrowDown"] },
  menu_select: {
    keys: ["Enter"],
    gamepadButtons: [standardControllerLayout.a],
  },
  toggleColourisation: { keys: ["F6"] },
} as const satisfies PartialInputAssignment;

// menu key can't be reconfigured:
const originalKeyAssignment: InputAssignmentPreset = {
  inputAssignment: combineInputAssignments(emptyInputAssignment, standardKeys, {
    right: { keys: ["P", "7"], gamepadAxes: [0] },
    towards: { keys: ["A", "8"], gamepadAxes: [1] },
    left: { keys: ["O", "6"], gamepadAxes: [0] },
    away: { keys: ["Q", "9"], gamepadAxes: [1] },
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
  }),
  description: "closely matches zx spectrum keys",
};

const gamepadAssignment: InputAssignmentPreset = {
  inputAssignment: combineInputAssignments(emptyInputAssignment, standardKeys, {
    ...standardKeys,
    right: {
      gamepadAxes: [0],
      gamepadButtons: [standardControllerLayout.dPadRight],
    },
    towards: {
      gamepadAxes: [1],
      gamepadButtons: [standardControllerLayout.dPadDown],
    },
    left: {
      gamepadAxes: [0],
      gamepadButtons: [standardControllerLayout.dPadLeft],
    },
    away: {
      gamepadAxes: [1],
      gamepadButtons: [standardControllerLayout.dPadUp],
    },
    jump: {
      gamepadButtons: [standardControllerLayout.a, standardControllerLayout.y],
    },
    carry: {
      gamepadButtons: [standardControllerLayout.b, standardControllerLayout.y],
    },
    fire: { gamepadButtons: [standardControllerLayout.x] },
    swop: { gamepadButtons: [standardControllerLayout.l1] },
    hold: { gamepadButtons: [standardControllerLayout.start] },
    menu_openOrExit: {
      gamepadButtons: [
        // allow r1 because 3-6 button controllers probably won't have a start button
        // - and, on macOS by default select opens the 'select a game' type screen so
        // that's unusable without OS config
        standardControllerLayout.r1,
        standardControllerLayout.select,
      ],
    },
    toggleColourisation: {
      gamepadButtons: [standardControllerLayout.l2],
    },
  }),
  description:
    "Joysticks/gamepads with at least 4 buttons, but preferably 6 or more. Inc Playstation, xbox etc",
};

const defaultAssignment: InputAssignmentPreset = {
  inputAssignment: combineInputAssignments(
    emptyInputAssignment,
    standardKeys,
    gamepadAssignment.inputAssignment,
    {
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
  ),
  description:
    "Default combined key and joystick/gamepad assignment, should work on most setups",
};

// left hand on wasd, right hand (optionally) on IOP
const wasdKeyAssignments: InputAssignmentPreset = {
  inputAssignment: combineInputAssignments(emptyInputAssignment, standardKeys, {
    right: { keys: ["D"] },
    towards: { keys: ["S"] },
    left: { keys: ["A"] },
    away: { keys: ["W"] },
    jump: { keys: [" ", "F", "P"] },
    carry: { keys: ["Shift", "F", "I", "P"] },
    fire: { keys: ["E", "O", "Control"] },
    swop: { keys: ["Q"] },
    hold: { keys: ["H"] },
  }),
  description: "Modern, minimalist WASD key layout",
};

const mameToHoh = (mamePlayer: MamePlayer): PartialInputAssignment => ({
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
});

const mamePreset: InputAssignmentPreset = {
  inputAssignment: combineInputAssignments(
    emptyInputAssignment,
    standardKeys,
    { menu_openOrExit: { keys: ["`", "Tab"] } },
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
