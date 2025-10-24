import { expect, it } from "vitest";

import type { PartialInputAssignment } from "./combineInputAssignments";
import type { InputAssignment } from "./InputAssignment";

import { combineInputAssignments } from "./combineInputAssignments";

it("combines two partial input assignments without duplicates", () => {
  const assignment1: PartialInputAssignment = {
    presses: {
      jump: {
        keys: [" "],
        gamepadButtons: [0],
      },
      carry: {
        keys: ["Shift"],
      },
    },
    axes: {
      x: [0],
      y: [1],
    },
  };

  const assignment2: PartialInputAssignment = {
    presses: {
      jump: {
        keys: ["Enter"], // Different key for same action
        gamepadButtons: [0, 2], // Overlapping button 0, plus new button 2
      },
      swop: {
        keys: ["Tab"],
        gamepadButtons: [3],
      },
    },
    axes: {
      x: [0, 2], // Overlapping axis 0, plus new axis 2
      xLook: [3],
    },
    radialAxes: {
      xy: [4],
    },
  };

  const combined = combineInputAssignments(assignment1, assignment2);

  expect<InputAssignment>(combined).toEqual<InputAssignment>({
    axes: {
      x: [0, 2],
      xLook: [3],
      y: [1],
      yLook: [],
    },
    presses: {
      away: {
        gamepadButtons: [],
        keys: [],
      },
      carry: {
        gamepadButtons: [],
        keys: ["Shift"],
      },
      cycleResolution: {
        gamepadButtons: [],
        keys: [],
      },
      end: {
        gamepadButtons: [],
        keys: [],
      },
      fire: {
        gamepadButtons: [],
        keys: [],
      },
      hold: {
        gamepadButtons: [],
        keys: [],
      },
      home: {
        gamepadButtons: [],
        keys: [],
      },
      jump: {
        gamepadButtons: [0, 2],
        keys: expect.arrayContaining([" ", "Enter"]),
      },
      left: {
        gamepadButtons: [],
        keys: [],
      },
      lookDown: {
        gamepadButtons: [],
        keys: [],
      },
      lookLeft: {
        gamepadButtons: [],
        keys: [],
      },
      lookRight: {
        gamepadButtons: [],
        keys: [],
      },
      lookShift: {
        gamepadButtons: [],
        keys: [],
      },
      lookUp: {
        gamepadButtons: [],
        keys: [],
      },
      map: {
        gamepadButtons: [],
        keys: [],
      },
      menu_exit: {
        gamepadButtons: [],
        keys: [],
      },
      menu_openOrExit: {
        gamepadButtons: [],
        keys: [],
      },
      menu_select: {
        gamepadButtons: [],
        keys: [],
      },
      pageDown: {
        gamepadButtons: [],
        keys: [],
      },
      pageUp: {
        gamepadButtons: [],
        keys: [],
      },
      right: {
        gamepadButtons: [],
        keys: [],
      },
      swop: {
        gamepadButtons: [3],
        keys: ["Tab"],
      },
      "swop.head": {
        gamepadButtons: [],
        keys: [],
      },
      "swop.heels": {
        gamepadButtons: [],
        keys: [],
      },
      toggleColourisation: {
        gamepadButtons: [],
        keys: [],
      },
      toggleCrtFilter: {
        gamepadButtons: [],
        keys: [],
      },
      toggleShowFps: {
        gamepadButtons: [],
        keys: [],
      },
      towards: {
        gamepadButtons: [],
        keys: [],
      },
    },
    radialAxes: {
      xy: [4],
    },
  });
});

it("combines two partial input with duplicates by later values overriding earlier ones", () => {
  const assignment1: PartialInputAssignment = {
    presses: {
      away: {
        keys: ["W"], // W for walk away
        gamepadButtons: [0], // Button 0 for away
      },
      carry: {
        keys: ["Shift"],
      },
    },
    axes: {
      x: [0], // Axis 0 for x movement
      y: [1],
    },
    radialAxes: {
      xy: [2], // Radial axis 2 for movement
    },
  };

  const assignment2: PartialInputAssignment = {
    presses: {
      // note: one key for carry and jump - z is carry-jump
      carry: {
        keys: ["Z"],
      },
      jump: {
        keys: ["Z", "W"], // W now used for jump instead of away
        gamepadButtons: [0, 2], // Button 0 now for jump instead of away
      },
      swop: {
        keys: ["Tab"],
        gamepadButtons: [3],
      },
    },
    axes: {
      xLook: [0], // Axis 0 now for looking instead of x movement
      yLook: [1], // Axis 1 now for looking instead of y movement
    },
    radialAxes: {
      xy: [2, 3], // Radial axis 2 still for movement, plus axis 3
    },
  };

  const combined = combineInputAssignments(assignment1, assignment2);

  // Expected behavior when later assignments override:
  // - "W" key should only be assigned to jump (not away)
  // - Button 0 should only be assigned to jump (not away)
  // - Axis 0 should only be assigned to xLook (not x)
  // - Axis 1 should only be assigned to yLook (not y)
  // - Radial axis 2 should remain in xy (same action in both)

  expect<InputAssignment>(combined).toEqual<InputAssignment>({
    axes: {
      x: [], // Empty because axis 0 was reassigned to xLook
      xLook: [0], // Axis 0 now assigned here
      y: [], // Empty because axis 1 was reassigned to yLook
      yLook: [1], // Axis 1 now assigned here
    },
    presses: {
      away: {
        gamepadButtons: [], // Empty because button 0 was reassigned to jump
        keys: [], // Empty because "W" was reassigned to jump
      },
      carry: {
        gamepadButtons: [],
        keys: expect.arrayContaining(["Shift", "Z"]), // Keeps "Shift" from assignment1, gets "Z" from assignment2
      },
      cycleResolution: {
        gamepadButtons: [],
        keys: [],
      },
      end: {
        gamepadButtons: [],
        keys: [],
      },
      fire: {
        gamepadButtons: [],
        keys: [],
      },
      hold: {
        gamepadButtons: [],
        keys: [],
      },
      home: {
        gamepadButtons: [],
        keys: [],
      },
      jump: {
        gamepadButtons: [0, 2], // Gets button 0 (overrides away) and button 2
        keys: ["Z", "W"], // Gets "Z" and "W" from assignment2
      },
      left: {
        gamepadButtons: [],
        keys: [],
      },
      lookDown: {
        gamepadButtons: [],
        keys: [],
      },
      lookLeft: {
        gamepadButtons: [],
        keys: [],
      },
      lookRight: {
        gamepadButtons: [],
        keys: [],
      },
      lookShift: {
        gamepadButtons: [],
        keys: [],
      },
      lookUp: {
        gamepadButtons: [],
        keys: [],
      },
      map: {
        gamepadButtons: [],
        keys: [],
      },
      menu_exit: {
        gamepadButtons: [],
        keys: [],
      },
      menu_openOrExit: {
        gamepadButtons: [],
        keys: [],
      },
      menu_select: {
        gamepadButtons: [],
        keys: [],
      },
      pageDown: {
        gamepadButtons: [],
        keys: [],
      },
      pageUp: {
        gamepadButtons: [],
        keys: [],
      },
      right: {
        gamepadButtons: [],
        keys: [],
      },
      swop: {
        gamepadButtons: [3],
        keys: ["Tab"],
      },
      "swop.head": {
        gamepadButtons: [],
        keys: [],
      },
      "swop.heels": {
        gamepadButtons: [],
        keys: [],
      },
      toggleColourisation: {
        gamepadButtons: [],
        keys: [],
      },
      toggleCrtFilter: {
        gamepadButtons: [],
        keys: [],
      },
      toggleShowFps: {
        gamepadButtons: [],
        keys: [],
      },
      towards: {
        gamepadButtons: [],
        keys: [],
      },
    },
    radialAxes: {
      xy: [2, 3], // Both axes since they map to the same action
    },
  });
});
