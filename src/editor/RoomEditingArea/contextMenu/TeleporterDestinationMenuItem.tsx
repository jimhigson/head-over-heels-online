import { useEditorAppSelector } from "../../../store/store";
import { CommandContextMenuItem } from "../../commands/CommandContextMenuItem";
import {
  chooseTeleporterDestination,
  type TeleporterDestination,
} from "../../editorDialogs/chooseTeleporterDestination";
import { type EditorRoomId, type EditorRoomItemId } from "../../editorTypes";
import {
  closeItemContextMenu,
  selectCurrentCampaignInProgress,
  selectCurrentCommittedRoomJson,
  selectCursorRoomSelectedJsonItemIds,
  setSelectedTeleportersDestination,
} from "../../slice/levelEditorSlice";

/** choose where the selected teleporters lead. Hidden unless all are teleporters */
export const TeleporterDestinationMenuItem = () => {
  const selectedJsonItemIds = useEditorAppSelector(
    selectCursorRoomSelectedJsonItemIds,
  );
  const roomJson = useEditorAppSelector(selectCurrentCommittedRoomJson);
  const campaign = useEditorAppSelector(selectCurrentCampaignInProgress);
  const isCampaignRoomId = (roomId: string): roomId is EditorRoomId =>
    roomId in campaign.rooms;
  const isItemIdInRoom = (
    roomId: EditorRoomId,
    itemId: string,
  ): itemId is EditorRoomItemId => itemId in campaign.rooms[roomId].items;

  const destinationKeys = new Set<string>();
  let sharedDestination: TeleporterDestination | undefined;
  for (const id of selectedJsonItemIds) {
    const item = roomJson.items[id];
    if (item?.type !== "teleporter") {
      return null;
    }
    const { toRoom } = item.config;
    const toItemId =
      "toItemId" in item.config ? item.config.toItemId : undefined;
    destinationKeys.add(`${toRoom}/${toItemId}`);
    // only preselect a destination that is a real room (and item):
    sharedDestination =
      toRoom !== undefined && isCampaignRoomId(toRoom) ?
        {
          toRoom,
          toItemId:
            toItemId !== undefined && isItemIdInRoom(toRoom, toItemId) ?
              toItemId
            : undefined,
        }
      : undefined;
  }
  if (destinationKeys.size === 0) {
    return null;
  }

  return (
    <CommandContextMenuItem
      command={{
        type: "action",
        label: "Destination…",
        action: () => async (dispatch) => {
          dispatch(closeItemContextMenu());
          const destination = await chooseTeleporterDestination({
            campaign,
            fromRoomId: roomJson.id,
            teleporterIds: selectedJsonItemIds,
            // only one they all share:
            initialDestination:
              destinationKeys.size === 1 ? sharedDestination : undefined,
          });
          if (destination !== undefined) {
            dispatch(
              setSelectedTeleportersDestination({
                ...destination,
                timestamp: Date.now(),
              }),
            );
          }
        },
      }}
    />
  );
};
