import type { InputState } from "@/game/input/InputState";
import { useEffect, useMemo } from "react";
import { useGameApi } from "../GameApiContext";
import type { ConditionalKeys } from "type-fest";

type BooleanInputStateKey = ConditionalKeys<InputState, boolean>;

export type UseActionInputProps = {
  onAction: () => void;
  action: BooleanInputStateKey | BooleanInputStateKey[];
};

export const useActionInput = ({
  onAction,
  action: actionProp,
}: UseActionInputProps) => {
  const gameApi = useGameApi();

  const actions = useMemo(
    () => (Array.isArray(actionProp) ? actionProp : [actionProp]),
    [actionProp],
  );

  useEffect(
    function closeOnInput() {
      const handleInput = (inputState: InputState) => {
        const action = actions.find((action) => inputState[action]);

        if (action !== undefined && inputState[action]) {
          onAction();
          inputState[action] = false; // handled this input
        }
      };

      gameApi.events.on("inputStateChanged", handleInput);

      return () => {
        gameApi.events.off("inputStateChanged", handleInput);
      };
    },
    [actions, gameApi, onAction],
  );
};
