import { produce } from "immer";

import { exitGameRoomId } from "../../ItemConfigMap";
import { type CampaignVerifier } from "../CampaignVerification";
import {
  allTeleporters,
  teleportersInRoom,
  teleporterTargetRoom,
  teleporterToItemId,
} from "../helpers/teleporterTarget";
import {
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "../verificationTypes";

type TeleporterTargetInvalid = {
  roomId: VerificationRoomId;
  teleporterId: VerificationRoomItemId;
  targetRoom: VerificationRoomId;
  toItemId: string;
};

/**
 * a teleporter whose `toItemId` names an item that doesn't exist in the
 * destination room. Auto-fixable (drop the toItemId) only when the destination
 * has a single teleporter to fall back to.
 */
export const teleporterTargetInvalidVerifier: CampaignVerifier<TeleporterTargetInvalid> =
  {
    name: "Teleporter target item missing",
    *check(campaign) {
      for (const { roomId, teleporterId, teleporter } of allTeleporters(
        campaign,
      )) {
        const toItemId = teleporterToItemId(teleporter.config);
        if (toItemId === undefined) {
          continue;
        }
        const targetRoom = teleporterTargetRoom(roomId, teleporter.config);
        if (targetRoom === exitGameRoomId || !(targetRoom in campaign.rooms)) {
          continue;
        }
        if (toItemId in campaign.rooms[targetRoom].items) {
          continue;
        }
        const lone = teleportersInRoom(campaign, targetRoom).length === 1;
        yield {
          severity: "error",
          roomId,
          itemId: teleporterId,
          msg: `Teleporter ‘${teleporterId}’ in ‘${roomId}’ targets item ‘${toItemId}’ in ‘${targetRoom}’, which doesn't exist`,
          fixable: lone,
          fixText:
            lone ?
              `Remove the toItemId — ‘${targetRoom}’ has a single teleporter to land on`
            : `Set a valid toItemId on teleporter ‘${teleporterId}’ in ‘${roomId}’ by hand`,
          issueData: { roomId, teleporterId, targetRoom, toItemId },
          verifier: teleporterTargetInvalidVerifier,
        };
      }
    },
    fix(campaign, { roomId, teleporterId, targetRoom, toItemId }) {
      if (
        !(targetRoom in campaign.rooms) ||
        toItemId in campaign.rooms[targetRoom].items ||
        teleportersInRoom(campaign, targetRoom).length !== 1
      ) {
        throw new Error(
          `cannot auto-fix teleporter ‘${teleporterId}’ in ‘${roomId}’: its target isn't unambiguous`,
        );
      }
      return produce(campaign, (draft) => {
        const teleporter = draft.rooms[roomId].items[teleporterId];
        if (
          (teleporter.type === "teleporter" ||
            teleporter.type === "portableTeleporter") &&
          "toItemId" in teleporter.config
        ) {
          delete teleporter.config.toItemId;
        }
      });
    },
  };
