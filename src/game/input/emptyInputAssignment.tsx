import { fromAllEntries } from "../../utils/entries";
import { booleanActions } from "./actions";
import { type InputAssignment } from "./InputAssignment";

export const emptyInputAssignment: InputAssignment = {
  presses: fromAllEntries(
    booleanActions.map((action) => [action, { keys: [], gamepadButtons: [] }]),
  ),
  axes: { x: [], y: [], xLook: [], yLook: [] },
  radialAxes: { xy: [] },
};
