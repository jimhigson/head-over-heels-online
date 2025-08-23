import type { BooleanAction } from "./actions";
import type { AxisAssignableAction } from "./InputAssignment";

// for actions with an axis equivalent, get the axis and direction of the action:
const actionAxisLookup: Partial<
  Record<BooleanAction, { axis: AxisAssignableAction; direction: -1 | 1 }>
> = {
  left: {
    axis: "x",
    direction: -1,
  },
  right: {
    axis: "x",
    direction: 1,
  },
  towards: {
    axis: "y",
    direction: 1,
  },
  away: {
    axis: "y",
    direction: -1,
  },
  lookLeft: {
    axis: "xLook",
    direction: -1,
  },
  lookRight: {
    axis: "xLook",
    direction: 1,
  },
  lookUp: {
    axis: "yLook",
    direction: 1,
  },
  lookDown: {
    axis: "yLook",
    direction: -1,
  },
};

export const actionToAxis = (
  action: BooleanAction,
): { axis: AxisAssignableAction; direction: -1 | 1 } | undefined => {
  return actionAxisLookup[action];
};
