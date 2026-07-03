import { createContext } from "preact";
import { type PropsWithChildren } from "preact/compat";
import { useContext, useEffect, useState } from "preact/hooks";

import { createEmptyHudInputState } from "./hudInputState";
import {
  InputStateTracker,
  type InputStateTrackerInterface,
  type InputTicker,
} from "./InputStateTracker";
import {
  createEmptyKeyboardState,
  type KeyboardStateMap,
  maintainKeyboardState,
} from "./keyboardState";

const InputStateTrackerContext =
  createContext<InputStateTrackerInterface | null>(null);

export type InputStateProviderProps = PropsWithChildren<{
  ticker: InputTicker;
}>;

export const InputStateProvider = ({
  children,
  ticker,
}: InputStateProviderProps) => {
  const [keyboardState] = useState<KeyboardStateMap>(createEmptyKeyboardState);
  const [inputStateTracker] = useState<InputStateTrackerInterface>(
    () =>
      new InputStateTracker(keyboardState, createEmptyHudInputState(), ticker),
  );

  useEffect(() => {
    // listenForInput returns the unmount function:
    const stopMaintainingKeyboardState = maintainKeyboardState(keyboardState);
    inputStateTracker.startTicking();

    // in practice this should never ummount in production, but it will in react dev mode:
    return () => {
      stopMaintainingKeyboardState();
      inputStateTracker.stopTicking();
    };
  }, [inputStateTracker, keyboardState]);

  return (
    <InputStateTrackerContext value={inputStateTracker}>
      {children}
    </InputStateTrackerContext>
  );
};

export const useInputStateTracker = (): InputStateTrackerInterface => {
  const inputStateTracker = useContext(InputStateTrackerContext);
  if (inputStateTracker === null) {
    throw new Error("InputStateProvider required to use useInputState");
  }
  return inputStateTracker;
};
