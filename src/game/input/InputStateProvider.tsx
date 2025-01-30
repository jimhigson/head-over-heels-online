import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { EmptyObject } from "type-fest";
import {
  createKeyboardState,
  maintainKeyboardState,
  type KeyboardState,
} from "./keyboardState";
import {
  interpretInputState,
  type InputStateInterpretation,
} from "./interpretInputState";

const InputStateContext = createContext<InputStateInterpretation | null>(null);

export const InputStateProvider = ({
  children,
}: PropsWithChildren<EmptyObject>) => {
  const [keyboardState] = useState<KeyboardState>(createKeyboardState);
  const [inputStateInterpretation] = useState<InputStateInterpretation>(() =>
    interpretInputState(keyboardState),
  );

  // in practice this should never ummount in production, but it will in react dev mode:
  useEffect(() => {
    // listenForInput returns the unmount function:
    const unsubscribe = maintainKeyboardState(keyboardState);

    return unsubscribe;
  });

  return (
    <InputStateContext value={inputStateInterpretation}>
      {children}
    </InputStateContext>
  );
};

export const useInputStateInterpretation = (): InputStateInterpretation => {
  const inputState = useContext(InputStateContext);
  if (inputState === null) {
    throw new Error("InputStateProvider required to use useInputState");
  }
  return inputState;
};
