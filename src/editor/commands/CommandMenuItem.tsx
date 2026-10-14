import { useEditorAppSelector } from "../../store/store";
import { MenuItem } from "../../ui/menuBar/MenuItem";
import { type EditorCommand } from "./EditorCommand";
import { runCommand } from "./runCommand";
import { selectCommandIsActive } from "./selectCommandIsActive";
import { selectCommandIsAvailable } from "./selectCommandIsAvailable";

export type CommandMenuItemProps = {
  command: EditorCommand;
};

/** a command as an item in a menu bar's menu */
export const CommandMenuItem = ({ command }: CommandMenuItemProps) => {
  const isActive = useEditorAppSelector((state) =>
    selectCommandIsActive(command, state),
  );
  const isAvailable = useEditorAppSelector((state) =>
    selectCommandIsAvailable(command, state),
  );

  return (
    <MenuItem
      label={command.label}
      icon={command.menuIcon}
      shortcutKeys={command.shortcutKeys}
      checked={isActive}
      disabled={!isAvailable}
      onSelect={() => runCommand(command)}
    />
  );
};
