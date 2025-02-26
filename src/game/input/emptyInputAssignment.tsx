import { fromAllEntries } from "../../utils/entries";
import type { InputAssignment } from "./InputState";
import { allActions } from "./actions";

export const emptyInputAssignment: InputAssignment = {
  presses: fromAllEntries(
    allActions.map((action) => [
      action,
      { keys: [], gamepadAxes: [], gamepadButtons: [] },
    ]),
  ),
  axes: { x: [], y: [] },
};
