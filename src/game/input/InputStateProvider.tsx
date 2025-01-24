import type { PropsWithChildren } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { InputState } from "./InputState";
import { createEmptyInputState } from "./InputState";
import type { EmptyObject } from "type-fest";
import { listenForInput } from "./listenForInput";
import { useAppStore } from "../../store/hooks";

const InputStateContext = createContext<InputState | null>(null);

export const InputStateProvider = ({
  children,
}: PropsWithChildren<EmptyObject>) => {
  const store = useAppStore();
  const [inputState] = useState(createEmptyInputState);

  // in practice this should never ummount in production, but it will in react dev mode:
  useEffect(() => {
    // listenForInput returns the unmount function:
    const unsubscribe = listenForInput(
      inputState,
      () => store.getState().userSettings.inputAssignment,
    );

    return unsubscribe;
  });

  return <InputStateContext value={inputState}>{children}</InputStateContext>;
};

export const useInputState = (): InputState => {
  const inputState = useContext(InputStateContext);
  if (inputState === null) {
    throw new Error("InputStateProvider required to use useInputState");
  }
  return inputState;
};
