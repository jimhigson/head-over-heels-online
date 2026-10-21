import { useState } from "preact/hooks";

import { editorStore, store, useEditorAppSelector } from "../../store/store";
import { Border } from "../../ui/Border";
import { Dialog } from "../../ui/Dialog";
import { DialogPortal } from "../../ui/DialogPortal";
import { actionCommandDefinitions } from "../commands/actionCommandDefinitions";
import { commandDefinitions } from "../commands/commandDefinitions";
import {
  type EditorCommand,
  type EditorCommandDefinition,
  resolveCommandDefinition,
} from "../commands/EditorCommand";
import { roomCommandDefinitions } from "../commands/roomCommandDefinitions";
import { runCommand } from "../commands/runCommand";
import { selectCommandIsAvailable } from "../commands/selectCommandIsAvailable";
import { selectCmdKSearch, setCmdKSearch } from "../slice/levelEditorSlice";
import { CmdKContents } from "./CmdKContents";

/** lists the commands that can run now, other than opening this menu */
const resolveEntryForEditor = (
  commandDefinition: EditorCommandDefinition,
): EditorCommand | undefined => {
  if (commandDefinition === actionCommandDefinitions.commandPalette) {
    return undefined;
  }
  const state = editorStore.getState();
  const command = resolveCommandDefinition<EditorCommand>(
    commandDefinition,
    state,
  );
  return selectCommandIsAvailable(command, state) ? command : undefined;
};

export type EditorCmdKDialogProps = {
  onClose: () => void;
};

/**
 * the editor's command palette: search every item and command that can run
 * now, and run the one chosen. The search is kept in the store, so it is still
 * there the next time the palette opens
 */
export const EditorCmdKDialog = ({ onClose }: EditorCmdKDialogProps) => {
  const search = useEditorAppSelector(selectCmdKSearch);
  // the rooms can't change while the palette is open:
  const [commandAndRoomDefinitions] = useState(() => ({
    ...commandDefinitions,
    ...roomCommandDefinitions(editorStore.getState()),
  }));

  return (
    <DialogPortal>
      <Border class="scale-editor" scrim />
      {/* stop window-level shortcuts catching our keypresses that match their shortcuts */}
      <div class="contents no-keyboard-shortcuts">
        <Dialog wide class="scale-editor p-1 bg-metallicBlueHalfbrite">
          <CmdKContents
            commandDefinitions={commandAndRoomDefinitions}
            resolveEntry={resolveEntryForEditor}
            placeholder="Search items, commands and rooms..."
            onSelect={(command) => {
              onClose();
              runCommand(command);
            }}
            onClose={onClose}
            search={search}
            onSearchChange={(value) => store.dispatch(setCmdKSearch(value))}
          />
        </Dialog>
      </div>
    </DialogPortal>
  );
};
