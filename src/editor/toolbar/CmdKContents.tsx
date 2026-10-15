import { useState } from "preact/hooks";

import { cn } from "../../ui/cn";
import { Command, type CommandProps } from "../../ui/command/Command";
import { CommandEmpty } from "../../ui/command/CommandEmpty";
import { CommandGroup } from "../../ui/command/CommandGroup";
import { CommandInput } from "../../ui/command/CommandInput";
import { CommandItem } from "../../ui/command/CommandItem";
import { CommandList } from "../../ui/command/CommandList";
import { CommandMatch } from "../../ui/command/CommandMatch";
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
            <CommandItem
              key={key}
              value={cmdKSearchText(key, command)}
              onSelect={() => onSelect(command)}
              class="px-1"
            >
              {/* div copies the form of the <button> in ToolbarButton without actually being a button: */}
              <div
                class={cn(
                  `${buttonSizeClassNames} active:pt-oneScaledPix gap-0 inline-flex items-center justify-center overflow-hidden`,
                  // as on the toolbar, eg its colour, or how its icon is positioned:
                  command.toolbarClass,
                )}
              >
                {command.icon}
              </div>
              <CommandMatch class="ml-1" text={command.label} />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
