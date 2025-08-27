import type { PropsWithChildren } from "react";
import type { EmptyObject } from "type-fest";

import { createContext, useContext, useEffect, useState } from "react";

import type { InputStateTrackerInterface } from "./InputStateTracker";

import { createEmptyHudInputState } from "./hudInputState";
import { InputStateTracker } from "./InputStateTracker";
import {
  createEmptyKeyboardState,
  type KeyboardStateMap,
  maintainKeyboardState,
} from "./keyboardState";

const InputStateTrackerContext =
  createContext<InputStateTrackerInterface | null>(null);

export const InputStateProvider = ({
  children,
}: PropsWithChildren<EmptyObject>) => {
  const [keyboardState] = useState<KeyboardStateMap>(createEmptyKeyboardState);
  const [inputStateTracker] = useState<InputStateTrackerInterface>(
    () => new InputStateTracker(keyboardState, createEmptyHudInputState()),
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
