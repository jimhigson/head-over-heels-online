import { useContext } from "preact/hooks";

import { CommandContext, type CommandContextValue } from "./commandContext";

export const useCommandContext = (): CommandContextValue => {
  const context = useContext(CommandContext);
  if (import.meta.env.DEV && context === null) {
    throw new Error("Command sub-components must be used inside a <Command>");
  }
  return context;
};
