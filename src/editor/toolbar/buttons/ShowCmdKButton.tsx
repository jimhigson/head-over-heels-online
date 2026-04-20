import { useState } from "react";

import { BitmapText } from "../../../game/components/tailwindSprites/BitmapText";
import { store } from "../../../store/store";
import { Border } from "../../../ui/Border";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../ui/command";
import { Dialog } from "../../../ui/Dialog";
import { DialogPortal } from "../../../ui/DialogPortal";
import { keys } from "../../../utils/entries";
import { setTool } from "../../slice/levelEditorSlice";
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
  return (
    <Command className="h-full text-white" onClose={onClose}>
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
                value={key}
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
                <BitmapText className="ml-1">{key}</BitmapText>
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
      <ToolbarButton onClick={() => setOpen(true)} shortcutKeys={["^K", "⌘K"]}>
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
