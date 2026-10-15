import { editorStore, useEditorAppSelector } from "../../store/store";
import { MenuItem } from "../../ui/menuBar/MenuItem";
import { SwitchN } from "../../ui/Switch";
import { type EditorCommand, type SettingCommand } from "./EditorCommand";
import { runCommand } from "./runCommand";
import { selectCommandIsAvailable } from "./selectCommandIsAvailable";

export type CommandContextMenuItemProps<TValue extends string> = {
  command: EditorCommand | SettingCommand<TValue>;
};

/**
 * a command in a right-click menu, left out while it isn't available. A
 * setting shows as a switch, changed in place with the menu left open
 */
export const CommandContextMenuItem = <TValue extends string>({
  command,
}: CommandContextMenuItemProps<TValue>) =>
  command.type === "setting" ?
    <SettingCommandMenuItem command={command} />
  : <AvailableCommandMenuItem command={command} />;

type SettingCommandMenuItemProps<TValue extends string> = {
  command: SettingCommand<TValue>;
};

const SettingCommandMenuItem = <TValue extends string>({
  command: { label, values, valueLabels, value, action },
}: SettingCommandMenuItemProps<TValue>) => {
  const change = (newValue: TValue) => editorStore.dispatch(action(newValue));

  return (
    <MenuItem
      label={label}
      keepsMenuOpen
      // choosing the item moves the switch on to its next value:
      onSelect={() =>
        change(values[(values.indexOf(value) + 1) % values.length])
      }
      control={
        <SwitchN
          ariaLabel={label}
          values={values}
          valueLabels={valueLabels}
          value={value}
          onChange={change}
        />
      }
    />
  );
};

type AvailableCommandMenuItemProps = {
  command: EditorCommand;
};

const AvailableCommandMenuItem = ({
  command,
}: AvailableCommandMenuItemProps) => {
  const isAvailable = useEditorAppSelector((state) =>
    selectCommandIsAvailable(command, state),
  );

  return isAvailable ?
      <MenuItem
        label={command.label}
        icon={command.menuIcon}
        shortcutKeys={command.shortcutKeys}
        onSelect={() => runCommand(command)}
      />
    : null;
};
