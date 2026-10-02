import { useAppDispatch } from "../../../store/hooks";
import { useEditorAppSelector } from "../../../store/store";
import { ContextMenuItem } from "../../../ui/command/ContextMenuItem";
import { keys } from "../../../utils/entries";
import { chooseRoom } from "../../editorDialogs/chooseRoom";
import {
  closeItemContextMenu,
  selectCurrentCampaignInProgress,
  selectCurrentCommittedRoomJson,
  selectSelectedJsonItemIds,
  setSelectedTeleportersDestination,
} from "../../slice/levelEditorSlice";

/** choose where the selected teleporters lead. Hidden unless all are teleporters */
export const TeleporterDestinationMenuItem = () => {
  const dispatch = useAppDispatch();
  const selectedJsonItemIds = useEditorAppSelector(selectSelectedJsonItemIds);
  const roomJson = useEditorAppSelector(selectCurrentCommittedRoomJson);
  const campaign = useEditorAppSelector(selectCurrentCampaignInProgress);

  const teleporterDestinations = new Set<string | undefined>();
  for (const id of selectedJsonItemIds) {
    const item = roomJson.items[id];
    if (item?.type !== "teleporter") {
      return null;
    }
    teleporterDestinations.add(item.config.toRoom);
  }
  if (teleporterDestinations.size === 0) {
    return null;
  }

  // only preselect a destination they all share, which is a real room:
  const [sharedDestination] =
    teleporterDestinations.size === 1 ? teleporterDestinations : [];
  const initialRoomId = keys(campaign.rooms).find(
    (roomId) => roomId === sharedDestination,
  );

  return (
    <ContextMenuItem
      value="Destination room"
      onSelect={async () => {
        dispatch(closeItemContextMenu());
        const toRoom = await chooseRoom({
          heading: "Teleport to",
          campaign,
          initialRoomId,
          mapRoomId: roomJson.id,
          chooseText: (roomId) =>
            roomId === undefined ? "Set destination" : (
              `Set destination to ${roomId}`
            ),
        });
        if (toRoom !== undefined) {
          dispatch(
            setSelectedTeleportersDestination({
              toRoom,
              timestamp: Date.now(),
            }),
          );
        }
      }}
    >
      Destination room…
    </ContextMenuItem>
  );
};
