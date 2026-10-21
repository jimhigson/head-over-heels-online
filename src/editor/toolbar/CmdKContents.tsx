import { useState } from "preact/hooks";

import { cn } from "../../ui/cn";
import { Command, type CommandProps } from "../../ui/command/Command";
import { CommandEmpty } from "../../ui/command/CommandEmpty";
import { CommandGroup } from "../../ui/command/CommandGroup";
import { CommandInput } from "../../ui/command/CommandInput";
import { CommandItem } from "../../ui/command/CommandItem";
import { CommandList } from "../../ui/command/CommandList";
import { CommandMatch } from "../../ui/command/CommandMatch";
import { shortcutHint } from "../../ui/menuBar/shortcutHint";
import { useTip } from "../../ui/tip/useTip";
import { entries } from "../../utils/entries";
import {
  type EditorCommand,
  type EditorCommandDefinition,
} from "../commands/EditorCommand";
import { buttonSizeClassNames } from "./buttonSizeClassNames";
import { cmdKSearchText } from "./cmdKSearchText";

export type CmdKContentsProps<TCommand extends EditorCommand> = {
  /** what can be listed, by key */
  commandDefinitions: Record<string, EditorCommandDefinition<TCommand>>;
  /**
   * evaluates an entry into what to list for it; undefined means do not list it
   */
  resolveEntry: (
    commandDefinition: EditorCommandDefinition<TCommand>,
  ) => TCommand | undefined;
  onSelect: (command: TCommand) => void;
  placeholder: string;
  /** called on escape; omit where something else handles escape */
  onClose?: () => void;
  /** controlled filter text (omit to let the contents manage their own) */
  search?: string;
  onSearchChange?: (search: string) => void;
  /** sees every keydown first, before it is acted on */
  onKeyDown?: CommandProps["onKeyDown"];
};

type CmdKEntryProps<TCommand extends EditorCommand> = {
  entryKey: string;
  command: TCommand;
  onSelect: (command: TCommand) => void;
};

const CmdKEntry = <TCommand extends EditorCommand>({
  entryKey,
  command,
  onSelect,
}: CmdKEntryProps<TCommand>) => {
  const { interestfor, tip } = useTip(command.cmdKTip);

  return (
    <CommandItem
      value={cmdKSearchText(entryKey, command)}
      onSelect={() => onSelect(command)}
      class="px-1"
    >
      {/* div copies the form of the <button> in ToolbarButton without actually being a button - kept
          without an icon, so every label starts at the same x: */}
      <div
        class={cn(
          `${buttonSizeClassNames} active:pt-oneScaledPix gap-0 inline-flex items-center justify-center overflow-hidden`,
          // as on the toolbar, eg its colour, or how its icon is positioned:
          command.toolbarClass,
        )}
      >
        {command.icon}
      </div>
      {
        interestfor === undefined ?
          <CommandMatch class="ml-1" text={command.label} />
          // a button, as only buttons and links can invoke a tip by interest:
        : <button
            type="button"
            tabIndex={-1}
            interestfor={interestfor}
            // fills the row, so hovering anywhere on it shows the tip:
            class="ml-1 flex-1 self-stretch text-left"
          >
            <CommandMatch text={command.label} />
          </button>

      }
      {tip}
      {command.shortcutKeys !== undefined && (
        <span class="ml-auto pl-2 text-single-line whitespace-nowrap text-highlightBeige">
          {shortcutHint(command.shortcutKeys)}
        </span>
      )}
    </CommandItem>
  );
};

/** a searchable list of commands, eg the items the editor can place */
export const CmdKContents = <TCommand extends EditorCommand>({
  commandDefinitions,
  resolveEntry,
  onSelect,
  placeholder,
  onClose,
  search,
  onSearchChange,
  onKeyDown,
}: CmdKContentsProps<TCommand>) => {
  // entries can't change while the contents are shown, so resolve once
  const [listedEntries] = useState(() =>
    entries(commandDefinitions)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .flatMap(([key, commandDefinition]) => {
        const command = resolveEntry(commandDefinition);
        return command === undefined ? [] : [{ key, command }];
      }),
  );

  return (
    <Command
      class="h-full text-white"
      onClose={onClose}
      search={search}
      onSearchChange={onSearchChange}
      onKeyDown={onKeyDown}
    >
      <CommandInput autoFocus placeholder={placeholder} />
      <CommandList class="max-h-none scrollbar scrollbar-w-1 scrollbar-thumb-lightGrey">
        <CommandEmpty>
          <span class="text-single-line">Nothing found</span>
        </CommandEmpty>
        <CommandGroup>
          {listedEntries.map(({ key, command }) => (
            <CmdKEntry
              key={key}
              entryKey={key}
              command={command}
              onSelect={onSelect}
            />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
