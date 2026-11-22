import type { KeyboardEvent } from "preact/compat";

import type {
  EditorCommandDefinition,
  ItemToolCommand,
} from "../../../../../../editor/commands/EditorCommand";
import { itemToolCommandDefinitions } from "../../../../../../editor/commands/itemToolCommandDefinitions";
import { CmdKContents } from "../../../../../../editor/toolbar/CmdKContents";
import type {
  JsonItemConfig,
  JsonItemType,
} from "../../../../../../model/json/JsonItem";
import { useAppDispatch } from "../../../../../../store/hooks";
import { closeMenuThunk } from "../../../../../../store/slices/gameMenus/closeMenuThunk";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { summonItemAbovePlayable } from "../../../../cheats/summonItemAbovePlayable";
import { useGameApi } from "../../../../GameApiContext";

// state-dependent entries need the editor, so can't be summoned
const resolveEntryForSummoning = (
  commandDefinition: EditorCommandDefinition<ItemToolCommand>,
) => (typeof commandDefinition === "function" ? undefined : commandDefinition);

/** keep typing out of the game's input; escape goes through to close the dialog */
const stopKeydownReachingGame = (e: KeyboardEvent<HTMLDivElement>) => {
  if (e.key !== "Escape") {
    e.stopPropagation();
  }
};

/** the cmd-k menu, in-game: summons the chosen item above the playable */
export const CheatsCmdKDialog = <RoomId extends string>() => {
  const gameApi = useGameApi<RoomId>();
  const dispatch = useAppDispatch();

  return (
    <DialogPortal>
      <Border onClick={useDispatchActionCallback(closeMenuThunk, "cmdk")} />
      <Dialog
        class="p-1 bg-metallicBlueHalfbrite"
        dialogId="cmdk"
        ariaLabel="search for an item to summon above the player"
      >
        <CmdKContents
          commandDefinitions={itemToolCommandDefinitions}
          resolveEntry={resolveEntryForSummoning}
          placeholder="Search items..."
          onSelect={({ itemTool }) => {
            summonItemAbovePlayable(
              gameApi,
              itemTool.type,
              // editor tool room ids are not this campaign's room ids:
              itemTool.config as JsonItemConfig<JsonItemType, RoomId>,
            );
            dispatch(closeMenuThunk("cmdk"));
          }}
          onKeyDown={stopKeydownReachingGame}
        />
      </Dialog>
    </DialogPortal>
  );
};
