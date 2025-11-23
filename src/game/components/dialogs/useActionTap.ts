import { Ticker } from "pixi.js";
import { useEffect, useMemo } from "react";

import type { DirectionXy4 } from "../../../utils/vectors/vectors";
import type { BooleanAction } from "../../input/actions";
import type { InputPress } from "../../input/InputAssignment";
import type { InputStateTrackerInterface } from "../../input/InputStateTracker";

import { useInputStateTracker } from "../../input/InputStateProvider";

export type UseActionInputProps = {
  /** MUST be cached using useCallback or useMemo, or will re-assign on every render
   * @returns true of declined to handle the action; otherwise the default is to
   * handle it
   */
  handler: (action: BooleanAction | DirectionXy4) => boolean | void;
  action?:
    | (BooleanAction | DirectionXy4)
    | Readonly<Array<BooleanAction | DirectionXy4>>;
  disabled?: boolean;
};

export const useActionTap = ({
  handler,
  action: actionOrActions,
  disabled = false,
}: UseActionInputProps) => {
  const actions: Array<BooleanAction | DirectionXy4> = useMemo(
    () =>
      Array.isArray(actionOrActions) ? actionOrActions : [actionOrActions],
    [actionOrActions],
  );

  const inputStateTracker = useInputStateTracker();

  useEffect(() => {
    if (disabled) {
      return;
    }

    const callHandlerIfActionTapped = () => {
      for (const a of actions) {
        const pressStatus = inputStateTracker.currentActionPress(a);
        if (pressStatus === "tap") {
          const declinedToHandle = handler(a);
          if (!declinedToHandle) {
            for (const a2 of actions) {
              inputStateTracker.inputWasHandled(a2);
            }
          }

          break; // if we are looking for multiple actions, don't let them
          // all trigger on the same frame
        }
      }
    };

    Ticker.shared.add(callHandlerIfActionTapped);
    return () => {
      Ticker.shared.remove(callHandlerIfActionTapped);
    };
  }, [actions, disabled, inputStateTracker, handler]);
};

export type UseInputPressesProps = {
  handler: (
    input: InputPress,
    inputStateTracker: InputStateTrackerInterface,
  ) => void;
  disabled?: boolean;
};

export const useInputTap = ({
  handler,
  disabled = false,
}: UseInputPressesProps) => {
  const inputStateTracker = useInputStateTracker();

  useEffect(() => {
    if (disabled) {
      return;
    }

    /**
     * setInterval loop for the menus (since they don't have a ticker like the game engine does)
     * this will add latency to input but is not used for anywhere where that matters
     */
    const check = () => {
      const inputTap = inputStateTracker.inputTap();
      if (inputTap !== undefined) {
        handler(inputTap, inputStateTracker);
      }
    };

    Ticker.shared.add(check);
    return () => {
      Ticker.shared.remove(check);
    };
  }, [disabled, handler, inputStateTracker]);
};
