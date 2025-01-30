import { useEffect, useMemo } from "react";
import { useInputStateInterpretation } from "../../input/InputStateProvider";
import type { DirectionXy4 } from "../../../utils/vectors/vectors";
import type { BooleanAction, InputPress } from "../../input/InputState";
import { useUnchanging } from "../../../utils/react/useEvent";

import { Ticker } from "pixi.js";
import { keys } from "../../../utils/entries";
import type { InputStateInterpretation } from "../../input/interpretInputState";

export type UseActionInputProps = {
  /** MUST be cached using useCallback or useMemo, or will re-assign on every render */
  onAction: (action: BooleanAction | DirectionXy4) => void;
  action?:
    | (BooleanAction | DirectionXy4)
    | Readonly<Array<BooleanAction | DirectionXy4>>;
  disabled?: boolean;
};

export const useActionInput = ({
  onAction,
  action: actionOrActions,
  disabled = false,
}: UseActionInputProps) => {
  const actions: Array<BooleanAction | DirectionXy4> = useMemo(
    () =>
      Array.isArray(actionOrActions) ? actionOrActions : [actionOrActions],
    [actionOrActions],
  );

  const interpretation = useInputStateInterpretation();

  useUnchanging(actionOrActions);
  useUnchanging(onAction);
  useUnchanging(interpretation);

  useEffect(() => {
    if (disabled) {
      return;
    }

    const check = () => {
      for (const action of actions) {
        const isPressed = interpretation.actions[action];
        if (isPressed) {
          onAction(action);
          interpretation.handled(action);
        }
      }
    };

    Ticker.shared.add(check);
    return () => {
      Ticker.shared.remove(check);
    };
  }, [actions, disabled, interpretation, onAction]);
};

export type UseInputPressesProps = {
  onAction: (
    interpretation: InputStateInterpretation,
    input: InputPress,
  ) => void;
  /** '*' means any and is really only useful for assigning keys */
  //inputPress: "*" | InputPress;
  disabled?: boolean;
};

export const useInputPress = ({
  onAction,
  //inputPress,
  disabled = false,
}: UseInputPressesProps) => {
  //useUnchanging(inputPress);
  useUnchanging(onAction);

  const interpretation = useInputStateInterpretation();

  useEffect(() => {
    if (disabled) {
      return;
    }

    /**
     * setInterval loop for the menus (since they don't have a ticker like the game engine does)
     * this will add latency to input but is not used for anywhere where that matters
     */
    const check = () => {
      for (const k of keys(interpretation.underlying.keyboardState.keys)) {
        onAction(interpretation, { type: "key", input: k });
        return;
      }

      for (const gp of navigator.getGamepads()) {
        if (gp === null) {
          continue;
        }
        for (const [buttonNumber, button] of gp.buttons.entries()) {
          if (button.pressed) {
            console.log("button pressed", buttonNumber);
            onAction(interpretation, {
              type: "gamepadButtons",
              input: buttonNumber,
            });
          }
        }
        return;
      }
    };

    Ticker.shared.add(check);
    return () => {
      Ticker.shared.remove(check);
    };
  }, [disabled, interpretation, onAction]);
};
