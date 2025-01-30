import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { EmptyObject } from "type-fest";
import {
  createEmptyKeyboardState,
  maintainKeyboardState,
  type KeyboardStateMap,
} from "./keyboardState";
import { InputStateTracker } from "./InputStateTracker";

const InputStateTrackerContext = createContext<InputStateTracker | null>(null);

export const InputStateProvider = ({
  children,
}: PropsWithChildren<EmptyObject>) => {
  const [keyboardState] = useState<KeyboardStateMap>(createEmptyKeyboardState);
  const [inputStateTracker] = useState<InputStateTracker>(
    () => new InputStateTracker(keyboardState),
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

export const useInputStateTracker = (): InputStateTracker => {
  const inputStateTracker = useContext(InputStateTrackerContext);
  if (inputStateTracker === null) {
    throw new Error("InputStateProvider required to use useInputState");
  }
  return inputStateTracker;
};
