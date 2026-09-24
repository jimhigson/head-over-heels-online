import { useState } from "preact/hooks";

import { store, useEditorAppSelector } from "../../../store/store";
import { Border } from "../../../ui/Border";
import { Dialog } from "../../../ui/Dialog";
import { DialogPortal } from "../../../ui/DialogPortal";
import {
  selectCmdKSearch,
  setCmdKSearch,
  setTool,
} from "../../slice/levelEditorSlice";
import { type ButtonDefinition } from "../buttonDefinitions";
import { CmdKContents } from "../CmdKContents";
import { ToolbarButton } from "./ToolbarButton";

const resolveEntryForEditor = (buttonDefinition: ButtonDefinition) =>
  typeof buttonDefinition === "function" ?
    buttonDefinition(store.getState().levelEditor!)
  : buttonDefinition;

export const ShowCmdKButton = () => {
  const [open, setOpen] = useState(false);
  const search = useEditorAppSelector(selectCmdKSearch);

  return (
    <>
      <ToolbarButton
        ariaLabel="Command menu"
        onClick={() => setOpen(true)}
        shortcutKeys={["^K", "⌘K"]}
        tooltipContent={"## Cmd-K menu\nFast access to most items"}
      >
        <span class="relative text-single-line">CMD</span>
      </ToolbarButton>
      {open && (
        <DialogPortal>
          <Border class="scale-editor bg-checkerboard-stifled-alphas" />
          {/* stop window-level shortcuts catching our keypresses that match their shortcuts */}
          <div class="contents no-keyboard-shortcuts">
            <Dialog wide class="scale-editor p-1 bg-metallicBlueHalfbrite">
              <CmdKContents
                resolveEntry={resolveEntryForEditor}
                onSelect={(itemTool) => {
                  store.dispatch(setTool({ type: "item", item: itemTool }));
                  setOpen(false);
                }}
                onClose={() => setOpen(false)}
                search={search}
                onSearchChange={(value) => store.dispatch(setCmdKSearch(value))}
              />
            </Dialog>
          </div>
        </DialogPortal>
      )}
    </>
  );
};
