import { useState } from "preact/hooks";

import { type JsonItemType } from "../../model/json/JsonItem";
import { Command, type CommandProps } from "../../ui/command/Command";
import { CommandEmpty } from "../../ui/command/CommandEmpty";
import { CommandGroup } from "../../ui/command/CommandGroup";
import { CommandInput } from "../../ui/command/CommandInput";
import { CommandItem } from "../../ui/command/CommandItem";
import { CommandList } from "../../ui/command/CommandList";
import { CommandMatch } from "../../ui/command/CommandMatch";
import { keys } from "../../utils/entries";
import { type ItemTool } from "../RoomEditingArea/interactivity/Tool";
import { type ButtonDefinition, buttonDefinitions } from "./buttonDefinitions";
import { buttonSizeClassNames } from "./buttonSizeClassNames";
import { type ItemToolButtonProps } from "./ItemToolButton";

const buttonKeys = keys(buttonDefinitions).sort();

export type CmdKContentsProps = {
  /**
   * evaluates an entry into what to list for it; undefined means do not list it
   */
  resolveEntry: (
    buttonDefinition: ButtonDefinition,
  ) => ItemToolButtonProps<JsonItemType> | undefined;
  onSelect: (itemTool: ItemTool) => void;
  /** called on escape; omit where something else handles escape */
  onClose?: () => void;
  /** controlled filter text (omit to let the contents manage their own) */
  search?: string;
  onSearchChange?: (search: string) => void;
  /** sees every keydown first, before it is acted on */
  onKeyDown?: CommandProps["onKeyDown"];
};

/** a searchable list of the items the editor can place */
export const CmdKContents = ({
  resolveEntry,
  onSelect,
  onClose,
  search,
  onSearchChange,
  onKeyDown,
}: CmdKContentsProps) => {
  // entries can't change while the contents are shown, so resolve once
  const [listedEntries] = useState(() =>
    buttonKeys.flatMap((key) => {
      const itemToolButtonProps = resolveEntry(buttonDefinitions[key]);
      return itemToolButtonProps === undefined ?
          []
        : [{ key, itemToolButtonProps }];
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
      <CommandInput autoFocus placeholder="Search items..." />
      <CommandList class="max-h-none scrollbar scrollbar-w-1 scrollbar-thumb-lightGrey">
        <CommandEmpty>
          <span class="text-single-line">Nothing found</span>
        </CommandEmpty>
        <CommandGroup>
          {listedEntries.map(({ key, itemToolButtonProps }) => (
            <CommandItem
              key={key}
              // search both the human label and the dotted key, so category
              // terms like "monster" still match while the label is what shows
              value={`${itemToolButtonProps.ariaLabel} ${key}`}
              onSelect={() => onSelect(itemToolButtonProps.itemTool)}
              class="px-1"
            >
              {/* div copies the form of the <button> in ToolbarButton without actually being a button: */}
              <div
                class={`${buttonSizeClassNames} active:pt-oneScaledPix gap-0 inline-flex overflow-hidden`}
              >
                {itemToolButtonProps.children}
              </div>
              <CommandMatch class="ml-1" text={itemToolButtonProps.ariaLabel} />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
