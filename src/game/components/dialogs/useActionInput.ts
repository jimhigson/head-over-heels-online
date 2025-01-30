import { useEffect, useMemo } from "react";
import { useInputStateTracker } from "../../input/InputStateProvider";
import type { DirectionXy4 } from "../../../utils/vectors/vectors";
import type { BooleanAction, InputPress } from "../../input/InputState";
import { useUnchanging } from "../../../utils/react/useEvent";

import { Ticker } from "pixi.js";
import type { InputStateTracker } from "../../input/InputStateTracker";

export type UseActionInputProps = {
  /** MUST be cached using useCallback or useMemo, or will re-assign on every render */
  handler: (action: BooleanAction | DirectionXy4) => void;
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

  useUnchanging(actionOrActions);
  useUnchanging(handler);
  useUnchanging(inputStateTracker);

  useEffect(() => {
    if (disabled) {
      return;
    }

    const check = () => {
      for (const action of actions) {
        const pressStatus = inputStateTracker.currentActionPress(action);
        if (pressStatus === "tap") {
          handler(action);
          break; // if we are looking for multiple actions, don't let them
          // all trigger on the same frame
        }
      }
    };

    Ticker.shared.add(check);
    return () => {
      Ticker.shared.remove(check);
    };
  }, [actions, disabled, inputStateTracker, handler]);
};

export type UseInputPressesProps = {
  handler: (input: InputPress, inputStateTracker: InputStateTracker) => void;
  disabled?: boolean;
};

export const useInputTap = ({
  handler,
  disabled = false,
}: UseInputPressesProps) => {
  useUnchanging(handler);

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
