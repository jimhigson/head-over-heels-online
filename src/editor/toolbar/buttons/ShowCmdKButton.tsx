import { useState } from "preact/hooks";

import { BitmapText } from "../../../game/components/tailwindSprites/BitmapText";
import { store, useEditorAppSelector } from "../../../store/store";
import { Border } from "../../../ui/Border";
import { Command } from "../../../ui/command/Command";
import { CommandEmpty } from "../../../ui/command/CommandEmpty";
import { CommandGroup } from "../../../ui/command/CommandGroup";
import { CommandInput } from "../../../ui/command/CommandInput";
import { CommandItem } from "../../../ui/command/CommandItem";
import { CommandList } from "../../../ui/command/CommandList";
import { CommandMatch } from "../../../ui/command/CommandMatch";
import { Dialog } from "../../../ui/Dialog";
import { DialogPortal } from "../../../ui/DialogPortal";
import { keys } from "../../../utils/entries";
import {
  selectCmdKSearch,
  setCmdKSearch,
  setTool,
} from "../../slice/levelEditorSlice";
import { buttonDefinitions } from "../buttonDefinitions";
import { buttonSizeClassNames } from "../buttonSizeClassNames";
import { ToolbarButton } from "./ToolbarButton";

const buttonKeys = keys(buttonDefinitions).sort();

const CmdKDialogContents = ({
  onSelect,
  onClose,
}: {
  onSelect: () => void;
  onClose: () => void;
}) => {
  const search = useEditorAppSelector(selectCmdKSearch);
  return (
    <Command
      className="h-full text-white"
      onClose={onClose}
      search={search}
      onSearchChange={(value) => store.dispatch(setCmdKSearch(value))}
    >
      <CommandInput autoFocus placeholder="Search items..." />
      <CommandList className="max-h-none scrollbar scrollbar-w-1 scrollbar-thumb-lightGrey">
        <CommandEmpty>
          <BitmapText>Nothing found</BitmapText>
        </CommandEmpty>
        <CommandGroup>
          {buttonKeys.map((key) => {
            const definition = buttonDefinitions[key];
            const props =
              typeof definition === "function" ?
                definition(store.getState().levelEditor!)
              : definition;
            return (
              <CommandItem
                key={key}
                // search both the human label and the dotted key, so category
                // terms like "monster" still match while the label is what shows
                value={`${props.ariaLabel} ${key}`}
                onSelect={() => {
                  store.dispatch(
                    setTool({ type: "item", item: props.itemTool }),
                  );
                  onSelect();
                }}
                className="px-1"
              >
                {/* div copies the form of the <button> in ToolbarButton without actually being a button: */}
                <div
                  className={`${buttonSizeClassNames} active:pt-oneScaledPix gap-0 inline-flex overflow-hidden`}
                >
                  {props.children}
                </div>
                <CommandMatch className="ml-1" text={props.ariaLabel} />
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export const ShowCmdKButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ToolbarButton
        ariaLabel="Command menu"
        onClick={() => setOpen(true)}
        shortcutKeys={["^K", "⌘K"]}
        tooltipContent={"## Cmd-K menu\nFast access to most items"}
      >
        <BitmapText className="relative leading-none">CMD</BitmapText>
      </ToolbarButton>
      {open && (
        <DialogPortal>
          <Border className="scale-editor bg-checkerboard-stifled-alphas" />
          {/* stop window-level shortcuts catching our keypresses that match their shortcuts */}
          <div className="contents no-keyboard-shortcuts">
            <Dialog wide className="scale-editor p-1 bg-metallicBlueHalfbrite">
              <CmdKDialogContents
                onSelect={() => setOpen(false)}
                onClose={() => setOpen(false)}
              />
            </Dialog>
          </div>
        </DialogPortal>
      )}
    </>
  );
};
