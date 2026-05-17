import { fromAllEntries } from "../../utils/entries";
import { allActions } from "./actions";
import { type InputAssignment } from "./InputAssignment";

export const emptyInputAssignment: InputAssignment = {
  presses: fromAllEntries(
    allActions.map((action) => [action, { keys: [], gamepadButtons: [] }]),
  ),
  axes: { x: [], y: [], xLook: [], yLook: [] },
  radialAxes: { xy: [] },
};
