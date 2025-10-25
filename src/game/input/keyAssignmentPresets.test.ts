import { expect, test } from "vitest";

import { keyAssignmentPresets } from "./keyAssignmentPresets";

test("MAME assignment", () => {
  expect(keyAssignmentPresets.MAME).toMatchInlineSnapshot(`
    {
      "description": "Arcade-style control panels",
      "inputAssignment": {
        "axes": {
          "x": [],
          "xLook": [],
          "y": [],
          "yLook": [],
        },
        "presses": {
          "away": {
            "gamepadButtons": [],
            "keys": [
              "ArrowUp",
            ],
          },
          "carry": {
            "gamepadButtons": [],
            "keys": [
              "Alt",
              "Shift",
              "\\",
            ],
          },
          "cycleResolution": {
            "gamepadButtons": [],
            "keys": [
              "0",
            ],
          },
          "end": {
            "gamepadButtons": [],
            "keys": [
              "End",
            ],
          },
          "fire": {
            "gamepadButtons": [],
            "keys": [
              " ",
            ],
          },
          "hold": {
            "gamepadButtons": [],
            "keys": [
              "5",
              "P",
            ],
          },
          "home": {
            "gamepadButtons": [],
            "keys": [
              "Home",
            ],
          },
          "jump": {
            "gamepadButtons": [],
            "keys": [
              "Control",
              "Shift",
              "\\",
            ],
          },
          "left": {
            "gamepadButtons": [],
            "keys": [
              "ArrowLeft",
            ],
          },
          "lookDown": {
            "gamepadButtons": [],
            "keys": [
              "F",
            ],
          },
          "lookLeft": {
            "gamepadButtons": [],
            "keys": [
              "D",
            ],
          },
          "lookRight": {
            "gamepadButtons": [],
            "keys": [
              "G",
            ],
          },
          "lookShift": {
            "gamepadButtons": [],
            "keys": [
              "X",
            ],
          },
          "lookUp": {
            "gamepadButtons": [],
            "keys": [
              "R",
            ],
          },
          "map": {
            "gamepadButtons": [],
            "keys": [
              "M",
            ],
          },
          "menu_exit": {
            "gamepadButtons": [],
            "keys": [],
          },
          "menu_openOrExit": {
            "gamepadButtons": [],
            "keys": [
              "Z",
              "\`",
              "Tab",
              "Escape",
              "§",
            ],
          },
          "menu_select": {
            "gamepadButtons": [],
            "keys": [
              "Enter",
            ],
          },
          "pageDown": {
            "gamepadButtons": [],
            "keys": [
              "PageDown",
            ],
          },
          "pageUp": {
            "gamepadButtons": [],
            "keys": [
              "PageUp",
            ],
          },
          "right": {
            "gamepadButtons": [],
            "keys": [
              "ArrowRight",
            ],
          },
          "swop": {
            "gamepadButtons": [],
            "keys": [
              "1",
              "Enter",
            ],
          },
          "swop.head": {
            "gamepadButtons": [],
            "keys": [
              "A",
              "[",
            ],
          },
          "swop.heels": {
            "gamepadButtons": [],
            "keys": [
              "S",
              "]",
            ],
          },
          "toggleColourisation": {
            "gamepadButtons": [],
            "keys": [
              "F10",
            ],
          },
          "toggleCrtFilter": {
            "gamepadButtons": [],
            "keys": [
              "F8",
              "T",
            ],
          },
          "toggleShowFps": {
            "gamepadButtons": [],
            "keys": [
              "F9",
            ],
          },
          "towards": {
            "gamepadButtons": [],
            "keys": [
              "ArrowDown",
            ],
          },
        },
        "radialAxes": {
          "xy": [],
        },
      },
    }
  `);
});

test("Default assignment", () => {
  expect(keyAssignmentPresets.Default).toMatchInlineSnapshot(`
    {
      "description": "Combined key and joystick/gamepad assignment, should work on most setups",
      "inputAssignment": {
        "axes": {
          "x": [
            0,
          ],
          "xLook": [
            2,
          ],
          "y": [
            1,
          ],
          "yLook": [
            3,
          ],
        },
        "presses": {
          "away": {
            "gamepadButtons": [
              12,
            ],
            "keys": [
              "ArrowUp",
            ],
          },
          "carry": {
            "gamepadButtons": [
              2,
              3,
            ],
            "keys": [
              "Shift",
              "\`",
              "Z",
              "\\",
            ],
          },
          "cycleResolution": {
            "gamepadButtons": [],
            "keys": [
              "0",
            ],
          },
          "end": {
            "gamepadButtons": [],
            "keys": [
              "End",
            ],
          },
          "fire": {
            "gamepadButtons": [
              1,
            ],
            "keys": [
              "D",
            ],
          },
          "hold": {
            "gamepadButtons": [
              9,
            ],
            "keys": [
              "P",
            ],
          },
          "home": {
            "gamepadButtons": [],
            "keys": [
              "Home",
            ],
          },
          "jump": {
            "gamepadButtons": [
              0,
              3,
            ],
            "keys": [
              " ",
              "\`",
              "Z",
              "\\",
            ],
          },
          "left": {
            "gamepadButtons": [
              14,
            ],
            "keys": [
              "ArrowLeft",
            ],
          },
          "lookDown": {
            "gamepadButtons": [],
            "keys": [
              "K",
            ],
          },
          "lookLeft": {
            "gamepadButtons": [],
            "keys": [
              "J",
            ],
          },
          "lookRight": {
            "gamepadButtons": [],
            "keys": [
              "L",
            ],
          },
          "lookShift": {
            "gamepadButtons": [
              5,
            ],
            "keys": [
              "C",
            ],
          },
          "lookUp": {
            "gamepadButtons": [],
            "keys": [
              "I",
            ],
          },
          "map": {
            "gamepadButtons": [
              4,
            ],
            "keys": [
              "M",
              "Tab",
            ],
          },
          "menu_exit": {
            "gamepadButtons": [
              1,
            ],
            "keys": [],
          },
          "menu_openOrExit": {
            "gamepadButtons": [
              8,
            ],
            "keys": [
              "Escape",
              "§",
            ],
          },
          "menu_select": {
            "gamepadButtons": [
              0,
            ],
            "keys": [
              "Enter",
            ],
          },
          "pageDown": {
            "gamepadButtons": [],
            "keys": [
              "PageDown",
            ],
          },
          "pageUp": {
            "gamepadButtons": [],
            "keys": [
              "PageUp",
            ],
          },
          "right": {
            "gamepadButtons": [
              15,
            ],
            "keys": [
              "ArrowRight",
            ],
          },
          "swop": {
            "gamepadButtons": [],
            "keys": [
              "Enter",
            ],
          },
          "swop.head": {
            "gamepadButtons": [
              6,
            ],
            "keys": [
              "[",
              "A",
            ],
          },
          "swop.heels": {
            "gamepadButtons": [
              7,
            ],
            "keys": [
              "]",
              "S",
            ],
          },
          "toggleColourisation": {
            "gamepadButtons": [],
            "keys": [
              "F10",
            ],
          },
          "toggleCrtFilter": {
            "gamepadButtons": [],
            "keys": [
              "F8",
              "T",
            ],
          },
          "toggleShowFps": {
            "gamepadButtons": [],
            "keys": [
              "F9",
            ],
          },
          "towards": {
            "gamepadButtons": [
              13,
            ],
            "keys": [
              "ArrowDown",
            ],
          },
        },
        "radialAxes": {
          "xy": [],
        },
      },
    }
  `);
});
