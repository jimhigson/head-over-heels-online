import { type ComponentChildren } from "preact";

import { useEditorAppSelector } from "../../store/store";
import { ToolbarButton } from "../toolbar/buttons/ToolbarButton";
import { type EditorCommand } from "./EditorCommand";
import { runCommand } from "./runCommand";
import { selectCommandIsActive } from "./selectCommandIsActive";
import { selectCommandIsAvailable } from "./selectCommandIsAvailable";

export type CommandToolbarButtonProps = {
  command: EditorCommand;
  /** in place of the command's own tooltip, eg to say what undo would undo */
  tooltipContent?: ComponentChildren;
  /** called once the command has run, and finished if it takes time */
  onClick?: () => void;
  small?: boolean;
};

/** a command as a toolbar button */
export const CommandToolbarButton = ({
  command,
  tooltipContent,
  onClick,
  small = false,
}: CommandToolbarButtonProps) => {
  const isActive = useEditorAppSelector(
    (state) => selectCommandIsActive(command, state) ?? false,
  );
  const isAvailable = useEditorAppSelector((state) =>
    selectCommandIsAvailable(command, state),
  );

  return (
    <ToolbarButton
      ariaLabel={command.label}
      class={command.toolbarClass}
      isCurrentTool={isActive}
      disabled={!isAvailable}
      shortcutKeys={command.shortcutKeys}
      small={small}
      tooltipContent={tooltipContent ?? command.tooltipContent}
      onClick={async () => {
        await runCommand(command);
        onClick?.();
      }}
    >
      {command.icon}
    </ToolbarButton>
  );
};
