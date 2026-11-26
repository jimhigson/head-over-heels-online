import type { KeyboardEvent } from "preact/compat";
import { useMemo } from "preact/hooks";

import type {
  EditorCommandDefinition,
  ItemToolCommand,
} from "../../../../../../editor/commands/EditorCommand";
import { itemToolCommandDefinitions } from "../../../../../../editor/commands/itemToolCommandDefinitions";
import { CmdKContents } from "../../../../../../editor/toolbar/CmdKContents";
import { useAppDispatch } from "../../../../../../store/hooks";
import { closeMenuThunk } from "../../../../../../store/slices/gameMenus/closeMenuThunk";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { keys } from "../../../../../../utils/entries";
import {
  canOpenInEditor,
  openCurrentRoomInEditor,
} from "../../../../cheats/openCurrentRoomInEditor";
import { summonItemsAbovePlayable } from "../../../../cheats/summonItemsAbovePlayable";
import { useGameApi } from "../../../../GameApiContext";
import {
  type GoToRoomCommand,
  goToRoomCommandDefinitions,
} from "./goToRoomCommandDefinitions";
import {
  type OpenInEditorCommand,
  openInEditorCommandDefinitions,
} from "./openInEditorCommandDefinitions";

type CheatsCmdKCommand<RoomId extends string> =
  GoToRoomCommand<RoomId> | ItemToolCommand | OpenInEditorCommand;

// state-dependent entries need the editor, so can't be listed
const resolveEntryForCheats = <RoomId extends string>(
  commandDefinition: EditorCommandDefinition<CheatsCmdKCommand<RoomId>>,
) => (typeof commandDefinition === "function" ? undefined : commandDefinition);

/** keep typing out of the game's input; escape goes through to close the dialog */
const stopKeydownReachingGame = (e: KeyboardEvent<HTMLDivElement>) => {
  if (e.key !== "Escape") {
    e.stopPropagation();
  }
};

/**
 * the cmd-k menu, in-game: summons the chosen items above the playable, goes to
 * the chosen room, or opens the current room in the editor
 */
export const CheatsCmdKDialog = <RoomId extends string>() => {
  const gameApi = useGameApi<RoomId>();
  const dispatch = useAppDispatch();

  const commandDefinitions = useMemo(
    () => ({
      ...itemToolCommandDefinitions,
      ...goToRoomCommandDefinitions(keys(gameApi.campaign.rooms)),
      ...(canOpenInEditor() && openInEditorCommandDefinitions),
    }),
    [gameApi],
  );

  return (
    <DialogPortal>
      <Border onClick={useDispatchActionCallback(closeMenuThunk, "cmdk")} />
      <Dialog
        class="p-1 bg-metallicBlueHalfbrite"
        dialogId="cmdk"
        ariaLabel="search for an item to summon above the player, a room to go to, or to open this room in the editor"
      >
        <CmdKContents<CheatsCmdKCommand<RoomId>>
          commandDefinitions={commandDefinitions}
          resolveEntry={resolveEntryForCheats}
          placeholder="Search items, rooms and commands..."
          onSelect={(command) => {
            switch (command.type) {
              case "itemTool":
                summonItemsAbovePlayable(gameApi, command.items);
                break;
              case "goToRoom":
                gameApi.changeRoom(command.roomId);
                break;
              case "openInEditor":
                openCurrentRoomInEditor(gameApi);
                break;
              default:
                command satisfies never;
            }
            dispatch(closeMenuThunk("cmdk"));
          }}
          onKeyDown={stopKeydownReachingGame}
        />
      </Dialog>
    </DialogPortal>
  );
};
