import type { AxisXy } from "../../utils/vectors/vectors";
import type { BooleanAction } from "./BooleanAction";

// for actions with an axis equivalent, get the axis and direction of the action:

export const actionToAxis = (
  action: BooleanAction,
): { axis: AxisXy; direction: -1 | 1 } | undefined => {
  return (
    action === "left" ?
      {
        axis: "x",
        direction: -1,
      }
    : action === "right" ?
      {
        axis: "x",
        direction: 1,
      }
    : action === "towards" ?
      {
        axis: "y",
        direction: 1,
      }
    : action === "away" ?
      {
        axis: "y",
        direction: -1,
      }
    : undefined
  );
};
