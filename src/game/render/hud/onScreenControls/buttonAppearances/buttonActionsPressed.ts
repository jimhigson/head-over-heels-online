import type { BooleanAction } from "../../../../input/actions";
import type { InputStateTrackerInterface } from "../../../../input/InputStateTracker";

export const buttonActionsPressed = (
  actions: BooleanAction[],
  inputStateTracker: InputStateTrackerInterface,
): boolean =>
  actions.every(
    (a) => inputStateTracker.currentActionPress(a, true) !== "released",
  );
