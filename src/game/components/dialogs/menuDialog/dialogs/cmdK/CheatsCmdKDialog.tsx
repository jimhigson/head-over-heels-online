import { type KeyboardEvent } from "preact/compat";

import { type ButtonDefinition } from "../../../../../../editor/toolbar/buttonDefinitions";
import { CmdKContents } from "../../../../../../editor/toolbar/CmdKContents";
import {
  type JsonItemConfig,
  type JsonItemType,
} from "../../../../../../model/json/JsonItem";
import { useAppDispatch } from "../../../../../../store/hooks";
import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Border } from "../../../../../../ui/Border";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { isFreeItemType } from "../../../../../physics/itemPredicates";
import { summonItemAbovePlayable } from "../../../../cheats/summonItemAbovePlayable";
import { useGameApi } from "../../../../GameApiContext";

// state-dependent entries need the editor, and only free items make sense to summon
const resolveEntryForSummoning = (buttonDefinition: ButtonDefinition) =>
  (
    typeof buttonDefinition === "function" ||
    !isFreeItemType(buttonDefinition.itemTool.type)
  ) ?
    undefined
  : buttonDefinition;

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
      <Border onClick={useDispatchActionCallback(backToParentMenu)} />
      <Dialog
        class="p-1 bg-metallicBlueHalfbrite"
        dialogId="cmdk"
        ariaLabel="search for an item to summon above the player"
      >
        <CmdKContents
          resolveEntry={resolveEntryForSummoning}
          onSelect={(itemTool) => {
            summonItemAbovePlayable(
              gameApi,
              itemTool.type,
              // editor tool room ids are not this campaign's room ids:
              itemTool.config as JsonItemConfig<JsonItemType, RoomId>,
            );
            dispatch(backToParentMenu());
          }}
          onKeyDown={stopKeydownReachingGame}
        />
      </Dialog>
    </DialogPortal>
  );
};

export default CheatsCmdKDialog;
