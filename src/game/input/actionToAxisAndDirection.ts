import type { ValueOf } from "type-fest";

import type { BooleanAction } from "./actions";
import type { AxisAssignableAction } from "./InputAssignment";

type AxisAndDirection = {
  axis: AxisAssignableAction;
  /**
   * The 2d plane the axis is on. This is used for radial axes since a single axis can map
   * to an xy pair (4 actions)
   */
  plane: "look" | "xy";
  direction: -1 | 1;
};

// for actions with an axis equivalent, get the axis and direction of the action:
const actionAxisLookup = {
  left: {
    axis: "x",
    plane: "xy",
    direction: -1,
  },
  right: {
    axis: "x",
    plane: "xy",
    direction: 1,
  },
  towards: {
    axis: "y",
    plane: "xy",
    direction: 1,
  },
  away: {
    axis: "y",
    plane: "xy",
    direction: -1,
  },
  lookLeft: {
    // TODO: now that we have plane, this could be just 'x'
    axis: "xLook",
    plane: "look",
    direction: -1,
  },
  lookRight: {
    axis: "xLook",
    plane: "look",
    direction: 1,
  },
  lookUp: {
    axis: "yLook",
    plane: "look",
    direction: 1,
  },
  lookDown: {
    axis: "yLook",
    plane: "look",
    direction: -1,
  },
} as const satisfies Partial<Record<BooleanAction, AxisAndDirection>>;

type ActionAndAxisValue = ValueOf<typeof actionAxisLookup>;

export const actionToAxisAndDirection = (
  action: BooleanAction,
): ActionAndAxisValue | undefined => {
  return (
    actionAxisLookup as Partial<Record<BooleanAction, ActionAndAxisValue>>
  )[action];
};
