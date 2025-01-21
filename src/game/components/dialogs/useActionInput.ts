import { useCallback, useMemo } from "react";
import { useGameApi } from "../GameApiContext";
import type { ConditionalKeys } from "type-fest";
import { emptyArray } from "../../../utils/empty";
import type { InputState } from "../../input/InputState";
import type { Key } from "../../input/keys";
import { useEvent } from "../../../utils/react/useEvent";
import type { InputStateChangeEvent } from "../../input/listenForInput";

type BooleanInput = ConditionalKeys<InputState, boolean>;

export type UseActionInputProps = {
  /** MUST be cached using useCallback or useMemo, or will re-assign on every render */
  onAction: () => void;
  action?: BooleanInput | BooleanInput[];
  key?: Key | Key[];
  disabled?: boolean;
};

export const useActionInput = ({
  onAction,
  action: actionProp,
  key: keyProp,
  disabled = false,
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

  useEvent(
    gameApi.events,
    "inputStateChanged",
    useCallback(
      (inputStateChangeEvent: InputStateChangeEvent) => {
        if (disabled) {
          return;
        }

        if (inputStateChangeEvent.upOrDown !== "down") {
          return;
        }
        const { inputState } = inputStateChangeEvent;

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
      },
      [actions, disabled, keys, onAction],
    ),
  );
};
