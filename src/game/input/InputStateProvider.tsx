import { createContext } from "preact";
import type { PropsWithChildren } from "preact/compat";
import { useContext, useEffect, useState } from "preact/hooks";
import type { EmptyObject } from "type-fest";

import { createEmptyHudInputState } from "./hudInputState";
import {
  InputStateTracker,
  type InputStateTrackerInterface,
} from "./InputStateTracker";
import {
  createEmptyKeyboardState,
  type KeyboardStateMap,
  maintainKeyboardState,
} from "./keyboardState";
import { PointerTracker } from "./PointerTracker";

const InputStateTrackerContext = createContext<InputStateTrackerInterface>(
  // don't support root context:
  null as unknown as InputStateTrackerInterface,
);
const PointerTrackerContext = createContext<PointerTracker>(
  // don't support root context:
  null as unknown as PointerTracker,
);

export type InputStateProviderProps = PropsWithChildren<EmptyObject>;

export const InputStateProvider = ({ children }: InputStateProviderProps) => {
  const [keyboardState] = useState<KeyboardStateMap>(createEmptyKeyboardState);
  const [inputStateTracker] = useState<InputStateTrackerInterface>(
    () => new InputStateTracker(keyboardState, createEmptyHudInputState()),
  );
  const [pointerTracker] = useState(
    () => new PointerTracker(inputStateTracker),
  );

  useEffect(() => {
    // listenForInput returns the unmount function:
    const stopMaintainingKeyboardState = maintainKeyboardState(keyboardState);
    inputStateTracker.startTicking();
    pointerTracker.start();

    // in practice this should never ummount in production, but it will in react dev mode:
    return () => {
      stopMaintainingKeyboardState();
      inputStateTracker.stopTicking();
      pointerTracker.stop();
    };
  }, [inputStateTracker, keyboardState, pointerTracker]);

  return (
    <InputStateTrackerContext value={inputStateTracker}>
      <PointerTrackerContext value={pointerTracker}>
        {children}
      </PointerTrackerContext>
    </InputStateTrackerContext>
  );
};

export const usePointerTracker = (): PointerTracker => {
  const pointerTracker = useContext(PointerTrackerContext);
  if (import.meta.env.DEV && pointerTracker === null) {
    throw new Error("InputStateProvider required to use usePointerTracker");
  }
  return pointerTracker;
};

export const useInputStateTracker = (): InputStateTrackerInterface => {
  const inputStateTracker = useContext(InputStateTrackerContext);
  if (import.meta.env.DEV && inputStateTracker === null) {
    throw new Error("InputStateProvider required to use useInputState");
  }
  return inputStateTracker;
};
