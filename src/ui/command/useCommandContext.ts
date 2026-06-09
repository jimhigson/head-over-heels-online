import { useContext } from "react";

import { CommandContext, type CommandContextValue } from "./commandContext";

export const useCommandContext = (): CommandContextValue => {
  const context = useContext(CommandContext);
  if (context === undefined) {
    throw new Error("Command sub-components must be used inside a <Command>");
  }
  return context;
};
