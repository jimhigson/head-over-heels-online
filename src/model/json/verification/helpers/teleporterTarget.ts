import { entries } from "../../../../utils/entries";
import { iterateRoomJsonItemsWithIds } from "../../../RoomJson";
import { type ExitGameRoomId, exitGameRoomId } from "../../ItemConfigMap";
import {
  type VerificationCampaign,
  type VerificationJsonItem,
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "../verificationTypes";

export type TeleporterConfig = VerificationJsonItem<"teleporter">["config"];

export type TeleporterRef = {
  roomId: VerificationRoomId;
  teleporterId: VerificationRoomItemId;
  teleporter: VerificationJsonItem<"teleporter">;
};

/** every fixed `teleporter` (not portableTeleporter) in the campaign */
export function* allTeleporters(
  campaign: VerificationCampaign,
): Generator<TeleporterRef> {
  for (const [roomId, room] of entries(campaign.rooms)) {
    for (const [teleporterId, teleporter] of iterateRoomJsonItemsWithIds(
      room.items,
      "teleporter",
    )) {
      yield {
        roomId,
        teleporterId: teleporterId as VerificationRoomItemId,
        teleporter,
      };
    }
  }
}

/** the room a teleporter sends the player to (its own room when `toRoom` is unset) */
export const teleporterTargetRoom = (
  fromRoom: VerificationRoomId,
  config: TeleporterConfig,
): ExitGameRoomId | VerificationRoomId => config.toRoom ?? fromRoom;

/** the `toItemId` of a teleporter, if it has one */
export const teleporterToItemId = (
  config: TeleporterConfig,
): string | undefined => ("toItemId" in config ? config.toItemId : undefined);

/** ids of all teleporters (fixed and portable) in a room */
export const teleportersInRoom = (
  campaign: VerificationCampaign,
  roomId: ExitGameRoomId | VerificationRoomId,
): VerificationRoomItemId[] => {
  if (roomId === exitGameRoomId || !(roomId in campaign.rooms)) {
    return [];
  }
  return iterateRoomJsonItemsWithIds(
    campaign.rooms[roomId].items,
    "teleporter",
    "portableTeleporter",
  )
    .map(([id]) => id as VerificationRoomItemId)
    .toArray();
};
