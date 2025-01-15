import type { InputState } from "@/game/input/InputState";
import { useEffect, useMemo } from "react";
import { useGameApi } from "../GameApiContext";
import type { ConditionalKeys } from "type-fest";
import type { Key } from "@/game/input/keys";
import { emptyArray } from "@/utils/empty";

type BooleanInput = ConditionalKeys<InputState, boolean>;

export type UseActionInputProps = {
  onAction: () => void;
  action?: BooleanInput | BooleanInput[];
  key?: Key | Key[];
};

export const useActionInput = ({
  onAction,
  action: actionProp,
  key: keyProp,
}: UseActionInputProps) => {
  const gameApi = useGameApi();

  const actions: BooleanInput[] = useMemo(
    () =>
      actionProp === undefined ? emptyArray
      : Array.isArray(actionProp) ? actionProp
      : [actionProp],
    [actionProp],
  );

  const keys: Key[] = useMemo(
    () =>
      keyProp === undefined ? emptyArray
      : Array.isArray(keyProp) ? keyProp
      : [keyProp],
    [keyProp],
  );

  useEffect(() => {
    const handleInput = (inputState: InputState) => {
      const action = actions.find((action) => inputState[action]);

      if (action !== undefined && inputState[action]) {
        onAction();
        inputState[action] = false; // handled this input
        return;
      }

      const key = keys.find((key) => inputState.raw[key]);
      if (key !== undefined && inputState.raw[key]) {
        onAction();
        delete inputState.raw[key]; // handled this input
      }
    };

    gameApi.events.on("inputStateChanged", handleInput);

    return () => {
      gameApi.events.off("inputStateChanged", handleInput);
    };
  }, [actions, gameApi, keys, onAction]);
};
