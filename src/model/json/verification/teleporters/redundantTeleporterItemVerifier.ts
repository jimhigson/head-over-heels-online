import { produce } from "immer";

import { exitGameRoomId } from "../../ItemConfigMap";
import { type CampaignVerifier } from "../CampaignVerification";
import {
  allTeleporters,
  type TeleporterConfig,
  teleportersInRoom,
  teleporterTargetRoom,
  teleporterToItemId,
} from "../helpers/teleporterTarget";
import {
  type VerificationCampaign,
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "../verificationTypes";

type RedundantTeleporterItem = {
  roomId: VerificationRoomId;
  teleporterId: VerificationRoomItemId;
  targetRoom: VerificationRoomId;
};

/**
 * when a teleporter's `toItemId` just names the single teleporter the link would
 * fall back to anyway, returns the (existing) target room; otherwise undefined.
 */
const redundantTarget = (
  campaign: VerificationCampaign,
  fromRoom: VerificationRoomId,
  config: TeleporterConfig,
): undefined | VerificationRoomId => {
  const toItemId = teleporterToItemId(config);
  if (toItemId === undefined) {
    return undefined;
  }
  const targetRoom = teleporterTargetRoom(fromRoom, config);
  if (targetRoom === exitGameRoomId || !(targetRoom in campaign.rooms)) {
    return undefined;
  }
  const teleporters = teleportersInRoom(campaign, targetRoom);
  const [only] = teleporters;
  return teleporters.length === 1 && only === toItemId ? targetRoom : undefined;
};

/** A8: a teleporter `toItemId` that just names the destination's only teleporter */
export const redundantTeleporterItemVerifier: CampaignVerifier<RedundantTeleporterItem> =
  {
    name: "Redundant teleporter toItemId",
    *check(campaign) {
      for (const { roomId, teleporterId, teleporter } of allTeleporters(
        campaign,
      )) {
        const targetRoom = redundantTarget(campaign, roomId, teleporter.config);
        if (targetRoom === undefined) {
          continue;
        }
        yield {
          severity: "warning",
          roomId,
          itemId: teleporterId,
          msg: `Teleporter ‘${teleporterId}’ in ‘${roomId}’ sets a toItemId, but ‘${targetRoom}’ has a single teleporter so it's unnecessary`,
          fixable: true,
          fixText: `Remove the redundant toItemId from teleporter ‘${teleporterId}’ in ‘${roomId}’`,
          issueData: { roomId, teleporterId, targetRoom },
          verifier: redundantTeleporterItemVerifier,
        };
      }
    },
    fix(campaign, { roomId, teleporterId }) {
      const teleporter = campaign.rooms[roomId].items[teleporterId];
      if (
        teleporter.type !== "teleporter" ||
        redundantTarget(campaign, roomId, teleporter.config) === undefined
      ) {
        throw new Error(
          `cannot auto-fix teleporter ‘${teleporterId}’ in ‘${roomId}’: its toItemId isn't redundant`,
        );
      }
      return produce(campaign, (draft) => {
        const draftTeleporter = draft.rooms[roomId].items[teleporterId];
        if (
          (draftTeleporter.type === "teleporter" ||
            draftTeleporter.type === "portableTeleporter") &&
          "toItemId" in draftTeleporter.config
        ) {
          delete draftTeleporter.config.toItemId;
        }
      });
    },
  };
